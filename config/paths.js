const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

/**
 * Relative paths to be used in webpack config files
 */
module.exports = {
  appPath: resolveApp('.'),
  appDist: resolveApp('dist'),
  appSrc: resolveApp('demo'),
  appConfig: resolveApp('config'),
  appIndexJs: resolveApp('demo/index.js'),
  appPackageJson: resolveApp('package.json'),
  commandUiComponents: resolveApp('cjs'),
};
