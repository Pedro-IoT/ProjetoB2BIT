import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FeedForm } from '../FeedForm';
import { useAuthStore } from '@/store/authStore';
import { useCreatePost } from '@/hooks/usePost';

vi.mock('@/store/authStore', () => ({
  useAuthStore: vi.fn(),
}));

vi.mock('@/hooks/usePost', () => ({
  useCreatePost: vi.fn(),
}));

vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => vi.fn(),
}));

vi.mock('@/components/ui/icons/Icones', () => ({
  IconeImagem: () => <svg data-testid="icon-imagem" />,
}));

vi.mock('@/components/ui/Button/Button', () => ({
  Button: ({
    children,
    disabled,
  }: {
    children: React.ReactNode;
    disabled?: boolean;
  }) => <button disabled={disabled}>{children}</button>,
}));

const mockUseAuthStore = useAuthStore as unknown as Mock;
const mockUseCreatePost = useCreatePost as Mock;

describe('FeedForm', () => {
  const mockCreatePost = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseAuthStore.mockImplementation(
      (selector: (state: { isAuthenticated: boolean }) => unknown) =>
        selector({ isAuthenticated: true })
    );
    mockUseCreatePost.mockReturnValue({
      CreatePost: mockCreatePost,
      isCreating: false,
    });
  });

  it('deve renderizar textarea para escrever post', () => {
    render(<FeedForm />);
    expect(
      screen.getByPlaceholderText('E ai, o que esta rolando?')
    ).toBeInTheDocument();
  });

  it('deve renderizar botão de postar', () => {
    render(<FeedForm />);
    expect(screen.getByRole('button', { name: 'Postar' })).toBeInTheDocument();
  });

  it('deve mostrar "Postando..." quando está criando', () => {
    mockUseCreatePost.mockReturnValue({
      CreatePost: mockCreatePost,
      isCreating: true,
    });

    render(<FeedForm />);
    expect(
      screen.getByRole('button', { name: 'Postando...' })
    ).toBeInTheDocument();
  });

  it('deve renderizar botão de adicionar imagem', () => {
    render(<FeedForm />);
    expect(screen.getByTestId('icon-imagem')).toBeInTheDocument();
  });

  it('deve chamar CreatePost ao submeter com texto válido', async () => {
    render(<FeedForm />);

    await userEvent.type(
      screen.getByPlaceholderText('E ai, o que esta rolando?'),
      'Título do post\nConteúdo do post'
    );
    await userEvent.click(screen.getByRole('button', { name: 'Postar' }));

    await waitFor(() => {
      expect(mockCreatePost).toHaveBeenCalledWith({
        title: 'Título do post',
        content: 'Conteúdo do post',
      });
    });
  });
});
