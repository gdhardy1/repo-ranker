import { OrganizationData, RepositoryData } from "../../types/types";
import { GET_ORGANIZATON, GET_REPOSITORY } from "../graphql/queries";

export const organizationData: OrganizationData = {
  organization: {
    id: "MDEyOk9yZ2FuaXphdGlvbjEyNTUxODYz",
    name: "Gatsby",
    login: "gatsbyjs",
    repositories: {
      edges: [
        {
          node: {
            id: "MDEwOlJlcG9zaXRvcnkzNjA0MDg5NA==",
            name: "gatsby",
            defaultBranchRef: {
              name: "master",
            },
            stargazers: {
              totalCount: 53590,
            },
          },
        },
        {
          node: {
            id: "MDEwOlJlcG9zaXRvcnkzOTQ3NjA0Mw==",
            name: "gatsby-starter-blog",
            defaultBranchRef: {
              name: "master",
            },
            stargazers: {
              totalCount: 3343,
            },
          },
        },
        {
          node: {
            id: "MDEwOlJlcG9zaXRvcnkzOTQxNTg4MA==",
            name: "gatsby-starter-default",
            defaultBranchRef: {
              name: "master",
            },
            stargazers: {
              totalCount: 1356,
            },
          },
        },
        {
          node: {
            id: "MDEwOlJlcG9zaXRvcnk5ODQ2MDAzNg==",
            name: "gatsby-starter-hello-world",
            defaultBranchRef: {
              name: "master",
            },
            stargazers: {
              totalCount: 630,
            },
          },
        },
        {
          node: {
            id: "MDEwOlJlcG9zaXRvcnkxMzc5MTIwNzc=",
            name: "store.gatsbyjs.org",
            defaultBranchRef: {
              name: "master",
            },
            stargazers: {
              totalCount: 594,
            },
          },
        },
        {
          node: {
            id: "MDEwOlJlcG9zaXRvcnkyNjQwNDcyMTU=",
            name: "gatsby-source-wordpress-experimental",
            defaultBranchRef: {
              name: "master",
            },
            stargazers: {
              totalCount: 389,
            },
          },
        },
        {
          node: {
            id: "MDEwOlJlcG9zaXRvcnkzODUxNTU3Ng==",
            name: "gatsby-docker",
            defaultBranchRef: {
              name: "master",
            },
            stargazers: {
              totalCount: 352,
            },
          },
        },
        {
          node: {
            id: "MDEwOlJlcG9zaXRvcnkzMzcwOTE0Mjc=",
            name: "gatsby-starter-shopify",
            defaultBranchRef: {
              name: "main",
            },
            stargazers: {
              totalCount: 262,
            },
          },
        },
        {
          node: {
            id: "MDEwOlJlcG9zaXRvcnkyODM1MTkyOTQ=",
            name: "desktop",
            defaultBranchRef: {
              name: "master",
            },
            stargazers: {
              totalCount: 222,
            },
          },
        },
        {
          node: {
            id: "MDEwOlJlcG9zaXRvcnkyMTc5MTEwNDc=",
            name: "gatsby-pt-BR",
            defaultBranchRef: {
              name: "master",
            },
            stargazers: {
              totalCount: 153,
            },
          },
        },
      ],
      totalCount: 100,
      pageInfo: {
        startCursor: "Y3Vyc29yOnYyOpLN0VbOAiXwvg==",
        endCursor: "Y3Vyc29yOnYyOpLMmc4M_Q8H",
        hasNextPage: true,
        hasPreviousPage: false,
      },
    },
  },
};

