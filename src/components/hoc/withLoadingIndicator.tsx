import React, { PropsWithChildren } from "react";
import LoadingIndicator from "../atoms/LoadingIndicator";

export default function withLoadingIndicator<P extends PropsWithChildren>(
  WrappedComponent: React.ComponentType<P>
) {
  return function ComponentWithLoading(props: P & WithLoadingProps) {
    const { isLoading, showIndicator = true } = props;
    const display = showIndicator ? <LoadingIndicator /> : null;
    return (
      <>
        {isLoading ? (
          display
        ) : (
          <WrappedComponent {...(props as P)}>
            {props.children}
          </WrappedComponent>
        )}
      </>
    );
  };
}

interface WithLoadingProps {
  isLoading: boolean;
  showIndicator: boolean;
}
