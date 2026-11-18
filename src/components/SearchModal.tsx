'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useProducts } from '@/utils/productsCatalog';
import { CATEGORIES, CRAFT_VILLAGES } from '@/data/products';
import { formatCurrency } from '@/utils/format';
import {
  Search,
  X,
  ArrowRight,
  MapPin,
  Sparkles,
  Flame,
  Layers,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const { products } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto focus input khi modal mở
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = 'unset';
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  // Lắng nghe phím Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lọc sản phẩm theo từ khóa
  const matchingProducts = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const query = searchTerm.toLowerCase().trim();
    return products.filter((p) => {
      return (
        p.name.toLowerCase().includes(query) ||
        p.summary.toLowerCase().includes(query) ||
        p.categoryName.toLowerCase().includes(query) ||
        p.village.toLowerCase().includes(query) ||
        p.material.toLowerCase().includes(query)
      );
    });
  }, [products, searchTerm]);

  // Lọc làng nghề theo từ khóa
  const matchingVillages = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const query = searchTerm.toLowerCase().trim();
    return CRAFT_VILLAGES.filter(
      (v) =>
        v.name.toLowerCase().includes(query) ||
        v.location.toLowerCase().includes(query) ||
        v.highlight.toLowerCase().includes(query)
    );
  }, [searchTerm]);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/san-pham?search=${encodeURIComponent(searchTerm.trim())}`);
      onClose();
    }
  };

  const popularKeywords = [
    { label: 'Ấm chén Bát Tràng', query: 'ấm chén' },
    { label: 'Lụa tơ tằm Vạn Phúc', query: 'lụa' },
    { label: 'Mây tre Phú Vinh', query: 'mây tre' },
    { label: 'Tranh Đông Hồ', query: 'Đông Hồ' },
    { label: 'Trà sen Tây Hồ', query: 'trà sen' },
    { label: 'Mặt nạ giấy bồi', query: 'mặt nạ' },
    { label: 'Tò he Xuân La', query: 'tò he' },
    { label: 'Túi tote Đông Sơn', query: 'túi tote' },
  ];

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 md:p-10 pt-16 sm:pt-24 bg-stone-950/65 backdrop-blur-md transition-all duration-200 animate-in fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      {/* Modal Card */}
      <div
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-cream-200/90 overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Input Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="relative flex items-center gap-3 p-4 sm:p-5 border-b border-cream-200 bg-cream-50/60"
        >
          <Search className="w-5 h-5 text-nepred-600 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm sản phẩm, làng nghề, chất liệu..."
            className="flex-1 text-base sm:text-lg bg-transparent border-0 outline-none text-stone-900 placeholder:text-stone-400 font-sans focus:ring-0"
          />

          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-cream-200/70 transition-colors"
              aria-label="Xóa nội dung"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium text-stone-500 hover:text-stone-800 bg-cream-200/60 hover:bg-cream-200 transition-colors"
          >
            <span>Đóng</span>
            <kbd className="hidden sm:inline-block text-[10px] font-mono px-1 rounded bg-white border border-cream-300">
              ESC
            </kbd>
          </button>
        </form>

        {/* Content Body (Scrollable) */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-6 divide-y divide-cream-100">
          {/* A. Khi đã nhập từ khóa tìm kiếm */}
          {searchTerm.trim() ? (
            <div className="space-y-6">
              {/* Kết quả sản phẩm */}
              <div>
                <div className="flex items-center justify-between pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-nepgreen-800">
                    Sản phẩm phù hợp ({matchingProducts.length})
                  </span>
                  {matchingProducts.length > 0 && (
                    <button
                      onClick={handleSearchSubmit}
                      className="text-xs font-semibold text-nepred-600 hover:underline flex items-center gap-1"
                    >
                      <span>Xem tất cả</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {matchingProducts.length > 0 ? (
                  <div className="space-y-2">
                    {matchingProducts.slice(0, 5).map((product) => (
                      <Link
                        key={product.id}
                        href={`/san-pham/${product.slug}`}
                        onClick={onClose}
                        className="group flex items-center justify-between p-2.5 rounded-2xl hover:bg-cream-100/80 border border-transparent hover:border-cream-200 transition-all"
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-cream-100 flex-shrink-0 border border-cream-200">
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              fill
                              sizes="48px"
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs sm:text-sm font-semibold text-stone-900 group-hover:text-nepred-600 transition-colors truncate">
                              {product.name}
                            </p>
                            <p className="text-[11px] text-stone-500 flex items-center gap-1 truncate mt-0.5">
                              <MapPin className="w-3 h-3 text-nepgreen-700 flex-shrink-0" />
                              <span>{product.village}</span>
                            </p>
                          </div>
                        </div>

                        <div className="text-right flex-shrink-0 ml-3">
                          <span className="text-xs sm:text-sm font-bold text-nepred-600">
                            {formatCurrency(product.price)}
                          </span>
                          {product.originalPrice && (
                            <p className="text-[10px] text-stone-400 line-through">
                              {formatCurrency(product.originalPrice)}
                            </p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center text-stone-500">
                    <p className="text-sm font-medium">
                      Không tìm thấy sản phẩm nào khớp với &ldquo;{searchTerm}&rdquo;
                    </p>
                    <p className="text-xs text-stone-400 mt-1">
                      Hãy thử tìm bằng các từ khóa phổ biến: gốm, lụa, mây tre, tranh...
                    </p>
                  </div>
                )}
              </div>

              {/* Kết quả Làng nghề & Di sản */}
              {matchingVillages.length > 0 && (
                <div className="pt-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-nepgold-600 block pb-3">
                    Làng nghề & Văn hóa liên quan ({matchingVillages.length})
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {matchingVillages.map((village) => (
                      <Link
                        key={village.id}
                        href="/van-hoa"
                        onClick={onClose}
                        className="p-3 rounded-2xl bg-cream-50/80 hover:bg-cream-100 border border-cream-200/80 flex items-start gap-3 transition-colors group"
                      >
                        <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-stone-200 flex-shrink-0">
                          <Image
                            src={village.image}
                            alt={village.name}
                            fill
                            sizes="40px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-stone-900 group-hover:text-nepred-600 truncate">
                            {village.name}
                          </h4>
                          <p className="text-[11px] text-stone-500 truncate mt-0.5">
                            {village.location}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* B. Khi chưa nhập từ khóa (Gợi ý & Xu hướng) */
            <div className="space-y-6 py-2">
              {/* Từ khóa phổ biến */}
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-stone-600 mb-3">
                  <TrendingUp className="w-3.5 h-3.5 text-nepred-600" />
                  <span>Tìm kiếm phổ biến</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {popularKeywords.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSearchTerm(item.query)}
                      className="px-3.5 py-1.5 rounded-full text-xs font-medium text-stone-700 bg-cream-100/90 hover:bg-nepred-50 hover:text-nepred-600 border border-cream-200/80 transition-all flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3 h-3 text-nepgold-500" />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Danh mục di sản */}
              <div className="pt-4">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-stone-600 mb-3">
                  <Layers className="w-3.5 h-3.5 text-nepgreen-700" />
                  <span>Khám phá theo danh mục</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/san-pham?category=${cat.slug}`}
                      onClick={onClose}
                      className="group p-2.5 rounded-2xl bg-cream-50/70 hover:bg-cream-100 border border-cream-200/80 flex items-center gap-2.5 transition-colors"
                    >
                      <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-cream-200 flex-shrink-0">
                        <Image
                          src={cat.image}
                          alt={cat.name}
                          fill
                          sizes="32px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-stone-900 group-hover:text-nepred-600 truncate">
                          {cat.name}
                        </p>
                        <p className="text-[10px] text-stone-500">
                          {cat.itemCount} sản phẩm
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Shortcut Info Bar */}
        <div className="p-3 sm:px-6 bg-cream-50/80 border-t border-cream-200 flex items-center justify-between text-[11px] text-stone-500">
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">
              Nhấn <strong className="font-mono text-stone-700">Enter</strong> để tìm toàn bộ
            </span>
            <span className="hidden sm:inline">
              Nhấn <strong className="font-mono text-stone-700">Esc</strong> để đóng
            </span>
            <span className="sm:hidden">
              Nhấn Enter để tìm
            </span>
          </div>
          {searchTerm.trim() && (
            <button
              onClick={handleSearchSubmit}
              className="text-nepred-600 font-bold hover:underline flex items-center gap-1"
            >
              <span>Xem tất cả kết quả</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
