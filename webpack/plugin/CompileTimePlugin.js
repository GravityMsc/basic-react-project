/* eslint-disable */
class CompileTimePlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    let startTime = 0;
    let endTime = 0;
    // migrate webpack v3 api
    compiler.plugin('compile', () => {
      startTime = new Date().getTime();
    });
    compiler.plugin('done', () => {
      endTime = new Date().getTime();
      console.log(`编译用时：${endTime - startTime}ms`);
    });
    // migrate v4 api
    // compiler.hooks.tap('beforeRun',() => {
    //   startTime = new Date().getTime();
    // });
    // compiler.hooks.tap('done',() => {
    //   endTime = new Date().getTime();
    //   console.log(`编译用时：${endTime-startTime}ms`);
    // });
  }
}
module.exports = CompileTimePlugin;
