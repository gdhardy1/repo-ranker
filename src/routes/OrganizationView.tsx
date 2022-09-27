import React, { useContext, useEffect } from "react";
import { AppContext } from "../App";
import { useOrganizationData } from "../util/hooks/useOrganizationData";
import { useParams } from "react-router-dom";
import ItemFactory from "../components/ItemFactory";

export default function OrganizationView() {
  const { setOrganizationData, nextCursor } = useContext(AppContext);

  const params = useParams();

  const [getOrganizationData] = useOrganizationData();

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

  return (
    <AppContext.Consumer>
      {(context) => (
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
      )}
    </AppContext.Consumer>
  );
}
