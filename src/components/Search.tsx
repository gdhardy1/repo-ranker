import React, { FormEvent, useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useOrganizationData } from "../util/hooks/useOrganizationData";
import { AppContext } from "../App";

export default function SearchBox(props: any) {
  const { setNextCursor } = useContext(AppContext);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const [getOrganizationData] = useOrganizationData();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (searchText === "") {
      alert("you must provide a org login");
      return;
    }
    setNextCursor(undefined);
    let result = await getOrganizationData({ login: searchText });

    if (result?.data?.organization) {
      setSearchText("");
      navigate(`/${searchText}`);
    } else {
      alert("Organization not found");
    }
  };
  return (
    <AppContext.Consumer>
      {(context) => (
        <>
          <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
              <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Search for a Github organization by login.
                    </label>
                    <div className="mt-1">
                      <input
                        id="github-org"
                        type="text"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder="Netflix"
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Search
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </AppContext.Consumer>
  );
}
