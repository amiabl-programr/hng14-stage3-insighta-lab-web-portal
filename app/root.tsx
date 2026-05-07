import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  isRouteErrorResponse,
  useRouteError,
} from 'react-router';
import { QueryProvider } from './context/query-provider';
import { AuthProvider } from './context/auth-context';
import AppShell from './components/app-shell';
import AppErrorBoundary from './components/error-boundary';
import type { LinksFunction } from 'react-router';

import './tailwind.css';

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
];

export default function App() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body suppressHydrationWarning>
        <AuthProvider>
          <QueryProvider>
            <AppErrorBoundary>
              <AppShell>
                <Outlet />
              </AppShell>
            </AppErrorBoundary>
          </QueryProvider>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md text-center">
          <h1 className="text-6xl font-bold text-gray-300">404</h1>
          <p className="mt-4 text-lg text-gray-600">Page not found</p>
          <Link
            to="/dashboard"
            className="mt-8 inline-block rounded-md bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-900">Something went wrong</h1>
        <p className="mt-2 text-gray-600">
          {error instanceof Error ? error.message : 'An unexpected error occurred'}
        </p>
      </div>
    </div>
  );
}
