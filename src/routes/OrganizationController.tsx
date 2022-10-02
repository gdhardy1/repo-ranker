import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { useOrganizationData } from "../util/hooks/useOrganizationData";
import { useRepositoryData } from "../util/hooks/useRepositoryData";
import { useNavigate, useParams } from "react-router-dom";
import Organization from "../components/Organization";
import { OrganizationData, RepositoryData } from "../types/types";
import withLoadingIndicator from "../components/hoc/withLoadingIndicator";

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

  const handlers: Record<string, () => Promise<void>> = {
    handleFetchMoreCommits: async () => {
      const endCursor =
        repositoryData.repository.object.history.pageInfo.endCursor;

      const result = await fetchMoreCommits({
        variables: {
          cursor: endCursor,
        },
      });

      setNextCursor(result.data.repository.object.history.pageInfo.startCursor);
    },

    handleFetchMoreRepositories: async () => {
      const endCursor =
        organizationData.organization.repositories.pageInfo.endCursor;

      const result = await fetchMoreRepositories({
        variables: {
          cursor: endCursor,
        },
      });

      setNextCursor(result.data.organization.repositories.pageInfo.startCursor);
    },
  };
  const [handler, setHandler] = useState("handleFetchMoreRepositories");

  const dataIsLoading = loadingRepositoryData || loadingOrganizationData;

  useEffect(() => {
    getOrganizationData({
      login: organizationLogin as string,
      cursor: nextCursor,
    }).then((result) => {
      if (result?.data?.organization) {
        setOrganizationData(result.data);
        setHandler("handleFetchMoreRepositories");
      }
      if (result?.error) {
        navigate("/");
        setNotification({
          message: result.error.message,
          show: true,
          title: "Error",
        });
      }
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    organizationLogin,
    nextCursor,
    setOrganizationData,
    navigate,
    setNotification,
  ]);

  useEffect(() => {
    if (organizationLogin && branch && repoName) {
      getRepositoryData({
        login: organizationLogin,
        repoName,
        branch,
      }).then((result) => {
        if (result?.data?.repository) {
          setRepositoryData(result.data);
          setHandler("handleFetchMoreCommits");
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
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    organizationLogin,
    branch,
    repoName,
    nextCursor,
    setRepositoryData,
    navigate,
    setNotification,
  ]);

  const OrganizationWithLoading = withLoadingIndicator(Organization);
  const loadingStatus = {
    newOrganization: newOrganizationLoading(
      dataIsLoading,
      organizationLogin,
      organizationData
    ),
    newRepository: newRepositoryLoading(
      dataIsLoading,
      repoName,
      repositoryData
    ),
    data: dataIsLoading,
  };

  return (
    <OrganizationWithLoading
      loadingStatus={loadingStatus}
      handler={handlers[handler]}
      isLoading={loadingStatus.newOrganization}
    />
  );
}

function newOrganizationLoading(
  dataIsLoading: boolean,
  organizationLogin: string | undefined,
  organizationData: OrganizationData
) {
  return (
    dataIsLoading && organizationLogin !== organizationData.organization.login
  );
}

function newRepositoryLoading(
  dataIsLoading: boolean,
  repoName: string | undefined,
  repositoryData: RepositoryData
) {
  return dataIsLoading && repoName !== repositoryData.repository.name;
}
