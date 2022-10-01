import React from "react";

export default function Header() {
  return (
    <>
      <header className="md:flex md:items-center md:justify-between bg-gray-800 p-4">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight">
            Repo Ranker
          </h2>
        </div>
      </header>
    </>
  );
}
