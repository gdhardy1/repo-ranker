import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../App";
import { StarIcon } from "@heroicons/react/20/solid";

export default function Repositories() {
  const { organizationData } = useContext(AppContext);

  return (
    <>
      {organizationData.organization.repositories.edges.map((edge: any) => {
        const { node: repository } = edge;
        return (
          <Link
            to={`/${organizationData.organization.login}/${repository.name}/${repository.defaultBranchRef.name}`}
            key={repository.id}
          >
            <div className="block hover:bg-gray-50">
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="truncate text-sm font-medium text-indigo-600">
                    {repository.name}
                  </p>
                  <div className="ml-2 flex flex-shrink-0">
                    <p className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                      {repository.stargazers.totalCount}
                      <StarIcon
                        className="h-4 w-4 ml-2 my-auto flex-shrink-0"
                        aria-hidden="true"
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </>
  );
}
