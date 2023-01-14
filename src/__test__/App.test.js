import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/configureStore';
import App from '../App';

test('renders app component', () => {
  const { container } = render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
  expect(container).toMatchSnapshot();
});
