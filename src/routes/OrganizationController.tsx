import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { useOrganizationData } from "../util/hooks/useOrganizationData";
import { useRepositoryData } from "../util/hooks/useRepositoryData";
import { useNavigate, useParams } from "react-router-dom";
import ItemFactory from "../components/ItemFactory";

export default function OrganizationController() {
  const {
    organizationData,
    setOrganizationData,
    repositoryData,
    setRepositoryData,
    nextCursor,
    setNextCursor,
    setNotification,
  } = useContext(AppContext);

  const { organizationLogin, repoName, branch } = useParams();
  const navigate = useNavigate();

  const [
    getOrganizationData,
    { loading: loadingOrganizationData, fetchMore: fetchMoreRepositories },
  ] = useOrganizationData();

  const [
    getRepositoryData,
    { loading: loadingRepositoryData, fetchMore: fetchMoreCommits },
  ] = useRepositoryData();

  const handleFetchMoreRepositories = async () => {
    const endCursor =
      organizationData.organization.repositories.pageInfo.endCursor;

    const result = await fetchMoreRepositories({
      variables: {
        login: organizationData.organization.login,
        cursor: endCursor,
      },
    });

    setNextCursor(result.data.organization.repositories.pageInfo.startCursor);
  };

  const handleFetchMoreCommits = async () => {
    const endCursor =
      repositoryData.repository.object.history.pageInfo.endCursor;

    const result = await fetchMoreCommits({
      variables: {
        login: organizationData.organization.login,
        cursor: endCursor,
      },
    });

    setNextCursor(result.data.repository.object.history.pageInfo.startCursor);
  };

  const isLoading = () => {
    return loadingRepositoryData || loadingOrganizationData;
  };

  useEffect(() => {
    getOrganizationData({
      login: organizationLogin as string,
      cursor: nextCursor,
    }).then((result) => {
      if (result?.data?.organization) {
        setOrganizationData(result.data);
      }
      if (result?.error) {
        navigate("/");
        setNotification({
          message: result.error.message,
          show: true,
          title: "Error",
        });
      }
    });
  }, [organizationLogin, nextCursor]);

  useEffect(() => {
    if (organizationLogin && branch && repoName) {
      getRepositoryData({
        login: organizationLogin,
        repoName,
        branch,
      }).then((result) => {
        if (result?.data?.repository) {
          setRepositoryData(result.data);
        }

        if (result?.error) {
          navigate("/");
          setNotification({
            message: result.error.message,
            show: true,
            title: "Error",
          });
        }
      });
    }
  }, [branch, repoName, nextCursor]);

  return (
    <AppContext.Consumer>
      {(context) => (
        <>
          {!repoName ? (
            <button
              className="flex w-40 mx-auto justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={handleFetchMoreRepositories}
            >
              Fetch More
            </button>
          ) : (
            <button
              className="flex w-40 mx-auto justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={handleFetchMoreCommits}
            >
              Fetch More
            </button>
          )}

          {isLoading() ? (
            <div className="loading mt-10">Loading...</div>
          ) : (
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
        </>
      )}
    </AppContext.Consumer>
  );
}
