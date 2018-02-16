module.exports = {
  entry : './src/index.tsx',
  watch : true,
  output : {
    filename : 'bundle.js',
    path : __dirname + '/dist'
  },
  resolve : {
    extensions : ['.js','.ts','.tsx','.json','*']
  },
  module : {
    rules : [
      {
        test : /\.tsx?$/,
        loader : 'awesome-typescript-loader'
      },
      {
        enforce : 'pre',
        test : /\.js$/,
        loader : 'source-map-loader'
      }
    ]
  },
  devServer:{
    contentBase: __dirname + '/dist'
  }
}