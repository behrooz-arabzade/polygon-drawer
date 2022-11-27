import { combineReducers, configureStore, } from "@reduxjs/toolkit";
import uiReducer from "./slices/uiSlice/uiSlice";
import toolbarReducer from "./slices/toolbarSlice/toolbarSlice";
import canvasesReducer from "./slices/canvasesSlice/canvasesSlice";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk'

const persistConfig = {
  key: 'root',
  storage,
}

const reducers = combineReducers({
  ui: uiReducer,
  toolbar: toolbarReducer,
  canvases: canvasesReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
});

export const persistor = persistStore(store, null, () => {
  console.log("Rehydrated !!!!!!")
})

persistor.subscribe(() => {
  console.log("Subscription !!!!!!")
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
