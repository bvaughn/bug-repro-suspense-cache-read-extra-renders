import React, { Suspense, useState } from "react";

import { createSingleEntryCache } from "suspense";

const dummyCacheOne = createSingleEntryCache({
  load: () => {
    console.log("dummyCacheOne.load()");
    return "Static value";
  },
});

const dummyCacheTwo = createSingleEntryCache({
  load: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log("dummyCacheTwo.load()");
    return "Static value";
  },
});

export function App() {
  let value;
  try {
    console.log("<App> reading...");
    value = dummyCacheOne.read();
  } catch (error) {
    console.log("<App> caught:", error);
    throw error;
  }
  console.log("<App> loaded:", value);

  return (
    <div>
      <div>App: {value}</div>
      <Child />
    </div>
  );
}

function Child() {
  const [bool, setBool] = useState(false);
  return (
    <>
      <button onClick={() => setBool(true)}>Toggle</button>
      <Suspense>{bool && <Loader />}</Suspense>
    </>
  );
}

function Loader() {
  let value;
  try {
    console.log("<Child> reading...");
    value = dummyCacheTwo.read();
  } catch (error) {
    console.log("<Child> caught:", error);
    throw error;
  }
  console.log("<Child> loaded:", value);

  return <div>Loader: {value}</div>;
}
