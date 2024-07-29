import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SigninForm from './SigninForm';

// Mock des modules nécessaires
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe('SigninForm', () => {
  it('renders correctly', () => {
    render(
      <BrowserRouter>
        <SigninForm />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Connexion')).toBeDefined();
    expect(screen.getByPlaceholderText('Email')).toBeDefined();
    expect(screen.getByPlaceholderText('Mot de passe')).toBeDefined();
    expect(screen.getByRole('button', { name: 'Se connecter' })).toBeDefined();
  });

  it('updates form data on input change', () => {
    render(
      <BrowserRouter>
        <SigninForm />
      </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Mot de passe');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

});