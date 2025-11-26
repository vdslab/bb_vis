import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import indexStore from "@/store/indexStore.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={indexStore}>
      <App />
    </Provider>
  </StrictMode>,
);
