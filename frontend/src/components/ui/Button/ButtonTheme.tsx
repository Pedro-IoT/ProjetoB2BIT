import { useThemeStore } from '@/store/themeStore';
import { IconeSol, IconeLua } from '@/components/ui/icons/Icones';

export function ButtonTheme() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button onClick={toggleTheme} className="cursor-pointer">
      {theme === 'light' ? <IconeLua /> : <IconeSol />}
    </button>
  );
}
