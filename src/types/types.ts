import { Dispatch, SetStateAction } from "react";
import { LazyQueryResult } from "@apollo/client/react/types/types";
export interface OrganizationData {
  organization: Organization;
}

export interface Organization {
  id: string;
  login: string;
  name: string;
  repositories: {
    edges: {
      node: RepositoryNode;
    }[];
    totalCount: number;
    pageInfo: PageInfo;
  };
}

export interface RepositoryNode {
  name: string;
  defaultBranchRef: { name: string };
  id: string;
  stargazers: { totalCount: number };
}
export interface RepositoryData {
  repository: Repository;
}

export interface Repository {
  object: CommitHistory; // git objects filtered by Git rev-parse expression
}

export interface CommitHistory {
  history: {
    edges: {
      node: CommitNode;
    }[];
    pageInfo: PageInfo;
  };
}

export interface CommitNode {
  id: string;
  message: string;
  url: string;
}

export interface PageInfo {
  startCursor: string;
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export class NullOrganizationData implements OrganizationData {
  organization;

  constructor() {
    this.organization = {
      id: "",
      login: "",
      name: "",
      repositories: {
        edges: [] as { node: RepositoryNode }[],
        totalCount: 0,
        pageInfo: {
          startCursor: "",
          endCursor: "",
          hasNextPage: false,
          hasPreviousPage: false,
        },
      },
    };
  }
}

export class NullRepositoryData implements RepositoryData {
  repository;
  constructor() {
    this.repository = {
      object: {
        history: {
          edges: [
            {
              node: {
                id: "",
                message: "",
                url: "",
              },
            },
          ],
          pageInfo: {
            startCursor: "",
            endCursor: "",
            hasNextPage: false,
            hasPreviousPage: false,
          },
        },
      },
    };
  }
}
export interface OrganizationDataVariables {
  login: string;
}
export interface RepositoryDataVariables {
  login: string;
  repoName: string;
  branch: string;
}

export type LazyGetter<S, T> = (
  variables: T
) => Promise<LazyQueryResult<S, T> | undefined>;

export type LazyGetterTuple<S, T> = [LazyGetter<S, T>, LazyQueryResult<S, T>];

export type AppContextType = {
  organizationData: OrganizationData;
  setOrganizationData: Dispatch<SetStateAction<OrganizationData>>;
  repositoryData: RepositoryData;
  setRepositoryData: Dispatch<SetStateAction<RepositoryData>>;
  nextCursor: string | undefined;
  setNextCursor: Dispatch<SetStateAction<string | undefined>>;
};
