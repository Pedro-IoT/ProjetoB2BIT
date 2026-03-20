import { LoginForm } from '@/components/form/LoginForm/LoginForm';
import { Button } from '@/components/ui/Button/Button';
import { Link } from '@tanstack/react-router';

export const LoginPage = () => {
  return (
    <div className="bg-bg-100 flex h-full justify-center px-4 pt-30">
      <div className="w-full max-w-120 rounded-2xl">
        <h1 className="text-primary mb-14 text-center text-[40px] leading-[120%] font-bold tracking-[-0.27px]">
          Mini Twitter
        </h1>

        <div className="flex flex-col">
          <div className="flex w-full items-center">
            <Button variant="navigationActive" className="flex-1">
              Login
            </Button>
            <Button variant="navigationInactive" className="flex-1">
              <Link
                to="/register"
                className="flex h-full w-full items-center justify-center"
              >
                Cadastrar
              </Link>
            </Button>
          </div>

          <div className="mt-13 mb-8">
            <h2 className="text-primary mb-1 text-3xl font-bold">
              Olá, de novo!
            </h2>
            <p className="text-secondary-400 text-sm">
              {' '}
              Por favor, insira os seus dados para fazer login.
            </p>
          </div>

          <LoginForm />

          <footer className="text-footer-500 mt-10 text-center text-[12px] leading-4">
            Ao clicar em continuar, você concorda com nossos <br />
            <span className="underline">Termos de Serviço</span> e{' '}
            <span className="underline">Política de Privacidade</span>.
          </footer>
        </div>
      </div>
    </div>
  );
};
