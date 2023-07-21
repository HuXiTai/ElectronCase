const del = require("del");

function cleanNode(cb) {
  const res = del.sync(['packages/node/dist/*', '!packages/node/dist/'], {
    force: true
  });
  cb();
}

function cleanWeb(cb) {
  const res = del.sync(['packages/web/dist/*', '!packages/web/dist/'], {
    force: true
  });
  cb();
}

function cleanTypes(cb) {
  const res = del.sync(['packages/types/dist/*', '!packages/types/dist/'], {
    force: true
  });
  cb();
}

function cleanOut(cb) {
  try {
    const res = del.sync(['out/*', '!out/'], {
      force: true
    })
    cb();
  } catch (error) {
    console.log('./out/，目录删除失败');
  }
}

module.exports = {
  cleanNode,
  cleanWeb,
  cleanTypes,
  cleanOut
}