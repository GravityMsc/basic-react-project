import * as React from 'react';
import { StyledComponentClass } from 'styled-components';
export interface ItemData {
    link?: string;
    name: string;
    content: string;
    custom?: string | HTMLElement | JSX.Element;
}
export interface CycleRollProps {
    duration: number;
    dataSource: ItemData[];
}
export declare type StyledComp<T extends keyof JSX.IntrinsicElements> = StyledComponentClass<JSX.IntrinsicElements[T], any>;
export declare class CycleRoll extends React.PureComponent<CycleRollProps, {}> {
    static defaultProps: CycleRollProps;
    createInitialDoms: (dataSource: ItemData[]) => JSX.Element[];
    state: {
        dataDoms: JSX.Element[];
        inlineStyle: {
            animationPlayState: string;
        };
    };
    private scrollKeyframe;
    private scroll;
    private containerDom;
    private listDom;
    componentWillReceiveProps(nextProps: CycleRollProps): void;
    componentDidMount(): void;
    adaptDoms: () => void;
    stopScroll: () => void;
    startScroll: () => void;
    render(): JSX.Element;
}
export default CycleRoll;
