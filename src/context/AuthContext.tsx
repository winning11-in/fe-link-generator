import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { authAPI } from '../services/api';
import { AuthContext, type AuthContextType } from './AuthContextDef';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthContextType['user']>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const initAuth = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          const response = await authAPI.getCurrentUser();
          setUser(response.user);
          setToken(storedToken);
        } catch {
          localStorage.removeItem('token');
          setToken(null);
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const data = await authAPI.signin({ email, password });
    localStorage.setItem('token', data.token);
    setToken(data.token);
    setUser({ _id: data._id, name: data.name, email: data.email });
  };

  const signup = async (name: string, email: string, password: string) => {
    const data = await authAPI.signup({ name, email, password });
    localStorage.setItem('token', data.token);
    setToken(data.token);
    setUser({ _id: data._id, name: data.name, email: data.email });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
