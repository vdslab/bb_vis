import { createSlice } from "@reduxjs/toolkit";

// debugモードに関するstoreを管理する
const initialState = {
  debugMode:true,
};

const debugSlice = createSlice({
  name: "debug",
  initialState,
  reducers: {
    setDebugMode: (state, action) => {
      state.debugMode = action.payload;
    },
  },
});

export const {
  setDebugMode,
} = debugSlice.actions;

export default debugSlice.reducer;
