import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import {
  BrowserRouter,
  Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import { getToken } from './components/Login/action';
import App from './components/App';
import register from './registerServiceWorker';

store.dispatch(getToken()); // 预获取登陆信息
const render = (Component) => {
  ReactDOM.render(
    process.env.NODE_ENV !== 'production' ?
      <AppContainer>
        <Provider store={store}>
          <BrowserRouter>
            <Route component={Component} />
          </BrowserRouter>
        </Provider>
      </AppContainer> :
      <Provider store={store}>
        <BrowserRouter>
          <Route component={Component} />
        </BrowserRouter>
      </Provider>,
    document.getElementById('root'),
  );
};
render(App); // put your root component in it
register();
if (process.env.NODE_ENV !== 'production') {
  // Hot Module Replacement API
  if (module.hot) {
    module.hot.accept('./components/App', () => {
      render(App);
    });
  }
}
