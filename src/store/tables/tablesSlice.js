import { createSlice } from "@reduxjs/toolkit";

const tablesSlice = createSlice({
  name: "tables",
  initialState: {
    tables: [],
  },
  reducers: {
    setTables: (state, action) => {
      return action.payload;
    },
  },
});

export const { setTables } = tablesSlice.actions;
export default tablesSlice.reducer;
