import React from "react";
import { useSelector } from "react-redux";
import "./Backdrop.scss";

const Backdrop = ({ click }) => {
  const show = useSelector((state) => state.condition.show);
  return (
    <>
      {show === "show" ? <div className="backdrop" onClick={click}></div> : ""}
    </>
  );
};
export default Backdrop;
