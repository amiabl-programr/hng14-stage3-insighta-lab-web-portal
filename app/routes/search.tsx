import type { Route } from './+types/search';
import { AuthGuard } from '~/components/auth-guard';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Search - Insighta' }, { name: 'description', content: 'Search profiles' }];
}

export default function Search() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-8 text-3xl font-bold text-gray-900">Search</h1>
          <p className="text-gray-600">Search functionality coming soon...</p>
        </div>
      </div>
    </AuthGuard>
  );
}
