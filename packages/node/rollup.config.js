import typescript from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";

import externalGlobals from "rollup-plugin-external-globals";

export default {
  input: "src/index.ts", // 入口点
  output: [
    {
      file: "dist/src/index.js", // 输出点
      name: "test", // 生成包的名称
      format: "iife", // 打包为自调用函数
      inlineDynamicImports: true, // 使用按需加载
      banner: `
        const electron = require("electron");
      `, // 自调用函数前加的代码
    },
  ],
  plugins: [
    // uglify(), // 丑化打包后的文件内容
    json(), // json文件转换ES的插件
    typescript({
      useTsconfigDeclarationDir: true, // 默认声明文件放到一个文件夹中
    }),
    commonjs(), // commonjs转换ES的插件
    resolve({
      resolveOnly: ["types"], // 忽略types文件
    }),
    externalGlobals({
      // 如果没找到key则替换成value
      os: "require('os')",
      child_process: "require('child_process')",
      process: "require('process')",
      path: "require('path')",
      fs: "require('fs')",
    }),
  ],
};
