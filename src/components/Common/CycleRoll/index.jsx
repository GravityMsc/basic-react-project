import React from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

const itemStyle = {
  whiteSpace: 'nowrap',
  margin: '0 10px',
};
export default class CycleRoll extends React.PureComponent { // must be reset props to work;
  static defaultProps = {
    dataSource: [],
    duration: 10,
  }
  constructor(props) {
    super(props);
    this.state = {
      dataDoms: [],
    };
  }
  componentWillMount() {
    this.CycleDiv = styled.div`
      height: 40px;
      border: 1px solid #e3e3e3;
      line-height: 38px;
    `;
    this.ContainerDiv = styled.div`
      position: relative;
      overflow: hidden;
      height: 100%;
    `;
    this.ScrollDiv = styled.div`
      position: absolute;
      top: 0;
      left: 0
    `;
  }
  componentWillReceiveProps(nextProps) {
    const { dataSource } = nextProps;
    const dataDoms = dataSource.map((data, index) => {
      const listNo = index + 1;
      const {
        link, name, content, custom,
      } = data;
      const dom = custom ?
        <span style={itemStyle}>{custom}</span>
        :
        <span style={itemStyle}>{listNo}.【{name}】: {content}</span>;
      return (
        link ?
          <a style={itemStyle} key={listNo} target="_blank" href={link}>{dom}</a>
          :
          <span style={itemStyle} key={listNo}>{dom}</span>
      );
    });
    this.setState(() => ({
      dataDoms,
    }), () => {
      this.fillDoms(dataDoms); // 使用回调函数，保证首先渲染未处理时的dataDoms获取初始宽度
      this.startScroll();
    });
  }
  fillDoms = (dataDoms) => {
    const { containerDom, listDom } = this;
    const totalWidth = containerDom.offsetWidth;
    const listWidth = listDom.offsetWidth; // 比较未处理时的dataDoms
    if (dataDoms.length === 1 && listWidth < totalWidth) {
      this.scroll = false;
      return;
    }
    this.scroll = true;
    this.scrollKeyframe = keyframes`
      from {
        transform: translate(0, 0);
      }
      to {
        transform: translate(-${listWidth}px, 0);
      }
    `;
    const { duration } = this.props;
    this.ScrollDiv = styled.div`
      animation: ${this.scrollKeyframe} ${duration}s infinite linear;
      animation-play-state: paused;
      position: absolute;
      top: 0;
      left: 0
    `;
    const repeatTimes = Math.ceil(totalWidth / listWidth);
    const dataDomsRepeat = Array.prototype.slice.call({ length: repeatTimes + 1 }).join(' ').split(' ').map(() => dataDoms); // 生成若干重复DOM数组
    this.setState(() => ({
      dataDoms: dataDomsRepeat,
    }));
  };
  stopScroll = () => {
    if (!this.scroll) return;
    this.setState(() => ({
      inlineStyle: { animationPlayState: 'paused' },
    }));
  }

  startScroll = () => {
    if (!this.scroll) return;
    this.setState(() => ({
      inlineStyle: { animationPlayState: 'running' },
    }));
  }
  render() {
    const { dataDoms } = this.state;
    const {
      CycleDiv, ContainerDiv, ScrollDiv, startScroll, stopScroll,
    } = this;
    const content = (
      <ScrollDiv
        innerRef={(ref) => { this.listDom = ref; }}
        style={this.state.inlineStyle}
      >
        {dataDoms}
      </ScrollDiv>
    );
    return (
      <CycleDiv>
        <ContainerDiv
          innerRef={(ref) => { this.containerDom = ref; }}
          onMouseEnter={stopScroll}
          onMouseLeave={startScroll}
        >
          {content}
        </ContainerDiv>
      </CycleDiv>
    );
  }
}
CycleRoll.propTypes = {
  dataSource: PropTypes.arrayOf(PropTypes.object),
  duration: PropTypes.number,
};