export const repositoryData: RepositoryData = {
  repository: {
    name: "",
    object: {
      history: {
        totalCount: 20686,
        edges: [
          {
            node: {
              oid: "1a2b3cd",
              id: "C_kwDOAiXwvtoAKDg1NjM4NmU1ZmFiZTcwMTNhMzZkNmU1Y2M1OTY1MzUzODM5OTMwNzA",
              messageHeadline: "chore(release): Publish next",
              url: "https://github.com/gatsbyjs/gatsby/commit/856386e5fabe7013a36d6e5cc596535383993070",
            },
          },
          {
            node: {
              oid: "1a2b3cd",
              id: "C_kwDOAiXwvtoAKGFkMTE0OGU3ZDkzMDRiN2JlYzE5ODg0MWY2NDc0ODI0MjA3N2ExY2M",
              messageHeadline:
                "fix(gatsby): Fix truncation of childNode during static HTML generatio…",
              url: "https://github.com/gatsbyjs/gatsby/commit/ad1148e7d9304b7bec198841f64748242077a1cc",
            },
          },
          {
            node: {
              oid: "1a2b3cd",
              id: "C_kwDOAiXwvtoAKDQ1YTEwNWI2ZGI2ODkyMTUwZGEyN2Q3MWFiYWY2OTNiOGU0M2ZiMTQ",
              messageHeadline:
                "fix(gatsby): Persist manifest on cached builds (#36693)",
              url: "https://github.com/gatsbyjs/gatsby/commit/45a105b6db6892150da27d71abaf693b8e43fb14",
            },
          },
          {
            node: {
              oid: "1a2b3cd",
              id: "C_kwDOAiXwvtoAKDI3ODRmZWVmMTI5N2Q1ZjMzZWI2Yjk1ZjE4OTZhMTBhYTM3ODZkMDk",
              messageHeadline: "update react peer deps patch (#36707)",
              url: "https://github.com/gatsbyjs/gatsby/commit/2784feef1297d5f33eb6b95f1896a10aa3786d09",
            },
          },
          {
            node: {
              oid: "1a2b3cd",
              id: "C_kwDOAiXwvtoAKGExNWNkZmQzODJmMGZhNTZlNmZmMmJmOWQ0MWE5NWJkOTgwNjJiNzU",
              messageHeadline:
                "chore(deps): update starters and examples to ^18.0.21 (#36692)",
              url: "https://github.com/gatsbyjs/gatsby/commit/a15cdfd382f0fa56e6ff2bf9d41a95bd98062b75",
            },
          },
          {
            node: {
              oid: "1a2b3cd",
              id: "C_kwDOAiXwvtoAKGYzMDA4OTVhNzY4OTU1ZjM0YTAxODE1MzMxODZmYzUyNzdiNjZiMDQ",
              messageHeadline: "chore(changelogs): update changelogs (#36698)",
              url: "https://github.com/gatsbyjs/gatsby/commit/f300895a768955f34a0181533186fc5277b66b04",
            },
          },
          {
            node: {
              oid: "1a2b3cd",
              id: "C_kwDOAiXwvtoAKDUxMTdiZDE0ZWQyMjllZDE1YWQ2MmYwY2IyMTM2YmU3OWFkNTI3ZWE",
              messageHeadline:
                "fix(deps): update starters and examples - gatsby (#36706)",
              url: "https://github.com/gatsbyjs/gatsby/commit/5117bd14ed229ed15ad62f0cb2136be79ad527ea",
            },
          },
          {
            node: {
              oid: "1a2b3cd",
              id: "C_kwDOAiXwvtoAKDU3ZTMzNjNlNmZkNzAwZTI5OGM2ZmQ5NDI2NWY4ZTUzODY0ZmFiNjk",
              messageHeadline:
                "chore(docs): add showcase link to 4.24 release notes (#36705)",
              url: "https://github.com/gatsbyjs/gatsby/commit/57e3363e6fd700e298c6fd94265f8e53864fab69",
            },
          },
          {
            node: {
              oid: "1a2b3cd",
              id: "C_kwDOAiXwvtoAKDRjZjllZDZjZDE5OTY4M2Q2MmEwZDc4ZGVhMDY0MzZlZGRlYjI4YTg",
              messageHeadline: "chore(docs): Release Notes for 4.24 (#36666)",
              url: "https://github.com/gatsbyjs/gatsby/commit/4cf9ed6cd199683d62a0d78dea06436eddeb28a8",
            },
          },
          {
            node: {
              oid: "1a2b3cd",
              id: "C_kwDOAiXwvtoAKGMyYTNkZmFmYTEyMGUwMTFhMDc0MmNjZjQwZDExNGU2ZDM2ODBkODU",
              messageHeadline:
                "fix(gatsby): Don't throw when a path with special character is visite…",
              url: "https://github.com/gatsbyjs/gatsby/commit/c2a3dfafa120e011a0742ccf40d114e6d3680d85",
            },
          },
        ],
        pageInfo: {
          startCursor: "856386e5fabe7013a36d6e5cc596535383993070 0",
          endCursor: "856386e5fabe7013a36d6e5cc596535383993070 9",
          hasNextPage: true,
          hasPreviousPage: false,
        },
      },
    },
  },
};

export const apolloMocks = [
  {
    request: {
      query: GET_ORGANIZATON,
      variables: {
        login: "gatsbyjs",
        cursor: undefined,
      },
    },
    result: {
      data: organizationData,
    },
  },
  {
    request: {
      query: GET_REPOSITORY,
      variables: {
        login: "gatsbyjs",
      },
    },
    result: {
      data: repositoryData,
    },
  },
];
