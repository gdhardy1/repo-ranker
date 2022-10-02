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
  name: string;
  object: CommitHistory; // git objects filtered by Git rev-parse expression
}

export interface CommitHistory {
  history: {
    totalCount: number;
    edges: {
      node: CommitNode;
    }[];
    pageInfo: PageInfo;
  };
}

export interface CommitNode {
  id: string;
  messageHeadline: string;
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
      name: "",
      object: {
        history: {
          totalCount: 0,
          edges: [
            {
              node: {
                id: "",
                messageHeadline: "",
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
  cursor?: string | undefined;
}
export interface RepositoryDataVariables {
  login: string;
  repoName: string;
  branch: string;
  cursor?: string;
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
  notification: Notification;
  setNotification: Dispatch<SetStateAction<Notification>>;
};

export interface Notification {
  message: string;
  title: string;
  show: boolean;
}
