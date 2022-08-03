const path = require('path');
const webpack = require('webpack');
const childProcess = require('child_process');

const MyWebpackPlugin = require('./my-webpack-plugin');
module.exports = {
  mode: 'development',
  entry: {
    main: './src/app.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js', // 동적으로 entry의 키값을 가져온다
    assetModuleFilename: '[name].[ext]?[hash]',
  },
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   use: [path.resolve('./my-webpack-loader.js')],
      // },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // 실행 순서는 역순
      },
      {
        test: /\.(jpg|png)/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024,
          },
        },
      },
      // {
      //   test: /\.(jpg|png)/,
      //   type: 'asset/inline',
      // },
      // {
      //   test: /\.(jpg|png)/,
      //   type: 'asset/resource',
      //   generator: {
      //     publicPath: './dist/',
      //   },
      // },
    ],
  },
  plugins: [
    new MyWebpackPlugin(),
    new webpack.BannerPlugin({
      banner: `
    BuildDate:${new Date().toLocaleString()}
    Commit Version: ${childProcess.execSync('git rev-parse --short HEAD')}
    User Name: ${childProcess.execSync('git config user.name')}
    `,
    }),
    new webpack.DefinePlugin({
      TWO: '1+1',
      two: JSON.stringify('1+1'),
      'api.domain': JSON.stringify('http://dev.api.domain.com'),
    }),
  ],
};
