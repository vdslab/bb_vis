import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./GameStore";
// devonly:start
import debugReducer from "./DebugStore";
// devonly:end

// storeを統合
const indexStore = configureStore({
  reducer: {
    game: gameReducer,
    // devonly:start
    debug: debugReducer,
    // devonly:end
  },
});

export default indexStore;
