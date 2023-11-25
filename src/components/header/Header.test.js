import React from 'react';
import { render,screen } from '@testing-library/react';
import Header from './Header';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';

describe('Header component', () => {
    const mockStore = configureStore();
    const store = mockStore({
        theme: {
          theme: "light",
        },
        expense: {
            expenses: []
        },
        auth: {
            token: null,
            email: null,
            isLoggedIn: false
        }
      }); // Provide an initial state if needed
  test('renders "Expense Tracker" text', () => {
    render(
    <Provider store={store}>
         <BrowserRouter><Header /></BrowserRouter>
    </Provider>
    );
    const expenseTrackerText = screen.getByText("Expense Tracker");
    expect(expenseTrackerText).toBeInTheDocument();
  });
});