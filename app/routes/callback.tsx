import { useEffect } from 'react';
import type { Route } from './+types/callback';
import { useNavigate, useSearchParams } from 'react-router';
import { useAuth } from '~/context/auth-context';
import apiClient from '~/api/client';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Completing Sign In - Insighta' }];
}

export default function Callback() {
  const { checkAuth } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');

    if (token === 'ok') {
      const storeUser = async () => {
        try {
          const refreshResponse = await apiClient.post('/auth/refresh');
          const userData = refreshResponse.data?.data?.user || refreshResponse.data?.user;
          if (userData) {
            sessionStorage.setItem('insighta_user', JSON.stringify(userData));
          }
        } catch {}
      };
      storeUser();
      navigate('/dashboard', { replace: true });
      return;
    }

    const completeAuth = async () => {
      try {
        await checkAuth();
        navigate('/dashboard', { replace: true });
      } catch {
        navigate('/login?error=auth_failed', { replace: true });
      }
    };

    completeAuth();
  }, [checkAuth, navigate, searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
        <p className="mt-4 text-gray-600">Completing sign in...</p>
      </div>
    </div>
  );
}
