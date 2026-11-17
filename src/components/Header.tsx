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
  Heart,
  PhoneCall,
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
    { href: '/san-pham', label: 'Sản phẩm' },
    { href: '/van-hoa', label: 'Văn hóa & Làng nghề' },
    { href: '/gioi-thieu', label: 'Giới thiệu' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-cream-200 shadow-sm transition-all">
      {/* Top Banner Bar */}
      <div className="bg-nepgreen-900 text-cream-100 text-xs py-1.5 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-nepgold-500 animate-pulse hidden sm:inline" />
        <span>Nếp Việt – Tinh hoa quà tặng & thủ công truyền thống • Miễn phí giao hàng đơn từ 300.000đ</span>
        <span className="hidden md:inline text-cream-300">|</span>
        <span className="hidden md:inline-flex items-center gap-1 text-cream-200">
          <PhoneCall className="w-3 h-3 text-nepgold-500" /> Hotline: 1900 6868
        </span>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-nepbrown-700 hover:text-nepred-600 hover:bg-cream-100 transition-colors"
              aria-label="Mở menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-full bg-nepred-600 text-white flex items-center justify-center font-serif text-2xl font-bold shadow-md group-hover:scale-105 transition-transform duration-200">
              NV
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-black tracking-wider text-nepbrown-800 group-hover:text-nepred-600 transition-colors">
                NẾP VIỆT
              </span>
              <span className="text-[10px] uppercase tracking-widest text-nepgreen-700 font-semibold -mt-1">
                Tinh hoa thủ công
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold transition-all relative py-1 ${
                    isActive
                      ? 'text-nepred-600 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-nepred-600'
                      : 'text-nepbrown-700 hover:text-nepred-600'
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
            className="hidden md:flex items-center flex-1 max-w-xs relative"
          >
            <input
              type="text"
              placeholder="Tìm gốm, mây tre, quà tặng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-full border border-cream-300 bg-cream-50/70 focus:bg-white focus:outline-none focus:border-nepred-600 focus:ring-1 focus:ring-nepred-600 text-nepbrown-800 placeholder-nepbrown-500 transition-all"
            />
            <Search className="w-4 h-4 text-nepbrown-500 absolute left-3 pointer-events-none" />
          </form>

          {/* User Account & Cart Actions */}
          <div className="flex items-center gap-3">
            {/* User Dropdown */}
            <div className="relative">
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-full hover:bg-cream-100 border border-transparent hover:border-cream-300 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-nepgreen-700 text-cream-50 flex items-center justify-center text-xs font-bold">
                      {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <span className="hidden sm:inline text-xs font-medium text-nepbrown-800 max-w-[100px] truncate">
                      {user?.name}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-nepbrown-500 hidden sm:inline" />
                  </button>

                  {userDropdownOpen && (
                    <div
                      onMouseLeave={() => setUserDropdownOpen(false)}
                      className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-cream-200 py-2 z-50 animate-in fade-in slide-in-from-top-1"
                    >
                      <div className="px-4 py-2 border-b border-cream-100">
                        <p className="text-xs font-bold text-nepbrown-800">{user?.name}</p>
                        <p className="text-[11px] text-nepbrown-500 truncate">{user?.email}</p>
                      </div>
                      <Link
                        href="/san-pham"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-xs text-nepbrown-700 hover:bg-cream-50 hover:text-nepred-600 transition-colors"
                      >
                        Khám phá sản phẩm
                      </Link>
                      <Link
                        href="/gio-hang"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-xs text-nepbrown-700 hover:bg-cream-50 hover:text-nepred-600 transition-colors"
                      >
                        Đơn hàng & Giỏ hàng
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-xs text-red-600 hover:bg-red-50 transition-colors text-left"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Đăng xuất
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <Link
                    href="/dang-nhap"
                    className="flex items-center gap-1.5 p-2 sm:px-3 sm:py-1.5 text-xs font-medium text-nepbrown-700 hover:text-nepred-600 hover:bg-cream-100 rounded-lg transition-colors"
                    title="Đăng nhập"
                  >
                    <UserIcon className="w-5 h-5 sm:w-4 sm:h-4 text-nepbrown-600" />
                    <span className="hidden sm:inline">Tài khoản</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Shopping Cart Button */}
            <Link
              href="/gio-hang"
              className="relative p-2.5 rounded-full bg-cream-100 hover:bg-cream-200 text-nepbrown-800 transition-colors flex items-center justify-center group"
              aria-label="Xem giỏ hàng"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform text-nepbrown-800" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-nepred-600 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Search Bar Row */}
        <div className="md:hidden pb-3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm gốm, mây tre, bánh dân gian..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-full border border-cream-300 bg-cream-50 focus:bg-white focus:outline-none focus:border-nepred-600 text-nepbrown-800 placeholder-nepbrown-500"
            />
            <Search className="w-4 h-4 text-nepbrown-500 absolute left-3 top-2.5 pointer-events-none" />
          </form>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-cream-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-nepred-50 text-nepred-600'
                      : 'text-nepbrown-800 hover:bg-cream-100'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-cream-100 flex flex-col gap-2">
            {isLoggedIn ? (
              <div className="flex items-center justify-between px-3 py-2 bg-cream-50 rounded-lg">
                <div>
                  <p className="text-xs font-bold text-nepbrown-800">{user?.name}</p>
                  <p className="text-[11px] text-nepbrown-500">{user?.email}</p>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-xs text-red-600 hover:underline flex items-center gap-1"
                >
                  <LogOut className="w-3.5 h-3.5" /> Đăng xuất
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/dang-nhap"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 text-xs font-semibold text-nepbrown-800 bg-cream-100 hover:bg-cream-200 rounded-lg transition-colors"
                >
                  Đăng nhập
                </Link>
                <Link
                  href="/dang-ky"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 text-xs font-semibold text-white bg-nepred-600 hover:bg-nepred-700 rounded-lg transition-colors"
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
