import { Link } from 'react-router';
import type { Profile } from '~/types/profile';

interface ProfileTableProps {
  profiles: Profile[];
}

export default function ProfileTable({ profiles }: ProfileTableProps) {
  if (profiles.length === 0) {
    return (
      <div className="rounded-lg bg-white p-8 text-center shadow">
        <p className="text-gray-500">No profiles found.</p>
      </div>
    );
  }

  return (
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
              Age
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Age Group
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
          {profiles.map((profile) => (
            <tr key={profile.id} className="hover:bg-gray-50">
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                <Link to={`/profiles/${profile.id}`} className="text-blue-600 hover:underline">
                  {profile.name}
                </Link>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600 capitalize">
                {profile.gender}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                {profile.age ?? '-'}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600 capitalize">
                {profile.age_group}
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
  );
}
