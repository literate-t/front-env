const path = require('path');
const webpack = require('webpack');
const childProcess = require('child_process');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const apiMocker = require('connect-api-mocker');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const mode = process.env.NODE_ENV || 'development';

module.exports = {
  mode,
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
        use: [
          process.env.NODE_ENV === 'production'
            ? MiniCssExtractPlugin.loader
            : 'style-loader',
          'css-loader',
        ], // 실행 순서는 역순
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
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    // new MyWebpackPlugin(),
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
    new HtmlWebpackPlugin({
      template: './src/index.html',
      templateParameters: {
        env: process.env.NODE_ENV === 'development' ? '(개발용)' : '',
      },
      minify:
        process.env.NODE_ENV === 'production'
          ? {
              collapseWhitespace: true,
              removeComments: true,
            }
          : false,
    }),
    new CleanWebpackPlugin(),
    ...(process.env.NODE_ENV === 'production'
      ? [new MiniCssExtractPlugin({ filename: '[name].css' })] // 이렇게 처리 안 하면 hash 값이 들어감
      : []), // 개발환경에선 굳이 안 해도 됨
  ],
  optimization: {
    minimizer: [
      // `...`,
      new CssMinimizerPlugin(),
      new TerserPlugin(),
    ],
  },
  devServer: {
    setupMiddlewares: (middleware, devServer) => {
      if (!devServer) {
        throw new Error('webpack-dev-server is not define');
      }
      // mockup data 넣기
      devServer.app.use(apiMocker('/api', 'mocks/api'));
      // devServer.app.get('/api/users', (req, res) => {

      // });
      return middleware;
    },
    client: {
      overlay: true,
      logging: 'error',
      progress: true,
    },
    // api 서버가 포트가 다른 경우 CORS가 되도록 프록시를 해야함
    // proxy: {
    //   '/api': 'http://localhost:8081',
    // },
    compress: true,
  },
};
