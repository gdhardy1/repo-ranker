import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import Repositories from ".";
import { AppContext } from "../../App";
import * as mocks from "../../util/test/mocks";
import { AppContextType } from "../../types/types";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";

describe("<Repositories />", () => {
  test("Renders correctly", async () => {
    const mockContext: AppContextType = {
      organizationData: mocks.organizationData,
      repositoryData: mocks.repositoryData,
      nextCursor: "",
      notification: { title: "", message: "", show: false },
      setNextCursor: jest.fn(),
      setOrganizationData: jest.fn(),
      setRepositoryData: jest.fn(),
      setNotification: jest.fn(),
    };

    const tree = renderer
      .create(
        <BrowserRouter>
          <AppContext.Provider value={mockContext}>
            <Repositories />
          </AppContext.Provider>
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
