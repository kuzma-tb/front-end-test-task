import { configureStore, Middleware } from '@reduxjs/toolkit';
import { catsApi } from '../services/catsApi';
import authReducer from './slices/authSlice';
import themeReducer from './slices/themeSlice';

const customMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  return result;
};

const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    [catsApi.reducerPath]: catsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([catsApi.middleware, customMiddleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };
