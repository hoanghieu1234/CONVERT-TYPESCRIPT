import {  createSlice } from "@reduxjs/toolkit";

// Khởi tạo state ban đầu
const detailsSlice = createSlice({
  name: "detailsSlice",
  initialState: true,
  reducers: {
    updatePointSlice: (state) => (state = !state),
  },
});

const { actions, reducer } = detailsSlice;
export const { updatePointSlice } = actions;
export default reducer;
