import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Commits from ".";
import { AppContext } from "../../App";
import * as mocks from "../../util/test/mocks";
import { AppContextType } from "../../types/types";
import renderer from "react-test-renderer";

describe("<Commit />", () => {
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
        <AppContext.Provider value={mockContext}>
          <Commits />
        </AppContext.Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
