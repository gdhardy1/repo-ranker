import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../App";
import withLoadingIndicator from "./hoc/withLoadingIndicator";
import LoadingZone from "./LoadingZone";
import Button from "./atoms/Button";

export default function Organization(props: any) {
  const { handler, loadingStatus } = props;
  const { repoName } = useParams();
  const { organizationData, repositoryData } = useContext(AppContext);
  const RepositoryTitleWithLoading = withLoadingIndicator(RepositoryTitle);
  const ButtonWithLoading = withLoadingIndicator(Button);
  const LoadingZoneWithLoading = withLoadingIndicator(LoadingZone);
  return (
    <>
      <div className="mt-40 mb-2 text-2xl">
        <OrganizationTitle organizationData={organizationData} />
        <RepositoryTitleWithLoading
          isLoading={loadingStatus.newRepository}
          showIndicator={false}
          repositoryData={repositoryData}
          repoName={repoName}
        />
      </div>
      <LoadingZoneWithLoading
        isLoading={loadingStatus.newRepository}
        showIndicator={false}
      />
      <ButtonWithLoading isLoading={loadingStatus.data} handler={handler}>
        Load More
      </ButtonWithLoading>
    </>
  );
}

function OrganizationTitle(props: any) {
  const { organizationData } = props;
  return <h1>{organizationData.organization.name}</h1>;
}

function RepositoryTitle(props: any) {
  const { repositoryData, repoName } = props;
  return <h2>{repoName ? repositoryData.repository.name : null}</h2>;
}
