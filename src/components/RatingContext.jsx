import React, { createContext, useState } from "react";

const RatingContext = createContext();

const RatingProvider = ({ children }) => {
  const [ratingData, setRatingData] = useState(true);
  return (
    <RatingContext.Provider value={{ ratingData, setRatingData }}>
      {children}
    </RatingContext.Provider>
  );
};

export { RatingProvider, RatingContext };
