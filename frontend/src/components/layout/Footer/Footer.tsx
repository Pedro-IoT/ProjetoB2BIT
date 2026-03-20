import { useLocation } from '@tanstack/react-router';
import { ButtonTheme } from '@/components/ui/Button/ButtonTheme';

export default function Footer() {
  const { pathname } = useLocation();

  const isAuthPage = pathname === '/login' || pathname === '/register';
  const isFeedPage = pathname === '/feed' || pathname === '/';

  if (isAuthPage) {
    return (
      <footer className="text-footer-500 hover:text-primary fixed right-14 bottom-5 z-50">
        <ButtonTheme />
      </footer>
    );
  }

  if (isFeedPage) {
    return (
      <footer className="w-full px-4 py-3">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <h2 className="text-footer-500 text-sm font-semibold">Feed</h2>
          <ButtonTheme />
        </div>
      </footer>
    );
  }

  return null;
}
