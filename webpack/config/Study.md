### webpack 问题汇总
1.  splitChunks 取代 CommonsChunkPlugin 后，导致经过作用后的chunk，使用output定义的chunkFilename。
2.  下述代码完成对entry定义的库依赖文件的重命名及打包，且可以重新定义filename是hash无效，避免频繁对稳定的依赖文件多次打包。splitChunks暂时未能寻找有效方法替换。
    ```
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      filename: 'vendors.js',
      minChunks: Infinity,
    }),
    ```
