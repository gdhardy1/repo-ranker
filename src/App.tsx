import React, { useState, createContext } from "react";
import "./App.css";
import {
  AppContextType,
  OrganizationData,
  RepositoryData,
  NullOrganizationData,
  NullRepositoryData,
} from "./types/types";
import Search from "./components/Search";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Breadcrumb from "./components/Breadcrumb";

export const AppContext = createContext({} as AppContextType);

function App() {
  const [organizationData, setOrganizationData] = useState<OrganizationData>(
    new NullOrganizationData()
  );
  const [repositoryData, setRepositoryData] = useState<RepositoryData>(
    new NullRepositoryData()
  );
  const [startCursor, setStartCursor] = useState("");
  const [nextCursor, setNextCursor] = useState<string | undefined>(undefined);
  const [totalRepoCount, setTotalRepoCount] = useState(0);
  const [login, setLogin] = useState<string>("");
  const context = {
    organizationData,
    setOrganizationData,
    repositoryData,
    setRepositoryData,
    nextCursor,
    setNextCursor,
  };

  return (
    <div className="App">
      <AppContext.Provider value={context}>
        <Header />
        <Breadcrumb />
        <Search />
        <Outlet />
      </AppContext.Provider>
    </div>
  );
}

export default App;
