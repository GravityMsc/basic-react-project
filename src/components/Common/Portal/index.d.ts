import * as React from 'react';
import './index.less';
export interface PortalProps {
    title: string | JSX.Element | HTMLElement;
    width: number;
    closeFn: Function | null;
    wrapClick: Function | null;
}
export declare class Portal extends React.PureComponent<PortalProps, {}> {
    static defaultProps: PortalProps;
    body: HTMLElement;
    modalElement: HTMLElement;
    wrap: React.RefObject<HTMLDivElement>;
    componentDidMount(): void;
    componentWillUnmount(): void;
    handleClick: React.MouseEventHandler;
    render(): React.ReactPortal;
}
export default Portal;
