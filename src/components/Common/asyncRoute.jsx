import React from 'react';

const AsyncRouteComponent = (loader, LoadingComponent) => (
  class RouteComponent extends React.PureComponent {
    state = {
      Component: null,
    };

    componentWillMount() {
      loader().then((Component) => {
        this.setState(() => ({
          Component: Component.default || Component,
        }));
      });
    }
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
