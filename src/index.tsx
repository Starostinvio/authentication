import React from "react";
import ReactDOM from "react-dom/client";
import "./reset.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store/index";
import { BrowserRouter } from "react-router-dom";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
