import React from "react";

import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";
import ReactDOM from "react-dom/client";
import {
  AppContextType,
  NullOrganizationData,
  NullRepositoryData,
  OrganizationData,
} from "../types/types";

import OrganizationController from "./OrganizationController";
import TestContext from "../util/test/TestContext";

import { GET_ORGANIZATON } from "../util/graphql/queries";

// globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const mockAppContext: AppContextType = {
  organizationData: new NullOrganizationData(),
  repositoryData: new NullRepositoryData(),
  nextCursor: undefined,
  notification: { title: "", message: "", show: false },
  setNextCursor: jest.fn(),
  setOrganizationData: jest.fn(),
  setRepositoryData: jest.fn(),
  setNotification: jest.fn(),
};
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // use actual for all non-hook parts

  useParams: () => ({
    organizationLogin: "TEST_LOGIN_ID",
  }),
}));

describe("<Organization Controller />", () => {
  let mockOrganizationData: OrganizationData;
  let mockApolloOperations: any;
  let container: any;
  let spy: any;

  beforeEach(async () => {
    container = document.createElement("div");
    document.body.appendChild(container);

    mockOrganizationData = {
      organization: {
        id: "TEST_ID",
        name: "TEST_NAME",
        login: "TEST_LOGIN_ID",
        repositories: {
          edges: [
            {
              node: {
                id: "TEST_REPO_ID",
                name: "TEST_REPO_NAME",
                defaultBranchRef: {
                  name: "TEST_BRANCH",
                },
                stargazers: {
                  totalCount: 15,
                },
              },
            },
          ],
          totalCount: 1,
          pageInfo: {
            startCursor: "TEST_START_CURSOR",
            endCursor: "TEST_END_CURSOR",
            hasNextPage: false,
            hasPreviousPage: false,
          },
        },
      },
    };

    mockApolloOperations = [
      {
        request: {
          query: GET_ORGANIZATON,
          variables: {
            login: "TEST_LOGIN_ID",
            cursor: undefined,
          },
        },
        result: {
          data: mockOrganizationData,
        },
      },
    ];

    await act(async () => {
      ReactDOM.createRoot(container).render(
        <TestContext
          mockAppContext={mockAppContext}
          mockApolloOperations={mockApolloOperations}
        >
          <OrganizationController />
        </TestContext>
      );
    });
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  test("Sets organization to successfully queried organization.", async () => {
    spy = jest.spyOn(mockAppContext, "setOrganizationData");

    await act(async () => {});

    await expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        organization: {
          name: "TEST_NAME",
          id: "TEST_ID",
          login: "TEST_LOGIN_ID",
          repositories: {},
        },
      })
    );
  });
});
