import React, { Suspense, lazy, useMemo } from "react";

import "./CodeCompiler.css";

import Code from "./Code";
import QueriesTab from "../components/QueriesTab/QueriesTab";

import { useStateContext } from "../context/Context";

const EntitySchema = lazy(() =>
  import("../components/EntitySchema/EntitySchema")
);

const CodeCompiler = () => {
  const { showLeftPanel, orders, products } = useStateContext();
  const memoizedEntitySchemas = useMemo(() => {
    return (
      <Suspense fallback={<div style={{color:"white"}}>Loading Entity Schema...</div>}>
        <div className="entityModels">
          <div className="titleProject">
            <p className="title">Online SQL Editor</p>
          </div>
          <div className="entity">
            <p className="tableHeading">Tables</p>
            <EntitySchema heading="Orders" schemaData={orders} />
            <EntitySchema heading="Products" schemaData={products} />
          </div>
          <QueriesTab />
        </div>
      </Suspense>
    );
  }, [orders, products]);

  return (
    <div className="compiler">
      {showLeftPanel && memoizedEntitySchemas}

      <Code />
    </div>
  );
};

export default CodeCompiler;
