import React from "react";
import "./QueriesTab.css";
// import MdDeleteForever from "react-ionicons/lib/MdDeleteForever";

import QueryData from "../../assets/query.json";
import { useStateContext } from "../../context/Context";

const QueriesTab =  React.memo(() => {
  const { setCurrentQuery} = useStateContext();

  const handleClick = (query) => {
    setCurrentQuery(query);
  };

  return (
    <div className="queryTab">
      <p className="queryHeading">Queries Available</p>
      {QueryData?.query?.map((query) => {
        return (
          <div
            className="queryContainer"
            key={query.id}
            onClick={() => handleClick(query.query)}
          >
            <p>{query.query}</p>
          </div>
        );
      })}
    </div>
  );
});

export default QueriesTab;
