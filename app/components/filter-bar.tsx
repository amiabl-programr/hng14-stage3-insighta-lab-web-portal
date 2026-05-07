import { useState } from 'react';

interface FilterBarProps {
  onApply: (filters: Record<string, string>) => void;
}

const GENDERS = ['', 'male', 'female'];
const AGE_GROUPS = ['', 'child', 'young', 'adult', 'middle-aged', 'elderly'];
const SORT_OPTIONS = [
  { value: '', label: 'Default' },
  { value: 'age', label: 'Age' },
  { value: 'created_at', label: 'Created' },
  { value: 'gender_probability', label: 'Gender Probability' },
];

export default function FilterBar({ onApply }: FilterBarProps) {
  const [gender, setGender] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const [country, setCountry] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [order, setOrder] = useState('asc');

  const handleApply = () => {
    const filters: Record<string, string> = {};
    if (gender) filters.gender = gender;
    if (ageGroup) filters.age_group = ageGroup;
    if (country) filters.country_id = country;
    if (sortBy) filters.sort_by = sortBy;
    filters.order = order;
    onApply(filters);
  };

  const handleReset = () => {
    setGender('');
    setAgeGroup('');
    setCountry('');
    setSortBy('');
    setOrder('asc');
    onApply({});
  };

  return (
    <div className="rounded-lg bg-white p-4 shadow">
      <div className="flex flex-wrap items-end gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-600">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="mt-1 rounded border border-gray-300 px-3 py-1.5 text-sm"
          >
            {GENDERS.map((g) => (
              <option key={g} value={g}>
                {g ? g.charAt(0).toUpperCase() + g.slice(1) : 'All'}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600">Age Group</label>
          <select
            value={ageGroup}
            onChange={(e) => setAgeGroup(e.target.value)}
            className="mt-1 rounded border border-gray-300 px-3 py-1.5 text-sm"
          >
            {AGE_GROUPS.map((a) => (
              <option key={a} value={a}>
                {a ? a.charAt(0).toUpperCase() + a.slice(1) : 'All'}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600">Country</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="e.g. NG, US"
            className="mt-1 rounded border border-gray-300 px-3 py-1.5 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600">Sort By</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="mt-1 rounded border border-gray-300 px-3 py-1.5 text-sm"
          >
            {SORT_OPTIONS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600">Order</label>
          <select
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="mt-1 rounded border border-gray-300 px-3 py-1.5 text-sm"
          >
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </div>

        <button
          onClick={handleApply}
          className="rounded bg-blue-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          Apply
        </button>
        <button
          onClick={handleReset}
          className="rounded border border-gray-300 px-4 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
