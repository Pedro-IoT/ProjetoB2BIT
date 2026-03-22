import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useLogin, useRegister } from '../useAuth';
import * as AuthService from '@/services/AuthService';

vi.mock('@/services/AuthService', () => ({
  login: vi.fn(),
  register: vi.fn(),
}));

vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => vi.fn(),
}));

vi.mock('@/store/authStore', () => ({
  useAuthStore: () => vi.fn(),
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

describe('useAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('useLogin', () => {
    it('deve retornar função Login e estado isLoginLoading', () => {
      const { result } = renderHook(() => useLogin(), {
        wrapper: createWrapper(),
      });

      expect(result.current.Login).toBeDefined();
      expect(typeof result.current.Login).toBe('function');
      expect(result.current.isLoginLoading).toBe(false);
    });

    it('deve chamar service de login', async () => {
      const mockLogin = vi.mocked(AuthService.login);
      mockLogin.mockResolvedValue({
        token: 'token123',
        user: { id: 1, name: 'Test', email: 'test@email.com' },
      });

      const { result } = renderHook(() => useLogin(), {
        wrapper: createWrapper(),
      });

      result.current.Login('test@email.com', 'senha123');

      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith({
          email: 'test@email.com',
          password: 'senha123',
        });
      });
    });
  });

  describe('useRegister', () => {
    it('deve retornar função Register e estado isRegisterLoading', () => {
      const { result } = renderHook(() => useRegister(), {
        wrapper: createWrapper(),
      });

      expect(result.current.Register).toBeDefined();
      expect(typeof result.current.Register).toBe('function');
      expect(result.current.isRegisterLoading).toBe(false);
    });

    it('deve chamar service de register', async () => {
      const mockRegister = vi.mocked(AuthService.register);
      mockRegister.mockResolvedValue({ message: 'success' });

      const { result } = renderHook(() => useRegister(), {
        wrapper: createWrapper(),
      });

      result.current.Register('João', 'joao@email.com', 'senha123');

      await waitFor(() => {
        expect(mockRegister).toHaveBeenCalledWith({
          name: 'João',
          email: 'joao@email.com',
          password: 'senha123',
        });
      });
    });
  });
});
