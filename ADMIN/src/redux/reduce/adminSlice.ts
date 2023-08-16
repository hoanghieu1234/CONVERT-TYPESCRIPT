import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "../../api/User.Api";

interface IAdmin {
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

let adminState: IAdmin = localStorage.getItem("userLogin")
  ? JSON.parse(localStorage.getItem("userLogin") as any)
  : {};
export const loginAdmin: any = createAsyncThunk("login", async (payload) => {
  const res = await userApi.login(payload as any);
  console.log('object',res)
  if (res.data.data.role === "admin") {
    localStorage.setItem("accessToken", res.data.accessToken);
    localStorage.setItem("userLogin", JSON.stringify(res.data));
    return res.data;
  } else {
    return res.data;
  }
});

const adminSlice = createSlice({
  name: "admin",
  initialState: adminState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(
      loginAdmin.fulfilled,
      (state: any, action: PayloadAction<any>) => {
        state = action.payload;
      }
    );
  },
});

const {reducer} = adminSlice
export default reducer;