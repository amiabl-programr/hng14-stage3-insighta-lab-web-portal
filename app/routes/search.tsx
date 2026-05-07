import { useState } from 'react';
import type { Route } from './+types/search';
import { AuthGuard } from '~/components/auth-guard';
import ProfileTable from '~/components/profile-table';
import Pagination from '~/components/pagination';
import { useProfileSearch } from '~/hooks/use-profiles';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Search - Insighta' }, { name: 'description', content: 'Search profiles' }];
}

export default function Search() {
  const [query, setQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useProfileSearch(submittedQuery, page, 10);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setSubmittedQuery(query.trim());
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-8 text-3xl font-bold text-gray-900">Search Profiles</h1>

          <form onSubmit={handleSearch} className="mb-8">
            <div className="flex gap-3">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. young males from nigeria"
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!query.trim()}
                className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
              >
                Search
              </button>
            </div>
          </form>

          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
            </div>
          )}

          {isError && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-800">
                {error instanceof Error ? error.message : 'Search failed'}
              </p>
            </div>
          )}

          {data && submittedQuery && (
            <>
              <div className="mb-4 text-sm text-gray-600">
                Found {data.total.toLocaleString()} result{data.total !== 1 ? 's' : ''} for{' '}
                <strong>"{submittedQuery}"</strong>
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

          {!submittedQuery && !isLoading && (
            <div className="rounded-lg bg-white p-12 text-center shadow">
              <p className="text-gray-500">Enter a natural language query to search profiles.</p>
              <p className="mt-2 text-sm text-gray-400">
                Try: "young males from nigeria" or "women over 30 in ghana"
              </p>
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  );
}
