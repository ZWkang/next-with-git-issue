module.exports = {
  beforeReplacePath: "detail",
  detailPrefix: "/post",
  githubToken: "e035574fe9fb60811a2951898d5c8f2c3c852b6d",
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
