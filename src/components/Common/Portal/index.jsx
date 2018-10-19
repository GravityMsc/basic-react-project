import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';

export default class Portal extends React.PureComponent {
  static defaultProps = {
    title: '弹出窗口',
    width: 350,
    closeFn: null,
    wrapClick: null,
  }
  componentDidMount() {
    this.Body.appendChild(this.modalElement);
  }
  componentWillUnmount() {
    this.Body.removeChild(this.modalElement);
  }
  Body = document.body;
  modalElement = document.createElement('div');
  handleClick = (e) => {
    e.stopPropagation();
    if (e.target === this.wrap) {
      if (this.props.wrapClick) {
        this.props.wrapClick();
      }
    }
  }
  render() {
    const wrapChildren = (
      <div className="modalWrap" ref={(ref) => { this.wrap = ref }} onClick={this.handleClick} >
        <div style={{ backgroundColor: '#fff', width: `${this.props.width}px`, padding: '0 15px' }}>
          <div className="title">
            <span>{this.props.title}</span>
            {this.props.closeFn ? <span className="close" onClick={this.props.closeFn}>X</span> : null}
          </div>
          {this.props.children}
        </div>
      </div>
    );
    return ReactDOM.createPortal(wrapChildren, this.modalElement);
  }
}
