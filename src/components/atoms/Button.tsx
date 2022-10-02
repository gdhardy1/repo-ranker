import React from "react";

export default function Button(props: any) {
  const { handler } = props;
  return (
    <button
      className="flex w-40 mx-auto mb-16 justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      onClick={handler}
    >
      {props.children}
    </button>
  );
}
