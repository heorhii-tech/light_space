import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    uid: "",
    email: "",
    token: "",
    name: "",
    tel: "",
    avatar: "",
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
      state.email = "";
      state.token = "";
      state.tel = "";
      state.name = "";
      state.avatar = "";
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
