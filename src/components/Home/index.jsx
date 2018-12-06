import React from 'react';
import WaterFall from '../Common/WaterFall/index.tsx';

export default class Home extends React.PureComponent {
  static defaultProps = {
    version: 'javascript',
  }
  state = {};
  render() {
    return (
      <div>
        Home --version {this.props.version}
        <WaterFall />
      </div>
    );
  }
}
