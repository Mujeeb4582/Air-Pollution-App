import { configureStore } from '@reduxjs/toolkit';
// import logger from 'redux-logger';
import pollutionReducer from './pollution-reducer/pollutionSlice';

const store = configureStore({
  reducer: {
    airPollution: pollutionReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
