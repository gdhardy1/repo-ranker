import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./style/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import OrganizationView from "./routes/OrganizationView";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";

import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({ uri: "https://api.github.com/graphql" });
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
    },
  };
});
const cache = new InMemoryCache({
  typePolicies: {
    Organization: {
      fields: {
        repositories: {
          keyArgs: false,

          merge: (existing = { edges: [] }, incoming) => {
            const mergeResult = structuredClone(incoming);
            mergeResult.edges = [...existing.edges, ...incoming.edges];

            return mergeResult;
          },
        },
      },
    },
    Commit: {
      fields: {
        history: {
          keyArgs: false,
          merge: (existing = { edges: [] }, incoming) => {
            const mergeResult = structuredClone(incoming);
            mergeResult.edges = [...existing.edges, ...incoming.edges];
            return mergeResult;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/:organizationLogin",
        element: <OrganizationView />,
      },
      {
        path: "/:organizationLogin/:repoName/:branch",
        element: <OrganizationView />,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
);

reportWebVitals();
