import { useLazyQuery } from "@apollo/client";

import {
  OrganizationData,
  OrganizationDataVariables,
  Repository,
  LazyGetterTuple,
  LazyGetter,
} from "../../types/types";

import { GET_ORGANIZATON } from "../graphql/queries";

export function useOrganizationData() {
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
