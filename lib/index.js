/**
 * 1/ 下载issue
 * 2/ 生成md文件本地保存
 * 3/ next 动态路由生成
 * 4/ 发布即可
 */

const IssueRequest = require("./issueRequest");
// const { githubEndPoint, githubToken } = require("./config");
const resolveYamlAndMarkdown = require("./resolvePageData");

const {
  githubEndPoint,
  githubToken,
  detailPrefix
} = require("../config/server-config");
const fs = require("fs");
const path = require("path");

IssueRequest({ githubToken: githubToken, endPointer: githubEndPoint }).then(
  handleRequestCallback
);
function handleRequestCallback(resolveList) {
  const finalJSON = resolveList
    .map(item => {
      return resolveYamlAndMarkdown(item, {
        pagePrefix: detailPrefix,
        preview: 120
      });
    })
    .reduce((prev, next) => {
      const { body, databaseId } = next;
      // prev[databaseId] = next;
      return {
        ...prev,
        [databaseId]: next
      };
    }, {});
  const fileDest = path.resolve(__dirname, "..", "issue.json");
  fs.writeFile(fileDest, JSON.stringify(finalJSON), (err, data) => {
    if (err) {
      throw err;
    }
    // console.log(data);
  });
}
