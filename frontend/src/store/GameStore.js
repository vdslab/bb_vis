import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  // TODO:実際のデータを取得する
  gamepk: 1000,
  p_id: 0,
  e_id: 0,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGamePk: (state, action) => {
      state.gamepk = action.payload;
    },
    setPId: (state, action) => {
      state.p_id = action.payload;
    },
    setEId: (state, action) => {
      state.e_id = action.payload;
    },
  },
});

const GameStore = configureStore({
  reducer: {
    game: gameSlice.reducer,
  },
});

export const { setGamePk, setPId, setEId } = gameSlice.actions;
export default GameStore;
