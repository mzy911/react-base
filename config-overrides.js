const { override } = require('customize-cra');
const path = require("path")

// 打包配置
const addCustomize = () => config => {
  config.resolve.alias = {
    "@": path.resolve(__dirname, "./src")
  }
  return config;
}

// 自定义、扩展 webpack 配置
// 1、先安装 react-app-rewired customize-cra
// 2、创建 config-overrides.js 
// 3、修改 "scripts"："start": "react-app-rewired start"、"build": "react-app-rewired build"、"eject": "react-scripts eject"
module.exports = {
  webpack: override(
    addCustomize()
  )
};