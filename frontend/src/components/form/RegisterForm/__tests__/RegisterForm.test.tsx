import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RegisterForm } from '../RegisterForm';
import { useRegister } from '@/hooks/useAuth';

vi.mock('@/hooks/useAuth', () => ({
  useRegister: vi.fn(),
}));

vi.mock('@/components/ui/icons/Icones', () => ({
  IconeEmail: () => <svg data-testid="icon-email" />,
  IconeSenha: () => <svg data-testid="icon-senha" />,
  IconeSenhaFechada: () => <svg data-testid="icon-senha-fechada" />,
  IconeNome: () => <svg data-testid="icon-nome" />,
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

const mockUseRegister = useRegister as Mock;

describe('RegisterForm', () => {
  const mockRegister = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseRegister.mockReturnValue({
      Register: mockRegister,
      isRegisterLoading: false,
    });
  });

  it('deve renderizar campos de nome, email e senha', () => {
    render(<RegisterForm />);

    expect(
      screen.getByPlaceholderText('Insira o seu nome')
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Insira o seu e-mail')
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Insira sua senha')).toBeInTheDocument();
  });

  it('deve renderizar botão de submit', () => {
    render(<RegisterForm />);
    expect(
      screen.getByRole('button', { name: 'Continuar' })
    ).toBeInTheDocument();
  });

  it('deve mostrar "Continuando..." quando está carregando', () => {
    mockUseRegister.mockReturnValue({
      Register: mockRegister,
      isRegisterLoading: true,
    });

    render(<RegisterForm />);
    expect(
      screen.getByRole('button', { name: 'Continuando...' })
    ).toBeInTheDocument();
  });

  it('deve chamar Register com dados válidos ao submeter', async () => {
    render(<RegisterForm />);

    await userEvent.type(
      screen.getByPlaceholderText('Insira o seu nome'),
      'João Silva'
    );
    await userEvent.type(
      screen.getByPlaceholderText('Insira o seu e-mail'),
      'joao@email.com'
    );
    await userEvent.type(
      screen.getByPlaceholderText('Insira sua senha'),
      'senha123'
    );
    await userEvent.click(screen.getByRole('button', { name: 'Continuar' }));

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith(
        'João Silva',
        'joao@email.com',
        'senha123'
      );
    });
  });
});
