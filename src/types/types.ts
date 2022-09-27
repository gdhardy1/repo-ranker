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
        pageInfo: {} as PageInfo,
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
        },
      },
    };
  }
}
