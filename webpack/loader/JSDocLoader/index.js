/* eslint-disable */
var loaderUtils = require('loader-utils');
var jsdocmd = require('jsdoc-to-markdown');

var totalSource = '';
var projectPath = process.cwd();
var defaultOptions = {
  fileName: 'JSDoc'
}
module.exports = function (source) {
  var options = Object.assign({}, defaultOptions, loaderUtils.getOptions(this))
  var self = this;
  var callback = this.async();
  var fileName = options.fileName + '.md';
  jsdocmd.render({ source: source }).then(function (jsdoc) {
    if (jsdoc) {
      var relativePath = self.resourcePath.replace(projectPath, '')
      var resource = '> ' + relativePath + '\n\n';
      totalSource += (resource + jsdoc);
      self.emitFile(fileName, totalSource);
    }
    callback(null, source);
  }, function () {
    callback(null, source);
  });
}
