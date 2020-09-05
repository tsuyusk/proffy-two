import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  lastName: string;
  avatar_url: string;
  whatsapp: string;
  bio: string;
  class: {
    subject: string;
    cost: number;
    schedules: Array<{
      week_day: string;
      from: number;
      to: number;
    }>;
  };
}

interface SignInCredentials {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface AuthContextState {
  user: User;
  signIn: (data: SignInCredentials) => Promise<void>;
  updateUser: (user: User) => Promise<void>;
  signOut: () => void;
}

interface AuthDataState {
  user: User;
  token: string;
}

const AuthContext = createContext<AuthContextState>({} as AuthContextState);

const AuthProvider: React.FC = ({ children }) => {
  const [authData, setAuthData] = useState<AuthDataState>(() => {
    const user = localStorage.getItem('@Proffy/user');
    const token = localStorage.getItem('@Proffy/token');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthDataState;
  });

  const signIn = useCallback(
    async ({ email, password, rememberMe }: SignInCredentials) => {
      const response = await api.post('/sessions', {
        email,
        password,
      });

      const { token, user } = response.data;

      api.defaults.headers.authorization = `Bearer ${token}`;

      if (rememberMe) {
        localStorage.setItem('@Proffy/user', JSON.stringify(user));
        localStorage.setItem('@Proffy/token', token);
      }

      setAuthData({ token, user });
    },
    [],
  );

  const signOut = useCallback(() => {
    localStorage.removeItem('@Proffy/user');
    localStorage.removeItem('@Proffy/token');

    api.defaults.headers.authorization = '';
    setAuthData({} as AuthDataState);
  }, []);

  const updateUser = useCallback(async (user: User) => {
    localStorage.setItem('@Proffy/user', JSON.stringify(user));

    setAuthData(state => ({ ...state, user }));
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: authData.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const authData = useContext(AuthContext);

  if (!authData) {
    throw new Error('Cannot use useAuth outside a AuthProvider');
  }

  return authData;
}

export default AuthProvider;
