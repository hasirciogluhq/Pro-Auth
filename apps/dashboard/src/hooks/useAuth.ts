import { useMutation, useQuery } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loginStart, loginSuccess, loginFailure, logout } from '@/store/slices/authSlice';
import { authService } from '@/services/authService';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading, error } = useAppSelector(state => state.auth);

  // Session kontrolü
  const { data: sessionUser, isLoading: isCheckingSession } = useQuery({
    queryKey: ['session'],
    queryFn: authService.checkSession,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 dakika
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: authService.login,
    onMutate: () => {
      dispatch(loginStart());
    },
    onSuccess: (user) => {
      localStorage.setItem('auth_token', 'mock_token');
      dispatch(loginSuccess(user));
    },
    onError: (error: Error) => {
      dispatch(loginFailure(error.message));
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      dispatch(logout());
    },
  });

  const handleLogin = (username: string, password: string) => {
    loginMutation.mutate({ username, password });
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return {
    user: user || sessionUser,
    isAuthenticated: isAuthenticated || !!sessionUser,
    isLoading: isLoading || isCheckingSession || loginMutation.isPending,
    error: error || loginMutation.error?.message,
    login: handleLogin,
    logout: handleLogout,
    isLoggingOut: logoutMutation.isPending,
  };
}; 