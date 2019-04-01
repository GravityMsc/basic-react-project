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
### weibo 文章Modal
进入正常weibo timeline, 任意点击一篇文章，文章以浮窗形式弹出，同时改变url地址；关闭后url恢复。
- 简单方式是采用HTML5的History api实现。history.pushState接受三个参数，分别是state状态信息、title标题以及url字符串。其中title标题的动态变化尚未在浏览器中实现，state用于传递某些数据。当存在url参数时，浏览器url地址修改并创建新的历史纪录条目，且页面并未刷新加载对应资源文件。
- 复杂方式以react-router为例，核心思想是以switch为界，定义相同path的route入口，通过判断选用相应的route展示对应组件。[参考](https://reacttraining.com/react-router/web/example/modal-gallery)