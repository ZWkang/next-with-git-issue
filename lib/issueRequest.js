const { GraphQLClient } = require("graphql-request");
const { ISSUE_TEMPLATE, ISSUE_TOTAL } = require("./issue.js");
const registerSort = require("./sortModel.js");
const { states, labels } = require("../config/server-config");

const sortModelIns = new registerSort();

states.forEach(stateCallback => {
  sortModelIns.add("state", stateCallback);
});
labels.forEach(labelCallback => {
  sortModelIns.add("labels", labelCallback);
});

function IssueRequest({ githubToken, endPointer }) {
  return new Promise(async (resolve, reject) => {
    try {
      const client = new GraphQLClient(endPointer, {
        headers: {
          Authorization: `bearer ${githubToken}`
        }
      });
      const totalRequestData = await client.request(ISSUE_TOTAL);
      const {
        repository: {
          issues: { totalCount }
        }
      } = totalRequestData;

      const allPageData = await client.request(ISSUE_TEMPLATE, {
        first: totalCount
      });
      let {
        repository: {
          issues: { nodes }
        }
      } = allPageData;
      nodes = nodes.reduce((prev, next) => {
        const {
          author: { login },
          labels: { nodes = [] }
        } = next;

        prev.push({
          ...next,
          author: login,
          labels: nodes
        });
        return prev;
      }, []);
      // 注册过滤器
      nodes = sortModelIns.emit("state", nodes);
      nodes = sortModelIns.emit("labels", nodes);
      resolve(nodes);
    } catch (reason) {
      reject(reason);
    }
  });
}

module.exports = IssueRequest;
