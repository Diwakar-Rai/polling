import { useEffect } from "react";

const useClearLocalStorage = () => {
  const clearStorage = () => {
    localStorage.clear();
  };

  useEffect(() => {
    window.addEventListener("unload", clearStorage);

    return () => {
      window.removeEventListener("unload", clearStorage);
    };
  }, []);
};

export default useClearLocalStorage;
