'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  User,
  Palette,
  Sparkles,
  Store,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';
import { authenticateAccountInDb, SEED_ACCOUNTS } from '@/services/supabaseService';
import { isSupabaseConfigured } from '@/lib/supabase';

type LoginStream = 'customer' | 'artisan' | 'admin';

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, loginAdmin } = useAuth();

  const [activeStream, setActiveStream] = useState<LoginStream>('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Khởi tạo luồng từ query URL nếu có (e.g. ?role=artisan hoặc ?role=admin)
  useEffect(() => {
    const roleParam = searchParams.get('role');
    if (roleParam === 'artisan') setActiveStream('artisan');
    else if (roleParam === 'admin') setActiveStream('admin');
    else if (roleParam === 'customer') setActiveStream('customer');
  }, [searchParams]);

  const streamConfig = {
    customer: {
      id: 'customer',
      label: 'Người Dùng',
      roleTitle: 'Cổng Khách Hàng Thành Viên',
      subtitle: 'Mua sắm quà tặng thủ công di sản, theo dõi đơn hàng & tích lũy điểm hội viên Nếp Việt.',
      icon: User,
      themeColor: 'nepred',
      activeTabClass: 'bg-white text-nepred-700 shadow-sm border border-cream-200/90 font-bold',
      bannerBg: 'bg-cream-100/70 border-cream-200/90 text-stone-700',
      perks: [
        'Tích điểm Nếp Việt đổi quà',
        'Đồng kiểm tra hàng trước khi nhận',
        'Bảo hành đổi mới 1:1 trong 7 ngày',
      ],
      sampleAccount: {
        email: 'khachhang@nepviet.vn',
        pass: 'Khach@123',
        name: 'Nguyễn Thu Hà (Khách Hàng Thành Viên)',
      },
      btnLabel: 'Đăng Nhập Khách Hàng',
      redirectTarget: '/san-pham',
      registerLink: '/dang-ky?role=customer',
      registerPrompt: 'Chưa có tài khoản khách hàng?',
      registerAction: 'Đăng ký thành viên mới',
    },
    artisan: {
      id: 'artisan',
      label: 'Người Bán / Nghệ Nhân',
      roleTitle: 'Cổng Nghệ Nhân & Xưởng Thủ Công',
      subtitle: 'Kênh đối tác dành riêng cho các hộ nghệ nhân Bát Tràng, Phú Vinh, Vạn Phúc, Đông Hồ... quản lý gian hàng di sản.',
      icon: Store,
      themeColor: 'amber',
      activeTabClass: 'bg-white text-stone-900 shadow-sm border border-amber-300 font-bold',
      bannerBg: 'bg-amber-50/70 border-amber-200/80 text-amber-900',
      perks: [
        'Quản lý danh mục tác phẩm thủ công',
        'Được gắn tem mộc xác thực làng nghề',
        'Tiếp nhận & xử lý đơn đặt từ xưởng',
      ],
      sampleAccount: {
        email: 'nghenhan@nepviet.vn',
        pass: 'Nghenhan@123',
        name: 'Nghệ Nhân Bát Tràng (Đối Tác Làng Nghề)',
      },
      btnLabel: 'Vào Kênh Studio Nghệ Nhân',
      redirectTarget: '/kenh-nghe-nhan',
      registerLink: '/dang-ky?role=artisan',
      registerPrompt: 'Bạn là xưởng nghề truyền thống?',
      registerAction: 'Đăng ký mở gian hàng đối tác',
    },
    admin: {
      id: 'admin',
      label: 'Ban Quản Trị',
      roleTitle: 'Cổng Quản Trị Hệ Thống Nếp Việt',
      subtitle: 'Kênh bảo mật dành riêng cho ban điều hành Nếp Việt để kiểm soát toàn diện sàn, duyệt sản phẩm & đối soát tài chính.',
      icon: ShieldCheck,
      themeColor: 'nepgreen',
      activeTabClass: 'bg-white text-nepgreen-900 shadow-sm border border-nepgreen-300 font-bold',
      bannerBg: 'bg-stone-900 text-cream-100 border-stone-800',
      perks: [
        'Toàn quyền quản trị danh mục & tài khoản',
        'Đối soát thanh toán Napas 24/7 & COD',
        'Bảo mật 2 lớp SSL 256-bit chuẩn DN',
      ],
      sampleAccount: {
        email: 'admin@nepviet.vn',
        pass: 'Admin@123',
        name: 'Admin Master (Ban Quản Trị Nếp Việt)',
      },
      btnLabel: 'Xác Thực Quản Trị Viên',
      redirectTarget: '/admin',
      registerLink: '/lien-he',
      registerPrompt: 'Cần cấp quyền quản trị nội bộ?',
      registerAction: 'Liên hệ bộ phận kỹ thuật',
    },
  };

  const currentStream = streamConfig[activeStream];

  const handleSelectStream = (stream: LoginStream) => {
    setActiveStream(stream);
    setError('');
  };

  const handleQuickFillCurrent = () => {
    setEmail(currentStream.sampleAccount.email);
    setPassword(currentStream.sampleAccount.pass);
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

      // 4. Kiểm tra xem vai trò đăng nhập có tương thích với luồng đã chọn không
      if (activeStream === 'admin' && !['admin', 'staff'].includes(matchedAccount.role)) {
        setError('Tài khoản này không có quyền truy cập vào Cổng Quản Trị Hệ Thống. Vui lòng chọn luồng Khách Hàng hoặc Nghệ Nhân.');
        setIsLoading(false);
        return;
      }

      if (activeStream === 'artisan' && matchedAccount.role === 'customer') {
        setError('Tài khoản này là Khách Hàng cá nhân, chưa đăng ký gian hàng Nghệ Nhân. Vui lòng chuyển sang tab Người Dùng.');
        setIsLoading(false);
        return;
      }

      // 5. Đăng nhập thành công -> lưu phiên
      login(matchedAccount.full_name, matchedAccount.email, matchedAccount.role);

      // Nếu tài khoản có vai trò Quản trị (Admin, Nghệ Nhân, Kho) -> kích hoạt luôn quyền Quản trị
      if (['admin', 'artisan', 'staff'].includes(matchedAccount.role)) {
        loginAdmin(matchedAccount.email, password);
        if (matchedAccount.role === 'artisan') {
          router.push('/kenh-nghe-nhan');
        } else {
          router.push('/admin');
        }
      } else {
        router.push(currentStream.redirectTarget);
      }
    } catch (err: any) {
      setError('Lỗi kết nối xác thực: ' + (err.message || 'Không thể kết nối máy chủ'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#14100E] min-h-[90vh] flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="w-full max-w-xl bg-white rounded-3xl p-6 sm:p-10 border border-cream-200/90 shadow-xl space-y-6">

        {/* Brand header với Font Chữ Hán triện thư */}
        <div className="text-center space-y-2 pb-2">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-nepred-700 via-nepred-600 to-nepbrown-800 text-white flex items-center justify-center shadow-md shadow-nepred-900/20 border border-nepgold-500/30 group-hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0.5 rounded-xl border border-dashed border-nepgold-400/40 pointer-events-none" />
              <span className="font-han text-2xl font-bold tracking-normal text-cream-50 select-none">
                越
              </span>
            </div>
          </Link>
          <div className="flex items-center justify-center gap-2">
            <h1 className="font-serif text-2xl sm:text-3xl font-black text-stone-900 tracking-wide">
              ĐĂNG NHẬP NẾP VIỆT
            </h1>
            <span className="font-han text-base sm:text-lg font-bold text-nepred-700 select-none" title="惗越 (Nếp Việt)">
              惗越
            </span>
          </div>
          <p className="text-xs text-stone-500">
            Hệ sinh thái di sản thủ công mỹ nghệ & ẩm thực cổ truyền
          </p>
        </div>

        {/* 3-Role Interactive Stream Switcher Tabs */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block text-center">
            Vui lòng chọn cổng đăng nhập của bạn:
          </span>
          <div className="grid grid-cols-3 gap-1.5 bg-cream-100 p-1.5 rounded-2xl border border-cream-200/80 text-xs">
            <button
              type="button"
              onClick={() => handleSelectStream('customer')}
              className={`py-2 px-2 rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 text-center ${activeStream === 'customer'
                ? streamConfig.customer.activeTabClass
                : 'text-stone-600 hover:text-stone-900'
                }`}
            >
              <User className="w-3.5 h-3.5 text-nepred-600 flex-shrink-0" strokeWidth={1.5} />
              <span className="text-[11px] sm:text-xs">Người Dùng</span>
            </button>

            <button
              type="button"
              onClick={() => handleSelectStream('artisan')}
              className={`py-2 px-2 rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 text-center ${activeStream === 'artisan'
                ? streamConfig.artisan.activeTabClass
                : 'text-stone-600 hover:text-stone-900'
                }`}
            >
              <Store className="w-3.5 h-3.5 text-amber-700 flex-shrink-0" strokeWidth={1.5} />
              <span className="text-[11px] sm:text-xs">Người Bán / Xưởng</span>
            </button>

            <button
              type="button"
              onClick={() => handleSelectStream('admin')}
              className={`py-2 px-2 rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 text-center ${activeStream === 'admin'
                ? streamConfig.admin.activeTabClass
                : 'text-stone-600 hover:text-stone-900'
                }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-nepgreen-800 flex-shrink-0" strokeWidth={1.5} />
              <span className="text-[11px] sm:text-xs">Ban Quản Trị</span>
            </button>
          </div>
        </div>

        {/* Dynamic Stream Role Card (Context Details) */}
        <div className={`p-4 rounded-2xl border transition-all ${currentStream.bannerBg}`}>
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-white/80 border border-current/20 shadow-xs flex-shrink-0">
              <currentStream.icon className="w-4 h-4 text-current" strokeWidth={1.5} />
            </div>
            <div className="space-y-1">
              <h2 className="text-xs sm:text-sm font-bold font-serif">
                {currentStream.roleTitle}
              </h2>
              <p className="text-[11px] leading-relaxed opacity-90">
                {currentStream.subtitle}
              </p>
              <div className="flex flex-wrap gap-x-3 gap-y-1 pt-1.5 text-[10px]">
                {currentStream.perks.map((perk, idx) => (
                  <span key={idx} className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 flex-shrink-0" strokeWidth={1.5} />
                    <span>{perk}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 font-semibold flex items-center gap-2">
            <span className="flex-shrink-0">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email input */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-stone-700">
              Địa chỉ Email ({currentStream.label})
            </label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder={
                  activeStream === 'admin'
                    ? 'admin@nepviet.vn'
                    : activeStream === 'artisan'
                      ? 'nghenhan@nepviet.vn hoặc email xưởng'
                      : 'email@domain.com của bạn'
                }
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-cream-300 bg-cream-50 focus:bg-white focus:outline-none focus:border-nepred-600 text-stone-900 transition-colors"
              />
              <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3 pointer-events-none" strokeWidth={1.5} />
            </div>
          </div>

          {/* Password input with show/hide toggle */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-stone-700">
                Mật khẩu
              </label>
              <span className="text-[11px] text-stone-400 hover:text-nepred-600 cursor-pointer">
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
                className="w-full pl-10 pr-10 py-2.5 text-xs rounded-xl border border-cream-300 bg-cream-50 focus:bg-white focus:outline-none focus:border-nepred-600 text-stone-900 transition-colors"
              />
              <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-3 pointer-events-none" strokeWidth={1.5} />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-stone-400 hover:text-stone-700 transition-colors"
                aria-label="Ẩn/Hiện mật khẩu"
              >
                {showPassword ? <EyeOff className="w-4 h-4" strokeWidth={1.5} /> : <Eye className="w-4 h-4" strokeWidth={1.5} />}
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
                  <span>{currentStream.btnLabel}</span>
                  <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Quick Fill Buttons tailored to selected stream */}
        <div className="p-3.5 rounded-2xl bg-cream-50 border border-cream-200/90 space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-nepgold-500 animate-pulse" />
            <span className="text-[11px] text-stone-600 font-semibold">
              Tài khoản mẫu luồng <strong>{currentStream.label}</strong>:
            </span>
          </div>

          {activeStream === 'admin' ? (
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={() => {
                  setEmail('admin@nepviet.vn');
                  setPassword('Admin@123');
                  setError('');
                }}
                className="flex-1 px-3 py-1.5 rounded-xl bg-white hover:bg-nepred-600 hover:text-white border border-stone-200 text-stone-800 text-[11px] font-bold shadow-2xs transition-all text-center"
              >
                Admin Master (Toàn quyền Sàn)
              </button>
              <button
                type="button"
                onClick={() => {
                  setEmail('kho@nepviet.vn');
                  setPassword('Kho@123');
                  setError('');
                }}
                className="flex-1 px-3 py-1.5 rounded-xl bg-white hover:bg-amber-600 hover:text-white border border-stone-200 text-stone-800 text-[11px] font-bold shadow-2xs transition-all text-center"
              >
                Nhân Viên Kho (Giới hạn Đơn & Kho)
              </button>
            </div>
          ) : activeStream === 'artisan' ? (
            <button
              type="button"
              onClick={() => {
                setEmail('nghenhan@nepviet.vn');
                setPassword('Nghenhan@123');
                setError('');
              }}
              className="w-full px-3.5 py-1.5 rounded-xl bg-white hover:bg-amber-600 hover:text-white border border-amber-300 text-amber-900 text-[11px] font-bold shadow-2xs transition-all text-center"
            >
              Nghệ Nhân Bát Tràng (nghenhan@nepviet.vn)
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setEmail('khachhang@nepviet.vn');
                setPassword('Khach@123');
                setError('');
              }}
              className="w-full px-3.5 py-1.5 rounded-xl bg-white hover:bg-nepred-600 hover:text-white border border-stone-200 text-stone-800 text-[11px] font-bold shadow-2xs transition-all text-center"
            >
              Khách Hàng Thành Viên (khachhang@nepviet.vn)
            </button>
          )}
        </div>

        {/* Switch to Register */}
        <div className="text-center pt-2 border-t border-cream-200">
          <p className="text-xs text-stone-500">
            {currentStream.registerPrompt}{' '}
            <Link href={currentStream.registerLink} className="font-bold text-nepred-600 hover:underline">
              {currentStream.registerAction}
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#14100E] flex items-center justify-center py-16">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-nepred-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p className="text-xs text-stone-500">Đang tải cổng đăng nhập Nếp Việt...</p>
          </div>
        </div>
      }
    >
      <LoginFormContent />
    </Suspense>
  );
}
