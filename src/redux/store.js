import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./api/Authapi";
import { contactApi } from "./api/contactApi";
import authSlice from "./services/authSlice";
import contactSlice from "./services/contactSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
    authSlice: authSlice,
    contactSlice:contactSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, contactApi.middleware),
});

setupListeners(store.dispatch);
