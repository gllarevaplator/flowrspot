import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "../services/userApi";

export interface User {
    user: {
        id: number, 
        first_name: string,
        last_name: string,
    }
}

interface UserState {
    id: number | null,
    first_name: string | null,
    last_name: string| null,
    token: string | null,
}

const initialState: UserState = {
    id: null,
    first_name: null,
    last_name: null,
    token: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addMatcher(
          authApi.endpoints.setUserCredentials.matchFulfilled,
          (state, action: PayloadAction<{auth_token: string}>) => {
            state.token = action.payload.auth_token;
            localStorage.setItem('user-token', action.payload.auth_token)
          },
        );  
        builder.addMatcher(
            authApi.endpoints.getUserInfo.matchFulfilled,
            (state, action: PayloadAction<User>) => {
                state.id = action.payload.user.id;
                state.first_name = action.payload.user.first_name;
                state.last_name = action.payload.user.last_name;
                state.token = localStorage.getItem('user-token');
            }
        )
      },
});

export default authSlice.reducer;