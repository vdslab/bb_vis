import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  // TODO:実際のデータを取得する
  gamepk: 1000,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGamePk: (state, action) => {
      state.gamepk = action.payload;
    },
  },
});

const GameStore = configureStore({
  reducer: {
    game: gameSlice.reducer,
  },
});

export const { setGamePk } = gameSlice.actions;
export default GameStore;
