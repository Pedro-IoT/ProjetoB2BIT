import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DropdownMenu } from '../DropdownMenu';

vi.mock('@/components/ui/icons/Icones', () => ({
  IconeTresPontos: () => <svg data-testid="icon-tres-pontos" />,
}));

describe('DropdownMenu', () => {
  const items = [
    { label: 'Editar', onClick: vi.fn() },
    { label: 'Excluir', onClick: vi.fn(), variant: 'danger' as const },
  ];

  it('deve renderizar o botão de trigger', () => {
    render(<DropdownMenu items={items} />);
    expect(screen.getByRole('button', { name: 'Menu de opções' })).toBeInTheDocument();
  });

  it('não deve mostrar menu inicialmente', () => {
    render(<DropdownMenu items={items} />);
    expect(screen.queryByText('Editar')).not.toBeInTheDocument();
  });

  it('deve abrir menu ao clicar no trigger', async () => {
    render(<DropdownMenu items={items} />);

    await userEvent.click(screen.getByRole('button', { name: 'Menu de opções' }));

    expect(screen.getByText('Editar')).toBeInTheDocument();
    expect(screen.getByText('Excluir')).toBeInTheDocument();
  });

  it('deve chamar onClick do item e fechar menu', async () => {
    const onClickEditar = vi.fn();
    const testItems = [{ label: 'Editar', onClick: onClickEditar }];

    render(<DropdownMenu items={testItems} />);

    await userEvent.click(screen.getByRole('button', { name: 'Menu de opções' }));
    await userEvent.click(screen.getByText('Editar'));

    expect(onClickEditar).toHaveBeenCalledTimes(1);
    expect(screen.queryByText('Editar')).not.toBeInTheDocument();
  });
});
