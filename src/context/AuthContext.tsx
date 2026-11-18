'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export interface User {
  id?: string;
  name: string;
  email: string;
  role?: 'admin' | 'staff' | 'artisan' | 'customer';
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'staff' | 'artisan'; // admin: toàn quyền, staff: kho/vận hành, artisan: luồng nghệ nhân đối tác
  lastLogin: string;
}

interface AuthContextType {
  // Customer Storefront Auth
  user: User | null;
  isLoggedIn: boolean;
  login: (name: string, email: string, role?: 'admin' | 'staff' | 'artisan' | 'customer') => void;
  logout: () => void;
  register: (name: string, email: string) => void;

  // Admin Dashboard Auth & RBAC (Phân quyền quản trị)
  adminUser: AdminUser | null;
  isAdminLoggedIn: boolean;
  loginAdmin: (email: string, pass: string) => { success: boolean; message: string };
  logoutAdmin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = 'nepviet_demo_user';
const ADMIN_STORAGE_KEY = 'nepviet_admin_auth_session_v1';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    // 1. Tải phiên khách hàng
    try {
      const stored = localStorage.getItem(USER_STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load user state', e);
    }

    // 2. Tải phiên đăng nhập quản trị Admin
    try {
      const storedAdmin = localStorage.getItem(ADMIN_STORAGE_KEY);
      if (storedAdmin) {
        setAdminUser(JSON.parse(storedAdmin));
      }
    } catch (e) {
      console.error('Failed to load admin session', e);
    }
  }, []);

  const login = (name: string, email: string, role?: 'admin' | 'staff' | 'artisan' | 'customer') => {
    const newUser: User = { name, email, role: role || 'customer' };
    setUser(newUser);
    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
    } catch (e) {
      console.error('Failed to save user session', e);
    }
  };

  const register = (name: string, email: string) => {
    login(name, email);
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(USER_STORAGE_KEY);
    } catch (e) {
      console.error('Failed to remove user session', e);
    }
  };

  // Xác thực đăng nhập Admin với phân quyền
  const loginAdmin = (emailInput: string, passInput: string): { success: boolean; message: string } => {
    const email = emailInput.trim().toLowerCase();
    const pass = passInput.trim();

    // 1. Tài khoản Giám Đốc / Admin Master (Toàn quyền)
    if (
      (email === 'admin@nepviet.vn' || email === 'admin') &&
      (pass === 'Admin@123' || pass === 'nepviet2026' || pass === '123456')
    ) {
      const masterAdmin: AdminUser = {
        id: 'admin-01',
        name: 'Admin Master',
        email: 'admin@nepviet.vn',
        role: 'admin',
        lastLogin: new Date().toLocaleString('vi-VN'),
      };
      setAdminUser(masterAdmin);
      localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(masterAdmin));
      return { success: true, message: 'Đăng nhập thành công với quyền Admin Master (Toàn quyền quản trị).' };
    }

    // 2. Tài khoản Nhân Viên Kho & Vận Hành (Staff - Giới hạn quyền)
    if (
      (email === 'kho@nepviet.vn' || email === 'staff') &&
      (pass === 'Kho@123' || pass === 'staff2026' || pass === '123456')
    ) {
      const staffAdmin: AdminUser = {
        id: 'staff-01',
        name: 'Trần Văn Kho (Quản Lý Vận Hành)',
        email: 'kho@nepviet.vn',
        role: 'staff',
        lastLogin: new Date().toLocaleString('vi-VN'),
      };
      setAdminUser(staffAdmin);
      localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(staffAdmin));
      return { success: true, message: 'Đăng nhập thành công với quyền Nhân Viên Vận Hành & Kho.' };
    }

    // 3. Tài khoản Nghệ Nhân / Đối Tác Làng Nghề (Artisan Partner Flow)
    if (
      (email === 'nghenhan@nepviet.vn' || email === 'artisan') &&
      (pass === 'Nghenhan@123' || pass === 'artisan2026' || pass === '123456')
    ) {
      const artisanAdmin: AdminUser = {
        id: 'artisan-01',
        name: 'Nghệ Nhân Bát Tràng & Phú Vinh',
        email: 'nghenhan@nepviet.vn',
        role: 'artisan',
        lastLogin: new Date().toLocaleString('vi-VN'),
      };
      setAdminUser(artisanAdmin);
      localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(artisanAdmin));
      return { success: true, message: 'Đăng nhập thành công với quyền Nghệ Nhân / Đối Tác Làng Nghề.' };
    }

    return {
      success: false,
      message: 'Sai email hoặc mật khẩu! Hãy dùng admin@nepviet.vn, nghenhan@nepviet.vn hoặc kho@nepviet.vn',
    };
  };

  const logoutAdmin = () => {
    setAdminUser(null);
    try {
      localStorage.removeItem(ADMIN_STORAGE_KEY);
    } catch (e) {
      console.error('Failed to remove admin session', e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        logout,
        register,
        adminUser,
        isAdminLoggedIn: !!adminUser,
        loginAdmin,
        logoutAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
