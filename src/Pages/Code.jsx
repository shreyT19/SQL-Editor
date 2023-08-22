import React, { Suspense, useEffect, useState } from "react";
import ReactCodeMirror from "@uiw/react-codemirror";
import { sql } from "@codemirror/lang-sql";
import { githubDark } from "@uiw/codemirror-theme-github";
import { useStateContext } from "../context/Context";
import "./Code.css";
import Toolbar from "../components/ToolBar/Toolbar";


const LazyOutputToolbar = React.lazy(() => import("./OutputToolbar"))
const LazyOutputTable = React.lazy(() => import("./OutputTable"))



const Code = () => {
  const { currentQuery, setCurrentQuery, runQuery, data } = useStateContext();
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredData]);

  useEffect(() => {
    setFilteredData([]);
    setCurrentPage(1);
  }, [currentQuery]);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleExportCSV = () => {
    if (filteredData.length > 0) {
      const csvContent =
        "data:text/csv;charset=utf-8," +
        filteredData.map((row) => Object.values(row).join(",")).join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "filtered_data.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const firstIndex = (currentPage - 1) * itemsPerPage;
  const lastIndex = firstIndex + itemsPerPage;
  const currentItems = filteredData.slice(firstIndex, lastIndex);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div className="code">
      <div className="codeCompiler">
        <Toolbar />
        <ReactCodeMirror
          value={currentQuery}
          extensions={[sql()]}
          onChange={(e) => {
            setCurrentQuery(e.target.value);
          }}
          theme={githubDark}
        />
      </div>

      {runQuery && (
        <Suspense fallback={<div style={{color:"white"}}>Loading Component...</div>}>

        <LazyOutputToolbar
          currentPage={currentPage}
          filteredData={filteredData}
          itemsPerPage={itemsPerPage}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          handleItemsPerPageChange={handleItemsPerPageChange}
          handleExportCSV={handleExportCSV}
          lastIndex={lastIndex}
          data={data}
          setFilteredData={setFilteredData}
          />
      </Suspense>
      )
      }

      {/* Output Table Data */}
      <LazyOutputTable data={currentItems} />
    </div>
  );
};

export default React.memo(Code);
