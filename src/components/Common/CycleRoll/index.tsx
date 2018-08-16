import * as React from 'react';
import styled, { keyframes, StyledComponentClass } from 'styled-components';

export interface ItemData {
  link?: string,
  name: string,
  content: string,
  custom?: string | HTMLElement | JSX.Element
}
export interface CycleRollProps {
  duration: number,
  dataSource: ItemData[]
}
export type StyledComp<T extends keyof JSX.IntrinsicElements> = StyledComponentClass<JSX.IntrinsicElements[T], any>

const CycleDiv: StyledComp<'div'> = styled.div`
  height: 40px;
  border: 1px solid #e3e3e3;
  line-height: 38px;
`
const ContainerDiv: StyledComp<'div'> = styled.div`
  position: relative;
  overflow: hidden;
  height: 100%;
`
let ScrollDiv: StyledComp<'div'> = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`
const ScrollSpan: StyledComp<'span'> = styled.span`
  white-space: nowrap;
  margin: 0 10px;
`
const ScrollLink = ScrollSpan.withComponent('a') as StyledComp<'a'>;
export default class CycleRoll extends React.PureComponent<CycleRollProps, {}>{
  static defaultProps: CycleRollProps = {
    dataSource: [],
    duration: 10,
  }
  createInitialDoms = (dataSource: ItemData[]): JSX.Element[] => {
    return dataSource.map((data, index) => {
      const listNo = index + 1;
      const {
        link, name, content, custom,
      } = data;
      const dom = custom ?
        <ScrollSpan>{custom}</ScrollSpan>
        :
        <ScrollSpan>{listNo}.【{name}】: {content}</ScrollSpan>;
      return (
        link ?
          <ScrollLink key={listNo} target="_blank" href={link}>{dom}</ScrollLink>
          :
          <ScrollSpan key={listNo}>{dom}</ScrollSpan>
      );
    });
  }
  state = {
    dataDoms: this.createInitialDoms(this.props.dataSource),
    inlineStyle: { animationPlayState: 'paused' },
  };
  private scrollKeyframe: string = '';
  private scroll: boolean = false;
  private containerDom: React.RefObject<HTMLElement> = React.createRef();
  private listDom: React.RefObject<HTMLElement> = React.createRef();
  componentWillReceiveProps(nextProps: CycleRollProps) {
    const { dataSource } = nextProps;
    this.setState(() => ({
      dataDoms: this.createInitialDoms(dataSource),
    }), () => {
      this.adaptDoms();
      this.startScroll();
    });
  }
  componentDidMount() {
    this.adaptDoms();
    this.startScroll();
  }
  adaptDoms = () => {
    const { dataDoms } = this.state;
    const { containerDom, listDom } = this;
    const totalWidth = (containerDom.current as HTMLElement).offsetWidth;
    const listWidth = (listDom.current as HTMLElement).offsetWidth;
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
    `
    const { duration } = this.props;
    ScrollDiv = styled.div`
      animation: ${this.scrollKeyframe} ${duration}s infinite linear;
      animation-play-state: paused;
      position: absolute;
      top: 0;
      left: 0
    `;
    const repeatTimes = Math.ceil(totalWidth / listWidth);
    const dataDomsRepeat = Array.prototype.slice.call({ length: repeatTimes + 1 }).join(' ').split(' ').map(() => dataDoms);
    this.setState(() => ({
      dataDoms: dataDomsRepeat,
    }))
  }
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
  render(): JSX.Element {
    const { dataDoms } = this.state;
    const { startScroll, stopScroll } = this;
    const content = (
      <ScrollDiv
        innerRef={this.listDom}
        style={this.state.inlineStyle}
      >
        {dataDoms}
      </ScrollDiv>
    );
    return (
      <CycleDiv>
        <ContainerDiv
          innerRef={this.containerDom}
          onMouseEnter={stopScroll}
          onMouseLeave={startScroll}
        >
          {content}
        </ContainerDiv>
      </CycleDiv>
    );
  }
}