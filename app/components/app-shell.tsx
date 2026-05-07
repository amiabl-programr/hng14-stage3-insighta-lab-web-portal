import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { LayoutDashboard, Users, Search, User, Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '~/context/auth-context';

const PUBLIC_ROUTES = ['/login', '/auth/callback'];

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/profiles', label: 'Profiles', icon: Users },
  { to: '/search', label: 'Search', icon: Search },
  { to: '/account', label: 'Account', icon: User },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (PUBLIC_ROUTES.includes(pathname)) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-gray-200 bg-white transition-transform duration-200 lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-gray-200 px-6">
          <Link to="/dashboard" className="text-xl font-bold text-gray-900">
            Insighta
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded p-1 text-gray-500 hover:bg-gray-100 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav
          className="flex flex-1 flex-col justify-between px-3 py-4"
          style={{ height: 'calc(100% - 4rem)' }}
        >
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.to || pathname.startsWith(item.to + '/');
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="border-t border-gray-200 pt-4">
            {user && (
              <div className="mb-3 flex items-center gap-3 px-3">
                <img src={user.avatar_url} alt={user.username} className="h-8 w-8 rounded-full" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900">{user.username}</p>
                  <p className="truncate text-xs text-gray-500 capitalize">{user.role}</p>
                </div>
              </div>
            )}
            <button
              onClick={logout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              <LogOut className="h-5 w-5" />
              Sign Out
            </button>
          </div>
        </nav>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-gray-200 bg-white px-4 lg:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded p-1 text-gray-500 hover:bg-gray-100 lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex-1" />
        </header>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
