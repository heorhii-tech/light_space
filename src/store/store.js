// store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import { loadState, saveState } from "../services/localStorage";

const preloadedState = loadState();
const store = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState,
});
store.subscribe(() => {
  saveState(store.getState());
});
export default store;
