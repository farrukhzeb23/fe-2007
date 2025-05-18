/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthUser } from '../types';
import { getUser } from '../api/gist.api';

interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
}

interface AuthContextType extends AuthState {
  login: () => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({ ...initialState, loading: true });

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async () => {
    try {
      setAuthState((prev) => ({ ...prev, loading: true, error: null }));

      const userData = await getUser();

      // Save authentication in localStorage
      localStorage.setItem('isAuthenticated', 'true');

      setAuthState({
        isAuthenticated: true,
        user: userData,
        loading: false,
        error: null,
      });
    } catch (error) {
      setAuthState((prev) => ({
        ...prev,
        loading: false,
        error: 'Authentication failed. Please check your token.',
      }));

      console.error('Login error:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('isAuthenticated');

    setAuthState(initialState);
  };

  const checkAuth = async (): Promise<boolean> => {
    const isAuth = localStorage.getItem('isAuthenticated') === 'true';

    if (isAuth) {
      try {
        const userData = await getUser();

        setAuthState({
          isAuthenticated: true,
          user: userData,
          loading: false,
          error: null,
        });

        return true;
      } catch (error) {
        console.error('Error checking authentication:', error);

        // If token is invalid, clear auth state
        localStorage.removeItem('isAuthenticated');

        setAuthState({
          isAuthenticated: false,
          user: null,
          loading: false,
          error: 'Session expired. Please login again.',
        });

        return false;
      }
    } else {
      setAuthState((prev) => ({ ...prev, loading: false }));
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
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
