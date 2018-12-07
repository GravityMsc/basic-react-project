import * as React from 'react';
export declare type Version = 'typescript' | 'javascript';
export interface HomeProps {
    version: Version;
}
export declare class Home extends React.PureComponent<HomeProps> {
    static defaultProps: HomeProps;
    state: {};
    handleClick: React.MouseEventHandler;
    render(): JSX.Element;
}
export default Home;
