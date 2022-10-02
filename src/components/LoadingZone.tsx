import React from "react";

import ItemFactory from "./ItemFactory";

export default function LoadingZone() {
  return (
    <div>
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
    </div>
  );
}
