import type { Route } from './+types/login';
import { Form, useSearchParams } from 'react-router';
import { useAuth } from '~/context/auth-context';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Login - Insighta' }, { name: 'description', content: 'Login to Insighta' }];
}

export default function Login() {
  const { login, isLoading } = useAuth();
  const [searchParams] = useSearchParams();
  const sessionExpired = searchParams.get('session') === 'expired';
  const error = searchParams.get('error');

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Insighta</h1>
          <p className="mt-2 text-gray-600">Sign in to your account</p>
        </div>

        {sessionExpired && (
          <div className="rounded-md bg-yellow-50 p-4">
            <p className="text-sm text-yellow-800">
              Your session has expired. Please sign in again.
            </p>
          </div>
        )}

        {error === 'forbidden' && (
          <div className="rounded-md bg-red-50 p-4">
            <p className="text-sm text-red-800">
              You don't have permission to access this resource.
            </p>
          </div>
        )}

        <div className="rounded-lg bg-white p-8 shadow-md">
          <button
            onClick={login}
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-3 rounded-md border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50 disabled:opacity-50"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            Sign in with GitHub
          </button>
        </div>
      </div>
    </div>
  );
}
