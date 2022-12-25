import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "../services/userApi";
import { flowersApi } from "../services/flowersApi";
import { setupListeners } from '@reduxjs/toolkit/query'
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import authReducer from "../user/userSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        [userApi.reducerPath]: userApi.reducer,
        [flowersApi.reducerPath]: flowersApi.reducer,
    }, 
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(flowersApi.middleware, userApi.middleware),
});

setupListeners(store.dispatch)


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
