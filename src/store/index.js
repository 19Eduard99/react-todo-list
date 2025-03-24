import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import todoReducer from './slices/todoSlice';

const persistConfig = {
  key: 'todoList',
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  todoReducer
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
        ],
      },
    }),
});

export const persistor = persistStore(store);
