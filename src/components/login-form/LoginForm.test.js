import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import LoginForm from './LoginForm';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

describe('LoginForm Component', () => {
  const mockStore = configureStore();
  const store = mockStore({
    auth: {
      token: null,
      email: "",
      isLoggedIn: false
    }
  }); // Provide an initial state if needed

  test('renders the component', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  test('handles input changes', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText('Your Email'), { target: { value: 'testuser@test.com' } });
    fireEvent.change(screen.getByLabelText('Your Password'), { target: { value: 'testpassword' } });

    expect(screen.getByLabelText('Your Email').value).toBe('testuser@test.com');
    expect(screen.getByLabelText('Your Password').value).toBe('testpassword');
  });

  test('checks if "Forgot Password" link exists', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </Provider>
    );


    const forgotPasswordLink = screen.getByText('Forgot Password');
    expect(forgotPasswordLink).toBeInTheDocument();
    
  });

    // Mock the fetch function
    global.fetch = jest.fn();

    // ... existing tests ...
  
    test('handles form submission and mocks API call', async () => {
      // Mock the fetch implementation for successful login
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          idToken: 'mockedToken',
          email: 'testuser@test.com',
        }),
      });
  
      render(
        <Provider store={store}>
          <BrowserRouter>
            <LoginForm />
          </BrowserRouter>
        </Provider>
      );
  
      fireEvent.change(screen.getByLabelText('Your Email'), { target: { value: 'testuser@test.com' } });
      fireEvent.change(screen.getByLabelText('Your Password'), { target: { value: 'testpassword' } });
  
      fireEvent.click(screen.getByRole('button', { name: 'Login' }));
  
      // Ensure that fetch was called with the expected parameters
      await expect(global.fetch).toHaveBeenCalledWith(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_KEY}`,
        {
          method: 'POST',
          body: JSON.stringify({
            email: 'testuser@test.com',
            password: 'testpassword',
            returnSecureToken: true,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

          // Check if the navigation to "/" occurred after successful form submission
    await expect(window.location.pathname).toBe('/');
    });
});
