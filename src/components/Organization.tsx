import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../App";
import LoadingZone from "./LoadingZone";

export default function Organization(props: any) {
  const { isLoading, handler } = props;
  const { repoName } = useParams();
  const { organizationData, repositoryData } = useContext(AppContext);
  return (
    <>
      <h2 className="mt-8 mb-2 text-2xl">
        <div>{organizationData.organization.name}</div>
        <div>{repoName ? repositoryData.repository.name : null}</div>
      </h2>
      <LoadingZone isLoading={isLoading} handler={handler} />
    </>
  );
}
