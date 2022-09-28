import { gql } from "@apollo/client";

import {
  FRAGMENT_COMMIT_HISTORY,
  FRAGMENT_REPOSITORY_CONNECTION,
} from "./fragments";

export const GET_ORGANIZATON = gql`
  query Organization($login: String!, $cursor: String) {
    organization(login: $login) {
      id
      name
      login
      repositories(
        first: 5
        after: $cursor
        orderBy: { field: STARGAZERS, direction: DESC }
      ) {
        ...repositoryConnection
      }
    }
  }
  ${FRAGMENT_REPOSITORY_CONNECTION}
`;

export const GET_REPOSITORY = gql`
  query Repository(
    $login: String!
    $repoName: String!
    $branch: String!
    $cursor: String
  ) {
    repository(name: $repoName, owner: $login) {
      object(expression: $branch) {
        ...commits
      }
    }
  }

  ${FRAGMENT_COMMIT_HISTORY}
`;
