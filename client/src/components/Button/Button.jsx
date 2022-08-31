import React from "react";
import MuiButton from "@mui/material/Button";
import CircularProgess from "@mui/material/CircularProgress";

function Button(props) {
  const { children, isLoading, ...rest } = props;

  return (
    <MuiButton {...rest}>
      {!isLoading && children}
      {isLoading && <CircularProgess color="secondary" />}
    </MuiButton>
  );
}

export default Button;
