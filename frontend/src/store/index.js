import { combineReducers, configureStore } from "@reduxjs/toolkit";
import demoSlice from "./slices/demoSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "./slices/userSlice";
import purchaseSlice from "./slices/purchaseSlice";
import brandSlice from "./slices/brandSlice";
import categorySlice from "./slices/categorySlice";

const persistConfig = {
  key: "root",
  storage,
};

const demoPersistConfig = {
  key: "demoPersist",
  storage: storage,
  blacklist: ["isDemoApiStatus"],
  whitelist: ["demo"],
};

const rootReducer = combineReducers({
  demo: persistReducer(demoPersistConfig, demoSlice.reducer),
  auth: authSlice.reducer,
  purchase: purchaseSlice.reducer,
  brands: brandSlice.reducer,
  categories: categorySlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;
