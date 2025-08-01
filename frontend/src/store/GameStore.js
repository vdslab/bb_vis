import { configureStore, createSlice } from "@reduxjs/toolkit";
// ParallelCoordinatesItem.jsxからgamepkを受け取り、setGamepkに対して更新を行う
const initialState = {
  // TODO:実際のデータを取得する
  gamepk: 777579,
  id: {
    p_id: 0,
    e_id: 3,
  },
  selectedTeam: "Los Angeles Dodgers",
  selectedFeature: null,
  selectedDate: {
    startDate: null,
    endDate: null,
  },
  selectedGameDate: "2025-06-09",
  selectedGameAwayTeam: "Sandiego Padres",
  selectedGameHomeTeam: "Los Angeles Dodgers",
  filteredGamePks: [777579],
  highlightData: 777579,
  highlightFromParallelCoordinates: true,
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
    setSelectedGameDate: (state, action) => {
      state.selectedGameDate = action.payload;
    },
    setSelectedGameAwayTeam: (state, action) => {
      state.selectedGameAwayTeam = action.payload;
    },
    setSelectedGameHomeTeam: (state, action) => {
      state.selectedGameHomeTeam = action.payload;
    },
    setFilteredGamePks: (state, action) => {
      state.filteredGamePks = action.payload;
    },
    setHighlightData: (state, action) => {
      state.highlightData = action.payload;
    },
    setHighlightFromParallelCoordinates: (state, action) => {
      state.highlightFromParallelCoordinates = action.payload;
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
  setSelectedGameDate,
  setSelectedGameAwayTeam,
  setSelectedGameHomeTeam,
  setFilteredGamePks,
  setHighlightData,
  setHighlightFromParallelCoordinates,
} = gameSlice.actions;
export default GameStore;
