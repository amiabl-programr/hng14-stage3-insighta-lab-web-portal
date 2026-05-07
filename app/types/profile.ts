export interface Profile {
  id: string;
  name: string;
  gender: string;
  country_id: string;
  country_name: string;
  age_group: string;
  age: number | null;
  created_at: string;
}

export interface ProfilesResponse {
  status: string;
  page: number;
  limit: number;
  total: number;
  total_pages: number;
  links: {
    self: string | null;
    next: string | null;
    prev: string | null;
  };
  data: Profile[];
}

export interface ProfileFilters {
  gender?: string;
  country_id?: string;
  age_group?: string;
  min_age?: number;
  max_age?: number;
  sort_by?: string;
  order?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}
