import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    uid: "",
    email: null,
    token: "",
    name: null,
    tel: null,
    avatar: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.name = action.payload.name;
      state.tel = action.payload.tel;
    },
    clearUser: (state) => {
      state.uid = "";
      state.email = null;
      state.token = "";
      state.tel = null;
      state.name = null;
      state.avatar = null;
    },
    updateTel: (state, action) => {
      state.tel = action.payload.tel;
    },
    updateName: (state, action) => {
      state.name = action.payload.name;
    },
    updateAvatar: (state, action) => {
      state.avatar = action.payload.avatar;
    },
  },
});

export const { setUser, clearUser, updateTel, updateName, updateAvatar } =
  userSlice.actions;
export default userSlice.reducer;
