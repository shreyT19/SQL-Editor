import React, { useState, useMemo } from "react";
import "./Table.css";

const Table = ({ data }) => {
  const [currentSort, setCurrentSort] = useState("");

  const memoizedSortedValues = useMemo(() => {
    return data?.sort((a, b) => {
      if (a[currentSort] < b[currentSort]) {
        return -1;
      }
      if (a[currentSort] > b[currentSort]) {
        return 1;
      }
      return 0;
    });
  }, [currentSort, data]);

  console.log(memoizedSortedValues);

  return (
    <div>
      {data.length === 0 ? (
        <div className="noData">Please Run Query To Fetch Data</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>idx</th>
              {Object.keys(data[0])?.map((tableHeading, index) => (
                <th key={index} onClick={() => setCurrentSort(tableHeading)}>
                  {tableHeading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {memoizedSortedValues?.map((row, index) => (
              <tr key={index}>
                <td className="idx">{index + 1}</td>
                {Object.values(row)?.map((rowVal, index) => (
                  <td key={index}>{rowVal}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Table;
