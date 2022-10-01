import React from "react";
import Button from "./atoms/Button";
import ItemFactory from "./ItemFactory";

export default function LoadingZone(props: any) {
  const { isLoading, handler } = props;
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
        {!isLoading && <Button handler={handler}>Load More</Button>}
      </>
    </div>
  );
}
