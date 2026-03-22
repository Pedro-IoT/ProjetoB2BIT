import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '../Input';

describe('Input', () => {
  it('deve renderizar input básico', () => {
    render(<Input placeholder="Digite algo" />);
    expect(screen.getByPlaceholderText('Digite algo')).toBeInTheDocument();
  });

  it('deve renderizar label quando fornecida', () => {
    render(<Input label="Email" placeholder="Digite seu email" />);

    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('deve renderizar mensagem de erro', () => {
    render(<Input error="Campo obrigatório" />);
    expect(screen.getByText('Campo obrigatório')).toBeInTheDocument();
  });

  it('deve renderizar ícone à direita', () => {
    render(<Input rightIcon={<span data-testid="icon">🔍</span>} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('deve aceitar digitação', async () => {
    const handleChange = vi.fn();
    render(<Input placeholder="Digite" onChange={handleChange} />);

    await userEvent.type(screen.getByPlaceholderText('Digite'), 'teste');
    expect(handleChange).toHaveBeenCalled();
  });

  it('deve aplicar classe de erro quando há erro', () => {
    render(<Input error="Erro" data-testid="input" />);
    expect(screen.getByTestId('input')).toHaveClass('border-red-500');
  });
});
