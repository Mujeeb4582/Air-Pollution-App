import { configureStore } from '@reduxjs/toolkit';
import { waitFor } from '@testing-library/react';
import axios from 'axios';
import reducer, { fetchData } from '../redux/pollution-reducer/pollutionSlice';

jest.mock('axios');

describe('pollutionSlice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer,
    });
  });

  it('should handle the fetchData action correctly', async () => {
    const mockResponse = {
      data: {
        foo: 'bar',
      },
    };
    axios.get.mockResolvedValue(mockResponse);

    // Dispatch the action
    await store.dispatch(fetchData({ lat: 123, long: 456 }));

    // Wait for the API call to complete
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

    // Check that the loading flag is reset and the data is correctly stored
    expect(store.getState().loading).toBe(false);
    expect(store.getState().pollutionData).toEqual({
      foo: 'bar',
      lat: 123,
      long: 456,
    });
  });

  it('should handle the fetchData action error correctly', async () => {
    const mockError = new Error('API error');
    axios.get.mockRejectedValue(mockError);

    // Dispatch the action
    await store.dispatch(fetchData({ lat: 123, long: 456 }));

    // Wait for the API call to complete
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

    // Check that the loading flag is reset and the error is stored
    expect(store.getState().loading).toBe(false);
    expect(store.getState().error).toBe(mockError.message);
  });
});
