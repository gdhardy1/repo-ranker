import React, { useContext, useEffect } from "react";
import { AppContext } from "../App";
import { useOrganizationData } from "../util/hooks/useOrganizationData";
import { useParams } from "react-router-dom";
import ItemFactory from "../components/ItemFactory";

export default function OrganizationView() {
  const { organizationData, setOrganizationData, nextCursor, setNextCursor } =
    useContext(AppContext);

  const params = useParams();

  const [getOrganizationData, { fetchMore }] = useOrganizationData();

  useEffect(() => {
    getOrganizationData({
      login: params.organizationLogin as string,
      cursor: nextCursor,
    }).then((result) => {
      if (result?.data?.organization) {
        setOrganizationData(result.data);
      }
    });
  }, [params, nextCursor]);

  const handleFetchMore = async () => {
    const endCursor =
      organizationData.organization.repositories.pageInfo.endCursor;

    const result = await fetchMore({
      variables: {
        login: organizationData.organization.login,
        cursor: endCursor,
      },
    });

    setNextCursor(result.data.organization.repositories.pageInfo.startCursor);
  };

  return (
    <AppContext.Consumer>
      {(context) => (
        <>
          <button
            className="flex w-40 mx-auto justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={handleFetchMore}
          >
            Fetch More
          </button>
          <div className="flex flex-col align-center">
            <div className="outer-container flex justify-center">
              <div className="list-container container p-4 max-w-2xl">
                <div className="overflow-hidden bg-white shadow sm:rounded-md">
                  <ul className="divide-y divide-gray-200">
                    <ItemFactory />
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </AppContext.Consumer>
  );
}
