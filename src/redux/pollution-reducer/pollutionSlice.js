import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'http://api.openweathermap.org/data/2.5/air_pollution/forecast';
const latitude = '?lat=23.424076';
const longitude = '&lon=53.847818';
const apiKey = '&appid=c3ad0c612e1693bd45bccf53fc4b9b2e';
const finalURL = `${url}${latitude}${longitude}${apiKey}`;

console.log('URL', finalURL);

const initialState = {
  loading: false,
  pollutionData: [],
  error: '',
};

export const fetchData = createAsyncThunk('AIR_POLLUTION_DATA', () => axios.get(finalURL).then((response) => response.data));

const pollutionSlice = createSlice({
  name: 'pollutionData',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      const states = state;
      states.loading = true;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      const states = state;
      states.loading = false;
      states.pollutionData = action.payload;
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      const states = state;
      states.loading = false;
      states.pollutionData = [];
      states.error = action.error.message;
    });
  },
});

export default pollutionSlice.reducer;
