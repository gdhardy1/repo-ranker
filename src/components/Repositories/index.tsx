import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../App";
import { StarIcon } from "@heroicons/react/20/solid";

export default function Repositories() {
  const { organizationData } = useContext(AppContext);
  const navigate = useNavigate();
  const params = useParams();

  const handleViewCommits = async (variables: any) => {
    navigate(
      `/${params.organizationLogin}/${variables.repoName}/${variables.branch}`
    );
  };
  return (
    <>
      {organizationData.organization.repositories.edges.map((edge: any) => {
        const { node: repository } = edge;
        return (
          <li
            className="repository-card"
            key={repository.id}
            onClick={(event) => {
              event.preventDefault();
              handleViewCommits({
                login: organizationData.organization.login,
                repoName: repository.name,
                branch: repository.defaultBranchRef.name,
              });
            }}
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
          </li>
        );
      })}
    </>
  );
}
