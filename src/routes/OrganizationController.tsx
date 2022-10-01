import React, { useContext, useEffect, useRef } from "react";
import { AppContext } from "../App";
import { useOrganizationData } from "../util/hooks/useOrganizationData";
import { useRepositoryData } from "../util/hooks/useRepositoryData";
import { useNavigate, useParams } from "react-router-dom";
import LoadingZone from "../components/LoadingZone";

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
  const handler = useRef("handleFetchMoreRepositories");

  const isLoading = loadingRepositoryData || loadingOrganizationData;

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
          handler.current = "handleFetchMoreCommits";
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
    handler,
  ]);

  return (
    <LoadingZone isLoading={isLoading} handler={handlers[handler.current]} />
  );
}
