import React, { useContext } from "react";
import Repositories from "./Repositories";
import { useParams } from "react-router-dom";

export default function GitObject(props: any) {
  const params = useParams();

  return <Repositories />;
}
