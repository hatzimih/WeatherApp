import React from "react";
import "./App.css";
import SelectPlace from "./components/selectPlace";

function App() {
  return (
    <div className="row mt-3">
      <div className="col-6 offset-3">
        <SelectPlace />
      </div>
    </div>
  );
}

export default App;
