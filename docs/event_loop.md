###event loop in javascript
* JS的事件循环机制会不停的调用堆栈，看是否有函数需要执行。其中，堆栈为后进先出队列，即LIFO。在每次事件循环最后，会有UI render步骤用来更新DOM。
* 于是，为保证事件在DOM更新后执行（如react中的setState callback，vue中的nextTick），需要利用机制，找到方法，即microtask。microtask 包含 MO（MutationObserver）, Promise 以及 setTimeout 等。[详细解读](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)