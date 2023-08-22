import React, { Suspense, useEffect, useRef } from "react";
import "./ToolBar.css";

import { BsWindowFullscreen } from "react-icons/bs";
import { VscRunAll } from "react-icons/vsc";
import { useStateContext } from "../../context/Context";

const Toolbar = () => {
  const {
    showLeftPanel,
    setShowLeftPanel,
    currentQuery,
    setRunQuery,
    data,
    setData,
    runQuery,
    orders,
    products,
  } = useStateContext();

  const handleRunQuery = () => {
    setRunQuery(true);
    currentQuery === "SELECT * FROM orders;"
      ? setData(orders)
      : setData(products);
    console.log(data);
  };

  return (
    <div className="toolbar">
      <div className="buttons">
        <button
          className="fullScreen"
          style={{ backgroundColor: "green" }}
          onClick={handleRunQuery}
        >
          <span style={{ display: "flex" }}>
            <VscRunAll />
          </span>
          Run SQL
        </button>
        <button
          className="fullScreen"
          style={{ backgroundColor: "rgb(51 65 85)" }}
          onClick={() => setShowLeftPanel(!showLeftPanel)}
        >
          <span style={{ display: "flex" }}>
            <BsWindowFullscreen />
          </span>
          <span>Full Screen</span>
        </button>
      </div>
      
        {runQuery && <div className="getSortedData">
          <p>Click on Table Heading To Get Data in Sorted</p>
        </div>}
      
    </div>
  );
};

export default Toolbar;
