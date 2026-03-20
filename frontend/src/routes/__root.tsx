import { Outlet, createRootRoute } from '@tanstack/react-router';
import { ToastContainer } from 'react-toastify/unstyled';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Footer from '@/components/layout/Footer/Footer';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="bg-bg-100 flex min-h-dvh flex-col">
      <ToastContainer position="top-right" autoClose={3000} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      {/** <TanStackRouterDevtools /> */}
      <TanStackRouterDevtools />
    </div>
  );
}
