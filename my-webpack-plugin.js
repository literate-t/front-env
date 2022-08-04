const childProcess = require('child_process');

class MyWebpackPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap('MyWebpackPlugin', (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: 'MyWebpackPlugin',
          stage: compilation.PROCESS_ASSETS_STAGE_ADDITIONS,
        },
        (assets) => {
          const source = assets['main.js'].source();
          assets['main.js'].source = () => {
            const myBanner = [
              '/**',
              ' * This is tae banner',
              ` * ${childProcess.execSync('git config user.name')}`,
              ' */',
            ].join('\n');

            return myBanner + '\n\n' + source;
          };
          // //assets['main.js'] = myBanner + '\n\n' + source;
          // const source2 = assets['main.js'].source();
          // console.log(source2);

          //   console.log('List of assets and their sizes:');
          //   Object.entries(assets).forEach(([pathname, source]) => {
          //     console.log(`— ${pathname}: ${source.size()} bytes`);
          //   });
        }
      );
    });
    // compiler.hooks.done.tap('Hello My Webpack Plugin', (stats) => {
    //   console.log('MyPlugin: Done!');
    // });
    // compiler.hooks.beforeCompile.tapAsync('MyPlugin', (params, callback) => {
    //     params['MyPlugin - data'] = 'important stuff my plugin will use later';
    //     callback();
    //   });
    // compiler.hooks.emit.tapAsync('MyWebpackPlugin', (compilation, callback) => {
    //   compilation.hooks.processAssets.tap(
    //     {
    //       name: 'MyWebpackPlugin',
    //       stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONS,
    //     },
    //     () => {
    //       console.log('aaaaaaaaaaaaaaaaa');
    //       // const sources = compilation.compiler.webpack.sources;
    //       // const content = 'This is banner';
    //       // compilation.emitAsset(this.filename, sources.RawSource(content));
    //     }
    //   );

    //   callback();
    // });
  }
}

module.exports = MyWebpackPlugin;
