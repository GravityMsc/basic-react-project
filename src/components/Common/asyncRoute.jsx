import React from 'react';

const AsyncRouteComponent = (loader, LoadingComponent) => (
  class RouteComponent extends React.PureComponent {
    constructor(props) {
      super(props);
      loader().then((Component) => {
        this.setState(() => ({
          Component: Component.default || Component,
        }));
      });
    }
    state = {
      Component: null,
    };
    render() {
      const { Component } = this.state;
      if (Component) {
        return <Component {...this.props} />;
      }
      if (LoadingComponent) {
        return <LoadingComponent {...this.props} />;
      }
      return null;
    }
  }
);
export default AsyncRouteComponent;
