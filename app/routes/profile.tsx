import { useParams } from 'react-router';
import type { Route } from './+types/profile';
import { AuthGuard } from '~/components/auth-guard';
import { useProfile } from '~/hooks/use-profiles';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Profile - Insighta' },
    { name: 'description', content: 'View profile details' },
  ];
}

export default function Profile() {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useProfile(id || '');

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-8 text-3xl font-bold text-gray-900">Profile Details</h1>

          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
            </div>
          )}

          {isError && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-800">
                {error instanceof Error ? error.message : 'Failed to load profile'}
              </p>
            </div>
          )}

          {data?.data && (
            <div className="rounded-lg bg-white p-8 shadow">
              <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Name</dt>
                  <dd className="mt-1 text-lg font-semibold text-gray-900">{data.data.name}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Gender</dt>
                  <dd className="mt-1 text-lg capitalize text-gray-900">{data.data.gender}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Age</dt>
                  <dd className="mt-1 text-lg text-gray-900">{data.data.age ?? 'Not specified'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Age Group</dt>
                  <dd className="mt-1 text-lg capitalize text-gray-900">{data.data.age_group}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Country</dt>
                  <dd className="mt-1 text-lg text-gray-900">{data.data.country_id}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Created</dt>
                  <dd className="mt-1 text-lg text-gray-900">
                    {new Date(data.data.created_at).toLocaleDateString()}
                  </dd>
                </div>
              </dl>
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  );
}
