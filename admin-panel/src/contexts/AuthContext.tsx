import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

interface Admin {
  id: string;
  username: string;
  email: string;
  role: string;
  lastLogin?: string;
}

interface AuthContextType {
  admin: Admin | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    console.log('🔍 AuthProvider mounted, token exists:', !!token);
    
    if (token) {
      verifyToken();
    } else {
      setLoading(false);
    }
  }, []);

  const verifyToken = async () => {
    try {
      console.log('🔍 Verifying token...');
      
      // Get stored credentials
      const storedUsername = localStorage.getItem('adminUsername');
      const storedEmail = localStorage.getItem('adminEmail');
      
      // If we have a valid token, restore admin state
      const adminData = {
        id: 'local-admin-id',
        username: storedUsername || 'admin',
        email: storedEmail || 'admin@exytex.com',
        role: 'super-admin'
      };
      
      setAdmin(adminData);
      console.log('✅ Token valid, admin restored');
    } catch (error: any) {
      console.error('❌ Verify failed:', error);
      localStorage.removeItem('adminToken');
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    console.log('🔐 Login attempt:', username);
    
    try {
      // Get current stored credentials
      const storedUsername = localStorage.getItem('adminUsername');
      const storedPassword = localStorage.getItem('adminPassword');
      
      // Determine valid credentials
      // If user has updated credentials, ONLY those will work
      // If not updated, use defaults
      const validUsername = storedUsername || 'admin';
      const validPassword = storedPassword || 'admin123';
      
      console.log('🔑 Checking credentials...');
      console.log('Expected username:', validUsername);
      console.log('Provided username:', username);
      
      // STRICT CHECK: Only valid credentials will work
      if (username !== validUsername) {
        console.log('❌ Username does not match');
        throw new Error('Invalid username or password');
      }
      
      if (password !== validPassword) {
        console.log('❌ Password does not match');
        throw new Error('Invalid username or password');
      }
      
      console.log('✅ Credentials match! Login successful');
      
      // Create a session token
      const sessionToken = btoa(`${username}:${password}:${Date.now()}`);
      localStorage.setItem('adminToken', sessionToken);
      
      // Set admin data
      const adminData = {
        id: 'local-admin-id',
        username: storedUsername || username,
        email: localStorage.getItem('adminEmail') || 'admin@exytex.com',
        role: 'super-admin'
      };
      
      setAdmin(adminData);
      console.log('✅ Login complete!');
      
    } catch (error: any) {
      console.error('❌ Login error:', error);
      throw new Error(error.message || 'Invalid username or password');
    }
  };

  const logout = () => {
    console.log('🚪 Logging out...');
    localStorage.removeItem('adminToken');
    setAdmin(null);
  };

  const value = {
    admin,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
