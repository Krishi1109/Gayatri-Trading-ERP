import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './global.css'
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primeicons/primeicons.css';

        

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);
