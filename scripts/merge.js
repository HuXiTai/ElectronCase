const path = require("path");

const fs = require("fs");

const ncp = require("ncp").ncp;

ncp.limit = 16;

// 如果没有out文件夹，创建out文件夹
const outPath = path.join(__dirname, "../out");
try {
  fs.accessSync(outPath, fs.constants.R_OK | fs.constants.W_OK);
} catch (err) {
  fs.mkdirSync(outPath);
  console.error("no access!");
}

async function nodeMerge() {
  const source = path.dirname(__dirname) + "/packages/node/dist";
  const destination = path.dirname(__dirname) + "/out/source";

  // 复制 /node/dist 到 /out/source
  return new Promise((res, rej) => {
    ncp(source, destination, (err) => {
      if (err) {
        return rej(err);
      }
      res();
    });
  });
}

async function webMerge() {
  const source = path.dirname(__dirname) + "/packages/web/dist";
  const destination = path.dirname(__dirname) + "/out/source/web";

  // 复制 /web/dist 到 /out/source/web
  return new Promise((res, rej) => {
    ncp(source, destination, (err) => {
      if (err) {
        return rej(err);
      }
      res();
    });
  });
}

async function typesMerge() {
  const source = path.dirname(__dirname) + "/packages/types/dist";
  const destination =
    path.dirname(__dirname) + "/out/source/node_modules/types";

  // 复制 /components/types/dist 到 /out/source/node_modules
  return new Promise((res, rej) => {
    ncp(source, destination, (err) => {
      if (err) {
        return rej(err);
      }
      res();
    });
  });
}

module.exports = {
  nodeMerge,
  webMerge,
  typesMerge,
};
