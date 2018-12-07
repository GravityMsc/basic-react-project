import * as React from 'react';

export type Version = 'typescript' | 'javascript';
export interface HomeProps {
  version: Version
}
export class Home extends React.PureComponent<HomeProps> {
  static defaultProps: HomeProps = {
    version: 'typescript'
  }
  state = {};
  handleClick: React.MouseEventHandler = (e: React.MouseEvent<HTMLDivElement>): void => {
    console.log(e);
  }
  render() {
    return (
      <div onClick={this.handleClick}>
        Home --version {this.props.version}
      </div>
    );
  }
}
export default Home;