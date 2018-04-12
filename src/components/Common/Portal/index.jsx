import React from 'react';
import ReactDOM from 'react-dom';

export default class Modal extends React.PureComponent {
  componentDidMount() {
    this.Body.appendChild(this.modalElement);
  }
  componentWillUnmount() {
    this.Body.removeChild(this.modalElement);
  }
  Body = document.body;
  modalElement = document.createElement('div');
  render() {
    return ReactDOM.createPortal(this.props.children, this.modalElement);
  }
}
