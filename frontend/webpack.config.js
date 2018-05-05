const path = require( 'path' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );

const src = path.resolve( __dirname, './src' );
const dist = path.resolve( __dirname, './dist' );

module.exports = {
  entry: src + '/index.js',
  output: {
    filename: 'bundle.js',
    path: dist,
    publicPath: '/',
  },
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
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
  ],
  resolve: {
    extensions: ['.js'],
    modules: [src, 'node_modules'],
  },
  devServer: {
    port: process.env.PORT || 3000,
    contentBase: dist,
    historyApiFallback: true,
  },
};
