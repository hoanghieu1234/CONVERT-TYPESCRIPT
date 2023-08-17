import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Định nghĩa kiểu dữ liệu cho comment
interface Comment {
  id: string;
  content: string;
  rating: number;
}

const commentSlice = createSlice({
  name: "comment",
  initialState: [] as Comment[],
  reducers: {
    addComment: (state, action: PayloadAction<Comment>) => {
      state.push(action.payload);
    },
  },
});

export const { addComment } = commentSlice.actions;

export default commentSlice.reducer;
