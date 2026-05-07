import { Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import type { Route } from './+types/dashboard';
import { AuthGuard } from '~/components/auth-guard';
import apiClient from '~/api/client';
import type { ProfilesResponse } from '~/types/profile';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Dashboard - Insighta' },
    { name: 'description', content: 'Insighta Dashboard' },
  ];
}

function CardSkeleton() {
  return (
    <div className="animate-pulse rounded-lg bg-white p-6 shadow">
      <div className="mb-2 h-4 w-24 rounded bg-gray-200" />
      <div className="h-8 w-20 rounded bg-gray-200" />
    </div>
  );
}

function TableSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-lg bg-white shadow">
      <div className="flex gap-16 border-b border-gray-200 bg-gray-50 px-6 py-3">
        <div className="h-3 w-16 rounded bg-gray-200" />
        <div className="h-3 w-16 rounded bg-gray-200" />
        <div className="h-3 w-16 rounded bg-gray-200" />
        <div className="h-3 w-16 rounded bg-gray-200" />
      </div>
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex gap-16 border-b border-gray-100 px-6 py-4">
          <div className="h-4 w-32 rounded bg-gray-200" />
          <div className="h-4 w-20 rounded bg-gray-200" />
          <div className="h-4 w-16 rounded bg-gray-200" />
          <div className="h-4 w-24 rounded bg-gray-200" />
        </div>
      ))}
    </div>
  );
}

export default function Dashboard() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const response = await apiClient.get<ProfilesResponse>('/api/profiles', {
        params: { page: 1, limit: 5, sort_by: 'created_at', order: 'desc' },
      });
      return {
        total: response.data.total || 0,
        recentProfiles: response.data.data || [],
      };
    },
  });

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-8 text-3xl font-bold text-gray-900">Dashboard</h1>

          {isError && (
            <div className="mb-6 rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-800">
                {error instanceof Error ? error.message : 'Failed to load dashboard data'}
              </p>
            </div>
          )}

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {isLoading ? (
              <>
                <CardSkeleton />
                <CardSkeleton />
              </>
            ) : (
              <>
                <div className="rounded-lg bg-white p-6 shadow">
                  <p className="text-sm font-medium text-gray-600">Total Profiles</p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">
                    {data?.total.toLocaleString() ?? '-'}
                  </p>
                </div>
                <div className="rounded-lg bg-white p-6 shadow">
                  <p className="text-sm font-medium text-gray-600">Recent Profiles</p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">
                    {data?.recentProfiles.length ?? 0}
                  </p>
                </div>
              </>
            )}
          </div>

          <div className="mt-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Recent Profiles</h2>
              <Link
                to="/profiles"
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                View all
              </Link>
            </div>

            {isLoading ? (
              <TableSkeleton />
            ) : data?.recentProfiles.length ? (
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
                    {data.recentProfiles.map((profile) => (
                      <tr key={profile.id} className="hover:bg-gray-50">
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                          <Link
                            to={`/profiles/${profile.id}`}
                            className="text-blue-600 hover:underline"
                          >
                            {profile.name}
                          </Link>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm capitalize text-gray-600">
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
              <div className="rounded-lg bg-white p-8 text-center shadow">
                <p className="text-gray-500">No profiles found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
