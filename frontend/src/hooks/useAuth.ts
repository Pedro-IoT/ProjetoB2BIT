import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { login, register } from '@/services/ApiService';
import { useAuthStore } from '@/store/authStore';
import { toast } from 'react-toastify';

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const setToken = useAuthStore(state => state.setToken);
  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login({ email, password }),
    mutationKey: ['login'],
    onSuccess: data => {
      setToken(data.token);
      navigate({ to: '/feed' });
    },
    onError: () => {
      toast.error('Falha no login. Verifique suas credenciais.');
    },
  });

  const handleLogin = async (email: string, password: string) => {
    await toast.promise(loginMutation.mutateAsync({ email, password }), {
      pending: 'Realizando login...',
      success: 'Login realizado com sucesso!',
      error: 'Falha no login. Verifique suas credenciais.',
    });
  };

  return { Login: handleLogin, isLoginLoading: loginMutation.isPending };
};

export const useRegister = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const registerMutation = useMutation({
    mutationFn: ({
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    }) => register({ name, email, password }),
    mutationKey: ['register'],
    onSuccess: () => {
      navigate({ to: '/feed' });
    },
    onError: () => {
      toast.error('Falha no registro. Verifique suas informações.');
    },
  });

  const handleRegister = async (
    name: string,
    email: string,
    password: string
  ) => {
    await toast.promise(
      registerMutation.mutateAsync({ name, email, password }),
      {
        pending: 'Realizando registro...',
        success: 'Registro realizado com sucesso!',
        error: 'Falha no registro. Verifique suas informações.',
      }
    );
  };

  return {
    Register: handleRegister,
    isRegisterLoading: registerMutation.isPending,
  };
};
