// devonly:start
import { createSlice } from "@reduxjs/toolkit";

// debugモードに関するstore
const initialState = {
  debugMode:true,
  movieAutoScroll:false,
  isDialogOpen:false,
};

const debugSlice = createSlice({
  name: "debug",
  initialState,
  reducers: {
    setDebugMode: (state, action) => {
      state.debugMode = action.payload;
    },
    setMovieAutoScroll: (state, action) => {
      state.movieAutoScroll = action.payload;
    },
    setIsDialogOpen: (state, action) => {
      state.isDialogOpen = action.payload;
    },
  },
});

export const {
  setDebugMode,
  setMovieAutoScroll,
  setIsDialogOpen,
} = debugSlice.actions;

export default debugSlice.reducer;
// devonly:end