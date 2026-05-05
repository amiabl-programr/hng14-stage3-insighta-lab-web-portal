import type { Route } from './+types/dashboard';
import { AuthGuard } from '~/components/auth-guard';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Dashboard - Insighta' },
    { name: 'description', content: 'Insighta Dashboard' },
  ];
}

export default function Dashboard() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-8 text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Dashboard content coming soon...</p>
        </div>
      </div>
    </AuthGuard>
  );
}
