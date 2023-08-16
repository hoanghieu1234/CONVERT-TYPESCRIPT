import { createSlice } from "@reduxjs/toolkit";
// Khởi tạo state ban đầu
interface UpdateSliceState {
  value: boolean;
}

const initialState: UpdateSliceState = {
  value: true,
};

const updateSlice = createSlice({
  name: "updateSlice",
  initialState,
  reducers: {
    updateState: (state) => {
      state.value = !state.value;
    },
  },
});

export const { updateState } = updateSlice.actions;
export default updateSlice.reducer;
