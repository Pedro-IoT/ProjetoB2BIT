import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  createPost,
  getPosts,
  deletePost,
  editPost,
  toggleLike,
} from '../PostService';

vi.mock('axios', () => ({
  default: {
    create: vi.fn(() => ({
      post: vi.fn(),
      get: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
      interceptors: {
        request: { use: vi.fn() },
      },
    })),
  },
}));

describe('PostService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createPost', () => {
    it('deve ser uma função', () => {
      expect(typeof createPost).toBe('function');
    });
  });

  describe('getPosts', () => {
    it('deve ser uma função', () => {
      expect(typeof getPosts).toBe('function');
    });
  });

  describe('deletePost', () => {
    it('deve ser uma função', () => {
      expect(typeof deletePost).toBe('function');
    });
  });

  describe('editPost', () => {
    it('deve ser uma função', () => {
      expect(typeof editPost).toBe('function');
    });
  });

  describe('toggleLike', () => {
    it('deve ser uma função', () => {
      expect(typeof toggleLike).toBe('function');
    });
  });
});
