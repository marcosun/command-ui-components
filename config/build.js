const execSync = require('child_process').execSync;

const exec = (command, extraEnv) => {
  execSync(command, {
    stdio: 'inherit',
    env: Object.assign({}, process.env, extraEnv),
  });
};

console.log('Clean release directories');

exec('rm -rf cjs es');

console.log('Building CommonJS modules ...');

exec('babel src -d cjs --ignore test.js', {
  BABEL_ENV: 'cjs',
  NODE_ENV: 'production',
});

console.log('\nBuilding ES modules ...');

exec('babel src -d es --ignore test.js', {
  BABEL_ENV: 'es',
  NODE_ENV: 'production',
});
