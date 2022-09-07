import React, { useEffect } from "react";
import "./App.css";
import SelectPlace from "./components/selectPlace";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";

function App() {
  useEffect(() => {
    document.title = "Weather forecast";
    document.body.style.backgroundColor = "#67d0ed";
  });
  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">Weather forecast application</AppBar>
      </Box>
      <SelectPlace />
    </React.Fragment>
  );
}

export default App;
