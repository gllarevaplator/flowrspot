import { configureStore } from "@reduxjs/toolkit";
import { flowersApi } from "../features/api/flowersApi";
import { setupListeners } from '@reduxjs/toolkit/query'
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

const store = configureStore({
    reducer: {
        [flowersApi.reducerPath]: flowersApi.reducer,
    }, 
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(flowersApi.middleware),
});

setupListeners(store.dispatch)


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
