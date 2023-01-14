import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from '../pages/Home';
import address from '../redux/CountryAddress/address';
import store from '../redux/configureStore';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('Home component', () => {
  it('should match the snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <Home />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render the component with a map and a list of countries', async () => {
    const { getByText, getByTestId, getAllByTestId } = render(
      <Provider store={store}>
        <Home />
      </Provider>,
    );
    const data = address;
    // Check that the map is rendered
    const mapElement = getByTestId('map');
    expect(mapElement).toBeInTheDocument();

    // Check that the list of countries is rendered
    const countryElements = getAllByTestId('country-details');
    expect(countryElements).toHaveLength(data.length);

    // Check that the country names are displayed in the list
    data.forEach((country) => {
      expect(getByText(country[3])).toBeInTheDocument();
    });
  });

  it('should navigate to the correct route and fetch data when a country is clicked', async () => {
    const navigate = jest.fn();
    const data = address;
    useNavigate.mockImplementation(() => navigate);

    const { getByText } = render(
      <Provider store={store}>
        <Home />
      </Provider>,
    );

    // Click on the first country in the list
    fireEvent.click(getByText(data[0][3]));

    // Wait for the navigate function to be called
    await waitFor(() => expect(navigate).toHaveBeenCalledTimes(1));

    // Check that the correct route was navigated to
    expect(navigate).toHaveBeenCalledWith(`/${data[0][3]}`);
  });
});
