import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../user/userSlice";
import { userApi } from "../services/userApi";
import { flowersApi } from "../services/flowersApi";
import { sightingsApi } from "../services/sightingsApi";
import { favoritesApi } from "../services/favoritesApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

const store = configureStore({
  reducer: {
    user: userReducer,
    [userApi.reducerPath]: userApi.reducer,
    [flowersApi.reducerPath]: flowersApi.reducer,
    [sightingsApi.reducerPath]: sightingsApi.reducer,
    [favoritesApi.reducerPath]: favoritesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      flowersApi.middleware,
      sightingsApi.middleware,
      favoritesApi.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
