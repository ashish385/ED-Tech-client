// import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { applyMiddleware } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // Use local storage or another storage engine
import { legacy_createStore as createStore } from "redux";
import { roleMiddleware } from "./middleware";

import rootReducer from "./reducer";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(roleMiddleware));
const persistor = persistStore(store);

export { store, persistor };
