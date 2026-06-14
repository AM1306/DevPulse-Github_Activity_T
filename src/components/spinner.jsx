import React from "react";
import { useState } from "react";
import spinnerImg from "../assets/spinnerImg.svg";

function Spinner() {
  const [spinner, setSpinner] = useState(true);

  const containerStyle = {
    display: "flex",
    justifyContent: "center", 
    alignItems: "center", 
  };

  return (
    <>
      {spinner && (
        <div style={containerStyle}>
          <img src={spinnerImg} alt="Loading..." />
        </div>
      )}
    </>
  );
}
export default Spinner;
