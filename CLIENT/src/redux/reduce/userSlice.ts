import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "../../api/user.api";

interface IUser {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  mobile: string;
  password: string;
  role: string;
  isBlocked: boolean;
  wishlist: [any];
  cart: [any];
}

let userState: IUser = localStorage.getItem("userLogin")
  ? localStorage.getItem("userLogin") as any
  : {};
export const loginUser: any = createAsyncThunk("login", async (payload) => {
  const res = await userApi.login(payload as any);
  if (res.data.isBlocked === true) {
    return res.data;
  } else {
    console.log(res.data);
    localStorage.setItem("accessToken", res.data.accessToken);
    localStorage.setItem("userLogin", JSON.stringify(res.data));
    return res.data;
  }
});

export const registerUser: any = createAsyncThunk(
  "register",
  async (payload) => {
    const res = await userApi.register(payload as any);
    console.log(res, "=> register");
    return res.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: userState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(
        loginUser.fulfilled,
        (state: any, action: PayloadAction<any>) => {
         return state = action.payload;
        }
      )
      .addCase(registerUser.fulfilled, (state: any, action: PayloadAction<any>) => {
       return state = action.payload;
      });
  },
});

const { reducer } = userSlice;
export default reducer;
