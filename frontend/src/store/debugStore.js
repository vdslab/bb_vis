import { createSlice } from "@reduxjs/toolkit";

// debugモードに関するstoreを管理する
const initialState = {
  debugMode:true,
  movieAutoScroll:false,
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
  },
});

export const {
  setDebugMode,
  setMovieAutoScroll,
} = debugSlice.actions;

export default debugSlice.reducer;
