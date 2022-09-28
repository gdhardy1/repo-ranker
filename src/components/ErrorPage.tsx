import React, { useEffect } from "react";
import Header from "./Header";

import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
  }, [navigate]);
  return (
    <div>
      <Header />
      Oops, looks like this page doesn't exist
    </div>
  );
}
