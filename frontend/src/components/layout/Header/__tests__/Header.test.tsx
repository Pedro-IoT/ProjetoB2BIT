import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from '../Header';
import { useAuthStore } from '@/store/authStore';
import { useSearchStore } from '@/store/searchStore';

vi.mock('@/store/authStore', () => ({
  useAuthStore: Object.assign(vi.fn(), { getState: vi.fn() }),
}));

vi.mock('@/store/searchStore', () => ({
  useSearchStore: vi.fn(),
}));

vi.mock('@tanstack/react-router', () => ({
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}));

vi.mock('@/components/ui/icons/Icones', () => ({
  IconeLupa: () => <svg data-testid="icon-lupa" />,
  IconeSair: () => <svg data-testid="icon-sair" />,
}));

vi.mock('@/components/ui/Button/Button', () => ({
  Button: ({ children }: { children: React.ReactNode }) => (
    <button>{children}</button>
  ),
}));

const mockUseAuthStore = useAuthStore as unknown as Mock;
const mockUseSearchStore = useSearchStore as unknown as Mock;

describe('Header', () => {
  const mockSetSearchTerm = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseSearchStore.mockImplementation(
      (
        selector: (state: {
          searchTerm: string;
          setSearchTerm: typeof mockSetSearchTerm;
        }) => unknown
      ) => selector({ searchTerm: '', setSearchTerm: mockSetSearchTerm })
    );
  });

  it('deve renderizar o título "Mini Twitter"', () => {
    mockUseAuthStore.mockImplementation(
      (selector: (state: { isAuthenticated: boolean }) => unknown) =>
        selector({ isAuthenticated: false })
    );

    render(<Header />);
    expect(screen.getByText('Mini Twitter')).toBeInTheDocument();
  });

  it('deve renderizar o campo de busca', () => {
    mockUseAuthStore.mockImplementation(
      (selector: (state: { isAuthenticated: boolean }) => unknown) =>
        selector({ isAuthenticated: false })
    );

    render(<Header />);
    expect(screen.getByPlaceholderText('Buscar por post')).toBeInTheDocument();
  });

  it('deve mostrar botões de login e registro quando não autenticado', () => {
    mockUseAuthStore.mockImplementation(
      (selector: (state: { isAuthenticated: boolean }) => unknown) =>
        selector({ isAuthenticated: false })
    );

    render(<Header />);
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Registrar-se')).toBeInTheDocument();
  });

  it('deve mostrar botão de sair quando autenticado', () => {
    mockUseAuthStore.mockImplementation(
      (selector: (state: { isAuthenticated: boolean }) => unknown) =>
        selector({ isAuthenticated: true })
    );

    render(<Header />);
    expect(screen.getByTestId('icon-sair')).toBeInTheDocument();
    expect(screen.queryByText('Login')).not.toBeInTheDocument();
  });

  it('deve atualizar termo de busca ao digitar', async () => {
    mockUseAuthStore.mockImplementation(
      (selector: (state: { isAuthenticated: boolean }) => unknown) =>
        selector({ isAuthenticated: false })
    );

    render(<Header />);
    await userEvent.type(
      screen.getByPlaceholderText('Buscar por post'),
      'teste'
    );

    expect(mockSetSearchTerm).toHaveBeenCalled();
  });
});
