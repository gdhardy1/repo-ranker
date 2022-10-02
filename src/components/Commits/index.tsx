import React, { useContext } from "react";
import { AppContext } from "../../App";

export default function Commits(props: any) {
  const { repositoryData } = useContext(AppContext);

  return (
    <>
      {repositoryData.repository.object.history.edges.map((edge: any) => {
        const { node: commit } = edge;
        return (
          <li key={commit.id}>
            <a
              href={commit.url}
              rel="noreferrer noopener"
              target="_blank"
              className="block hover:bg-gray-50"
            >
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="truncate text-sm font-medium text-indigo-600">
                    {commit.messageHeadline}
                  </p>
                  <div className="ml-2 flex shrink-0 basis-20">
                    <p className="inline-flex w-16  rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                      {commit.oid.slice(0, 7)}
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </li>
        );
      })}
    </>
  );
}
