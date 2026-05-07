import { Links, Meta, Outlet, Scripts } from 'react-router';
import { QueryProvider } from './context/query-provider';
import { AuthProvider } from './context/auth-context';
import AppShell from './components/app-shell';
import ErrorBoundary from './components/error-boundary';
import type { LinksFunction } from 'react-router';

import './tailwind.css';

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <AuthProvider>
          <QueryProvider>
            <ErrorBoundary>
              <AppShell>
                <Outlet />
              </AppShell>
            </ErrorBoundary>
          </QueryProvider>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}
