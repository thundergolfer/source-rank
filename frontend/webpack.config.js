const path = require( 'path' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );

const src = path.resolve( __dirname, './src' );

module.exports = {
  entry: src + '/index.js',
  context: src,
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: path.resolve( __dirname, 'node_modules' ),
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
  ]
};
