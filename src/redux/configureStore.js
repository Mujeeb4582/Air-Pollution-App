import { configureStore } from '@reduxjs/toolkit';
import pollutionReducer from './pollution-reducer/pollutionSlice';

const store = configureStore({
  reducer: {
    airPollution: pollutionReducer,
  },
});

export default store;
