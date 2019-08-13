import React from "react";

const ColorBlock = props => {
  const style = {
    backgroundColor: props.color || "white",
    display: "flex",
    flexDirection: "column",
    alignItem: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    boxSizing: "border-box"
  };

  return <div style={style} />;
};

export default ColorBlock;
