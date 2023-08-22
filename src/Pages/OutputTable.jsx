import React from "react";

import "./Code.css";

import Table from "../components/Table/Table";

const OutputTable = ({ data }) => {
  return (
    <div className="outputDiv">
      <div className="outputSection">
        <Table data={data} />
      </div>
    </div>
  );
};

export default React.memo(OutputTable);
