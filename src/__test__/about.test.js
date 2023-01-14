import React from 'react';
import { render, waitFor } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import About from '../pages/about';

const mockStore = configureMockStore();
const store = mockStore({
  airPollution: {
    loading: false,
    error: null,
    pollutionData: {
      countryName: 'United States',
      countrySymbol: 'US',
      list: [
        {
          main: { aqi: 100 },
        },
        {
          dt: 1609459200,
          components: {
            pm25: 12,
            pm10: 20,
            no2: 30,
            so2: 40,
            co: 50,
            o3: 60,
          },
        },
      ],
    },
  },
});

test('renders the pollution data table', async () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <About />
    </Provider>,
  );
  const table = await waitFor(() => getByTestId('pollution-table'));
  expect(table).toBeInTheDocument();
});

test('renders About page correctly', () => {
  const tree = renderer.create(
    <Provider store={store}>
      <About />
    </Provider>,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
