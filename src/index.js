import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";

import App from "./App";

console.time("loop");

ReactDOM.render(
  <React.StrictMode>
    <App />,
  </React.StrictMode>,
  document.getElementById("root")
);
