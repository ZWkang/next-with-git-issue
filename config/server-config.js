module.exports = {
  beforeReplacePath: "detail",
  detailPrefix: "/post",
  githubToken: "",
  githubOwnner: "ZWkang",
  githubProjectName: "Start-Learning-React",
  githubEndPoint: "https://api.github.com/graphql",
  markdownCache: "",
  userName: "ZWKang",
  issue: {
    owner: "ZWkang",
    name: "Start-Learning-React",
    maxLabels: 10
  },
  states: [
    function(dataSource) {
      return dataSource.filter(({ state }) => {
        return state === "OPEN";
      });
    }
  ],
  labels: [
    function(dataSource) {
      return dataSource.filter(({ labels, title }) => {
        return true;
      });
    }
  ]
};
