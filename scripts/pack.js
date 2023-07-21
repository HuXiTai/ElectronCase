const path = require("path");
const electronPackager = require("electron-packager");
const { zip } = require("zip-a-folder");
const del = require("del");
const ncp = require("ncp").ncp;

// 2.5 调整zeromq的预编译文件
function addPrebuilds(platform, arch) {
  const sourcePath =
    path.dirname(__dirname) +
    "/assets/zeromq/prebuilds/" +
    platform +
    "-" +
    arch;
  const targetPath =
    path.dirname(__dirname) +
    "/out/source/node_modules/zeromq/prebuilds/" +
    platform +
    "-" +
    arch;
  return new Promise((res, rej) => {
    ncp(sourcePath, targetPath, (err) => {
      if (err) {
        rej(err);
      }
      res();
    });
  });
}

function deletePrebuilds() {
  const res = del.sync(
    [
      "out/source/node_modules/zeromq/prebuilds/*",
      "!out/source/node_modules/zeromq/prebuilds/",
    ],
    {
      force: true,
    }
  );
}

function addLibstdc(platform, arch) {
  const pkg = require("../out/source/package.json");
  const sourcePath =
    path.dirname(__dirname) + `/assets/libstdc/${platform}-${arch}-lib/`;
  const targetPath =
    path.dirname(__dirname) +
    `/out/build/${pkg.productName}-${platform}-${arch}/`;
  return new Promise((res, rej) => {
    ncp(sourcePath, targetPath, (err) => {
      if (
        err &&
        !(platform === "win32" && err[0] && err[0].code === "ENOENT")
      ) {
        // 如果目录不存在，且系统是windows，则允许打包成功
        return rej(err);
      }
      res();
    });
  });
}

module.exports.packFunctions = function (arr) {
  const electronMirror =
    "http://192.168.8.226:8081/repository/mirrors/electron/";
  const res = {};
  arr.forEach((i) => {
    res[i.name] = async function (cb) {
      const platform = i.name.split("_")[1];
      const arch = i.name.split("_")[2];

      // 打包前删除,添加，perbuilds
      // await deletePrebuilds()
      // await addPrebuilds(platform, arch)
      // 执行打包
      try {
        const icon = path.join(__dirname, "../packages/node/icon.png");
        await electronPackager({
          dir: "./out/source",
          out: "./out/build",
          icon,
          overwrite: true,
          arch,
          platform,
          electronVersion: i.version,
          download: {
            mirrorOptions: {
              mirror: electronMirror,
            },
          },
          // electronZipDir
        });
        // 添加libstdc 到项目根目录
        // await addLibstdc(platform, arch)
        const pkg = require("../out/source/package.json");

        const folder =
          path.dirname(__dirname) +
          `/out/build/${new Date().toLocaleDateString()}-${
            pkg.productName
          }-${platform}-${arch}/`;
        const zipPath =
          path.dirname(__dirname) +
          `/out/build/${new Date().toLocaleDateString()}-${
            pkg.productName
          }-${platform}-${arch}.zip`;
        // 将文件打包成压缩包
        await zip(folder, zipPath);
        cb();
      } catch (error) {
        console.log("Error:electronPackager -> ", error);
      }
    };
  });
  return res;
};
