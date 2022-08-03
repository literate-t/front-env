const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/app.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js', // 동적으로 entry의 키값을 가져온다
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [path.resolve('./my-webpack-loader.js')],
      },
    ],
  },
};
