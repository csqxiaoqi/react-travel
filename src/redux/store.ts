import { createStore, applyMiddleware } from "redux";
import languageReducer from "./language/languageReducer";
import recommendProductsReducer from "./recommendProducts/recommendProductsReducer";
import { productDetailSlice } from "./productDetail/slice";
import { productSearchSlice } from "./productSearch/slice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { actionLog } from "./middlewares/actionLogs";
import { userSlice } from "./user/slice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { shoppingCartSlice } from "./shoppingCart/slice";
import { orderSlice } from "./order/silce";

const persistConfig = {
  key: "root",
  storage,
  whiteList: ["user"],
};

const rootReducer = combineReducers({
  language: languageReducer,
  recommendProducts: recommendProductsReducer,
  productDetail: productDetailSlice.reducer,
  productSearch: productSearchSlice.reducer,
  user: userSlice.reducer,
  shoppingCart: shoppingCartSlice.reducer,
  order: orderSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(actionLog),
  devTools: true,
});
const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default { store, persistor };
