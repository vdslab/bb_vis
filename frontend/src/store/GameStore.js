import { configureStore, createSlice } from "@reduxjs/toolkit";
// ParallelCoordinatesItem.jsxからgamepkを受け取り、setGamepkに対して更新を行う
const initialState = {
  // TODO:実際のデータを取得する
  gamepk: 1000,
  id: {
    p_id: null,
    e_id: null,
  },
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGamePk: (state, action) => {
      state.gamepk = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
  },
});

const GameStore = configureStore({
  reducer: {
    game: gameSlice.reducer,
  },
});

export const { setGamePk, setId } = gameSlice.actions;
export default GameStore;
