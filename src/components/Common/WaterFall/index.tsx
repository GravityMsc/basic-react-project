import * as React from 'react';
import * as _ from 'lodash';

import * as imgUrl1 from '../../../images/test1.png';
import * as imgUrl2 from '../../../images/test2.png';
import * as imgUrl3 from '../../../images/favicon.png';

export interface ColumnProps {
  className: string,
  children: React.ReactChildren
}
/**
 * Function will be bind on 'scroll' event.
 * You need to set the elements height before return.
 * When you return pure image elements, this component will preload these images to get height.
 * @returns return JSX.Element array.
 */
interface ScrollFunction {
  (scrollTimes: number): Array<JSX.Element>
}
export interface WaterFallProps {
  containerClassName: string,
  columns: number,
  columnClassName: string,
  columnWidth: number | string,
  minScrollBottom: number,
  scrollFn: ScrollFunction,
}
export interface WaterFallState {
  [x: string]: any
}
export class WaterFall extends React.PureComponent<WaterFallProps, WaterFallState> {
  static defaultProps: WaterFallProps = {
    containerClassName: 'react-waterfall',
    columns: 3,
    columnClassName: 'react-waterfall-column',
    columnWidth: 300,
    minScrollBottom: 300,
    scrollFn: () => ([
      <img src={imgUrl1} alt="" />,
      <img src={imgUrl2} alt="" />,
      <img src={imgUrl3} alt="" />,
      <img src={imgUrl1} alt="" />,
      <img src={imgUrl2} alt="" />,
      <img src={imgUrl3} alt="" />,
      <img src={imgUrl1} alt="" />,
      <img src={imgUrl2} alt="" />,
      <img src={imgUrl3} alt="" />,
      <img src={imgUrl1} alt="" />,
      <img src={imgUrl2} alt="" />,
      <img src={imgUrl3} alt="" />,
    ]),
  }
  /**
   * This function will preload images.
   * @param src image src
   * @returns Promise.resolve with event when loaded.
   */
  static cacheImage = (src: string): Promise<Event> => new Promise(resolve => {
    const img = new Image();
    img.onload = (e) => resolve(e);
    img.src = src;
  })
  columnRefs: Array<React.RefObject<HTMLDivElement>> = []
  state: WaterFallState = {}
  scrollTimes: number = 0
  componentDidMount() {
    this.scrollAppend();
    window.addEventListener('scroll', this.scrollAppend);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollAppend);
  }
  getScrollBottom = () => {
    const Html = document.documentElement as HTMLElement;
    const scrollHeight = Html.scrollHeight;
    const clientHeight = Html.clientHeight;
    const scrollTop = Html.scrollTop;
    return (scrollHeight - clientHeight - scrollTop);
  }
  isScroll = () => {
    const Html = document.documentElement as HTMLElement;
    const scrollHeight = Html.scrollHeight;
    const clientHeight = Html.clientHeight;
    return scrollHeight > clientHeight;
  }
  scrollAppend = _.throttle(() => {
    const scrollBottom = this.getScrollBottom();
    if (scrollBottom < this.props.minScrollBottom) {
      console.log('scroll active');
      const elementArr = this.props.scrollFn(this.scrollTimes);
      const times = 0;
      this.appendColumnData(elementArr, times);
      this.scrollTimes = this.scrollTimes += 1;
    }
    // 当无滚动时，手动执行scroll函数
    if (this.getScrollBottom() <= 0) {
      this.scrollAppend()
    }
  }, 500)
  /**
   * 获得瀑布流最小高度列
   */
  getColumnNumber = () => {
    let columnNumber = 0;
    let minHeight = 0;
    for (let i = 0; i < this.props.columns; i += 1) {
      const instance = this.columnRefs[i].current as HTMLDivElement;
      const height = instance.scrollHeight;
      if (minHeight === 0) {
        minHeight = height;
      } else if (height < minHeight) {
        minHeight = height;
        columnNumber = i;
      }
    }
    return columnNumber;
  }
  appendColumnData = async (elementArr: Array<JSX.Element>, times: number) => {
    if (times < elementArr.length) {
      const originElement = elementArr[times];
      const element: JSX.Element = React.cloneElement(originElement, {
        style: {
          ...originElement.props.style,
          width: '100%', // 对元素限定宽度，与列宽相同
        },
      });
      if (element.type === 'img') {
        await WaterFall.cacheImage(element.props.src); // 确保缓存图片完成后，对瀑布流进行数据插入
      }
      const columnNumber = this.getColumnNumber();
      const stateKey = `columnData_${columnNumber}`;
      this.setState(({ [stateKey]: dataList = [] }) => ({
        [stateKey]: [...dataList, element]
      }), () => {
        this.appendColumnData(elementArr, times + 1)
      });
    }
  }
  /**
   * 获得指定列的数据
   */
  getColumnData = (index: number) => {
    const dataList: Array<HTMLElement | JSX.Element> = this.state[`columnData_${index}`];
    return dataList;
  }
  createColumns = () => {
    const columns = [];
    for (let i = 0; i < this.props.columns; i += 1) {
      const columnKey = `columnKeys_${i}`;
      this.columnRefs[i] = React.createRef();
      const column = (
        <div
          className={this.props.columnClassName}
          key={columnKey}
          ref={this.columnRefs[i]}
          style={{ width: this.props.columnWidth }}
        >
          {this.getColumnData(i)}
        </div>
      );
      columns.push(column);
    }
    return columns;
  }
  render() {
    const { containerClassName } = this.props;
    return (
      <div className={containerClassName} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        {this.createColumns()}
      </div>
    );
  }
}
export default WaterFall;