import './styles/global.css';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { createRoot } from 'react-dom/client';
import { StrictMode, useEffect } from 'react';
import '@radix-ui/themes/styles.css';
import { useThemeStore } from './store/themeStore';

const router = createRouter({ routeTree: routeTree });
const queryClient = new QueryClient();

const App = () => {
  const theme = useThemeStore(state => state.theme);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
  }, [theme]);

  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
