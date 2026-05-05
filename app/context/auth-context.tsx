import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useNavigate } from 'react-router';
import apiClient from '~/api/client';

interface User {
  id: string;
  username: string;
  email: string;
  avatar_url: string;
  role: 'admin' | 'analyst';
  is_active: boolean;
  last_login_at: string;
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  csrfToken: string | null;
  login: () => void;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const navigate = useNavigate();

  const checkAuth = async () => {
    try {
      const response = await apiClient.get('/auth/me');
      setUser(response.data.data);

      const csrfCookie = document.cookie
        .split('; ')
        .find((row) => row.startsWith(`${import.meta.env.VITE_CSRF_COOKIE_NAME}=`))
        ?.split('=')[1];
      setCsrfToken(csrfCookie || null);
    } catch {
      setUser(null);
      setCsrfToken(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = () => {
    const frontendUrl = import.meta.env.VITE_FRONTEND_URL;
    const callbackUrl = `${frontendUrl}/auth/callback`;
    const oauthUrl = `${import.meta.env.VITE_GITHUB_OAUTH_URL}&redirect_uri=${encodeURIComponent(callbackUrl)}`;
    window.location.href = oauthUrl;
  };

  const logout = async () => {
    try {
      await apiClient.post('/auth/logout');
    } catch {
    } finally {
      setUser(null);
      setCsrfToken(null);
      navigate('/login');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user && user.is_active,
        csrfToken,
        login,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
