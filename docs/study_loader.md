1.  loader使用时必须用resolveloader声明loader名，默认情况从node_modules文件夹中查找。
    ```
    resolveLoader: {
        alias: {
            'JSDoc-loader': path.resolve('./webpack/loader/JSDocLoader'),
        },
    },
    ```
2.  loader有同步与异步写法，从右到左，顺序执行：
    1. 同步: source => source
    2. 异步: source => callback(null,source)