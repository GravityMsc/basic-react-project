import React from 'react';
import {
  Link,
  Switch,
  Route,
  Router,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';

import history from '../History';
import store from '../../store';
import { getToken } from '../../components/Login/action';
import PrivateRoute from '../Common/privateRoute';
import AsyncRouteComponent from '../Common/asyncRoute';
import Home from '../Home';

class App extends React.PureComponent {
  state = {};

  render() {
    return (
      <div>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Switch>
          <Route path="/login" component={AsyncRouteComponent(() => import(/* webpackChunkName: "loginChunk" */'../Login'))} />
          <PrivateRoute path="/" component={Home} />
        </Switch>
      </div>
    );
    // 当访问 /login 时，进入login组件中，其余路由匹配情况进入Home组件。其中，Login组件和Home组件同级互斥，不会出现嵌套
    // 这样，当访问/login或者Home组件中的路由如/xxx时，可以按不同规则渲染。注：注意路由先后顺序,根路由优先级靠后，防止拦截其他有效路由
    // 若Home组件路径为 /home，则正常使用嵌套，/login 与/home 互斥，/home/xxx为子路由，详见(https://stackblitz.com/edit/react-router-dom-4-nested-example?file=views%2FNested.js)
    // 但是需要补充默认根路由组件，即 / 的访问情况。二者权衡根据项目来定。
  }
}
store.dispatch(getToken()); // get login token

const WrapApp = process.env.NODE_ENV !== 'production' ?
  hot(module)(() => (
    <Provider store={store}>
      <Router history={history}>
        <Route component={App} />
      </Router>
    </Provider>
  ))
  :
  () => (
    <Provider store={store}>
      <Router history={history}>
        <Route component={App} />
      </Router>
    </Provider>
  );
export default WrapApp;
