import { useState, useEffect } from 'react';
import type { Route } from './+types/dashboard';
import { AuthGuard } from '~/components/auth-guard';
import apiClient from '~/api/client';

interface DashboardStats {
  total: number;
  recentProfiles: Array<{
    id: string;
    name: string;
    gender: string;
    country_id: string;
    created_at: string;
  }>;
  isLoading: boolean;
  error: string | null;
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Dashboard - Insighta' },
    { name: 'description', content: 'Insighta Dashboard' },
  ];
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    total: 0,
    recentProfiles: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await apiClient.get('/api/profiles', {
          params: { page: 1, limit: 5, sort_by: 'created_at', order: 'desc' },
          headers: { 'X-API-Version': '1' },
        });

        setStats({
          total: response.data.total || 0,
          recentProfiles: response.data.data || [],
          isLoading: false,
          error: null,
        });
      } catch {
        setStats((prev) => ({
          ...prev,
          isLoading: false,
          error: 'Failed to load dashboard data',
        }));
      }
    };

    fetchDashboardData();
  }, []);

  if (stats.isLoading) {
    return (
      <AuthGuard>
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
        </div>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-8 text-3xl font-bold text-gray-900">Dashboard</h1>

          {stats.error && (
            <div className="mb-6 rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-800">{stats.error}</p>
            </div>
          )}

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-white p-6 shadow">
              <p className="text-sm font-medium text-gray-600">Total Profiles</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {stats.total.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">Recent Profiles</h2>
            {stats.recentProfiles.length > 0 ? (
              <div className="overflow-hidden rounded-lg bg-white shadow">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Gender
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Country
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Created
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {stats.recentProfiles.map((profile) => (
                      <tr key={profile.id} className="hover:bg-gray-50">
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                          {profile.name}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                          {profile.gender}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                          {profile.country_id}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                          {new Date(profile.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-600">No profiles found.</p>
            )}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
