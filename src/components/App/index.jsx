import React from 'react';
import {
  Link,
  Switch,
  Route,
} from 'react-router-dom';

import PrivateRoute from '../Common/privateRoute';
import AsyncRouteComponent from '../Common/asyncRoute';
import Home from '../Home';

export default class App extends React.PureComponent {
  state = {};

  render() {
    return (
      <div>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={AsyncRouteComponent(() => import(/* webpackChunkName: "loginChunk" */'../Login'))} />
        </Switch>
      </div>
    );
  }
}
