import { createContext, useState, useContext, useEffect, useRef } from "react";
export const StateContext = createContext();

export const AppProvider = ({ children }) => {
  const [data, setData] = useState([]);

  const[orders,setOrders] = useState([]);
  const[products,setProducts] = useState([]);

  const[currentQuery,setCurrentQuery] = useState("SELECT * FROM orders;");

  const[showLeftPanel,setShowLeftPanel] = useState(true);

  const[runQuery,setRunQuery] = useState(false);

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/orders.csv");
        const csvText = await response.text();

        const lines = csvText.split("\n");
        const tableHeaders = lines[0].split(",");
        const parsedData = lines.slice(1).map((line) => {
          const values = line.split(",");
          return tableHeaders.reduce((obj, header, index) => {
            obj[header] = values[index];
            return obj;
          }, {});
        });

        setOrders(parsedData);
      } catch (error) {
        console.error("Error fetching or parsing CSV:", error);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/products.csv");
        const csvText = await response.text();

        const lines = csvText.split("\n");
        const tableHeaders = lines[0].split(",");
        const parsedData = lines.slice(1).map((line) => {
          const values = line.split(",");
          return tableHeaders.reduce((obj, header, index) => {
            obj[header] = values[index];
            return obj;
          }, {});
        });

        setProducts(parsedData);
      } catch (error) {
        console.error("Error fetching or parsing CSV:", error);
      }
    };

    fetchData();
  }, []);


  return (
    <StateContext.Provider
      value={{
        data,
        setData,
        currentQuery,
        setCurrentQuery,
        showLeftPanel,
        setShowLeftPanel,
        runQuery,
        setRunQuery,
        orders,
        setOrders,
        products,
        setProducts,
       
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

//custom hook
export const useStateContext = () => useContext(StateContext);
