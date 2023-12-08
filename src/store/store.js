import { configureStore } from '@reduxjs/toolkit';
import trackReducer from './reducers/reducers';

export const store = configureStore({
  reducer: {
    audioplayer: trackReducer,
  },
});
