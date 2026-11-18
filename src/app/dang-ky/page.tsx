'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Eye, EyeOff, Lock, Mail, User, ArrowRight } from 'lucide-react';
import { createAccountInDb, DbAccount } from '@/services/supabaseService';
import { isSupabaseConfigured } from '@/lib/supabase';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Vui lòng nhập họ và tên của bạn');
      return;
    }
    if (!email.trim()) {
      setError('Vui lòng nhập email');
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
      setError('Mật khẩu cần tối thiểu 6 ký tự');
      return;
    }
    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    setIsLoading(true);

    try {
      const newAcc: DbAccount = {
        id: `acc-${Date.now().toString().slice(-4)}`,
        email: email.trim().toLowerCase(),
        password: password,
        full_name: name.trim(),
        role: 'customer',
        loyalty_points: 50,
        created_at: new Date().toISOString(),
      };

      if (isSupabaseConfigured()) {
        await createAccountInDb(newAcc);
      }

      register(name.trim(), email.trim());
      router.push('/san-pham');
    } catch (err: any) {
      setError('Lỗi đăng ký tài khoản: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#FAF8F5] min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 border border-cream-200 shadow-xl space-y-6">
        
        {/* Brand header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-nepred-600 text-white flex items-center justify-center font-serif text-xl font-bold shadow-md group-hover:scale-105 transition-transform">
              NV
            </div>
          </Link>
          <h1 className="font-serif text-2xl sm:text-3xl font-black text-nepbrown-800">
            Tạo Tài Khoản Mới
          </h1>
          <p className="text-xs text-neutral-500">
            Trở thành thành viên cộng đồng Nếp Việt để nhận ưu đãi văn hóa
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-nepbrown-700">
              Họ và tên
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Ví dụ: Hoàng Mai Chi"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-cream-300 bg-cream-50 focus:bg-white focus:outline-none focus:border-nepred-600 text-nepbrown-800"
              />
              <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3 pointer-events-none" />
            </div>
          </div>

          {/* Email */}
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

          {/* Password */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-nepbrown-700">
              Mật khẩu
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Tối thiểu 6 ký tự"
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

          {/* Confirm Password */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-nepbrown-700">
              Xác nhận mật khẩu
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Nhập lại mật khẩu"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-cream-300 bg-cream-50 focus:bg-white focus:outline-none focus:border-nepred-600 text-nepbrown-800"
              />
              <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3 pointer-events-none" />
            </div>
          </div>

          {/* Submit */}
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
                  <span>Đăng Ký Tài Khoản</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Back to Login */}
        <div className="text-center pt-2 border-t border-cream-200">
          <p className="text-xs text-neutral-500">
            Đã có tài khoản?{' '}
            <Link href="/dang-nhap" className="font-bold text-nepred-600 hover:underline">
              Đăng nhập tại đây
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
