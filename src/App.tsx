import React, { useState, createContext } from "react";
import "./App.css";
import {
  AppContextType,
  OrganizationData,
  RepositoryData,
  NullOrganizationData,
  NullRepositoryData,
} from "./types/types";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Notification from "./components/Notification";
import SearchController from "./components/Search/SearchController";
import Breadcrumb from "./components/Breadcrumb";

export const AppContext = createContext({} as AppContextType);

function App() {
  const [organizationData, setOrganizationData] = useState<OrganizationData>(
    new NullOrganizationData()
  );
  const [repositoryData, setRepositoryData] = useState<RepositoryData>(
    new NullRepositoryData()
  );
  const [nextCursor, setNextCursor] = useState<string | undefined>(undefined);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    title: "",
  });

  const context: AppContextType = {
    organizationData,
    setOrganizationData,
    repositoryData,
    setRepositoryData,
    nextCursor,
    setNextCursor,
    notification,
    setNotification,
  };

  return (
    <div className="App">
      <AppContext.Provider value={context}>
        <Header />
        <Breadcrumb />
        <SearchController />
        <Outlet />
        <Notification />
      </AppContext.Provider>
    </div>
  );
}

export default App;
