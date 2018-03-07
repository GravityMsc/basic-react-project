### react-router 有关 history 的使用
- react-router V4 中使用 high-level routers 本身不会全局暴露 history 对象，无法在子组件或者 redux 等状态管理方式中直接控制路由跳转，必须以参数传递的方法传递 history 对象使用。react-router 为此提供了 low-level interface 组件 `<Router>`，通过 history 库创建 history 对象并与路由连接，同时可以在状态库中调用。以BrowerHistory为例，简略代码如下：  
```
  // a.js
  import createHistory from 'history/createBrowserHistory';
  export default createHistory();

  // router.js
  import history from 'a.js';
  <Router history={history}> 
    ...
  </Router>

  // （redux or others).js
  import history from 'a.js';
  ...
  ...
  history.push('urlPath');
```