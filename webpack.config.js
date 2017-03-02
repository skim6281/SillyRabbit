module.exports = {
  entry: "./lib/silly_rabbit.js",
  output: {
    filename: "./bundle.js"
  },
  module: {
   loaders: [
     {
       test: [/\.js?$/],
       exclude: /(node_modules)/,
       loader: 'babel-loader',
       query: {
         presets: ['es2015']
       }
     }
   ]
 },
  devtool: 'source-map',
  resolve: {
    extensions: [".js"]
  }
};
