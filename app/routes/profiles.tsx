import { useState } from 'react';
import type { Route } from './+types/profiles';
import { AuthGuard } from '~/components/auth-guard';
import FilterBar from '~/components/filter-bar';
import ProfileTable from '~/components/profile-table';
import Pagination from '~/components/pagination';
import { useProfiles } from '~/hooks/use-profiles';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Profiles - Insighta' }, { name: 'description', content: 'Browse profiles' }];
}

export default function Profiles() {
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [page, setPage] = useState(1);
  const limit = 10;

  const queryFilters = {
    page,
    limit,
    gender: filters.gender,
    age_group: filters.age_group,
    country: filters.country,
    sort_by: filters.sort_by,
    order: (filters.order as 'asc' | 'desc') || undefined,
  };

  const { data, isLoading, isError, error } = useProfiles(queryFilters);

  const handleApply = (newFilters: Record<string, string>) => {
    setFilters(newFilters);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-8 text-3xl font-bold text-gray-900">Profiles</h1>

          <div className="mb-6">
            <FilterBar onApply={handleApply} />
          </div>

          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
            </div>
          )}

          {isError && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-800">
                {error instanceof Error ? error.message : 'Failed to load profiles'}
              </p>
            </div>
          )}

          {data && (
            <>
              <div className="mb-4 text-sm text-gray-600">
                Showing {data.data.length} of {data.total.toLocaleString()} profiles
              </div>

              <ProfileTable profiles={data.data} />

              <div className="mt-6">
                <Pagination
                  page={data.page}
                  totalPages={data.total_pages}
                  onPageChange={handlePageChange}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </AuthGuard>
  );
}
