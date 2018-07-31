/* eslint-disable */
class JSDocPlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    var ASTNode = '';
    compiler.plugin("compilation", function (compilation, data) {
      data.normalModuleFactory.plugin("parser", function (parser, options) {
        parser.plugin('program', function (expr, comments) {
          var filePath = parser.state.current && parser.state.current.resource || ''
          if (filePath.indexOf('src') !== -1) {
            ASTNode += (JSON.stringify(expr) + '\n\n');
            comments.length && (ASTNode += (JSON.stringify(comments) + '\n\n'));
          }
        });
      });
    });
    compiler.plugin('emit', function (compilation, callback) {
      compilation.assets['ASTNode.json'] = {
        source: function () {
          return ASTNode;
        },
        size: function () {
          return ASTNode.length;
        }
      };
      callback();
    });
  }
}
module.exports = JSDocPlugin;
