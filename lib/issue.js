// , $owner: String, $name: String

const {
  issue: { owner, name, maxLabels = 10 }
} = require("../config/server-config");

const ISSUE_TEMPLATE = `
query($cursor: String, $first: Int){ 
	repository(owner:"${owner}", name: "${name}") {
    issues(orderBy: {
      direction: DESC,
      field: CREATED_AT
    }, first:$first, after: $cursor){
      totalCount,
      
      nodes {
        title,
        createdAt,
        state,
        labels(first: ${maxLabels}) {
          nodes {
            name
          }
        },
        body,
        author {
          login
        },
        databaseId,
        id,
        lastEditedAt
      },
      pageInfo {
          endCursor,
          hasNextPage
        }
    }
	}
}
`;

const ISSUE_TOTAL = `
query { 
	repository(owner:"${owner}", name: "${name}") {
    issues(orderBy: {
      direction: DESC,
      field: CREATED_AT
    }, first:1){
      totalCount
    }}
}
`;

module.exports = {
  ISSUE_TEMPLATE,
  ISSUE_TOTAL
};
