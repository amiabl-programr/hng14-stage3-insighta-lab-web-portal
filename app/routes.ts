import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('login', 'routes/login.tsx'),
  route('auth/callback', 'routes/callback.tsx'),
  route('dashboard', 'routes/dashboard.tsx'),
  route('profiles', 'routes/profiles.tsx'),
  route('profiles/:id', 'routes/profile.tsx'),
  route('search', 'routes/search.tsx'),
  route('account', 'routes/account.tsx'),
] satisfies RouteConfig;
