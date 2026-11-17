'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { CATEGORIES } from '@/data/products';
import { useProducts } from '@/utils/productsCatalog';
import { ProductCard } from '@/components/ProductCard';
import {
  Search,
  SlidersHorizontal,
  X,
  RotateCcw,
  Sparkles,
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
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
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
    <div className="bg-[#FAF8F5] min-h-screen pb-16 space-y-12">
      
      {/* 1. SUB-HERO BANNER (AS IN WIREFRAME: TOP BANNER WITH CAROUSEL DOTS) */}
      <section className="relative w-full h-56 sm:h-72 bg-stone-900 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1600&q=80"
          alt="Bộ sưu tập Nếp Việt"
          fill
          priority
          className="object-cover object-center filter brightness-[0.6]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-black/30" />

        <div className="relative max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <nav className="text-xs text-cream-300 mb-2 flex items-center gap-1.5">
            <Link href="/" className="hover:text-white">Trang chủ</Link>
            <span>/</span>
            <span className="text-amber-300 font-semibold">Tất cả sản phẩm</span>
          </nav>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Bộ Sưu Tập Thủ Công Nếp Việt
          </h1>
          <p className="text-xs sm:text-sm text-cream-200 mt-2 max-w-xl">
            Tuyển chọn trực tiếp từ các nghệ nhân lâu năm tại làng gốm Bát Tràng, mây tre Phú Vinh, dệt lụa Vạn Phúc và tranh Đông Hồ.
          </p>
        </div>

        {/* Carousel Dots Indicator as in wireframe */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
          <span className="w-6 h-1.5 rounded-full bg-amber-400" />
          <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
          <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
        </div>
      </section>

      {/* 2. WIREFRAME FEATURED BLOCK: ARCH ON LEFT + 4 SMALL CARDS ON RIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Arch Showcase */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden arch-card bg-stone-900 min-h-[300px] border-2 border-cream-200 shadow-md flex flex-col justify-end p-6">
            <Image
              src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=85"
              alt="Gốm Bát Tràng di sản"
              fill
              className="object-cover filter brightness-[0.75] hover:scale-105 transition-transform duration-700"
            />
            <div className="relative z-10 text-white space-y-2">
              <span className="px-2.5 py-0.5 rounded bg-nepred-600 text-[10px] font-bold uppercase tracking-wider">
                Di sản tiêu biểu
              </span>
              <h3 className="font-serif text-xl font-bold">Gốm Sứ Bát Tràng Men Lam</h3>
              <p className="text-xs text-cream-200 line-clamp-2">
                Hơn 700 năm lịch sử, từng đường cọ vẽ lam thanh thoát nung qua lửa đỏ nghìn độ.
              </p>
            </div>
          </div>

          {/* Right 4 Small Cards (2x2 Grid as in Wireframe) */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            {[
              {
                title: 'Mây Tre Phú Vinh',
                count: '3 mẫu thủ công',
                img: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=400&q=80',
                slug: 'may-tre',
              },
              {
                title: 'Đồ Chơi Dân Gian',
                count: '4 mẫu truyền thống',
                img: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&q=80',
                slug: 'do-choi-qua-tang',
              },
              {
                title: 'Lụa Vạn Phúc & Canvas',
                count: '3 mẫu dệt may',
                img: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=400&q=80',
                slug: 'phu-kien-thoi-trang',
              },
              {
                title: 'Ẩm Thực Cổ Truyền',
                count: '2 món tiến vua',
                img: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=400&q=80',
                slug: 'am-thuc',
              },
            ].map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedCategory(item.slug)}
                className="relative rounded-2xl overflow-hidden aspect-[4/3] group border border-cream-200 shadow-sm text-left block w-full"
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500 filter brightness-[0.7]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h4 className="font-serif font-bold text-xs sm:text-sm group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-cream-200">{item.count}</p>
                </div>
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* 3. HORIZONTAL CATEGORY PILLS (AS IN WIREFRAME) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === 'all'
                ? 'bg-nepred-600 text-white shadow-md'
                : 'bg-white text-stone-700 hover:bg-cream-100 border border-cream-200'
            }`}
          >
            Tất cả sản phẩm ({products.length})
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.slug
                  ? 'bg-nepred-600 text-white shadow-md'
                  : 'bg-white text-stone-700 hover:bg-cream-100 border border-cream-200'
              }`}
            >
              {cat.name} ({cat.itemCount})
            </button>
          ))}
        </div>
      </section>

      {/* 4. MAIN PRODUCTS GRID & SIDEBAR FILTERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Filters Sidebar */}
          <aside className={`lg:block ${mobileFilterOpen ? 'block' : 'hidden'} bg-white rounded-3xl p-6 border border-cream-200 shadow-sm space-y-6 sticky top-28`}>
            <div className="flex items-center justify-between pb-3 border-b border-cream-200">
              <div className="flex items-center gap-2 font-serif font-bold text-base text-stone-900">
                <SlidersHorizontal className="w-4 h-4 text-nepred-600" />
                <span>Bộ Lọc Sản Phẩm</span>
              </div>
              {activeFiltersCount > 0 && (
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-nepred-600 hover:text-nepred-800 flex items-center gap-1 font-medium"
                >
                  <RotateCcw className="w-3 h-3" /> Đặt lại
                </button>
              )}
            </div>

            {/* Keyword Search */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                Từ khóa tìm kiếm
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Gốm lam, khay trà, sen..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-7 py-2 text-xs rounded-xl border border-cream-300 bg-cream-50 focus:bg-white focus:outline-none focus:border-nepred-600 text-stone-900"
                />
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-3" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-2.5 text-stone-400 hover:text-stone-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                Khoảng giá (VNĐ)
              </label>
              <div className="space-y-1.5 text-xs text-stone-800">
                {[
                  { id: 'all', label: 'Tất cả mức giá' },
                  { id: 'under-100', label: 'Dưới 100.000đ' },
                  { id: '100-200', label: 'Từ 100.000đ đến 200.000đ' },
                  { id: '200-500', label: 'Từ 200.000đ đến 500.000đ' },
                  { id: 'above-500', label: 'Trên 500.000đ' },
                ].map((item) => (
                  <label
                    key={item.id}
                    className="flex items-center gap-2 cursor-pointer p-1.5 rounded-lg hover:bg-cream-50"
                  >
                    <input
                      type="radio"
                      name="price-filter"
                      checked={priceRange === item.id}
                      onChange={() => setPriceRange(item.id)}
                      className="text-nepred-600 focus:ring-nepred-500 h-3.5 w-3.5"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Material Filter */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                Chất liệu chế tác
              </label>
              <select
                value={selectedMaterial}
                onChange={(e) => setSelectedMaterial(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl border border-cream-300 bg-cream-50 focus:bg-white focus:outline-none focus:border-nepred-600 text-stone-900 cursor-pointer"
              >
                {materials.map((mat) => (
                  <option key={mat.id} value={mat.id}>
                    {mat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Packaging Assurance Card */}
            <div className="p-4 bg-nepgreen-50 rounded-2xl border border-nepgreen-100 text-xs text-nepgreen-900 leading-relaxed">
              <p className="font-bold flex items-center gap-1.5 text-nepgreen-800 mb-1">
                <Sparkles className="w-3.5 h-3.5" /> 100% Làng nghề Việt
              </p>
              Từng sản phẩm đều có thông tin nghệ nhân hoặc xưởng gia truyền tại Bát Tràng, Phú Vinh, Vạn Phúc, Đông Hồ...
            </div>
          </aside>

          {/* Product Grid Area (4 columns on large screens) */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Toolbar */}
            <div className="bg-white rounded-2xl p-4 sm:px-6 border border-cream-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <p className="text-stone-600">
                Tìm thấy <span className="font-bold text-stone-900">{filteredProducts.length}</span> sản phẩm phù hợp
              </p>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <span className="text-stone-500 whitespace-nowrap">Sắp xếp:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="p-2 text-xs font-semibold rounded-xl border border-cream-300 bg-cream-50 focus:bg-white focus:outline-none focus:border-nepred-600 text-stone-900 cursor-pointer"
                >
                  <option value="featured">Nổi bật nhất</option>
                  <option value="price-asc">Giá: Thấp đến Cao</option>
                  <option value="price-desc">Giá: Cao đến Thấp</option>
                  <option value="rating">Đánh giá cao nhất</option>
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
              <div className="bg-white rounded-3xl p-12 text-center border border-cream-200 shadow-sm space-y-4">
                <div className="w-16 h-16 rounded-full bg-cream-100 text-stone-400 mx-auto flex items-center justify-center">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  Không tìm thấy sản phẩm phù hợp
                </h3>
                <p className="text-xs text-stone-500 max-w-md mx-auto leading-relaxed">
                  Rất tiếc, không có sản phẩm nào khớp với bộ lọc hiện tại của bạn. Vui lòng thử tìm kiếm bằng từ khóa khác hoặc bấm nút đặt lại bộ lọc bên dưới.
                </p>
                <div>
                  <button
                    onClick={handleResetFilters}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-nepred-600 hover:bg-nepred-700 text-white rounded-xl text-xs font-semibold shadow-md transition-colors"
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
      <div className="bg-[#FAF8F5] min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="w-8 h-8 border-4 border-nepred-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          <p className="text-xs text-stone-500">Đang tải sản phẩm Nếp Việt...</p>
        </div>
      </div>
    }>
      <ProductsFilterView />
    </Suspense>
  );
}
