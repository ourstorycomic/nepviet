'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Eye, EyeOff, Lock, Mail, ArrowRight, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Vui lòng nhập địa chỉ email');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email.trim())) {
      setError('Email không đúng định dạng');
      return;
    }
    if (!password) {
      setError('Vui lòng nhập mật khẩu');
      return;
    }
    if (password.length < 6) {
      setError('Mật khẩu cần có ít nhất 6 ký tự');
      return;
    }

    setIsLoading(true);

    // Simulate authentication
    setTimeout(() => {
      // Extract username from email
      const derivedName = email.split('@')[0];
      const displayName = derivedName.charAt(0).toUpperCase() + derivedName.slice(1);
      login(displayName, email);
      setIsLoading(false);
      router.push('/san-pham');
    }, 600);
  };

  return (
    <div className="bg-[#FAF8F5] min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 border border-cream-200 shadow-xl space-y-6">
        
        {/* Brand header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-nepred-600 text-white flex items-center justify-center font-serif text-xl font-bold shadow-md group-hover:scale-105 transition-transform">
              NV
            </div>
          </Link>
          <h1 className="font-serif text-2xl sm:text-3xl font-black text-nepbrown-800">
            Đăng Nhập Nếp Việt
          </h1>
          <p className="text-xs text-neutral-500">
            Khám phá tinh hoa thủ công truyền thống và quản lý đơn hàng
          </p>
        </div>

        {/* Demo notification banner */}
        <div className="p-3 bg-cream-50 rounded-xl border border-cream-200 text-xs text-neutral-600 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-nepgold-600 flex-shrink-0" />
          <span>Chế độ Demo: Bạn có thể nhập bất kỳ email và mật khẩu (≥ 6 ký tự) để trải nghiệm.</span>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email input */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-nepbrown-700">
              Địa chỉ Email
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="ban@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-cream-300 bg-cream-50 focus:bg-white focus:outline-none focus:border-nepred-600 text-nepbrown-800"
              />
              <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3 pointer-events-none" />
            </div>
          </div>

          {/* Password input with show/hide toggle */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-nepbrown-700">
                Mật khẩu
              </label>
              <span className="text-[11px] text-neutral-400 hover:text-nepred-600 cursor-pointer">
                Quên mật khẩu?
              </span>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Ít nhất 6 ký tự"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 text-xs rounded-xl border border-cream-300 bg-cream-50 focus:bg-white focus:outline-none focus:border-nepred-600 text-nepbrown-800"
              />
              <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3 pointer-events-none" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-neutral-400 hover:text-nepbrown-800 transition-colors"
                aria-label="Ẩn/Hiện mật khẩu"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 bg-nepred-600 hover:bg-nepred-700 disabled:bg-neutral-300 text-white rounded-xl font-bold text-xs sm:text-sm shadow-lg shadow-nepred-600/25 transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Đăng Nhập</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Switch to Register */}
        <div className="text-center pt-2 border-t border-cream-200">
          <p className="text-xs text-neutral-500">
            Chưa có tài khoản Nếp Việt?{' '}
            <Link href="/dang-ky" className="font-bold text-nepred-600 hover:underline">
              Đăng ký ngay
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
