# 简介
1. 一个集成vue3+ts+electron的桌面端框架
2. 使用`使用workspaces`的方式去管理项目

# 目录
## 2.主项目结构
```
#
├─.vscode
|   ├─extensions.json   // 推荐当前项目使用的插件
|   └─esetting.json     // vscode编辑器和插件的相关配置
├─assets                // electron跨平台的包
├─doc                   // 项目文档
├─out                   // 打包输出目录
├─packages              // 项目目录
|   ├─node              // node子项目
|   ├─web               // web子项目
|   ├─sqlite3           // sqlite3子项目，本地数据库的依赖
|   └─types             // types子项目，前后端公用的api，TS类型定义文件项目
├─script                // 项目开发调试打包与构建脚本存放目录
├─.editorconfig         // 编辑器配置文件 配合editor插件使用
├─package.json          // 主配置依赖文件如果有子项目共用插件可以安装在根目录安装
├─.gitignore        
├─.npmrc                // npm镜像地址配置文件
├─.yarnrc               // yarn镜像地址配置文件
├─.installPack.js       // 打包项目安装包的脚本
└─.gulpfile.js          // gulp主线程