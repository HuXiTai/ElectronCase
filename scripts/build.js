const { execSync } = require("child_process");

const path = require("path");
const del = require("del");
const ncp = require("ncp").ncp;

ncp.limit = 16;

function typesBuild(cb) {
  execSync(
    "npx tsc -d",
    {
      cwd: path.join(__dirname, "../packages/types"),
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
}

function nodeBuild(cb) {
  // 1:删除dist文件
  try {
    del.sync(["packages/node/dist/*", "!packages/node/dist/"], {
      force: true,
    });
  } catch (error) {
    console.log("./packages/node/dist/，目录删除失败");
  }

  // 2:源码rollup打包压缩
  execSync(
    "npx rollup -c && npx tsc .\\src\\preload\\index.ts",
    {
      cwd: path.join(__dirname, "../packages/node"),
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

  // 3.1:复制 package.json 到 dist
  let source = path.join(__dirname, "../packages/node/package.json");
  let destination = path.join(__dirname, "../packages/node/dist/package.json");
  ncp(source, destination, (err) => {
    if (err) {
      return console.log(err);
    }
  });

  // 3.3:复制 preload/index.js 到 dist
  source = path.join(__dirname, "../packages/node/src/preload/index.js");
  destination = path.join(__dirname, "../packages/node/dist/preload.js");
  ncp(source, destination, (err) => {
    if (err) {
      return console.log(err);
    }
  });

  // 3.4:复制 icon.png 到 dist
  source = path.join(__dirname, "../packages/node/src/assets");
  destination = path.join(__dirname, "../packages/node/dist/assets");
  ncp(source, destination, (err) => {
    if (err) {
      return console.log(err);
    }
  });

  cb();
}

function webBuild(cb) {
  execSync(
    "npx vue-tsc --noEmit && npx vite build",
    {
      cwd: path.join(__dirname, "../packages/web"),
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
}

module.exports = {
  webBuild,
  nodeBuild,
  typesBuild,
};
