import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.less';

export interface PortalProps {
  title: string | JSX.Element | HTMLElement,
  width: number,
  closeFn: Function | null,
  wrapClick: Function | null,
}
export class Portal extends React.PureComponent<PortalProps, {}>{
  static defaultProps: PortalProps = {
    title: '默认弹窗',
    width: 350,
    closeFn: null,
    wrapClick: null,
  }
  body: HTMLElement = document.body;
  modalElement: HTMLElement = document.createElement('div');
  wrap: React.RefObject<HTMLDivElement> = React.createRef();
  componentDidMount() {
    this.body.appendChild(this.modalElement);
  }
  componentWillUnmount() {
    this.body.removeChild(this.modalElement);
  }
  handleClick: React.MouseEventHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (e.target === this.wrap.current) {
      if (this.props.wrapClick) {
        this.props.wrapClick();
      }
    }
  }
  render() {
    const wrapChildren = (
      <div
        className="modalWrap"
        ref={this.wrap}
        onClick={this.handleClick}
      >
        <div
          style={{
            backgroundColor: '#fff',
            width: `${this.props.width}px`,
            padding: '0 15px'
          }}
        >
          <div className="title">
            <span>{this.props.title}</span>
            {
              this.props.closeFn ?
                <span
                  className="close"
                  onClick={this.props.closeFn as React.MouseEventHandler}
                >
                  X
                </span>
                : null
            }
          </div>
          {this.props.children}
        </div>
      </div>
    );
    return ReactDOM.createPortal(wrapChildren, this.modalElement);
  }
}
export default Portal;