import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from '../LoginForm';
import { useLogin } from '@/hooks/useAuth';

vi.mock('@/hooks/useAuth', () => ({
  useLogin: vi.fn(),
}));

vi.mock('@/components/ui/icons/Icones', () => ({
  IconeEmail: () => <svg data-testid="icon-email" />,
  IconeSenha: () => <svg data-testid="icon-senha" />,
  IconeSenhaFechada: () => <svg data-testid="icon-senha-fechada" />,
}));

vi.mock('@/components/form/Input/Input', () => ({
  Input: ({
    label,
    placeholder,
    error,
    type,
    ...props
  }: {
    label: string;
    placeholder: string;
    error?: string;
    type: string;
    name: string;
  }) => (
    <div>
      <label>{label}</label>
      <input placeholder={placeholder} type={type} {...props} />
      {error && <span>{error}</span>}
    </div>
  ),
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

const mockUseLogin = useLogin as Mock;

describe('LoginForm', () => {
  const mockLogin = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseLogin.mockReturnValue({
      Login: mockLogin,
      isLoginLoading: false,
    });
  });

  it('deve renderizar campos de email e senha', () => {
    render(<LoginForm />);

    expect(
      screen.getByPlaceholderText('Insira o seu e-mail')
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Insira a sua senha')
    ).toBeInTheDocument();
  });

  it('deve renderizar botão de submit', () => {
    render(<LoginForm />);
    expect(
      screen.getByRole('button', { name: 'Continuar' })
    ).toBeInTheDocument();
  });

  it('deve mostrar "Continuando..." quando está carregando', () => {
    mockUseLogin.mockReturnValue({
      Login: mockLogin,
      isLoginLoading: true,
    });

    render(<LoginForm />);
    expect(
      screen.getByRole('button', { name: 'Continuando...' })
    ).toBeInTheDocument();
  });

  it('deve chamar Login com dados válidos ao submeter', async () => {
    render(<LoginForm />);

    await userEvent.type(
      screen.getByPlaceholderText('Insira o seu e-mail'),
      'teste@email.com'
    );
    await userEvent.type(
      screen.getByPlaceholderText('Insira a sua senha'),
      'senha123'
    );
    await userEvent.click(screen.getByRole('button', { name: 'Continuar' }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('teste@email.com', 'senha123');
    });
  });
});
