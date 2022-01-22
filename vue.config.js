const path = require('path')
const resolve = dir => path.join(__dirname, dir)

module.exports = {
  publicPath: './',
  outputDir: 'dist',
  chainWebpack: config => {
    // 添加别名
    config.resolve.alias
        .set("@", resolve("src"))
        .set("assets", resolve("src/assets"))
        .set("components", resolve("src/components"))
        .set("layout", resolve("src/layout"))
        .set("router", resolve("src/router"))
        .set("store", resolve("src/store"))
        .set("utils", resolve("src/utils"))
        .set("views", resolve("src/views"));
  }
}
