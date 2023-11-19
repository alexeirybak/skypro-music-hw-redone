import { configureStore } from '@reduxjs/toolkit';
import trackReducer from './reducers/track';

export const store = configureStore({
  reducer: {
    audioplayer: trackReducer,
  },
});
