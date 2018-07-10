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