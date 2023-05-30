import React from "react";
import "./Ad.scss";

const Image = (props) => {
  return (
    <img
      className={props.className ? props.className : "image"}
      src={props.src}
      alt="movie"
    />
  );
};

export default Image;
