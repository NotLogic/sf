const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const resolve = dir => {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '/admin/',
  outputDir: 'dist', // 打包生成的生产环境构建文件的目录
  assetsDir: '', // 放置生成的静态资源路径，默认在outputDir
  indexPath: 'index.html', // 指定生成的 index.html 输入路径，默认outputDir
  pages: undefined, // 构建多页
  productionSourceMap: false, // 开启 生产环境的 source map?
  chainWebpack: config => {
    // config.optimization.minimize(true)
    config.optimization.splitChunks({
      chunks: 'all'
    })
    // 配置路径别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_c', resolve('src/components'))
  },
  css: {
    extract: true,
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/css/global.scss";`
      }
    }
  },
  devServer: {
    port: 8085 // 端口
  },
  configureWebpack: {
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              drop_console: false,//console
              drop_debugger: false,
              pure_funcs: ['console.log']//移除console
            }
          }
        })
      ]
    }
  }
}
