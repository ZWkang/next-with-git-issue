const fs = require("fs");
const util = require("util");
const path = require("path");

const { beforeReplacePath, detailPrefix } = require("../config/server-config");
const rename = util.promisify(fs.rename);

const lstat = util.promisify(fs.lstat);
const readdir = util.promisify(fs.readdir);

function checkPathIsDir(pagesEntry) {
  return async item => {
    const itemStat = await lstat(path.join(pagesEntry, item));
    let isDir = await itemStat.isDirectory();
    return {
      name: item,
      isDir: isDir
    };
  };
}

(async function renameFolder() {
  const pagesEntry = path.resolve(__dirname, "..", "pages");
  let pagesPoints = await readdir(pagesEntry);
  let promiseChain = await Promise.all(
    pagesPoints.map(checkPathIsDir(pagesEntry))
  );
  let getDirPath = promiseChain.filter(_ => _.isDir);
  for (let index = 0; index < getDirPath.length; index++) {
    if (
      beforeReplacePath === getDirPath[index].name &&
      "/" + beforeReplacePath !== detailPrefix
    ) {
      await rename(
        path.join(pagesEntry, beforeReplacePath),
        path.join(pagesEntry, detailPrefix.replace("/", ""))
      );
      break;
    }
  }
})();
