import React, { useContext, useEffect } from "react";

import { useParams } from "react-router-dom";
import { AppContext } from "../App";
import { useRepositoryData } from "../util/hooks/useRepositoryData";

export default function Commits(props: any) {
  const { repositoryData, setRepositoryData } = useContext(AppContext);

  const params = useParams();
  const { branch, repoName, organizationLogin } = params;
  const [getRepositoryData] = useRepositoryData();

  useEffect(() => {
    if (organizationLogin && branch && repoName) {
      const result = getRepositoryData({
        login: organizationLogin,
        repoName,
        branch,
      })
        .then((result) => {
          console.log(result);
          if (result?.data?.repository) {
            setRepositoryData(result.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [branch, repoName]);
  return (
    <>
      {repositoryData.repository.object.history.edges.map((edge: any) => {
        const { node: commit } = edge;
        return (
          <li key={commit.id}>
            <a href={commit.url} className="block hover:bg-gray-50">
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="truncate text-sm font-medium text-indigo-600">
                    {commit.message}
                  </p>
                  <div className="ml-2 flex flex-shrink-0">
                    <p className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                      View on Github
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </li>
        );
      })}
    </>
  );
}
