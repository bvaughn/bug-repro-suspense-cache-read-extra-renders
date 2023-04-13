import React from "react";

import { createSingleEntryCache } from "suspense";

const dummyCache = createSingleEntryCache({
  debugLabel: "Dummy",
  load: () => {
    console.log("dummyCache.load()");
    return "Static value";
  },
});

export function App() {
  let value;
  try {
    console.log("App: reading...");
    value = dummyCache.read();
  } catch (error) {
    console.log("App: caught:", error);
    throw error;
  }
  console.log("App: loaded:", value);

  return <h1>Hello world!</h1>;
}
