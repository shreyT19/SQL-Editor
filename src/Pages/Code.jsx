import React, { useEffect, useState } from "react";
import ReactCodeMirror from "@uiw/react-codemirror";
import { sql } from "@codemirror/lang-sql";
import { githubDark } from "@uiw/codemirror-theme-github";
import { useStateContext } from "../context/Context";
import "./Code.css";
import Toolbar from "../components/ToolBar/Toolbar";
// import Table from "../components/Table/Table";
// import Search from "../components/Search/Search";

import OutputTable from "./OutputTable";
import OutputToolbar from "./OutputToolbar";
// import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";

// import { CgExport } from "react-icons/cg";

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
        <OutputToolbar
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
      )}

      {/* Output Table Data */}
      <OutputTable data={currentItems} />
    </div>
  );
};

export default React.memo(Code);

//   return (
//     <div className="code">
//       <div className="codeCompiler">
//         <Toolbar />
//         <ReactCodeMirror
//           value={currentQuery}
//           extensions={[sql()]}
//           onChange={(e) => {
//             setCurrentQuery(e.target.value);
//           }}
//           theme={githubDark}
//         />
//       </div>

// {/* Output ToolBar */}
//       {runQuery && (
//         <div className="outputToolbar">
//           <p className="output">
//             Total Rows Rendered :{" "}
//             <span style={{ opacity: 0.75 }}>{filteredData?.length}</span>
//           </p>
//           <p className="pagination">
//             {currentPage > 1 && (
//               <span className="span" onClick={handlePrevPage}>
//                 <GrFormPreviousLink />
//               </span>
//             )}{" "}
//             Page {currentPage} of{" "}
//             {Math.ceil(filteredData.length / itemsPerPage)}
//             {lastIndex < filteredData.length && (
//               <span className="span" onClick={handleNextPage}>
//                 <GrFormNextLink />
//               </span>
//             )}
//           </p>
//           <p>
//             Rows per page :{" "}
//             <select
//               value={itemsPerPage}
//               onChange={handleItemsPerPageChange}
//               className="selectRowsPerPage"
//             >
//               <option value={20}>20</option>
//               <option value={40}>40</option>
//               <option value={60}>60</option>
//               <option value={80}>80</option>
//               <option value={100}>100</option>
//             </select>
//           </p>
//           <Search data={data} setFilteredData={setFilteredData} />
//           <button
//             className="fullScreen"
//             style={{ backgroundColor: "crimson" }}
//             onClick={handleExportCSV}
//           >
//             <span style={{ display: "flex" }}>
//               <CgExport />
//             </span>
//             Export CSV
//           </button>
//         </div>
//       )}
//       {/* Output Table Data */}
//       <div className="outputDiv">
//         <div className="outputSection">
//           <Table data={currentItems} />
//         </div>
//       </div>
//     </div>
//   );
// };
