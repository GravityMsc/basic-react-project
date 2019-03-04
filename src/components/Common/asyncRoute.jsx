import React, { lazy, Suspense } from 'react';

const NEED_VERSION = '16.6.0';
const REACT_VERSION = React.version;
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
const LazyAsyncRouteComponent = (loader, LoadingComponent) => (props) => {
  const Component = lazy(loader);
  return (
    <Suspense fallback={<LoadingComponent {...props} />}>
      <Component {...props} />
    </Suspense>
  );
};
/**
 * hack compare versions
 */
const AsyncRoute = REACT_VERSION >= NEED_VERSION ?
  LazyAsyncRouteComponent
  :
  AsyncRouteComponent;

export default AsyncRoute;
