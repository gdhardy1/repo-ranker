import { gql } from "@apollo/client";

const FRAGMENT_REPOSITORY = gql`
  fragment repository on Repository {
    id
    name
    defaultBranchRef {
      name
    }
    stargazers {
      totalCount
    }
  }
`;
export const FRAGMENT_REPOSITORY_CONNECTION = gql`
  fragment repositoryConnection on RepositoryConnection {
    edges {
      node {
        ...repository
      }
    }
    totalCount
    pageInfo {
      startCursor
      endCursor
      hasNextPage
      hasPreviousPage
    }
  }

  ${FRAGMENT_REPOSITORY}
`;

export const FRAGMENT_COMMIT_HISTORY = gql`
  fragment commits on Commit {
    history(first: 5, after: $cursor) {
      totalCount
      edges {
        node {
          id
          message
          url
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;
