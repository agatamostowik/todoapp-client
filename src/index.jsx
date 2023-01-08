import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import store from "./redux/store";
import "sanitize.css";
import "sanitize.css/forms.css";
import "sanitize.css/typography.css";
import "./index.scss";

// <React.StrictMode>
// </React.StrictMode>

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
