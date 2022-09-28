import React from "react";
import { AppContext } from "../../App";
import ApolloMockedProviderWithLogging from "./ApolloMockedProviderWithLogging";
import { MemoryRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";

export default function TestContext(props: any) {
  const { children, mockAppContext, mockApolloOperations } = props;

  return (
    <ApolloMockedProviderWithLogging mocks={mockApolloOperations}>
      <MemoryRouter>
        <AppContext.Provider value={mockAppContext}>
          {children}
        </AppContext.Provider>
      </MemoryRouter>
    </ApolloMockedProviderWithLogging>
  );
}
