import React, { FormEvent, useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../App";
import SearchForm from "./SearchForm";

export default function SearchController(props: any) {
  const { setNextCursor, setNotification } = useContext(AppContext);
  const [searchText, setSearchText] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const { organizationLogin, branch, repoName } = useParams();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (searchText === "") {
      setNotification({
        title: "No Input",
        message: "You must provide an organization login to search.",
        show: true,
      });
      return;
    }
    setNextCursor(undefined);
    setSearchText("");
    navigate(`/${searchText}`);
  };

  useEffect(() => {
    if (organizationLogin || branch || repoName) {
      setShowSearch(false);
    } else {
      setShowSearch(true);
    }
  }, [setShowSearch, showSearch, organizationLogin, branch, repoName]);
  return (
    <SearchForm
      showSearch={showSearch}
      setSearchText={setSearchText}
      searchText={searchText}
      handleSubmit={handleSubmit}
    />
  );
}
