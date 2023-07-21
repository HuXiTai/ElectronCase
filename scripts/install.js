const fs = require("fs");
const path = require("path");
const { copyFileSync } = require("fs");
const { execSync } = require("child_process");

const { series } = require("gulp");
const del = require("del");

// 1. 删除pakcage.json的开发依赖
async function write(cb) {
  // 删除开发依赖
  const pkg = require("../out/source/package.json");
  delete pkg.devDependencies;
  // 修改pakcage.json
  pkg.main = "./src/index.js";
  pkg.name = "ElectronCase";
  pkg.productName = "ElectronCase";
  pkg.icon = "./assets/icon.png";
  const jsonStr = JSON.stringify(pkg, null, 4);
  try {
    // 重新复制pakcage.json
    fs.writeFileSync(
      path.join(__dirname, "../out/source/package.json"),
      jsonStr
    );
    cb();
  } catch (error) {
    throw new Error(error);
  }
}

// 2. 重新安装对应平台的项目
function sourceInstall(cb) {
  // 复制 npmrc 到 source
  let source = path.join(__dirname, "../.npmrc");
  let destination = path.join(__dirname, "../out/source/.npmrc");
  copyFileSync(source, destination);
  // 复制 .yarnrc 到 source
  source = path.join(__dirname, "../.yarnrc");
  destination = path.join(__dirname, "../out/source/.yarnrc");
  copyFileSync(source, destination);

  return new Promise((res, rej) => {
    execSync(
      "npm i",
      {
        cwd: path.join(__dirname, "../out/source/"),
      },
      (err, stdout, stderr) => {
        console.log(stdout);
        console.error(stderr);
        if (err) {
          console.error(err);
          return;
        }
      }
    );
    cb();
  });
}

// 3. 删除一些不需要的文件，轻量化
function minify(cb) {
  try {
    const res = del.sync(
      [
        "out/source/.npmrc", // 6.删除npm、yarn配置文件
        "out/source/.yarnrc", // 6.删除npm、yarn配置文件
        "out/source/node_modules/.bin", // 5.删除无用的bin目录
        "out/source/node_modules/zeromq/src", // 5.删除zmq多余的源码
        "out/source/node_modules/zeromq/script",
        "out/source/node_modules/zeromq/vendor",
        "out/source/node_modules/**/*.md", // 3.删除所有的.md文件
        "out/source/node_modules/**/*.ts", // 4.删除所有的ts文件
        "out/source/node_modules/**/*.jpg", // 4.删除所有的jpg文件
        "out/source/node_modules/**/*.gyp", // 4.删除所有的gyp文件
        "out/source/node_modules/**/.github", // 4.删除所有的github文件夹
        "out/source/node_modules/**/*.php", // 4.删除所有的php文件
      ],
      {
        force: true,
      }
    );
    cb();
  } catch (error) {
    console.log("精简程序失败");
  }
}

// 4. 写入被删除的开发以来
async function writePkg(cb) {
  // 添加开发依赖
  const pkg = require("../out/source/package.json");
  pkg.dependencies.types = "1.0.0";

  const jsonStr = JSON.stringify(pkg, null, 4);
  try {
    // 重新复制pakcage.json
    fs.writeFileSync(
      path.join(__dirname, "../out/source/package.json"),
      jsonStr
    );
    cb();
  } catch (error) {
    throw new Error(error);
  }
}
exports.install = series(write, sourceInstall, writePkg, minify);
