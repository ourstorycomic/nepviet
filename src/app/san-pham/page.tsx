'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { CATEGORIES } from '@/data/products';
import { useProducts } from '@/utils/productsCatalog';
import { ProductCard } from '@/components/ProductCard';
import { GoldWavyLine, TraditionalFlourish } from '@/components/GoldWavyLine';
import {
  Search,
  SlidersHorizontal,
  X,
  RotateCcw,
  ShieldCheck,
  ArrowRight,
  ChevronRight,
  Filter,
} from 'lucide-react';

function ProductsFilterView() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { products } = useProducts();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
    const search = searchParams.get('search');
    if (search) setSearchQuery(search);
  }, [searchParams]);

  const materials = useMemo(() => [
    { id: 'all', label: 'Tất cả chất liệu' },
    { id: 'gom', label: 'Gốm đất & Sứ cao lanh' },
    { id: 'may-tre', label: 'Mây tre tự nhiên' },
    { id: 'lua-vai', label: 'Lụa tơ tằm & Vải canvas' },
    { id: 'giay-bot', label: 'Giấy điệp & Giấy bồi thủ công' },
    { id: 'tra-banh', label: 'Nông sản, Cốm & Trà hoa' },
  ], []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Loại bỏ hoàn toàn ffff hoặc rác test
      if (product.name?.trim().toLowerCase() === 'ffff' || product.id === 'art-mwu6rwsm') {
        return false;
      }

      // Chỉ hiển thị các sản phẩm đã qua kiểm định duyệt lên sàn
      if (product.approvalStatus === 'pending' || product.approvalStatus === 'rejected') {
        return false;
      }

      if (selectedCategory !== 'all') {
        if (selectedCategory === 'thu-cong-my-nghe') {
          if (product.category !== 'thu-cong-my-nghe' && product.category !== 'gom-su' && product.category !== 'may-tre') return false;
        } else if (product.category !== selectedCategory) {
          return false;
        }
      }

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesSummary = product.summary.toLowerCase().includes(query);
        const matchesVillage = product.village.toLowerCase().includes(query);
        const matchesMaterial = product.material.toLowerCase().includes(query);
        if (!matchesName && !matchesSummary && !matchesVillage && !matchesMaterial) {
          return false;
        }
      }

      if (priceRange === 'under-100' && product.price >= 100000) return false;
      if (priceRange === '100-200' && (product.price < 100000 || product.price > 200000)) return false;
      if (priceRange === '200-500' && (product.price < 200000 || product.price > 500000)) return false;
      if (priceRange === 'above-500' && product.price <= 500000) return false;

      if (selectedMaterial !== 'all') {
        const mat = product.material.toLowerCase();
        if (selectedMaterial === 'gom' && !mat.includes('gốm') && !mat.includes('sét')) return false;
        if (selectedMaterial === 'may-tre' && !mat.includes('mây') && !mat.includes('tre')) return false;
        if (selectedMaterial === 'lua-vai' && !mat.includes('lụa') && !mat.includes('canvas') && !mat.includes('vải')) return false;
        if (selectedMaterial === 'giay-bot' && !mat.includes('giấy') && !mat.includes('bồi')) return false;
        if (selectedMaterial === 'tra-banh' && !mat.includes('trà') && !mat.includes('cốm') && !mat.includes('bột')) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, selectedCategory, searchQuery, priceRange, selectedMaterial, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setPriceRange('all');
    setSelectedMaterial('all');
    setSortBy('featured');
    router.push('/san-pham');
  };

  const activeFiltersCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0) +
    (priceRange !== 'all' ? 1 : 0) +
    (selectedMaterial !== 'all' ? 1 : 0);

  return (
    <div className="bg-[#14100E] text-[#EDE4D8] min-h-screen pb-20 space-y-12">
      
      {/* 1. SUB-HERO BANNER (TRADITIONAL RED LACQUER DONG SON PATTERN BANNER) */}
      <section className="relative w-full py-16 sm:py-24 bg-[#3D0A10] overflow-hidden border-b border-[#52121A] shadow-2xl">
        {/* Dong Son Lacquer Pattern as primary background - High Visibility */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-90"
          style={{ backgroundImage: `url('/patterns/background-hoa-van.webp')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#24080B]/50 via-transparent to-[#14100E] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <nav className="text-xs text-[#E8C59A] flex items-center justify-center gap-2 font-subtext">
            <Link href="/" className="hover:text-white transition-colors">Trang chủ</Link>
            <span className="text-[#C5A880]/60">/</span>
            <span className="text-[#FAF6F0] font-semibold">Tất cả sản phẩm</span>
          </nav>

          <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase text-[#D4AF37]">
            COLLECTIONS • TINH HOA DI SẢN THỦ CÔNG
          </span>

          <h1 className="font-headline text-3xl sm:text-5xl lg:text-6xl font-black text-[#FAF6F0] leading-[1.65] tracking-[0.02em] text-gold-luminous">
            Bộ Sưu Tập Nếp Việt
          </h1>

          <div className="w-48 mx-auto h-3.5 relative my-2">
            <div className="wavy-gold-line animate-gold-wave w-full h-full" />
          </div>

          <p className="text-xs sm:text-sm text-[#EDE4D8] mt-2 max-w-2xl mx-auto leading-relaxed font-subtext">
            Các tác phẩm thủ công mỹ nghệ, đồ chơi dân gian, phụ kiện trang phục truyền thống và ẩm thực được gìn giữ, phát triển bởi nghệ nhân Việt.
          </p>

          {/* Carousel Dots Indicator matching Nguyen Art Gallery style */}
          <div className="flex justify-center items-center gap-2 pt-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] shadow-sm shadow-[#D4AF37]/50" />
            <span className="w-2 h-2 rounded-full bg-white/40" />
            <span className="w-2 h-2 rounded-full bg-white/40" />
            <span className="w-2 h-2 rounded-full bg-white/40" />
          </div>
        </div>
      </section>

      {/* Gold Wavy Contour Line below the banner */}
      <div className="relative -mt-1 z-20">
        <GoldWavyLine />
      </div>

      {/* 2. FEATURED SPOTLIGHT BLOCK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card-lacquer-soft rounded-[32px] p-6 sm:p-8 border border-[#382B26]/80 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Arch Showcase */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden arch-card bg-[#14100E] min-h-[320px] border border-[#362924] shadow-md flex flex-col justify-end p-6">
            <Image
              src="/showcase/gom-su-bat-trang.png"
              alt="Đồ thủ công mỹ nghệ di sản"
              fill
              className="object-cover filter brightness-[0.7] hover:scale-105 transition-transform duration-700"
            />
            <div className="relative z-10 text-white space-y-2">
              <span className="px-2.5 py-0.5 rounded bg-[#A82B1D] text-[10px] font-bold uppercase tracking-wider text-white">
                Di sản tiêu biểu
              </span>
              <h3 className="font-headline text-2xl font-black text-[#FAF6F0]">Đồ Thủ Công Mỹ Nghệ</h3>
              <p className="text-xs text-[#EDE4D8]/90 line-clamp-2">
                Hòa quyện giữa kỹ thuật gốm sứ nung lò và nghệ thuật đan mây tre nan mịn trăm năm của nghệ nhân Việt.
              </p>
            </div>
          </div>

          {/* Right 4 Small Cards */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            {[
              {
                title: 'Đồ Thủ Công Mỹ Nghệ',
                img: '/showcase/may-tre-dan-phu-vinh.webp',
                slug: 'thu-cong-my-nghe',
              },
              {
                title: 'Quà Tặng & Đồ Chơi Dân Gian',
                img: '/showcase/qua-tang-do-choi-dan-gian.webp',
                slug: 'do-choi-qua-tang',
              },
              {
                title: 'Trang Phục & Phụ Kiện',
                img: '/showcase/lua-to-tam-van-phuc.jpg',
                slug: 'phu-kien-thoi-trang',
              },
              {
                title: 'Ẩm Thực Cổ Truyền',
                img: '/showcase/am-thuc-tra-co-truyen.jpg',
                slug: 'am-thuc',
              },
            ].map((item, idx) => {
              const count = products.filter(p => {
                if (p.approvalStatus === 'pending' || p.approvalStatus === 'rejected') return false;
                if (p.name?.trim().toLowerCase() === 'ffff' || p.id === 'art-mwu6rwsm') return false;
                if (item.slug === 'thu-cong-my-nghe') {
                  return p.category === 'thu-cong-my-nghe' || p.category === 'gom-su' || p.category === 'may-tre';
                }
                return p.category === item.slug;
              }).length;

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedCategory(item.slug)}
                  className="relative rounded-2xl overflow-hidden aspect-[4/3] group border border-[#362924] shadow-sm text-left block w-full hover:border-[#C5A880]/60 transition-colors"
                >
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500 filter brightness-[0.65]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14100E]/90 via-[#14100E]/30 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h4 className="font-headline font-bold text-xs sm:text-sm text-[#FAF6F0] group-hover:text-[#C5A880] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-[10px] text-[#C5A880] mt-0.5">{count} tác phẩm</p>
                  </div>
                </button>
              );
            })}
          </div>

        </div>
      </section>

      {/* Traditional Gold Wave Accent */}
      <GoldWavyLine className="max-w-6xl mx-auto opacity-70" />

      {/* 3. HORIZONTAL CATEGORY PILLS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#A82B1D] text-white shadow-lg shadow-black/40 border border-[#D4AF37]/40'
                : 'bg-[#1C1614] text-[#EDE4D8]/80 hover:text-white hover:bg-[#251D1A] border border-[#362924]'
            }`}
          >
            Tất cả sản phẩm ({products.filter(p => p.name?.trim().toLowerCase() !== 'ffff' && p.id !== 'art-mwu6rwsm' && p.approvalStatus !== 'pending' && p.approvalStatus !== 'rejected').length})
          </button>
          {CATEGORIES.map((cat) => {
            const count = products.filter(p => {
              if (p.approvalStatus === 'pending' || p.approvalStatus === 'rejected') return false;
              if (p.name?.trim().toLowerCase() === 'ffff' || p.id === 'art-mwu6rwsm') return false;
              if (cat.slug === 'thu-cong-my-nghe') {
                return p.category === 'thu-cong-my-nghe' || p.category === 'gom-su' || p.category === 'may-tre';
              }
              return p.category === cat.slug;
            }).length;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.slug
                    ? 'bg-[#A82B1D] text-white shadow-lg shadow-black/40 border border-[#D4AF37]/40'
                    : 'bg-[#1C1614] text-[#EDE4D8]/80 hover:text-white hover:bg-[#251D1A] border border-[#362924]'
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. MAIN PRODUCTS GRID & SIDEBAR FILTERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Filters Sidebar */}
          <aside className={`lg:block ${mobileFilterOpen ? 'block' : 'hidden'} bg-[#1C1614] rounded-3xl p-6 border border-[#362924] shadow-sm space-y-6 sticky top-28`}>
            <div className="flex items-center justify-between pb-3 border-b border-[#362924]">
              <div className="flex items-center gap-2 font-headline font-bold text-base text-[#FAF6F0]">
                <SlidersHorizontal className="w-4 h-4 text-[#C5A880]" />
                <span>Bộ Lọc Sản Phẩm</span>
              </div>
              {activeFiltersCount > 0 && (
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-[#C5A880] hover:text-white flex items-center gap-1 font-medium transition-colors"
                >
                  <RotateCcw className="w-3 h-3" /> Đặt lại
                </button>
              )}
            </div>

            {/* Keyword Search */}
            <div>
              <label className="block text-xs font-bold text-[#EDE4D8]/80 uppercase tracking-wider mb-2">
                Từ khóa tìm kiếm
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Gốm lam, khay trà, sen..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-7 py-2.5 text-xs rounded-xl border border-[#362924] bg-[#14100E] focus:outline-none focus:border-[#C5A880] text-[#FAF6F0] placeholder-[#8C7A70]"
                />
                <Search className="w-3.5 h-3.5 text-[#8C7A70] absolute left-2.5 top-3" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-2.5 text-[#8C7A70] hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="block text-xs font-bold text-[#EDE4D8]/80 uppercase tracking-wider mb-2">
                Khoảng giá (VNĐ)
              </label>
              <div className="space-y-1.5 text-xs text-[#EDE4D8]">
                {[
                  { id: 'all', label: 'Tất cả mức giá' },
                  { id: 'under-100', label: 'Dưới 100.000đ' },
                  { id: '100-200', label: 'Từ 100.000đ đến 200.000đ' },
                  { id: '200-500', label: 'Từ 200.000đ đến 500.000đ' },
                  { id: 'above-500', label: 'Trên 500.000đ' },
                ].map((item) => (
                  <label
                    key={item.id}
                    className="flex items-center gap-2.5 cursor-pointer p-2 rounded-lg hover:bg-[#251D1A] transition-colors"
                  >
                    <input
                      type="radio"
                      name="price-filter"
                      checked={priceRange === item.id}
                      onChange={() => setPriceRange(item.id)}
                      className="text-[#A82B1D] focus:ring-[#A82B1D] h-3.5 w-3.5 bg-[#14100E] border-[#362924]"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Material Filter */}
            <div>
              <label className="block text-xs font-bold text-[#EDE4D8]/80 uppercase tracking-wider mb-2">
                Chất liệu chế tác
              </label>
              <select
                value={selectedMaterial}
                onChange={(e) => setSelectedMaterial(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl border border-[#362924] bg-[#14100E] focus:outline-none focus:border-[#C5A880] text-[#FAF6F0] cursor-pointer"
              >
                {materials.map((mat) => (
                  <option key={mat.id} value={mat.id} className="bg-[#1C1614] text-[#FAF6F0]">
                    {mat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Packaging Assurance Card */}
            <div className="p-4 bg-[#231B19] rounded-2xl border border-[#382B26] text-xs text-[#EDE4D8] leading-relaxed">
              <p className="font-bold flex items-center gap-1.5 text-[#C5A880] mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" strokeWidth={1.5} /> 100% Làng nghề Việt
              </p>
              Từng sản phẩm đều có thông tin nghệ nhân hoặc xưởng gia truyền tại Bát Tràng, Phú Vinh, Vạn Phúc, Đông Hồ...
            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Toolbar */}
            <div className="bg-[#1C1614] rounded-2xl p-4 sm:px-6 border border-[#362924] shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center justify-between sm:justify-start gap-3 w-full sm:w-auto">
                <p className="text-[#EDE4D8]/80">
                  Tìm thấy <span className="font-bold text-[#FAF6F0]">{filteredProducts.length}</span> sản phẩm
                </p>

                {/* Mobile Filter Button */}
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                  className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#221A17] hover:bg-[#2A201C] border border-[#362924] font-semibold text-[#EDE4D8] text-xs transition-colors"
                >
                  <Filter className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Bộ lọc {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
                </button>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <span className="text-[#8C7A70] whitespace-nowrap">Sắp xếp:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="p-2 text-xs font-semibold rounded-xl border border-[#362924] bg-[#14100E] focus:outline-none focus:border-[#C5A880] text-[#FAF6F0] cursor-pointer"
                >
                  <option value="featured" className="bg-[#1C1614] text-[#FAF6F0]">Nổi bật nhất</option>
                  <option value="price-asc" className="bg-[#1C1614] text-[#FAF6F0]">Giá: Thấp đến Cao</option>
                  <option value="price-desc" className="bg-[#1C1614] text-[#FAF6F0]">Giá: Cao đến Thấp</option>
                  <option value="rating" className="bg-[#1C1614] text-[#FAF6F0]">Đánh giá cao nhất</option>
                </select>
              </div>
            </div>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-[#1C1614] rounded-3xl p-12 text-center border border-[#362924] shadow-sm space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#14100E] text-[#8C7A70] mx-auto flex items-center justify-center border border-[#362924]">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="font-headline text-lg font-bold text-[#FAF6F0]">
                  Không tìm thấy sản phẩm phù hợp
                </h3>
                <p className="text-xs text-[#EDE4D8]/70 max-w-md mx-auto leading-relaxed">
                  Rất tiếc, không có sản phẩm nào khớp với bộ lọc hiện tại của bạn. Vui lòng thử tìm kiếm bằng từ khóa khác hoặc bấm nút đặt lại bộ lọc bên dưới.
                </p>
                <div>
                  <button
                    onClick={handleResetFilters}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#A82B1D] hover:bg-[#8E2216] text-white rounded-xl text-xs font-semibold shadow-md transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Đặt lại tất cả bộ lọc</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="bg-[#14100E] min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="w-8 h-8 border-4 border-[#C5A880] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          <p className="text-xs text-[#EDE4D8]">Đang tải sản phẩm Nếp Việt...</p>
        </div>
      </div>
    }>
      <ProductsFilterView />
    </Suspense>
  );
}
