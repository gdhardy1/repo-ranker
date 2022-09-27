import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { useOrganizationData } from "../util/hooks/useOrganizationData";
import { useParams } from "react-router-dom";

export default function OrganizationView() {
  const { setOrganizationData, nextCursor } = useContext(AppContext);

  const params = useParams();

  const [getOrganizationData] = useOrganizationData();

  useEffect(() => {
    const org = getOrganizationData({
      login: params.organizationLogin as string,
      cursor: nextCursor,
    }).then((result) => {
      if (result?.data?.organization) {
        setOrganizationData(result.data);
      }
    });
  }, [params, nextCursor]);

  return (
    <AppContext.Consumer>
      {(context) => (
        <div className="flex flex-col align-center">
          <button className="flex w-40 mx-auto justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Show Commits
          </button>
          <div className="outer-container flex justify-center">
            <div className="list-container container p-4 max-w-2xl">
              <div className="overflow-hidden bg-white shadow sm:rounded-md">
                <ul className="divide-y divide-gray-200">EXAMPLE CARD</ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </AppContext.Consumer>
  );
}
