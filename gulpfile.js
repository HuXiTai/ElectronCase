const { series, parallel } = require("gulp");

const {
  cleanNode,
  cleanWeb,
  cleanOut,
  cleanTypes,
} = require("./scripts/clean");

const { nodeBuild, webBuild, typesBuild } = require("./scripts/build");

const { nodeMerge, webMerge, typesMerge } = require("./scripts/merge");

const { install } = require("./scripts/install");

const os = require("os");

const platformInfo = [
  {
    name: "pack_win32_x64",
    version: "10.1.0",
  },
  {
    name: "pack_linux_x64",
    version: "10.1.0",
  },
  {
    name: "pack_linux_mips64el",
    version: "10.1.0",
  },
  {
    name: "pack_linux_arm64",
    version: "12.0.2",
  },
];

const packFuncList = require("./scripts/pack").packFunctions(platformInfo);

platformInfo.forEach((i) => {
  exports[i.name] = packFuncList[i.name];
});

exports.cleanWeb = cleanWeb;
exports.cleanNode = cleanNode;
exports.cleanOut = cleanOut;
exports.cleanTypes = cleanTypes;
exports.clean = parallel(cleanWeb, cleanNode, cleanOut, cleanTypes);

exports.nodeBuild = nodeBuild;
exports.webBuild = webBuild;
exports.typesBuild = typesBuild;
exports.build = parallel(typesBuild, nodeBuild, webBuild);

exports.nodeMerge = nodeMerge;
exports.webMerge = webMerge;
exports.typesMerge = typesMerge; // 安装完成后再安装内部依赖
exports.merge = parallel(nodeMerge, webMerge);

exports.install = install;

// 打包所有平台的项目以及压缩包
exports.default = async (cb) => {
  const list = [];
  platformInfo.forEach((i) => {
    list.push(exports[i.name]);
  });
  await series(
    exports.clean,
    exports.build,
    exports.merge,
    exports.install,
    typesMerge,
    ...list
  )();
  cb();
};

// 打包当前平台的项目以及压缩包
exports.pack = (cb) => {
  const currentName = `pack_${os.platform}_${os.arch}`;
  if (exports[currentName]) {
    series(
      exports.clean,
      exports.build,
      exports.merge,
      exports.install,
      typesMerge,
      exports[currentName]
    )();
  } else {
    console.log("打包平台不存在");
  }
  cb();
};
