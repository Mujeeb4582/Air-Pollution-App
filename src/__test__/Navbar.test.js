import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../Components/Navbar';

test('renders navbar and navigates to home page', () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>,
  );
  const backButton = getByTestId('back-button');
  fireEvent.click(backButton);
  expect(window.location.pathname).toBe('/');
});
