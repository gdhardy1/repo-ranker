import { QueryResult, useLazyQuery } from "@apollo/client";
import { LazyQueryResult } from "@apollo/client/react/types/types";

import {
  OrganizationData,
  OrganizationDataVariables,
  Repository,
  LazyGetterTuple,
  LazyGetter,
} from "../../types/types";

import { GET_ORGANIZATON } from "../graphql/queries";

export function useOrganization() {
  const [lazyOrganizationQuery, queryResult] = useLazyQuery<
    OrganizationData,
    OrganizationDataVariables
  >(GET_ORGANIZATON);

  const getOrganization: LazyGetter<
    OrganizationData,
    OrganizationDataVariables
  > = async (variables) => {
    const result = await lazyOrganizationQuery({ variables });

    return result;
  };

  return [getOrganization, queryResult];
}
