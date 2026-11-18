'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck, UserCheck, Sparkles } from 'lucide-react';
import { authenticateAccountInDb, SEED_ACCOUNTS } from '@/services/supabaseService';
import { isSupabaseConfigured } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();
  const { login, loginAdmin } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleQuickFill = (accEmail: string, accPass: string) => {
    setEmail(accEmail);
    setPassword(accPass);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Vui lòng nhập địa chỉ email');
      return;
    }
    if (!password) {
      setError('Vui lòng nhập mật khẩu');
      return;
    }

    setIsLoading(true);

    try {
      let matchedAccount: any = null;

      // 1. Kiểm tra xác thực qua Supabase Database nếu đã cấu hình
      if (isSupabaseConfigured()) {
        matchedAccount = await authenticateAccountInDb(email.trim(), password);
      }

      // 2. Fallback đối chiếu danh sách tài khoản chuẩn trong hệ thống
      if (!matchedAccount) {
        matchedAccount = SEED_ACCOUNTS.find(
          (acc) =>
            acc.email.toLowerCase() === email.trim().toLowerCase() &&
            acc.password === password
        );
      }

      // 3. Nếu sai thông tin đăng nhập
      if (!matchedAccount) {
        setError('Email hoặc mật khẩu không chính xác! Vui lòng kiểm tra lại.');
        setIsLoading(false);
        return;
      }

      // 4. Đăng nhập thành công -> lưu phiên
      login(matchedAccount.full_name, matchedAccount.email, matchedAccount.role);

      // Nếu tài khoản có vai trò Quản trị (Admin, Nghệ Nhân, Kho) -> kích hoạt luôn quyền Quản trị
      if (['admin', 'artisan', 'staff'].includes(matchedAccount.role)) {
        loginAdmin(matchedAccount.email, password);
        router.push('/admin');
      } else {
        router.push('/san-pham');
      }
    } catch (err: any) {
      setError('Lỗi kết nối xác thực: ' + (err.message || 'Không thể kết nối máy chủ'));
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
            Đăng Nhập Nếp Việt
          </h1>
          <p className="text-xs text-neutral-500">
            Hệ thống tài khoản thành viên & đối tác nghệ nhân làng nghề
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 font-semibold flex items-center gap-2">
            <span>⚠️</span>
            <span>{error}</span>
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
                required
                placeholder="ten@nepviet.vn hoặc email của bạn"
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
                required
                placeholder="Nhập mật khẩu"
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
                  <span>Đăng Nhập Ngay</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Quick Fill Test Accounts Chips */}
        <div className="pt-2 border-t border-cream-200/80 space-y-2">
          <p className="text-[11px] font-bold text-stone-600 text-center">
            Chọn nhanh tài khoản mẫu để trải nghiệm:
          </p>
          <div className="grid grid-cols-3 gap-1.5 text-[10px]">
            <button
              type="button"
              onClick={() => handleQuickFill('admin@nepviet.vn', 'Admin@123')}
              className="p-2 rounded-xl bg-nepred-50 hover:bg-nepred-100 border border-nepred-200 text-nepred-800 font-bold text-center transition-colors"
            >
              <div className="truncate">👑 Admin Master</div>
              <div className="text-[9px] text-nepred-600 font-normal">Toàn quyền</div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickFill('nghenhan@nepviet.vn', 'Nghenhan@123')}
              className="p-2 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-800 font-bold text-center transition-colors"
            >
              <div className="truncate">🏺 Nghệ Nhân</div>
              <div className="text-[9px] text-blue-600 font-normal">Bát Tràng</div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickFill('khachhang@nepviet.vn', 'Khach@123')}
              className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 font-bold text-center transition-colors"
            >
              <div className="truncate">🛍️ Khách Hàng</div>
              <div className="text-[9px] text-emerald-600 font-normal">Thành viên</div>
            </button>
          </div>
        </div>

        {/* Switch to Register */}
        <div className="text-center pt-2 border-t border-cream-200">
          <p className="text-xs text-neutral-500">
            Chưa có tài khoản Nếp Việt?{' '}
            <Link href="/dang-ky" className="font-bold text-nepred-600 hover:underline">
              Đăng ký tài khoản mới
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
