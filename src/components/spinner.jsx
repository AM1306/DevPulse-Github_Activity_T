import React from "react";
import { useState } from "react";
import spinnerImg from "../assets/spinnerImg.svg";

function Spinner() {
  const [spinner, setSpinner] = useState(true);
  return <>{spinner && <img src={spinnerImg}></img>}</>;
}

export default Spinner;
