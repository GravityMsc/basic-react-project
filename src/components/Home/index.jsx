import React from 'react';

export default class Home extends React.PureComponent {
  static defaultProps = {
    version: 'javascript',
  }
  state = {};
  render() {
    return (
      <div>
        Home --version {this.props.version}
      </div>
    );
  }
}
