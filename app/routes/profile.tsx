import type { Route } from './+types/profile';
import { AuthGuard } from '~/components/auth-guard';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Profile - Insighta' },
    { name: 'description', content: 'View profile details' },
  ];
}

export default function Profile() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-8 text-3xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600">Profile detail coming soon...</p>
        </div>
      </div>
    </AuthGuard>
  );
}
