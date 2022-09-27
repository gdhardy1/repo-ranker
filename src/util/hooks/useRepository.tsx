import { useLazyQuery } from "@apollo/client";

import {
  RepositoryData,
  RepositoryDataVariables,
  LazyGetter,
} from "../../types/types";

import { GET_REPOSITORY } from "../graphql/queries";

export function useRepository() {
  const [lazyRepositoryQuery, queryResult] = useLazyQuery<
    RepositoryData,
    RepositoryDataVariables
  >(GET_REPOSITORY);

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
