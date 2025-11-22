// devonly:start
import { createSlice } from "@reduxjs/toolkit";

// debugモードに関するstore
const initialState = {
  debugMode:true,
  stopMovieAutoScroll:false,
  isDialogOpen:false,
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
  },
});

export const {
  setDebugMode,
  setStopMovieAutoScroll,
  setIsDialogOpen,
} = debugSlice.actions;

export default debugSlice.reducer;
// devonly:end