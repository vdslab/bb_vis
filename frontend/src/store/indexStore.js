import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./GameStore";
import debugReducer from "./DebugStore";

// storeを統合
const indexStore = configureStore({
  reducer: {
    game: gameReducer,
    debug: debugReducer,
  },
});

export default indexStore;

