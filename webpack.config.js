export default {
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        /* resolve: {
          fullySpecified: false
        }, */
        options: {
          presets: ['@babel/preset-react']
        }
      }
    ]
  }
};
