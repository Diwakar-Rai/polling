import axios from "axios";
import React, { useEffect, useState } from "react";

const SingleData = () => {
  let [state, setState] = useState(null);
  let address = process.env.REACT_APP_IP_ADDRESS;
  useEffect(() => {
    fetchData = () => {
      axios.get(``);
    };
  }, []);

  return (
    <div>
      <h1>Hello single data</h1>
    </div>
  );
};

export default SingleData;
