import React from "react";
import Repositories from "./Repositories";
import { useParams } from "react-router-dom";
import Commits from "./Commits";

export default function GitObject(props: any) {
  const params = useParams();

  if (params.branch && params.repoName) return <Commits />;

  return <Repositories />;
}
