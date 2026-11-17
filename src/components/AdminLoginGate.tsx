'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import {
  ShieldCheck,
  Lock,
  Mail,
  KeyRound,
  ArrowRight,
  AlertCircle,
  Eye,
  EyeOff,
  UserCheck,
  Sparkles,
  ArrowLeft,
} from 'lucide-react';

export function AdminLoginGate() {
  const { loginAdmin } = useAuth();
  const [email, setEmail] = useState('admin@nepviet.vn');
  const [password, setPassword] = useState('Admin@123');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    setTimeout(() => {
      const res = loginAdmin(email, password);
      setIsLoading(false);
      if (!res.success) {
        setErrorMessage(res.message);
      }
    }, 400);
  };

  const handleFillAccount = (role: 'admin' | 'staff') => {
    if (role === 'admin') {
      setEmail('admin@nepviet.vn');
      setPassword('Admin@123');
    } else {
      setEmail('kho@nepviet.vn');
      setPassword('Kho@123');
    }
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen bg-stone-950 flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-nepred-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-nepgold-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-md w-full space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-nepred-600 text-white font-serif text-2xl font-bold shadow-xl shadow-nepred-600/30 mb-2 border border-nepred-500/40">
            NV
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide">
            NẾP VIỆT ADMIN PORTAL
          </h1>
          <p className="text-xs text-stone-400">
            Hệ thống quản trị thương mại điện tử & di sản thủ công
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-stone-900/90 backdrop-blur-xl border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-stone-800">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Xác Thực Phân Quyền</span>
            </div>
            <span className="text-[10px] text-stone-500 bg-stone-800/80 px-2 py-0.5 rounded-full border border-stone-700">
              Bảo mật 2 lớp
            </span>
          </div>

          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-800/80 text-xs text-red-200 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-stone-300">Tài khoản Email quản trị</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@nepviet.vn"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-nepred-500 focus:ring-1 focus:ring-nepred-500 transition-colors"
                />
                <Mail className="w-4 h-4 text-stone-500 absolute left-3 top-3" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-stone-300">Mật khẩu</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-nepred-500 focus:ring-1 focus:ring-nepred-500 transition-colors font-mono"
                />
                <KeyRound className="w-4 h-4 text-stone-500 absolute left-3 top-3" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-stone-500 hover:text-stone-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-nepred-600 hover:bg-nepred-700 text-white font-bold text-xs shadow-lg shadow-nepred-600/30 transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
            >
              <span>{isLoading ? 'Đang xác thực bảo mật...' : 'Đăng Nhập Quản Trị'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Switcher (Role-based Accounts) */}
          <div className="space-y-2.5 pt-4 border-t border-stone-800">
            <p className="text-[11px] font-bold text-stone-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Tài khoản thử nghiệm phân quyền (Bấm để điền):</span>
            </p>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleFillAccount('admin')}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  email === 'admin@nepviet.vn'
                    ? 'bg-nepred-950/60 border-nepred-500/80 text-white ring-1 ring-nepred-500/50'
                    : 'bg-stone-950/70 border-stone-800 text-stone-400 hover:border-stone-700'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-nepred-500" />
                  <span className="font-bold text-xs text-white">Admin Master</span>
                </div>
                <p className="text-[10px] text-stone-500 mt-0.5">Toàn quyền hệ thống</p>
              </button>

              <button
                type="button"
                onClick={() => handleFillAccount('staff')}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  email === 'kho@nepviet.vn'
                    ? 'bg-amber-950/60 border-amber-500/80 text-white ring-1 ring-amber-500/50'
                    : 'bg-stone-950/70 border-stone-800 text-stone-400 hover:border-stone-700'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="font-bold text-xs text-white">Quản Lý Kho</span>
                </div>
                <p className="text-[10px] text-stone-500 mt-0.5">Xem đơn &amp; tồn kho</p>
              </button>
            </div>
          </div>
        </div>

        {/* Back to Storefront Link */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Quay về Website Nếp Việt</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
