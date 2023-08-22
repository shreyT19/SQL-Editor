import React from "react";

import "./Code.css";

import Search from "../components/Search/Search";

import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";

import { CgExport } from "react-icons/cg";

const OutputToolbar = ({
  currentPage,
  filteredData,
  itemsPerPage,
  handlePrevPage,
  handleNextPage,
  handleItemsPerPageChange,
  handleExportCSV,
  lastIndex,
  data,
  setFilteredData,
}) => {
  return (
    <div className="outputToolbar">
      <p className="output">
        Total Rows Rendered :{" "}
        <span style={{ opacity: 0.75 }}>{filteredData?.length}</span>
      </p>
      <p className="pagination">
        {currentPage > 1 && (
          <span className="span" onClick={handlePrevPage}>
            <GrFormPreviousLink />
          </span>
        )}{" "}
        Page {currentPage} of {Math.ceil(filteredData.length / itemsPerPage)}
        {lastIndex < filteredData.length && (
          <span className="span" onClick={handleNextPage}>
            <GrFormNextLink />
          </span>
        )}
      </p>
      <p>
        Rows per page :{" "}
        <select
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          className="selectRowsPerPage"
        >
          <option value={20}>20</option>
          <option value={40}>40</option>
          <option value={60}>60</option>
          <option value={80}>80</option>
          <option value={100}>100</option>
        </select>
      </p>
      <Search data={data} setFilteredData={setFilteredData} />
      <button
        className="fullScreen"
        style={{ backgroundColor: "crimson" }}
        onClick={handleExportCSV}
      >
        <span style={{ display: "flex" }}>
          <CgExport />
        </span>
        Export CSV
      </button>
    </div>
  );
};

export default React.memo(OutputToolbar);
