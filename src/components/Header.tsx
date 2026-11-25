'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { SearchModal } from '@/components/SearchModal';
import {
  ShoppingBag,
  Search,
  User as UserIcon,
  Menu,
  X,
  Sparkles,
  LogOut,
  ChevronDown,
  PhoneCall,
  ShieldCheck,
  Compass,
  Store,
} from 'lucide-react';

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { totalItems } = useCart();
  const { user, isLoggedIn, logout } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Phím tắt bàn phím Ctrl+K / Cmd+K để mở tìm kiếm nhanh
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Đóng mobile menu khi chuyển trang
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  }, [pathname]);

  // Ẩn Header khách hàng khi đang ở trong trang Quản trị Admin hoặc Kênh Nghệ Nhân
  if (pathname?.startsWith('/admin') || pathname?.startsWith('/kenh-nghe-nhan')) {
    return null;
  }

  const navLinks = [
    { href: '/', label: 'Trang chủ' },
    { href: '/san-pham', label: 'Bộ sưu tập' },
    { href: '/van-hoa', label: 'Làng nghề & Di sản' },
    { href: '/tin-tuc', label: 'Tin tức' },
    { href: '/lien-he', label: 'Liên hệ' },
    { href: '/gioi-thieu', label: 'Về Nếp Việt' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#16110F]/95 backdrop-blur-md border-b border-[#2C211D] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.5)] transition-all">
        {/* Top Banner Bar - Heritage Quality with Traditional Lacquer Pattern */}
        <div className="relative bg-[#3D0A10] text-[#EDE4D8] text-xs py-2 px-3 sm:px-4 border-b border-[#52121A] overflow-hidden">
          {/* Dong Son Lacquer Pattern - Clearly visible */}
          <div
            className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-90"
            style={{ backgroundImage: `url('/patterns/background-hoa-van.webp')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 pointer-events-none" />
          <div className="relative z-10 max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#3D0F15]/90 text-[#D4AF37] font-semibold text-[10px] tracking-wider uppercase border border-[#D4AF37]/40 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                Thương hiệu di sản
              </span>
              <span className="hidden md:inline text-[#D4C8B8] text-[11px]">
                Giao hàng hỏa tốc toàn quốc • Miễn phí vận chuyển cho đơn từ 300.000đ
              </span>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 text-[11px] text-[#D4C8B8]">
              <div className="hidden sm:flex items-center gap-1">
                <PhoneCall className="w-3.5 h-3.5 text-[#D4AF37]" strokeWidth={1.5} />
                <span>CSKH: <strong className="text-white font-sans">1900 6868</strong></span>
              </div>
              <span className="hidden sm:inline text-stone-600">|</span>
              <div className="flex items-center gap-1.5 text-[#D4C8B8] text-[10px] sm:text-[11px]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>VN | VNĐ (₫)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Header Bar */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">

            {/* Left: Mobile Menu Toggle & Brand Logo */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-[#EDE4D8] hover:text-[#E2CA9E] hover:bg-[#251C1A] transition-colors"
                aria-label={mobileMenuOpen ? 'Đóng menu' : 'Mở menu'}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
                ) : (
                  <Menu className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
                )}
              </button>

              {/* Brand Logo - Phong cách Triện thư Hán Nôm */}
              <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group flex-shrink-0">
                <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-nepred-700 via-nepred-600 to-nepbrown-800 text-white flex items-center justify-center shadow-md shadow-nepred-900/40 border border-nepgold-500/40 group-hover:scale-105 transition-all duration-300 flex-shrink-0">
                  <div className="absolute inset-0.5 rounded-xl border border-dashed border-nepgold-400/40 pointer-events-none" />
                  <span className="font-han text-xl sm:text-2xl font-bold tracking-normal text-cream-50 drop-shadow-sm select-none">
                    越
                  </span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-1.5 leading-tight">
                    <span className="font-headline text-lg sm:text-2xl font-black tracking-wide text-white group-hover:text-[#E2CA9E] transition-colors">
                      NẾP VIỆT
                    </span>
                    <span className="font-han text-xs sm:text-sm font-bold text-[#D4AF37] select-none tracking-wider opacity-95" title="惗越 (Nếp Việt - Hán Nôm)">
                      惗越
                    </span>
                  </div>
                  <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.16em] sm:tracking-[0.2em] text-[#C5A880] font-bold font-sans">
                    Tinh hoa thủ công di sản
                  </span>
                </div>
              </Link>
            </div>

            {/* Center: Desktop Navigation Links (Responsive spacing) */}
            <nav className="hidden lg:flex items-center gap-4 xl:gap-6 2xl:gap-7 flex-shrink-0">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-xs xl:text-sm font-semibold tracking-tight transition-all relative py-1 ${isActive
                      ? 'text-[#E2CA9E] font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#C5A880] after:rounded-full'
                      : 'text-[#CFC2B2] hover:text-[#E2CA9E]'
                      }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right: Actions (Search Trigger, Account, Shopping Bag) */}
            <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
              {/* Search Trigger Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 px-2.5 sm:px-3.5 py-2 rounded-full bg-[#221A17] hover:bg-[#2D221F] border border-[#382B26] text-[#CFC2B2] hover:text-[#E2CA9E] transition-all text-xs group shadow-xs"
                aria-label="Mở tìm kiếm"
                title="Tìm kiếm sản phẩm (Ctrl + K)"
              >
                <Search className="w-4 h-4 text-stone-400 group-hover:text-[#E2CA9E] transition-colors" strokeWidth={1.5} />
                <span className="hidden sm:inline text-stone-300 group-hover:text-white font-medium">
                  Tìm kiếm...
                </span>
                <kbd className="hidden xl:inline-flex items-center px-1.5 py-0.5 text-[9px] font-mono text-stone-400 bg-[#16110F] border border-stone-700 rounded">
                  ⌘K
                </kbd>
              </button>

              {/* User Account Dropdown */}
              <div className="relative">
                {isLoggedIn ? (
                  <div className="relative">
                    <button
                      onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                      className="flex items-center gap-1.5 sm:gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-full hover:bg-[#251C1A] border border-[#382B26] transition-colors"
                      title={user?.name || 'Tài khoản người dùng'}
                    >
                      <div className="w-7 h-7 rounded-full bg-[#8C5033] text-cream-50 flex items-center justify-center text-xs font-bold font-sans flex-shrink-0">
                        {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <span className="hidden sm:inline text-xs font-semibold text-stone-200 max-w-[80px] xl:max-w-[110px] truncate">
                        {user?.name}
                      </span>
                      <ChevronDown className="w-3.5 h-3.5 text-stone-400 hidden sm:inline" strokeWidth={1.5} />
                    </button>

                    {userDropdownOpen && (
                      <div
                        onMouseLeave={() => setUserDropdownOpen(false)}
                        className="absolute right-0 mt-2 w-56 bg-[#1C1614] rounded-2xl shadow-2xl border border-[#382B26] py-2 z-50 text-[#EDE4D8]"
                      >
                        <div className="px-4 py-2.5 border-b border-[#382B26] bg-[#241C1A]">
                          <p className="text-xs font-bold text-white truncate">{user?.name}</p>
                          <p className="text-[11px] text-stone-400 truncate">{user?.email}</p>
                        </div>
                        <Link
                          href="/san-pham"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-xs text-stone-300 hover:bg-[#251C1A] hover:text-[#E2CA9E] transition-colors"
                        >
                          Khám phá sản phẩm
                        </Link>
                        <Link
                          href="/gio-hang"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-xs text-stone-300 hover:bg-[#251C1A] hover:text-[#E2CA9E] transition-colors"
                        >
                          Quản lý giỏ hàng
                        </Link>
                        {user?.role === 'artisan' ? (
                          <Link
                            href="/kenh-nghe-nhan"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2 px-4 py-2 text-xs text-amber-400 bg-amber-950/40 hover:bg-amber-900/50 font-bold transition-colors"
                          >
                            <Store className="w-3.5 h-3.5 text-amber-400" />
                            <span>Kênh Nghệ Nhân (Studio)</span>
                          </Link>
                        ) : user?.role === 'admin' || user?.role === 'staff' ? (
                          <Link
                            href="/admin"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2 px-4 py-2 text-xs text-nepred-400 hover:bg-nepred-950/50 font-bold transition-colors"
                          >
                            <ShieldCheck className="w-3.5 h-3.5" strokeWidth={1.5} />
                            <span>Trang Quản Trị (Admin)</span>
                          </Link>
                        ) : null}
                        <div className="pt-1 mt-1 border-t border-[#382B26]">
                          <button
                            onClick={() => {
                            logout();
                            setUserDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-2 px-4 py-2 text-xs text-red-400 hover:bg-red-950/40 transition-colors text-left font-medium"
                        >
                          <LogOut className="w-3.5 h-3.5" strokeWidth={1.5} />
                          Đăng xuất tài khoản
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center">
                  <Link
                    href="/dang-nhap"
                    className="flex items-center gap-1.5 p-2 sm:px-3 sm:py-2 text-xs font-semibold text-stone-300 hover:text-[#E2CA9E] hover:bg-[#251C1A] rounded-full transition-colors border border-[#382B26] sm:border-transparent"
                    title="Đăng nhập tài khoản"
                  >
                    <UserIcon className="w-4 h-4 text-stone-400" strokeWidth={1.5} />
                    <span className="hidden sm:inline">Tài khoản</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Shopping Cart Button */}
            <Link
              href="/gio-hang"
              className="relative p-2.5 rounded-full bg-[#221A17] hover:bg-[#2D221F] border border-[#382B26] text-white transition-all flex items-center justify-center group shadow-xs"
              aria-label="Xem giỏ hàng"
            >
              <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform text-[#EDE4D8]" strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-nepred-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#2C211D] bg-[#181210] px-4 pt-3 pb-6 space-y-4 shadow-2xl animate-in slide-in-from-top-2 text-[#EDE4D8]">
            {/* Quick Search Button in Mobile Menu */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsSearchOpen(true);
              }}
              className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-[#231A17] hover:bg-[#2D221F] text-stone-300 text-xs font-medium border border-[#382B26] transition-colors"
            >
              <Search className="w-4 h-4 text-[#D4AF37]" />
              <span>Tìm kiếm sản phẩm, làng nghề...</span>
              <span className="ml-auto text-[10px] text-[#E2CA9E] font-bold">Mở tìm kiếm →</span>
            </button>

            {/* Nav Links */}
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between ${isActive
                      ? 'bg-[#2A1714] text-[#E2CA9E] font-bold'
                      : 'text-stone-300 hover:bg-[#231A17] hover:text-white'
                      }`}
                  >
                    <span>{link.label}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />}
                  </Link>
                );
              })}
            </nav>

            {/* User Account / Auth Buttons in Mobile Drawer */}
            <div className="pt-3 border-t border-[#2C211D] flex flex-col gap-2">
              {isLoggedIn ? (
                <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#231A17] rounded-xl border border-[#382B26]">
                  <div className="min-w-0 pr-2">
                    <p className="text-xs font-bold text-white truncate">{user?.name}</p>
                    <p className="text-[11px] text-stone-400 truncate">{user?.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-xs text-red-400 hover:underline flex items-center gap-1 font-semibold flex-shrink-0"
                  >
                    <LogOut className="w-3.5 h-3.5" /> Đăng xuất
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <Link
                    href="/dang-nhap"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center py-2.5 text-xs font-semibold text-stone-200 bg-[#251C1A] hover:bg-[#302421] border border-[#382B26] rounded-xl transition-colors"
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    href="/dang-ky"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center py-2.5 text-xs font-semibold text-white bg-nepred-600 hover:bg-nepred-700 rounded-xl transition-colors shadow"
                  >
                    Đăng ký
                  </Link>
                </div>
              )}
            </div>

            {/* Quick Hotline in Mobile Drawer */}
            <div className="pt-2 text-[11px] text-stone-400 flex items-center justify-between border-t border-[#2C211D]">
              <span className="flex items-center gap-1">
                <PhoneCall className="w-3 h-3 text-[#D4AF37]" />
                Tổng đài: <strong className="text-[#EDE4D8] font-sans">1900 6868</strong>
              </span>
              <span className="text-[#C5A880] font-medium">Miễn phí ship từ 300k</span>
            </div>
          </div>
        )}

        {/* Subtle Traditional Gold Thread Divider */}
        <div className="w-full h-[6px] overflow-hidden relative select-none pointer-events-none opacity-60">
          <div className="wavy-gold-line w-full h-full" />
        </div>
      </header>

      {/* Global Interactive Search Modal Popup */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
