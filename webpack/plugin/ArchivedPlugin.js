/* eslint-disable */
// This plugin is used to archive the former dist files with date time
const fs = require('fs');
const path = require('path');
const moment = require('moment');

class ArchivedPlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    compiler.plugin('emit', function (compilation, callback) {
      const archivedName = this.options.archivedPath || 'Archived';
      const outputPath = compiler.outputPath;
      const archivedPath = path.join(outputPath, archivedName);
      if (!fs.existsSync(archivedPath)) {
        fs.mkdirSync(archivedPath)
      }
      const flagPath = path.join(archivedPath, moment().format('YYYYMMDDHHmmss'));
      fs.mkdirSync(flagPath);

      const files = fs.readdirSync(outputPath);
      const assetsFiles = files.filter(value => (value !== archivedName));
      assetsFiles.forEach((filePath) => {
        fs.renameSync(path.join(outputPath, filePath), path.join(flagPath, filePath));
      });
      callback();
    })
  }
}
module.exports = ArchivedPlugin;