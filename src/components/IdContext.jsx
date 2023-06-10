import React, { createContext, useState } from "react";

const IdContext = createContext();

const IdProvider = ({ children }) => {
  const [idData, setIdData] = useState();
  return (
    <IdContext.Provider value={{ idData, setIdData }}>
      {children}
    </IdContext.Provider>
  );
};

export { IdProvider, IdContext };
