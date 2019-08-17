/**
 * 1/ 下载issue
 * 2/ 生成md文件本地保存
 * 3/ next 动态路由生成
 * 4/ 发布即可
 */

const IssueRequest = require("./issueRequest");
const resolveYamlAndMarkdown = require("./resolvePageData");

const {
  githubEndPoint,
  githubToken,
  detailPrefix
} = require("../config/server-config");
const fs = require("fs");
const path = require("path");
const util = require("util");

const WriteFile = util.promisify(fs.writeFile);

async function handleRequestCallback(resolveList) {
  const finalJSON = resolveList
    .map(item => {
      return resolveYamlAndMarkdown(item, {
        pagePrefix: detailPrefix,
        preview: 120
      });
    })
    .reduce((prev, next) => {
      const { body, databaseId } = next;
      return {
        [databaseId]: next,
        ...prev
      };
    }, {});
  const fileDest = path.resolve(__dirname, "..", "issue.json");
  return new Promise(async (resolve, reject) => {
    try {
      const jsonString = JSON.stringify(finalJSON);
      await WriteFile(fileDest, jsonString);
      resolve("success create file in " + fileDest);
    } catch (e) {
      reject(e);
    }
  });
}

(async () => {
  try {
    const allIssuesData = await IssueRequest({
      githubToken: githubToken,
      endPointer: githubEndPoint
    });
    const resultChain = await handleRequestCallback(allIssuesData);
    console.log(resultChain);
  } catch (reason) {
    console.warn(reason.message);
  }
})();
