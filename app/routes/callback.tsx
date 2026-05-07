import { useEffect } from 'react';
import type { Route } from './+types/callback';
import { useNavigate } from 'react-router';
import { useAuth } from '~/context/auth-context';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Completing Sign In - Insighta' }];
}

export default function Callback() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;

    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    } else {
      navigate('/login?error=auth_failed', { replace: true });
    }
  }, [isLoading, isAuthenticated, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
        <p className="mt-4 text-gray-600">Completing sign in...</p>
      </div>
    </div>
  );
}
