import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userApi } from "../services/userApi";

export interface UserProps {
  user: {
    id: number;
    first_name: string;
    last_name: string;
  };
}

export interface UserState {
  id: number | null;
  first_name: string | null;
  last_name: string | null;
  token: string | null;
}

let initialState: UserState = {
  id: null,
  first_name: null,
  last_name: null,
  token: null,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    logout: (): UserState => {
      localStorage.removeItem("user-token");
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      userApi.endpoints.setUserLoginCredentials.matchFulfilled ||
        userApi.endpoints.setUserRegisterCredentials.matchFulfilled,
      (state, action: PayloadAction<{ auth_token: string }>) => {
        state.token = action.payload.auth_token;
        localStorage.setItem("user-token", action.payload.auth_token);
      },
    );
    builder.addMatcher(
      userApi.endpoints.getUserInfo.matchFulfilled,
      (state, action: PayloadAction<UserProps>) => {
        state.id = action.payload.user.id;
        state.first_name = action.payload.user.first_name;
        state.last_name = action.payload.user.last_name;
        state.token = localStorage.getItem("user-token");
      },
    );
  },
});

export default userSlice.reducer;

export const { logout } = userSlice.actions;
