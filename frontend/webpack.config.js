const path = require( 'path' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );

const src = path.resolve( __dirname, './src' );
const dist = path.resolve( __dirname, './dist' );

module.exports = {
  entry: `${src}/index.js`,
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
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              ['react-css-modules', {
                exclude: 'node_modules',
                context: src,
              }],
            ],
          },
        },
        exclude: path.resolve( __dirname, 'node_modules' ),
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader?importLoader=1&modules&localIdentName=[path]___[name]__[local]___[hash:base64:5]' },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
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
