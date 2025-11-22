import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./GameStore";

// storeを統合
const indexStore = configureStore({
  reducer: {
    game: gameReducer,
  },
});

export default indexStore;

