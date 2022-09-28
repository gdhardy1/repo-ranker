import React from "react";

import {
  MockedProvider,
  MockedProviderProps,
  MockedResponse,
} from "@apollo/client/testing";
import { ApolloError, ApolloLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { MockLink } from "@apollo/react-testing";

interface Props extends MockedProviderProps {
  mocks?: ReadonlyArray<MockedResponse>;
  children?: React.ReactElement;
}

export default function ApolloMockedProviderWithLogging(props: Props) {
  const { mocks = [], ...otherProps } = props;

  const mockLink = new MockLink(mocks);
  const errorLoggingLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
          "[GraphQL error]:" +
            `Message: ${message},` +
            `Location: ${locations},` +
            `Path: ${path}`
        )
      );
    }

    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  });
  const link = ApolloLink.from([errorLoggingLink, mockLink]);

  return (
    <MockedProvider
      {...otherProps}
      addTypename={false}
      mocks={mocks}
      link={link}
    />
  );
}
