import React, { FormEvent, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import SearchForm from "./SearchForm";

export default function SearchController(props: any) {
  const { setNextCursor, setNotification } = useContext(AppContext);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

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
  return (
    <SearchForm
      setSearchText={setSearchText}
      searchText={searchText}
      handleSubmit={handleSubmit}
    />
  );
}
