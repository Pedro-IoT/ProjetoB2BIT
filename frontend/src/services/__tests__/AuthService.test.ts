import { describe, it, expect, vi, beforeEach } from 'vitest';
import { login, register, logout, loginSchema, registerSchema } from '../AuthService';

vi.mock('axios', () => ({
  default: {
    create: vi.fn(() => ({
      post: vi.fn(),
      interceptors: {
        request: { use: vi.fn() },
      },
    })),
  },
}));

describe('AuthService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('loginSchema', () => {
    it('deve validar dados corretos', () => {
      const result = loginSchema.safeParse({
        email: 'teste@email.com',
        password: 'senha123',
      });
      expect(result.success).toBe(true);
    });

    it('deve rejeitar email inválido', () => {
      const result = loginSchema.safeParse({
        email: 'email-invalido',
        password: 'senha123',
      });
      expect(result.success).toBe(false);
    });

    it('deve rejeitar senha muito curta', () => {
      const result = loginSchema.safeParse({
        email: 'teste@email.com',
        password: '123',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('registerSchema', () => {
    it('deve validar dados corretos', () => {
      const result = registerSchema.safeParse({
        name: 'João Silva',
        email: 'joao@email.com',
        password: 'senha123',
      });
      expect(result.success).toBe(true);
    });

    it('deve rejeitar nome muito curto', () => {
      const result = registerSchema.safeParse({
        name: 'J',
        email: 'joao@email.com',
        password: 'senha123',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('login', () => {
    it('deve ser uma função', () => {
      expect(typeof login).toBe('function');
    });
  });

  describe('register', () => {
    it('deve ser uma função', () => {
      expect(typeof register).toBe('function');
    });
  });

  describe('logout', () => {
    it('deve ser uma função', () => {
      expect(typeof logout).toBe('function');
    });
  });
});
