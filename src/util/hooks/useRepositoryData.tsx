import { useLazyQuery } from "@apollo/client";

import {
  RepositoryData,
  RepositoryDataVariables,
  LazyGetter,
  LazyGetterTuple,
} from "../../types/types";

import { GET_REPOSITORY } from "../graphql/queries";

export function useRepositoryData(): LazyGetterTuple<
  RepositoryData,
  RepositoryDataVariables
> {
  const [lazyRepositoryQuery, queryResult] = useLazyQuery<
    RepositoryData,
    RepositoryDataVariables
  >(GET_REPOSITORY, { notifyOnNetworkStatusChange: true });

  const getRepository: LazyGetter<
    RepositoryData,
    RepositoryDataVariables
  > = async (variables: RepositoryDataVariables) => {
    const result = await lazyRepositoryQuery({
      variables,
    });

    return result;
  };

  return [getRepository, queryResult];
}
