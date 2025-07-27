import { configureStore, createSlice } from "@reduxjs/toolkit";
// ParallelCoordinatesItem.jsxからgamepkを受け取り、setGamepkに対して更新を行う
const initialState = {
  // TODO:実際のデータを取得する
  gamepk: 1000,
  id: {
    p_id: null,
    e_id: null,
  },
  selectedTeam: "All",
  selectedFeature: null,
  selectedDate: {
    startDate: null,
    endDate: null,
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
    setSelectedTeam: (state, action) => {
      state.selectedTeam = action.payload;
    },
    setSelectedFeature: (state, action) => {
      state.selectedFeature = action.payload;
    },
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
  },
});

const GameStore = configureStore({
  reducer: {
    game: gameSlice.reducer,
  },
});

export const {
  setGamePk,
  setId,
  setSelectedTeam,
  setSelectedFeature,
  setSelectedDate,
} = gameSlice.actions;
export default GameStore;
