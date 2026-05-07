import { useState, useEffect, useRef } from 'react';
import type { Route } from './+types/callback';
import { useNavigate } from 'react-router';
import { useAuth } from '~/context/auth-context';

const AUTH_TIMEOUT_MS = 15000;

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Completing Sign In - Insighta' }];
}

export default function Callback() {
  const { checkAuth } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setError('Sign in took too long. Please try again.');
    }, AUTH_TIMEOUT_MS);

    const completeAuth = async () => {
      try {
        await checkAuth();
        clearTimeout(timeoutRef.current);
        navigate('/dashboard');
      } catch {
        clearTimeout(timeoutRef.current);
        navigate('/login?error=auth_failed');
      }
    };

    completeAuth();

    return () => clearTimeout(timeoutRef.current);
  }, [checkAuth, navigate]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <span className="text-xl text-red-600">!</span>
          </div>
          <h2 className="mt-4 text-lg font-semibold text-gray-900">Sign In Timed Out</h2>
          <p className="mt-1 text-sm text-gray-600">{error}</p>
          <button
            onClick={() => navigate('/login')}
            className="mt-6 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

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
