import React from "react";

const ResultComp = props => {
  console.log(props);
  return (
    <div>
      <h1>Hello user {props?.state?.status}</h1>
    </div>
  );
};

export default ResultComp;
