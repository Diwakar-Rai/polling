import { useEffect } from "react";

const useDpChecker = () => {
  //! checking dp availability from the local storage
  useEffect(() => {
    let dpStatus = JSON.parse(localStorage.getItem("dpStatus"));
    if (dpStatus !== 200) {
      return false;
    } else {
      return true;
    }
  }, []);
};

export default useDpChecker;
