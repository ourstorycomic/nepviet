'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
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
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/san-pham?search=${encodeURIComponent(searchTerm.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { href: '/', label: 'Trang chủ' },
    { href: '/san-pham', label: 'Bộ sưu tập' },
    { href: '/van-hoa', label: 'Văn hóa & Làng nghề' },
    { href: '/gioi-thieu', label: 'Về Nếp Việt' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-cream-200/80 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)] transition-all">
      {/* Top Banner Bar - Enterprise Level */}
      <div className="bg-nepgreen-900 text-cream-100 text-xs py-2 px-4 border-b border-nepgreen-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-nepgreen-800/80 text-nepgold-400 font-semibold text-[10px] tracking-wider uppercase">
              <Sparkles className="w-3 h-3" /> Thương hiệu di sản
            </span>
            <span className="hidden sm:inline text-cream-200 text-[11px]">
              Giao hàng hỏa tốc toàn quốc • Miễn phí vận chuyển cho đơn từ 300.000đ
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-cream-200">
            <div className="hidden md:flex items-center gap-1">
              <PhoneCall className="w-3 h-3 text-nepgold-400" />
              <span>Tổng đài CSKH: <strong className="text-cream-50 font-sans">1900 6868</strong> (08:00 - 21:30)</span>
            </div>
            <span className="hidden md:inline text-nepgreen-700">|</span>
            <div className="flex items-center gap-1.5 text-cream-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>VN | VNĐ (₫)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-stone-800 hover:text-nepred-600 hover:bg-cream-100 transition-colors"
              aria-label="Mở menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Premium Enterprise Brand Logo */}
          <Link href="/" className="flex items-center gap-3.5 group">
            {/* Lacquer seal style monogram */}
            <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-nepred-700 via-nepred-600 to-nepbrown-800 text-white flex items-center justify-center shadow-md shadow-nepred-900/20 border border-nepgold-500/30 group-hover:scale-105 transition-all duration-300">
              <div className="absolute inset-1 rounded-xl border border-dashed border-nepgold-400/40 pointer-events-none" />
              <span className="font-serif text-2xl font-black tracking-tight text-cream-50 drop-shadow-sm">
                NV
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl sm:text-2xl font-black tracking-wide text-stone-900 group-hover:text-nepred-600 transition-colors">
                NẾP VIỆT
              </span>
              <span className="text-[10px] uppercase tracking-[0.22em] text-nepgreen-800 font-semibold -mt-0.5 font-sans">
                Tinh hoa thủ công di sản
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium tracking-tight transition-all relative py-1 ${
                    isActive
                      ? 'text-nepred-600 font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-nepred-600 after:rounded-full'
                      : 'text-stone-700 hover:text-nepred-600'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Search Bar - Desktop */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex items-center flex-1 max-w-xs relative group"
          >
            <input
              type="text"
              placeholder="Tìm gốm sứ, mây tre, lụa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-xs rounded-full border border-cream-300 bg-cream-50/80 focus:bg-white focus:outline-none focus:border-nepred-600 focus:ring-2 focus:ring-nepred-600/10 text-stone-900 placeholder-stone-400 shadow-inner transition-all"
            />
            <Search className="w-4 h-4 text-stone-400 group-focus-within:text-nepred-600 absolute left-3 pointer-events-none transition-colors" />
          </form>

          {/* Actions: Account & Cart */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* User Dropdown */}
            <div className="relative">
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-full hover:bg-cream-100 border border-cream-200 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-full bg-nepgreen-800 text-cream-50 flex items-center justify-center text-xs font-bold font-sans">
                      {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <span className="hidden sm:inline text-xs font-semibold text-stone-800 max-w-[100px] truncate">
                      {user?.name}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-stone-400 hidden sm:inline" />
                  </button>

                  {userDropdownOpen && (
                    <div
                      onMouseLeave={() => setUserDropdownOpen(false)}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-cream-200 py-2 z-50 animate-in fade-in slide-in-from-top-1"
                    >
                      <div className="px-4 py-2.5 border-b border-cream-100 bg-cream-50/50">
                        <p className="text-xs font-bold text-stone-900">{user?.name}</p>
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
                      <div className="pt-1 mt-1 border-t border-cream-100">
                        <button
                          onClick={() => {
                            logout();
                            setUserDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-2 px-4 py-2 text-xs text-red-600 hover:bg-red-50 transition-colors text-left font-medium"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          Đăng xuất tài khoản
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <Link
                    href="/dang-nhap"
                    className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-stone-700 hover:text-nepred-600 hover:bg-cream-100 rounded-full transition-colors"
                    title="Đăng nhập tài khoản"
                  >
                    <UserIcon className="w-4 h-4 text-stone-600" />
                    <span className="hidden sm:inline">Tài khoản</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Shopping Cart Button */}
            <Link
              href="/gio-hang"
              className="relative p-2.5 rounded-full bg-cream-100/90 hover:bg-cream-200 border border-cream-200 text-stone-900 transition-all flex items-center justify-center group shadow-sm"
              aria-label="Xem giỏ hàng"
            >
              <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform text-stone-800" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-nepred-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="md:hidden pb-3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm gốm, mây tre, lụa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-full border border-cream-300 bg-cream-50 focus:bg-white focus:outline-none focus:border-nepred-600 text-stone-900 placeholder-stone-400"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5 pointer-events-none" />
          </form>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-cream-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-2xl">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-nepred-50 text-nepred-600'
                      : 'text-stone-800 hover:bg-cream-100'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-cream-100 flex flex-col gap-2">
            {isLoggedIn ? (
              <div className="flex items-center justify-between px-3 py-2 bg-cream-50 rounded-xl">
                <div>
                  <p className="text-xs font-bold text-stone-900">{user?.name}</p>
                  <p className="text-[11px] text-stone-500">{user?.email}</p>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-xs text-red-600 hover:underline flex items-center gap-1 font-semibold"
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
        </div>
      )}
    </header>
  );
}
