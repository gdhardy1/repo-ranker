import React from "react";
import { useParams } from "react-router-dom";
import Button from "./atoms/Button";
import ItemFactory from "./ItemFactory";

export default function LoadingZone(props: any) {
  const {
    isLoading,
    fetchHandlers: { handleFetchMoreCommits, handleFetchMoreRepositories },
  } = props;
  const { repoName, branch } = useParams();
  return (
    <div>
      <>
        <div className="flex flex-col align-center">
          <div className="outer-container flex justify-center">
            <div className="list-container container p-4 max-w-2xl">
              <div className="overflow-hidden bg-white shadow sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  <ItemFactory />
                </ul>
              </div>
            </div>
          </div>
        </div>
        {isLoading && <div className="loading my-10">Loading...</div>}
        {repoName && branch ? (
          <Button handler={handleFetchMoreCommits}>Load More</Button>
        ) : (
          <Button handler={handleFetchMoreRepositories}>Load More</Button>
        )}
      </>
    </div>
  );
}
