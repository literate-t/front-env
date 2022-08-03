const path = require('path');
const fs = require('fs');
const getFilesizeInBytes = (filename) => {
  const stats = fs.statSync(filename);
  const fileSizeInBytes = stats.size;
  return fileSizeInBytes;
};
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
};
