import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ButtonTheme } from '../ButtonTheme';
import { useThemeStore } from '@/store/themeStore';

vi.mock('@/store/themeStore', () => ({
  useThemeStore: vi.fn(),
}));

vi.mock('@/components/ui/icons/Icones', () => ({
  IconeSol: () => <svg data-testid="icon-sol" />,
  IconeLua: () => <svg data-testid="icon-lua" />,
}));

const mockUseThemeStore = useThemeStore as unknown as Mock;

describe('ButtonTheme', () => {
  const mockToggleTheme = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve renderizar ícone de lua quando tema é light', () => {
    mockUseThemeStore.mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme,
    });

    render(<ButtonTheme />);
    expect(screen.getByTestId('icon-lua')).toBeInTheDocument();
  });

  it('deve renderizar ícone de sol quando tema é dark', () => {
    mockUseThemeStore.mockReturnValue({
      theme: 'dark',
      toggleTheme: mockToggleTheme,
    });

    render(<ButtonTheme />);
    expect(screen.getByTestId('icon-sol')).toBeInTheDocument();
  });

  it('deve chamar toggleTheme quando clicado', async () => {
    mockUseThemeStore.mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme,
    });

    render(<ButtonTheme />);
    await userEvent.click(screen.getByRole('button'));

    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });
});
