import type { Route } from './+types/account';
import { useNavigate } from 'react-router';
import { useAuth } from '~/context/auth-context';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Account - Insighta' }, { name: 'description', content: 'Manage your account' }];
}

function AccountSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="mb-8 h-9 w-32 rounded bg-gray-200" />
      <div className="rounded-lg bg-white p-6 shadow">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-gray-200" />
          <div>
            <div className="mb-1 h-5 w-40 rounded bg-gray-200" />
            <div className="h-4 w-56 rounded bg-gray-200" />
          </div>
        </div>
        <div className="mt-6 space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex justify-between border-b pb-3">
              <div className="h-4 w-16 rounded bg-gray-200" />
              <div className="h-4 w-24 rounded bg-gray-200" />
            </div>
          ))}
        </div>
        <div className="mt-8">
          <div className="h-10 w-28 rounded-md bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

export default function Account() {
  const { user, logout, isLoading } = useAuth();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-12">
        <div className="mx-auto max-w-2xl">
          <AccountSkeleton />
        </div>
      </div>
    );
  }

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">Account</h1>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center gap-4">
            <img src={user.avatar_url} alt={user.username} className="h-16 w-16 rounded-full" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{user.username}</h2>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex justify-between border-b pb-3">
              <span className="text-gray-600">Role</span>
              <span className="font-medium capitalize">{user.role}</span>
            </div>
            <div className="flex justify-between border-b pb-3">
              <span className="text-gray-600">Status</span>
              <span className={`font-medium ${user.is_active ? 'text-green-600' : 'text-red-600'}`}>
                {user.is_active ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="flex justify-between border-b pb-3">
              <span className="text-gray-600">Last Login</span>
              <span className="font-medium">
                {user.last_login_at ? new Date(user.last_login_at).toLocaleString() : 'Never'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Account Created</span>
              <span className="font-medium">{new Date(user.created_at).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={logout}
              className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
