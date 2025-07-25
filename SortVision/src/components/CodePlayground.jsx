// src/components/CodePlayground.jsx
"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";

// ⬅️ Dynamically import Monaco Editor (SSR false)
const Editor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

const CodePlayground = () => {
  const [code, setCode] = useState(`function sort(arr) {
  // Your code here
  return arr;
}`);

  const runCode = () => {
    try {
      // eslint-disable-next-line no-eval
      const result = eval(code);
      console.log("Result:", result);
    } catch (error) {
      console.error("Error running code:", error);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Interactive Code Playground</h2>
      <Editor
        height="60vh"
        defaultLanguage="javascript"
        value={code}
        theme="vs-dark"
        onChange={(value) => setCode(value || "")}
      />
      <button onClick={runCode} style={{ marginTop: "1rem" }}>
        Run Code
      </button>
    </div>
  );
};

export default CodePlayground;
