import React from "react";
import "./EntitySchema.css";

import { useState } from "react";

import { BiSolidDownArrowAlt } from "react-icons/bi";




const EntitySchema = React.memo(({ heading, schemaData }) => {
  const [show, setShow] = useState(false);
  
  return (
    <div className="entitySchemaSection">
      <div className="layout" onClick={() => setShow(!show)}>
        <span
          className="icon"
          style={{
            transform: show ? "rotate(180deg)" : "none",
            transition: "transform 0.5s",
          }}
        >
          <BiSolidDownArrowAlt onClick={() => setShow(!show)} />
        </span>
        <span
          className="value heading"
         
        >
          {heading}
        </span>{" "}
        
      </div>
      {show && (
        <ul>
          {Object.entries(schemaData[0]).map(([key, value], index) => {
            let val;
            if (typeof value === "string") {
              val = "varchar(100)";
            } else if (typeof value === "number") {
              val = "integer";
            }
            return (
              <li className="schemaKeys" key={index}>
                <span className="arrow"></span>
                <span
                  onClick={() => handlePrintSelectedQuery(key, heading)}
                  className="value1"
                >
                  {key}
                </span>
                <span className="type">[{val}]</span>
              </li>
            );
          })}
        </ul>
      )}
     
    </div>
  );
});

export default EntitySchema;
