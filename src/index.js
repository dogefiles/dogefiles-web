import { ColorModeScript } from "@chakra-ui/react";
import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "State";
import App from "./App";

ReactDOM.render(
  <StrictMode>
    <ColorModeScript />
    <BrowserRouter basename="/app">
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById("root")
);
