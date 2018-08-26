const path = require('path')
const extractTextPlugin = require('extract-text-webpack-plugin')
const extractCss = new extractTextPlugin({
  filename : 'react-infinite-calendar_style.css'
})

module.exports = {
  entry : './src/index.tsx',
  watch : true,
  output : {
    filename : 'bundle.js',
    path : __dirname + '/dist'
  },
  resolve : {
    extensions : ['.css','.js','.ts','.tsx','.json','*']
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
      },
      {
        test : /\.css$/,
        use : extractCss.extract({
          use :[
            {
              loader : 'style-loader'
            },
            {
              loader : 'css-loader'
            }
          ]
        })
      }
    ]
  },
  plugins : [ extractCss ],
  devServer:{
    contentBase: __dirname + '/dist'
  }
}