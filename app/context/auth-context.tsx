import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  type ReactNode,
} from 'react';
import { useNavigate } from 'react-router';
import apiClient from '~/api/client';
import { bootstrapCsrf, getCsrfToken } from '~/api/csrf';

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
  checkAuth: () => Promise<User | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const navigate = useNavigate();
  const initialCheckDone = useRef(false);

  const checkAuth = useCallback(async () => {
    try {
      const refreshResponse = await apiClient.post('/auth/refresh');
      const userData = refreshResponse.data?.data?.user || refreshResponse.data?.user;
      if (userData) {
        setUser(userData);
        sessionStorage.setItem('insighta_user', JSON.stringify(userData));
        return userData;
      }
      return null;
    } catch {
      setUser(null);
      setCsrfToken(null);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialCheckDone.current) return;
    initialCheckDone.current = true;
    (async () => {
      await bootstrapCsrf();
      setCsrfToken(getCsrfToken());
      await checkAuth();
    })();
  }, [checkAuth]);

  const login = useCallback(() => {
    const frontendUrl = import.meta.env.VITE_API_BASE_URL;
    const oauthUrl = `${import.meta.env.VITE_GITHUB_OAUTH_URL}&redirect_uri=${encodeURIComponent(`${frontendUrl}/auth/github/callback`)}`;
    window.location.href = oauthUrl;
  }, []);

  const logout = useCallback(async () => {
    try {
      await apiClient.post('/auth/logout');
    } catch {
    } finally {
      setUser(null);
      setCsrfToken(null);
      navigate('/login');
    }
  }, [navigate]);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated: !!user,
      csrfToken,
      login,
      logout,
      checkAuth,
    }),
    [user, isLoading, csrfToken, login, logout, checkAuth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
