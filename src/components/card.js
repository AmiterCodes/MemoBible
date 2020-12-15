import React from "react";

let Card = ({ text, show, open, onclick }) => (
  <div
    className={`card ${!show ? "invisible" : ""} ${!open ? "closed" : ""}`}
    onClick={onclick}
  >
    <p className={`card--question ${!open ? "invisible" : ""}`}>{text}</p>
  </div>
);

export default Card;
