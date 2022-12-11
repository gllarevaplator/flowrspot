import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from '../../models/user';

interface UserState {
    user: User | null;
}

const initialState: UserState = {
    user: null,
}

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        logout: () => initialState,
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        }
    }
})

export default userSlice.reducer;
export const {logout, setUser} = userSlice.actions;