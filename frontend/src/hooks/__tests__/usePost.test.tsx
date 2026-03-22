import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  useCreatePost,
  useDeletePost,
  useEditPost,
  useToggleLike,
} from '../usePost';
import * as PostService from '@/services/PostService';

vi.mock('@/services/PostService', () => ({
  createPost: vi.fn(),
  deletePost: vi.fn(),
  editPost: vi.fn(),
  toggleLike: vi.fn(),
  getPosts: vi.fn(),
}));

vi.mock('react-toastify', () => ({
  toast: {
    promise: vi.fn(promise => promise),
  },
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('usePost', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('useCreatePost', () => {
    it('deve retornar função CreatePost e estado isCreating', () => {
      const { result } = renderHook(() => useCreatePost(), {
        wrapper: createWrapper(),
      });

      expect(result.current.CreatePost).toBeDefined();
      expect(typeof result.current.CreatePost).toBe('function');
      expect(result.current.isCreating).toBe(false);
    });

    it('deve chamar service de createPost', async () => {
      const mockCreatePost = vi.mocked(PostService.createPost);
      mockCreatePost.mockResolvedValue({ id: 1 });

      const { result } = renderHook(() => useCreatePost(), {
        wrapper: createWrapper(),
      });

      result.current.CreatePost({ title: 'Título', content: 'Conteúdo' });

      await waitFor(() => {
        expect(mockCreatePost).toHaveBeenCalledWith({
          title: 'Título',
          content: 'Conteúdo',
        });
      });
    });
  });

  describe('useDeletePost', () => {
    it('deve retornar função deletePost e estado isDeleting', () => {
      const { result } = renderHook(() => useDeletePost(), {
        wrapper: createWrapper(),
      });

      expect(result.current.deletePost).toBeDefined();
      expect(typeof result.current.deletePost).toBe('function');
      expect(result.current.isDeleting).toBe(false);
    });

    it('deve chamar service de deletePost', async () => {
      const mockDeletePost = vi.mocked(PostService.deletePost);
      mockDeletePost.mockResolvedValue(undefined);

      const { result } = renderHook(() => useDeletePost(), {
        wrapper: createWrapper(),
      });

      result.current.deletePost(1);

      await waitFor(() => {
        expect(mockDeletePost).toHaveBeenCalledWith(1);
      });
    });
  });

  describe('useEditPost', () => {
    it('deve retornar função editPost e estado isEditing', () => {
      const { result } = renderHook(() => useEditPost(), {
        wrapper: createWrapper(),
      });

      expect(result.current.editPost).toBeDefined();
      expect(typeof result.current.editPost).toBe('function');
      expect(result.current.isEditing).toBe(false);
    });

    it('deve chamar service de editPost', async () => {
      const mockEditPost = vi.mocked(PostService.editPost);
      mockEditPost.mockResolvedValue({ id: 1 });

      const { result } = renderHook(() => useEditPost(), {
        wrapper: createWrapper(),
      });

      result.current.editPost(1, {
        title: 'Novo Título',
        content: 'Novo Conteúdo',
      });

      await waitFor(() => {
        expect(mockEditPost).toHaveBeenCalledWith(1, {
          title: 'Novo Título',
          content: 'Novo Conteúdo',
        });
      });
    });
  });

  describe('useToggleLike', () => {
    it('deve retornar função toggleLike e estado isTogglingLike', () => {
      const { result } = renderHook(() => useToggleLike(), {
        wrapper: createWrapper(),
      });

      expect(result.current.toggleLike).toBeDefined();
      expect(typeof result.current.toggleLike).toBe('function');
      expect(result.current.isTogglingLike).toBe(false);
    });

    it('deve chamar service de toggleLike', async () => {
      const mockToggleLike = vi.mocked(PostService.toggleLike);
      mockToggleLike.mockResolvedValue({ liked: true });

      const { result } = renderHook(() => useToggleLike(), {
        wrapper: createWrapper(),
      });

      result.current.toggleLike(1);

      await waitFor(() => {
        expect(mockToggleLike).toHaveBeenCalledWith(1);
      });
    });
  });
});
