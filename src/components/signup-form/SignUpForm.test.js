import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import SignUpForm from './SignUpForm';

describe('SignUpForm Component', () => {

  test('renders the component', () => {
    render(
        <BrowserRouter>
          <SignUpForm />
        </BrowserRouter>
    );
    expect(screen.getByRole('heading', { name: 'Sign Up' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign Up' })).toBeInTheDocument();
  });

  test('handles input changes', () => {
    render( 
    <BrowserRouter>
        <SignUpForm />
    </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText('Your Email'), { target: { value: 'testuser@test.com' } });
    fireEvent.change(screen.getByLabelText('Confirm Email'), { target: { value: 'testuser@test.com' } });
    fireEvent.change(screen.getByLabelText('Your Password'), { target: { value: 'testpassword' } });

    expect(screen.getByLabelText('Your Email').value).toBe('testuser@test.com');
    expect(screen.getByLabelText('Confirm Email').value).toBe('testuser@test.com');
    expect(screen.getByLabelText('Your Password').value).toBe('testpassword');
  });

  test('toggles input type on clicking eye image', () => {
    render(  
    <BrowserRouter>
        <SignUpForm />
    </BrowserRouter>);

    // Initial type should be password
    const passwordInput = screen.getByLabelText('Your Password');
    expect(passwordInput.type).toBe('password');

    // Click on the eye image to toggle the input type
    const eyeImage = screen.getByAltText('eye');
    fireEvent.click(eyeImage);

    // After clicking, type should be text
    expect(passwordInput.type).toBe('text');

    // Click on the eye image again to toggle back to password
    fireEvent.click(eyeImage);

    // After clicking again, type should be password
    expect(passwordInput.type).toBe('password');
  });
});
