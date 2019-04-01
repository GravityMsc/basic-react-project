### redux applyMiddleware
* 中间件函数结构: `store => next => action`
  * 原始接收: 
    ```
    middlewareAPI: {
      getState: store.getState,
      dispatch: (action) => dispatch(action) // action => {}
    }
    ```
  * 单一中间件运行: `fn(middlewareAPI)(store.dispatch)(action)`
  * compose处理多中间件: 
    ```
    Fn = fn(middlewareAPI)
    dispatch = Fn1(Fn2(Fn3(store.dispatch)))
    ```
    Fn3(store.dispatch) 作为 action => dispatch(action) 作为新的dispatch(也就是形参中的next)，传递给Fn2···传递给Fn1，完成中间件的链式处理。