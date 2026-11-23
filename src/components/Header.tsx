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

  // Ẩn Header khách hàng khi đang ở trong trang Quản trị Admin
  if (pathname?.startsWith('/admin')) {
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
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-cream-200/80 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)] transition-all">
        {/* Top Banner Bar - Heritage Quality */}
        <div className="bg-nepgreen-900 text-cream-100 text-xs py-1.5 sm:py-2 px-3 sm:px-4 border-b border-nepgreen-800">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-nepgreen-800/90 text-nepgold-400 font-semibold text-[10px] tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-nepgold-400" />
                Thương hiệu di sản
              </span>
              <span className="hidden md:inline text-cream-200 text-[11px]">
                Giao hàng hỏa tốc toàn quốc • Miễn phí vận chuyển cho đơn từ 300.000đ
              </span>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 text-[11px] text-cream-200">
              <div className="hidden sm:flex items-center gap-1">
                <PhoneCall className="w-3.5 h-3.5 text-nepgold-400" strokeWidth={1.5} />
                <span>CSKH: <strong className="text-cream-50 font-sans">1900 6868</strong></span>
              </div>
              <span className="hidden sm:inline text-nepgreen-700">|</span>
              <div className="flex items-center gap-1.5 text-cream-200 text-[10px] sm:text-[11px]">
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
                className="lg:hidden p-2 rounded-xl text-stone-800 hover:text-nepred-600 hover:bg-cream-100 transition-colors"
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
                <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-nepred-700 via-nepred-600 to-nepbrown-800 text-white flex items-center justify-center shadow-md shadow-nepred-900/20 border border-nepgold-500/30 group-hover:scale-105 transition-all duration-300 flex-shrink-0">
                  <div className="absolute inset-0.5 rounded-xl border border-dashed border-nepgold-400/40 pointer-events-none" />
                  <span className="font-han text-xl sm:text-2xl font-bold tracking-normal text-cream-50 drop-shadow-sm select-none">
                    越
                  </span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-1.5 leading-tight">
                    <span className="font-serif text-lg sm:text-2xl font-black tracking-wide text-stone-900 group-hover:text-nepred-600 transition-colors">
                      NẾP VIỆT
                    </span>
                    <span className="font-han text-xs sm:text-sm font-bold text-nepred-700 select-none tracking-wider opacity-90" title="惗越 (Nếp Việt - Hán Nôm)">
                      惗越
                    </span>
                  </div>
                  <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.16em] sm:tracking-[0.2em] text-nepgreen-800 font-bold font-sans">
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
                      ? 'text-nepred-600 font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-nepred-600 after:rounded-full'
                      : 'text-stone-700 hover:text-nepred-600'
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
                className="flex items-center gap-2 px-2.5 sm:px-3.5 py-2 rounded-full bg-cream-100 hover:bg-cream-200 border border-cream-200 text-stone-700 hover:text-nepred-600 transition-all text-xs group shadow-xs"
                aria-label="Mở tìm kiếm"
                title="Tìm kiếm sản phẩm (Ctrl + K)"
              >
                <Search className="w-4 h-4 text-stone-500 group-hover:text-nepred-600 transition-colors" strokeWidth={1.5} />
                <span className="hidden sm:inline text-stone-500 group-hover:text-stone-800 font-medium">
                  Tìm kiếm...
                </span>
                <kbd className="hidden xl:inline-flex items-center px-1.5 py-0.5 text-[9px] font-mono text-stone-400 bg-white border border-cream-300 rounded shadow-2xs">
                  ⌘K
                </kbd>
              </button>

              {/* User Account Dropdown */}
              <div className="relative">
                {isLoggedIn ? (
                  <div className="relative">
                    <button
                      onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                      className="flex items-center gap-1.5 sm:gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-full hover:bg-cream-100 border border-cream-200 transition-colors"
                      title={user?.name || 'Tài khoản người dùng'}
                    >
                      <div className="w-7 h-7 rounded-full bg-nepgreen-800 text-cream-50 flex items-center justify-center text-xs font-bold font-sans flex-shrink-0">
                        {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <span className="hidden sm:inline text-xs font-semibold text-stone-800 max-w-[80px] xl:max-w-[110px] truncate">
                        {user?.name}
                      </span>
                      <ChevronDown className="w-3.5 h-3.5 text-stone-400 hidden sm:inline" strokeWidth={1.5} />
                    </button>

                    {userDropdownOpen && (
                      <div
                        onMouseLeave={() => setUserDropdownOpen(false)}
                        className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-cream-200 py-2 z-50 animate-in fade-in slide-in-from-top-1"
                      >
                        <div className="px-4 py-2.5 border-b border-cream-100 bg-cream-50/50">
                          <p className="text-xs font-bold text-stone-900 truncate">{user?.name}</p>
                          <p className="text-[11px] text-stone-500 truncate">{user?.email}</p>
                        </div>
                        <Link
                          href="/san-pham"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-xs text-stone-700 hover:bg-cream-50 hover:text-nepred-600 transition-colors"
                        >
                          Khám phá sản phẩm
                        </Link>
                        <Link
                          href="/gio-hang"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-xs text-stone-700 hover:bg-cream-50 hover:text-nepred-600 transition-colors"
                        >
                          Quản lý giỏ hàng
                        </Link>
                        <Link
                          href="/admin"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-xs text-nepred-600 hover:bg-nepred-50 font-bold transition-colors"
                        >
                          <ShieldCheck className="w-3.5 h-3.5" strokeWidth={1.5} />
                          Trang Quản Trị (Admin)
                        </Link>
                        <div className="pt-1 mt-1 border-t border-cream-100">
                          <button
                            onClick={() => {
                              logout();
                              setUserDropdownOpen(false);
                            }}
                            className="w-full flex items-center gap-2 px-4 py-2 text-xs text-red-600 hover:bg-red-50 transition-colors text-left font-medium"
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
                      className="flex items-center gap-1.5 p-2 sm:px-3 sm:py-2 text-xs font-semibold text-stone-700 hover:text-nepred-600 hover:bg-cream-100 rounded-full transition-colors border border-cream-200 sm:border-transparent"
                      title="Đăng nhập tài khoản"
                    >
                      <UserIcon className="w-4 h-4 text-stone-600" strokeWidth={1.5} />
                      <span className="hidden sm:inline">Tài khoản</span>
                    </Link>
                  </div>
                )}
              </div>

              {/* Shopping Cart Button */}
              <Link
                href="/gio-hang"
                className="relative p-2.5 rounded-full bg-cream-100 hover:bg-cream-200 border border-cream-200 text-stone-900 transition-all flex items-center justify-center group shadow-xs"
                aria-label="Xem giỏ hàng"
              >
                <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform text-stone-800" strokeWidth={1.5} />
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
          <div className="lg:hidden border-t border-cream-200 bg-white px-4 pt-3 pb-6 space-y-4 shadow-2xl animate-in slide-in-from-top-2">
            {/* Quick Search Button in Mobile Menu */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsSearchOpen(true);
              }}
              className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-cream-100 hover:bg-cream-200 text-stone-600 text-xs font-medium border border-cream-200 transition-colors"
            >
              <Search className="w-4 h-4 text-nepred-600" />
              <span>Tìm kiếm sản phẩm, làng nghề...</span>
              <span className="ml-auto text-[10px] text-nepred-600 font-bold">Mở tìm kiếm →</span>
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
                      ? 'bg-nepred-50 text-nepred-600'
                      : 'text-stone-800 hover:bg-cream-100'
                      }`}
                  >
                    <span>{link.label}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-nepred-600" />}
                  </Link>
                );
              })}
            </nav>

            {/* User Account / Auth Buttons in Mobile Drawer */}
            <div className="pt-3 border-t border-cream-100 flex flex-col gap-2">
              {isLoggedIn ? (
                <div className="flex items-center justify-between px-3.5 py-2.5 bg-cream-50 rounded-xl">
                  <div className="min-w-0 pr-2">
                    <p className="text-xs font-bold text-stone-900 truncate">{user?.name}</p>
                    <p className="text-[11px] text-stone-500 truncate">{user?.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-xs text-red-600 hover:underline flex items-center gap-1 font-semibold flex-shrink-0"
                  >
                    <LogOut className="w-3.5 h-3.5" /> Đăng xuất
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <Link
                    href="/dang-nhap"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center py-2.5 text-xs font-semibold text-stone-800 bg-cream-100 hover:bg-cream-200 rounded-xl transition-colors"
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
            <div className="pt-2 text-[11px] text-stone-500 flex items-center justify-between border-t border-cream-100">
              <span className="flex items-center gap-1">
                <PhoneCall className="w-3 h-3 text-nepgold-600" />
                Tổng đài: <strong className="text-stone-800 font-sans">1900 6868</strong>
              </span>
              <span className="text-nepgreen-800 font-medium">Miễn phí ship từ 300k</span>
            </div>
          </div>
        )}
      </header>

      {/* Global Interactive Search Modal Popup */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
