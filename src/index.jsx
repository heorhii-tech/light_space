import React from "react";
import ReactDOM from "react-dom/client";

import "./styles/output.css";
import store from "../src/store/store";
import { Provider } from "react-redux";
import App from "./components/app/App";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
