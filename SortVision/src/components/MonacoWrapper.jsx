"use client";

import dynamic from "next/dynamic";
import React from "react";

// Dynamically import Monaco only on client
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => <div>Loading Editor...</div>,
});

const MonacoWrapper = ({ code, setCode }) => {
  return (
    <div className="h-[80vh] p-4 bg-gray-900 rounded-xl">
      <MonacoEditor
        height="100%"
        language="javascript"
        theme="vs-dark"
        value={code}
        onChange={(value) => setCode(value || "")}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
        }}
      />
    </div>
  );
};

export default MonacoWrapper;
