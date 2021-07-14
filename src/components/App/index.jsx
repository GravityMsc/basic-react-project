import React from 'react';
import {
  Link,
  Switch,
  Route,
  BrowserRouter,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader/root';

import store from '../../store';
import { getToken } from '../Login/action';
import PrivateRoute from '../Common/privateRoute';
import AsyncRoute from '../Common/asyncRoute';
import Home from '../Home/index';

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    store.dispatch(getToken());
  }

  state = {};

  render() {
    return (
      <div>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Switch>
          <Route path="/login" component={AsyncRoute(() => import(/* webpackChunkName: "loginChunk" */'../Login'))} />
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

const WrapApp = process.env.NODE_ENV !== 'production' ?
  hot(() => (
    <Provider store={store}>
      <BrowserRouter>
        <Route component={App} />
      </BrowserRouter>
    </Provider>
  ))
  :
  () => (
    <Provider store={store}>
      <BrowserRouter>
        <Route component={App} />
      </BrowserRouter>
    </Provider>
  );

export default WrapApp;
