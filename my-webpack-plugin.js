class MyWebpackPlugin {
  apply(compiler) {
    // compiler.hooks.done.tap('Hello My Webpack Plugin', (stats) => {
    //   console.log('MyPlugin: Done!');
    // });
    // compiler.hooks.beforeCompile.tapAsync('MyPlugin', (params, callback) => {
    //     params['MyPlugin - data'] = 'important stuff my plugin will use later';
    //     callback();
    //   });
    // compiler.hooks.emit.tapAsync('MyWebpackPlugin', (compilation, callback) => {
    //   const source = compilation.assets['main.js'];
    //   console.log(typeof source, source);
    //   callback();
    // });
  }
}

module.exports = MyWebpackPlugin;
