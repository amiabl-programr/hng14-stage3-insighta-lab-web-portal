# Implementation Plan — Insighta Lab Web Portal (Frontend)

Current state: ~40% done. Auth, dashboard, and account pages work. Profiles list, profile detail, and search are stubs. No shared layout/navigation. No tests.

---

## Branch 1 — Frontend Profiles & Search

**Branch:** `feat/frontend-profiles`

Replace the 3 stub pages with full implementations connected to the backend API. Build reusable profile components.

| Task | Details |
|------|---------|
| `app/routes/profiles.tsx` | Profiles list page with pagination, filters (gender, country, age group), sorting, and a data table |
| `app/routes/profile.tsx` | Profile detail page displaying all fields |
| `app/routes/search.tsx` | Natural language search page with query input + results display |
| Shared components | `ProfileTable`, `ProfileCard`, `FilterBar`, `Pagination` |
| React Query | Migrate from raw `useEffect`/`apiClient` to `useQuery`/`useMutation` for profile and search endpoints |
| Loading states | Skeleton loaders for list and detail views |
| Empty/error states | Handle no results, API errors, and missing data gracefully |

**Files affected:** `app/routes/profiles.tsx`, `app/routes/profile.tsx`, `app/routes/search.tsx`, new components in `app/components/`

---

## Branch 2 — Frontend Layout & Navigation

**Branch:** `feat/frontend-layout`

Add a shared app shell with sidebar/navbar, error boundaries, and consistent page structure.

| Task | Details |
|------|---------|
| `app/components/app-shell.tsx` | Shared layout with sidebar (Dashboard, Profiles, Search, Account) and top navbar |
| `app/root.tsx` (update) | Wrap `<Outlet />` with `AppShell` |
| `app/components/error-boundary.tsx` | React error boundary with fallback UI |
| Nav icons | Use `lucide-react` for sidebar and navbar icons |
| Active route highlighting | Highlight current nav item based on location |
| Responsive sidebar | Collapsible on mobile |
| `app/routes/_index.tsx` | Clean up orphaned file (routes.ts uses `home.tsx` as index) |

**Files affected:** `app/root.tsx`, `app/routes/home.tsx`, new files in `app/components/`

---

## Branch 3 — Dashboard & Account Polish

**Branch:** `feat/frontend-dashboard-polish`

Polish the existing dashboard and account pages — migrate to React Query, add real metrics, improve UX.

| Task | Details |
|------|---------|
| Dashboard React Query | Replace `useState`/`useEffect` patterns with `useQuery` for profiles fetch |
| Dashboard metrics | Show real counts/insights from API data |
| Loading skeletons | Add skeleton states for dashboard widgets |
| Account page | Improve user info display, add loading state, better error handling |
| `app/routes/callback.tsx` | Clean up OAuth callback, handle edge cases |

**Files affected:** `app/routes/dashboard.tsx`, `app/routes/account.tsx`, `app/routes/callback.tsx`

---

## Branch 4 — Testing

**Branch:** `feat/frontend-testing`

Add test infrastructure and frontend tests.

| Task | Details |
|------|---------|
| Install deps | `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`, `msw` |
| `vitest.config.ts` | Test runner config with jsdom environment |
| Component tests | AuthGuard, login page, dashboard |
| Hook tests | Auth context provider |
| Route smoke tests | Ensure all pages render without crashing |

**Files created:** `vitest.config.ts`, `app/__tests__/*`

---

## Branch 5 — CI/CD & Deployment

**Branch:** `feat/frontend-deployment`

Set up CI pipeline, update Docker/Vercel configs, and add environment documentation.

| Task | Details |
|------|---------|
| `.github/workflows/ci.yml` | Lint → typecheck → test → build pipeline |
| `.github/workflows/deploy.yml` | Deploy to Vercel on push to main |
| `Dockerfile` (verify) | Ensure it correctly builds and serves the React Router app |
| `.env.example` (update) | Document all required frontend env vars |
| `README.md` (update) | Setup instructions, env vars, API expectations |

**Files created:** `.github/workflows/*`, updated `Dockerfile`, `README.md`

---

## Order & Dependencies

```
Branch 1 (profiles) ──→ Branch 2 (layout) ──→ Branch 3 (dashboard)
                                                      │
                                                      └──→ Branch 4 (testing) ──→ Branch 5 (CI/CD)
```

Branches 2 and 3 can be developed concurrently if needed.




                                                                        
                                                         ## Summary     
Fixes the auth flow by removing dependency on the non-existent `/auth/me` endpoint. 
The backend API (per `server.md`) only has `/auth/github`, `/auth/github/callback`, `/  
auth/refresh`, and `/auth/logout` — no `/auth/me`.                                  
                                                                                             
## Changes   
   
- **`auth-context.tsx`** — `checkAuth()` now tries `POST /auth/refresh` first (reads  
HTTP-only cookies), falls back to `GET /api/profiles?limit=1` to verify auth. User    
data cached in `sessionStorage` for persistence across refreshes.
  
- **`callback.tsx`** — Detects `?token=ok` query param (set by backend after 
successful OAuth) and redirects to `/dashboard`. Removed broken timeout-based error
handling and stale `clientLoader`.    
   
- **`client.ts`** — Removed `window.location.href` redirects from axios 401/403  
interceptor. These caused full page navigations that bypass React state. Auth guards (
`AuthGuard`/`RoleGuard`) now handle redirection cleanly.
   
- **`root.tsx`** — Added React Router route-level `ErrorBoundary` export that renders   
a clean 404 page for unmatched URLs (e.g., Chrome DevTools probe requests) instead of   
throwing an unhandled `ErrorResponse`.
   
- **`account.tsx`** — Uses `isAuthenticated` instead of `user` for auth gate; added
fallback view when user data is unavailable (no `/auth/me` endpoint).    
                                  