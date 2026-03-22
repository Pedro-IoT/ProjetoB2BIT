import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FeedCard } from '../FeedCard';
import { useAuthStore } from '@/store/authStore';
import { useDeletePost, useToggleLike } from '@/hooks/usePost';

vi.mock('@/store/authStore', () => ({
  useAuthStore: vi.fn(),
}));

vi.mock('@/hooks/usePost', () => ({
  useDeletePost: vi.fn(),
  useToggleLike: vi.fn(),
}));

vi.mock('@/components/ui/icons/Icones', () => ({
  IconeLikeAnimado: ({ isLiked }: { isLiked: boolean }) => (
    <svg data-testid={isLiked ? 'icon-liked' : 'icon-not-liked'} />
  ),
}));

vi.mock('@/components/ui/DropdownMenu/DropdownMenu', () => ({
  DropdownMenu: () => <div data-testid="dropdown-menu" />,
}));

vi.mock('@/components/ui/Modal/EditPostModal', () => ({
  EditPostModal: () => null,
}));

const mockUseAuthStore = useAuthStore as unknown as Mock;
const mockUseDeletePost = useDeletePost as Mock;
const mockUseToggleLike = useToggleLike as Mock;

describe('FeedCard', () => {
  const defaultProps = {
    id: 1,
    title: 'Título do Post',
    content: 'Conteúdo do post',
    authorId: 1,
    createdAt: '2024-01-15 10:00:00',
    authorName: 'João Silva',
    likesCount: 5,
    isLikedByUser: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseAuthStore.mockImplementation(
      (selector: (state: { user: { id: number } | null }) => unknown) =>
        selector({ user: { id: 2 } })
    );
    mockUseDeletePost.mockReturnValue({ deletePost: vi.fn() });
    mockUseToggleLike.mockReturnValue({ toggleLike: vi.fn() });
  });

  it('deve renderizar título e conteúdo do post', () => {
    render(<FeedCard {...defaultProps} />);

    expect(screen.getByText('Título do Post')).toBeInTheDocument();
    expect(screen.getByText('Conteúdo do post')).toBeInTheDocument();
  });

  it('deve renderizar nome do autor e data formatada', () => {
    render(<FeedCard {...defaultProps} />);

    expect(screen.getByText('João Silva')).toBeInTheDocument();
    expect(screen.getByText('15/01/2024')).toBeInTheDocument();
  });

  it('deve renderizar contador de likes', () => {
    render(<FeedCard {...defaultProps} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('deve mostrar dropdown menu quando usuário é o autor', () => {
    mockUseAuthStore.mockImplementation(
      (selector: (state: { user: { id: number } | null }) => unknown) =>
        selector({ user: { id: 1 } })
    );

    render(<FeedCard {...defaultProps} />);
    expect(screen.getByTestId('dropdown-menu')).toBeInTheDocument();
  });

  it('não deve mostrar dropdown menu quando usuário não é o autor', () => {
    render(<FeedCard {...defaultProps} />);
    expect(screen.queryByTestId('dropdown-menu')).not.toBeInTheDocument();
  });

  it('deve alternar like ao clicar no botão', async () => {
    const mockToggleLike = vi.fn();
    mockUseToggleLike.mockReturnValue({ toggleLike: mockToggleLike });

    render(<FeedCard {...defaultProps} />);

    await userEvent.click(screen.getByTestId('icon-not-liked').parentElement!);
    expect(mockToggleLike).toHaveBeenCalledWith(1);
  });
});
