import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import GameStore from "@/store/GameStore.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={GameStore}>
      <App />
    </Provider>
  </StrictMode>,
);
