import { useLazyQuery } from "@apollo/client";

import {
  OrganizationData,
  OrganizationDataVariables,
  LazyGetterTuple,
  LazyGetter,
} from "../../types/types";

import { GET_ORGANIZATON } from "../graphql/queries";

export function useOrganizationData(): LazyGetterTuple<
  OrganizationData,
  OrganizationDataVariables
> {
  const [lazyOrganizationQuery, queryResult] = useLazyQuery<
    OrganizationData,
    OrganizationDataVariables
  >(GET_ORGANIZATON, { notifyOnNetworkStatusChange: true });

  const getOrganization: LazyGetter<
    OrganizationData,
    OrganizationDataVariables
  > = async (variables) => {
    const result = await lazyOrganizationQuery({ variables });

    return result;
  };

  return [getOrganization, queryResult];
}
