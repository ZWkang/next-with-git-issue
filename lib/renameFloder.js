const fs = require("fs");
const util = require("util");
const path = require("path");

const { beforeReplacePath, detailPrefix } = require("../config/server-config");
const rename = util.promisify(fs.rename);

const lstat = util.promisify(fs.lstat);
const readdir = util.promisify(fs.readdir);
// const

console.log();

function checkPathIsDir(pagesEntry) {
  return async item => {
    const itemStat = await lstat(path.join(pagesEntry, item));
    let isDir = await itemStat.isDirectory();
    // return false;
    return {
      name: item,
      isDir: isDir
    };
  };
}

(async function renameFloder() {
  const pagesEntry = path.resolve(__dirname, "..", "pages");
  let pagesPoints = await readdir(pagesEntry);
  let promiseChain = await Promise.all(
    pagesPoints.map(checkPathIsDir(pagesEntry))
  );
  //   let promiseChain = pagesPoints.filter(checkPathIsDir(pagesEntry));
  //   console.log(promiseChain);
  let getDirPath = promiseChain.filter(_ => _.isDir);
  //   console.log(getDirPath);

  //   if ("/" + beforeReplacePath !== detailPrefix) {
  //     await rename(path.join(pagesEntry, ));
  //   }
  for (let index = 0; index < getDirPath.length; index++) {
    console.log(getDirPath[index].name, beforeReplacePath, detailPrefix);
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
