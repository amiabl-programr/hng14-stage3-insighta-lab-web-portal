import type { Route } from './+types/profiles';
import { AuthGuard } from '~/components/auth-guard';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Profiles - Insighta' }, { name: 'description', content: 'Browse profiles' }];
}

export default function Profiles() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-8 text-3xl font-bold text-gray-900">Profiles</h1>
          <p className="text-gray-600">Profiles list coming soon...</p>
        </div>
      </div>
    </AuthGuard>
  );
}
