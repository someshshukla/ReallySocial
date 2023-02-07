import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import authReducer from "./state";
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { 
  persistStore,
  peristsReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist/lib/storage";
import storage from "redux-persist/integration/react";
import { persistGate } from "redux-persist/integration/react";

const persistConfig = { key: "root", storage, version: 1};
const persistedReducer = persistReducer(persistConfig, authReducer);
const store = configureStore({
  reducer: persistReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH]
    }
  })
})
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate loading={null}>
      <App />
    </PersistGate>
    </Provider>
  </React.StrictMode>
);