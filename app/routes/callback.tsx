import type { Route } from './+types/callback';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '~/context/auth-context';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Completing Sign In - Insighta' }];
}

export default function Callback() {
  const { checkAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const completeAuth = async () => {
      try {
        await checkAuth();
        navigate('/dashboard');
      } catch {
        navigate('/login?error=auth_failed');
      }
    };

    completeAuth();
  }, [checkAuth, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
        <p className="mt-4 text-gray-600">Completing sign in...</p>
      </div>
    </div>
  );
}

export function clientLoader() {
  return null;
}
