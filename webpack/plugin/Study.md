### webpack 插件备注
1.  webpack 4 插件采用tapable触发，与webpack 3的旧版api不兼容，需要根据实际情况进行修改。
2.  这插件开发需要大量参考源码进行······简单资源文件输出可以下述代码自行更改。
    ```
    compilation.assets[filename] = {
      source: function() {
        return source;
      },
      size: function() {
        return source.length;
      }
    }
    ```
3.  注意同步、异步函数参数的不同。
4.  许多插件方法会根据打包模块数量多次执行。如parser的program方法会对每个模块进行AST语法的解析分析，我们可以在执行函数内部利用外部参数'parser'获取大量所需参数对各个模块的运行结果分析判断。需要注意的是，webpack的函数解析使用acorn引擎，babel的babylon基于其做了部分完善与扩充，显示的AST语法树更为全面。