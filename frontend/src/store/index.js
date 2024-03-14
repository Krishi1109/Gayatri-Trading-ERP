import { combineReducers, configureStore } from "@reduxjs/toolkit";
import demoSlice from "./slices/userSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

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
  krishi: persistReducer(demoPersistConfig, demoSlice.reducer),
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;
