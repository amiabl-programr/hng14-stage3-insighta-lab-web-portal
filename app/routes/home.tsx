import type { Route } from './+types/home';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '~/context/auth-context';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Insighta' }, { name: 'description', content: 'Insighta Profile Management' }];
}

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        navigate('/dashboard', { replace: true });
      } else {
        navigate('/login', { replace: true });
      }
    }
  }, [isAuthenticated, isLoading, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
    </div>
  );
}
