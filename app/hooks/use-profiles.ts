import { useQuery } from '@tanstack/react-query';
import apiClient from '~/api/client';
import type { Profile, ProfilesResponse, ProfileFilters } from '~/types/profile';

export function useProfiles(filters: ProfileFilters) {
  return useQuery<ProfilesResponse>({
    queryKey: ['profiles', filters],
    queryFn: async () => {
      const params: Record<string, string | number | undefined> = {};
      if (filters.gender) params.gender = filters.gender;
      if (filters.country_id) params.country_id = filters.country_id;
      if (filters.age_group) params.age_group = filters.age_group;
      if (filters.min_age !== undefined) params.min_age = filters.min_age;
      if (filters.max_age !== undefined) params.max_age = filters.max_age;
      if (filters.sort_by) params.sort_by = filters.sort_by;
      if (filters.order) params.order = filters.order;
      if (filters.page) params.page = filters.page;
      if (filters.limit) params.limit = filters.limit;

      const response = await apiClient.get('/api/profiles', { params });
      return response.data;
    },
    placeholderData: (previousData) => previousData,
  });
}

export function useProfile(id: string) {
  return useQuery<{ status: string; data: Profile }>({
    queryKey: ['profile', id],
    queryFn: async () => {
      const response = await apiClient.get(`/api/profiles/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
}

export function useProfileSearch(q: string, page = 1, limit = 10) {
  return useQuery<ProfilesResponse>({
    queryKey: ['profileSearch', q, page, limit],
    queryFn: async () => {
      const response = await apiClient.get('/api/profiles/search', {
        params: { q, page, limit },
      });
      return response.data;
    },
    enabled: !!q,
    placeholderData: (previousData) => previousData,
  });
}
