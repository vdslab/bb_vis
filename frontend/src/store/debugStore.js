// devonly:start
import { createSlice } from "@reduxjs/toolkit";

// debugモードに関するstore
const initialState = {
  debugMode: true,
  stopMovieAutoScroll: false,
  isDialogOpen: false,
  showGamePk: false,
};

const debugSlice = createSlice({
  name: "debug",
  initialState,
  reducers: {
    setDebugMode: (state, action) => {
      state.debugMode = action.payload;
    },
    setStopMovieAutoScroll: (state, action) => {
      state.stopMovieAutoScroll = action.payload;
    },
    setIsDialogOpen: (state, action) => {
      state.isDialogOpen = action.payload;
    },
    setShowGamePk: (state, action) => {
      state.showGamePk = action.payload;
    },
  },
});

export const { setDebugMode, setStopMovieAutoScroll, setIsDialogOpen, setShowGamePk } =
  debugSlice.actions;

export default debugSlice.reducer;
// devonly:end
