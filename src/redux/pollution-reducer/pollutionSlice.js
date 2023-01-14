import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'http://api.openweathermap.org/data/2.5/air_pollution/forecast';
const apiKey = '&appid=c3ad0c612e1693bd45bccf53fc4b9b2e';

const initialState = {
  loading: false,
  pollutionData: [],
  error: '',
};

const rearrangeData = (apiData, localData) => {
  // Combine the data
  const data = { ...apiData, ...localData };
  return data;
};

export const fetchData = createAsyncThunk('AIR_POLLUTION_DATA', (coordinate) => axios
  .get(`${url}?lat=${coordinate.lat}&lon=${coordinate.long}${apiKey}`)
  .then((response) => rearrangeData(response.data, coordinate)));

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
