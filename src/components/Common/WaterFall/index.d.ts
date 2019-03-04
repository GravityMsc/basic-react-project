import * as React from 'react';
import * as _ from 'lodash';
export interface ColumnProps {
    className: string;
    children: React.ReactChildren;
}
/**
 * Function will be bind on 'scroll' event.
 * You need to set the elements height before return.
 * When you return pure image elements, this component will preload these images to get height.
 * @returns return JSX.Element array.
 */
interface ScrollFunction {
    (scrollTimes: number): Array<JSX.Element>;
}
export interface WaterFallProps {
    containerClassName: string;
    columns: number;
    columnClassName: string;
    columnWidth: number | string;
    minScrollBottom: number;
    scrollFn: ScrollFunction;
}
export interface WaterFallState {
    [x: string]: any;
}
export declare class WaterFall extends React.PureComponent<WaterFallProps, WaterFallState> {
    static defaultProps: WaterFallProps;
    /**
     * This function will preload images.
     * @param src image src
     * @returns Promise.resolve with event when loaded.
     */
    static cacheImage: (src: string) => Promise<{}>;
    columnRefs: Array<React.RefObject<HTMLDivElement>>;
    state: WaterFallState;
    scrollTimes: number;
    componentDidMount(): void;
    componentWillUnmount(): void;
    getScrollBottom: () => number;
    isScroll: () => boolean;
    scrollAppend: (() => void) & _.Cancelable;
    /**
     * 获得瀑布流最小高度列
     */
    getColumnNumber: () => number;
    appendColumnData: (elementArr: JSX.Element[], times: number) => Promise<void>;
    /**
     * 获得指定列的数据
     */
    getColumnData: (index: number) => (JSX.Element | HTMLElement)[];
    createColumns: () => JSX.Element[];
    render(): JSX.Element;
}
export default WaterFall;
