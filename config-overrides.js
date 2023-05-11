const { override } = require('customize-cra');
const path = require("path")

// 打包配置
const addCustomize = () => config => {
  config.resolve.alias = {
    "@": path.resolve(__dirname, "./src")
  }
  return config;
}

// 覆盖、扩展 webpack 配置
module.exports = {
  webpack: override(
    addCustomize()
  )
};