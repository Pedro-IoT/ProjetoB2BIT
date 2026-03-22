import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EditPostModal } from '../EditPostModal';
import { useEditPost } from '@/hooks/usePost';

vi.mock('@/hooks/usePost', () => ({
  useEditPost: vi.fn(),
}));

vi.mock('@/components/ui/icons/Icones', () => ({
  IconeFechar: () => <svg data-testid="icon-fechar" />,
}));

vi.mock('@/components/ui/Button/Button', () => ({
  Button: ({ children, onClick, type, disabled }: {
    children: React.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit';
    disabled?: boolean;
  }) => (
    <button onClick={onClick} type={type} disabled={disabled}>
      {children}
    </button>
  ),
}));

const mockUseEditPost = useEditPost as Mock;

describe('EditPostModal', () => {
  const mockOnClose = vi.fn();
  const mockEditPost = vi.fn();

  const defaultPost = {
    id: 1,
    title: 'Título do Post',
    content: 'Conteúdo do post',
    image: 'https://example.com/image.jpg',
  };

  const defaultProps = {
    isOpen: true,
    onClose: mockOnClose,
    post: defaultPost,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseEditPost.mockReturnValue({
      editPost: mockEditPost,
      isEditing: false,
    });
    mockEditPost.mockResolvedValue(undefined);
  });

  it('não deve renderizar quando isOpen é false', () => {
    render(<EditPostModal {...defaultProps} isOpen={false} />);
    expect(screen.queryByText('Editar Post')).not.toBeInTheDocument();
  });

  it('deve renderizar quando isOpen é true', () => {
    render(<EditPostModal {...defaultProps} />);
    expect(screen.getByText('Editar Post')).toBeInTheDocument();
  });

  it('deve preencher campos com dados do post', () => {
    render(<EditPostModal {...defaultProps} />);

    expect(document.querySelector('input[name="title"]')).toHaveValue('Título do Post');
    expect(document.querySelector('textarea[name="content"]')).toHaveValue('Conteúdo do post');
  });

  it('deve chamar onClose ao clicar em Cancelar', async () => {
    render(<EditPostModal {...defaultProps} />);

    await userEvent.click(screen.getByRole('button', { name: 'Cancelar' }));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('deve chamar editPost ao submeter formulário válido', async () => {
    render(<EditPostModal {...defaultProps} />);

    await userEvent.click(screen.getByRole('button', { name: 'Salvar' }));

    await waitFor(() => {
      expect(mockEditPost).toHaveBeenCalledWith(1, {
        title: 'Título do Post',
        content: 'Conteúdo do post',
        image: 'https://example.com/image.jpg',
      });
    });
  });

  it('deve mostrar estado de loading', () => {
    mockUseEditPost.mockReturnValue({
      editPost: mockEditPost,
      isEditing: true,
    });

    render(<EditPostModal {...defaultProps} />);
    expect(screen.getByText('Salvando...')).toBeInTheDocument();
  });
});
