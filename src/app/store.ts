import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import authReducer, { setToken, logout } from "./Features/Slices/authSlice";
import filterReducer from './Features/Slices/filterSlice';

import { categoriesApi } from "./Features/categoriesApi";
import { brandsApi } from "./Features/brandsApi";
import { subCategoriesApi } from "./Features/subCategoriesApi";
import { subOnCategoryApi } from "./Features/subOnCategoryApi";
import { productApi } from "./Features/productApi";
import { authenticationApi } from "./Features/authenticationApi";
import { wishlistApi } from "./Features/wishlistApi";
import { cartApi } from "./Features/cartApi";
import { reviewApi } from "./Features/reviewApi";
import { loggedUserApi } from "./Features/loggedUserApi";
import { couponApi } from "./Features/couponApi";
import { addressesApi } from "./Features/addressesApi";
import { ordersApi } from "./Features/ordersApi";


const authListener = createListenerMiddleware();

authListener.startListening({
  actionCreator: setToken,
  effect: (action) => {
    const token = action.payload;
    if (typeof window === "undefined") return;
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  },
});

authListener.startListening({
  actionCreator: logout,
  effect: () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem("token");
  },
});

export const store = configureStore({
  reducer: {
    auth: authReducer,
    filters: filterReducer,  
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [brandsApi.reducerPath]: brandsApi.reducer,
    [subCategoriesApi.reducerPath]: subCategoriesApi.reducer,
    [subOnCategoryApi.reducerPath]: subOnCategoryApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [authenticationApi.reducerPath]: authenticationApi.reducer,
    [wishlistApi.reducerPath]: wishlistApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    [loggedUserApi.reducerPath]: loggedUserApi.reducer,
    [couponApi.reducerPath]: couponApi.reducer,
    [addressesApi.reducerPath]: addressesApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      categoriesApi.middleware,
      brandsApi.middleware,
      subCategoriesApi.middleware,
      subOnCategoryApi.middleware,
      productApi.middleware,
      authenticationApi.middleware,
      authListener.middleware,
      wishlistApi.middleware,
      cartApi.middleware,
      reviewApi.middleware,
      loggedUserApi.middleware,
      couponApi.middleware,
      addressesApi.middleware,
      ordersApi.middleware,

    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


