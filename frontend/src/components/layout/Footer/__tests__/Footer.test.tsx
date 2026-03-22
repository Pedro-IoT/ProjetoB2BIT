import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

vi.mock('@tanstack/react-router', () => ({
  useLocation: vi.fn(),
}));

vi.mock('@/components/ui/Button/ButtonTheme', () => ({
  ButtonTheme: () => <button data-testid="button-theme">Theme</button>,
}));

import { useLocation } from '@tanstack/react-router';
const mockUseLocation = useLocation as ReturnType<typeof vi.fn>;

describe('Footer', () => {
  it('deve renderizar ButtonTheme na página de login', () => {
    mockUseLocation.mockReturnValue({ pathname: '/login' });

    render(<Footer />);
    expect(screen.getByTestId('button-theme')).toBeInTheDocument();
  });

  it('deve renderizar ButtonTheme na página de registro', () => {
    mockUseLocation.mockReturnValue({ pathname: '/register' });

    render(<Footer />);
    expect(screen.getByTestId('button-theme')).toBeInTheDocument();
  });

  it('deve renderizar link "Mini Twitter" e ButtonTheme no feed', () => {
    mockUseLocation.mockReturnValue({ pathname: '/feed' });

    render(<Footer />);
    expect(screen.getByText('Mini Twitter')).toBeInTheDocument();
    expect(screen.getByTestId('button-theme')).toBeInTheDocument();
  });

  it('não deve renderizar nada em rotas desconhecidas', () => {
    mockUseLocation.mockReturnValue({ pathname: '/outra-rota' });

    const { container } = render(<Footer />);
    expect(container.firstChild).toBeNull();
  });
});
