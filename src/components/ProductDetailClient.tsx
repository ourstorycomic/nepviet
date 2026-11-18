'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Product } from '@/types';
import { ProductCard } from '@/components/ProductCard';
import { formatCurrency } from '@/utils/format';
import { useCart } from '@/context/CartContext';
import {
  Star,
  ShoppingBag,
  Zap,
  ShieldCheck,
  Truck,
  RotateCcw,
  ScrollText,
  MapPin,
  ChevronRight,
  Minus,
  Plus,
  CheckCircle2,
} from 'lucide-react';

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'story' | 'specs' | 'reviews'>('story');

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push('/thanh-toan');
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Breadcrumb Navigation */}
        <nav className="text-xs text-neutral-500 flex items-center gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-nepred-600 transition-colors">
            Trang chủ
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          <Link href="/san-pham" className="hover:text-nepred-600 transition-colors">
            Sản phẩm
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          <Link
            href={`/san-pham?category=${product.category}`}
            className="hover:text-nepred-600 transition-colors"
          >
            {product.categoryName}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          <span className="text-nepbrown-800 font-semibold truncate max-w-xs sm:max-w-md">
            {product.name}
          </span>
        </nav>

        {/* Main Product Info Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-cream-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Gallery / Images (Left 6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-cream-100 border border-cream-200">
              <Image
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center transition-all duration-300"
              />
              {product.badge && (
                <span className="absolute top-4 left-4 px-3 py-1.5 bg-nepred-600 text-white text-xs font-bold rounded-full shadow-md">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnail selector */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                      selectedImageIndex === idx
                        ? 'border-nepred-600 ring-2 ring-nepred-200'
                        : 'border-cream-300 hover:border-cream-400'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details & Purchase Form (Right 6 Cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              
              {/* Origin Tag */}
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-nepgreen-50 text-nepgreen-800 rounded-full text-xs font-semibold border border-nepgreen-200">
                  <MapPin className="w-3.5 h-3.5 text-nepgreen-600" />
                  {product.village}
                </span>
                <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Còn hàng
                </span>
              </div>

              {/* Product Title */}
              <h1 className="font-serif text-2xl sm:text-3xl font-black text-nepbrown-800 leading-snug">
                {product.name}
              </h1>

              {/* Rating and Reviews */}
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'fill-neutral-200 text-neutral-200'
                      }`}
                    />
                  ))}
                  <span className="font-bold ml-1 text-nepbrown-800">{product.rating}</span>
                </div>
                <span className="text-neutral-300">|</span>
                <span className="text-neutral-500 font-medium">
                  {product.reviewsCount} đánh giá từ người mua
                </span>
                <span className="text-neutral-300">|</span>
                <span className="text-neutral-500 font-medium">
                  Mã SP: <span className="font-mono">{product.id.toUpperCase()}</span>
                </span>
              </div>

              {/* Price Block */}
              <div className="p-4 bg-cream-50 rounded-2xl border border-cream-200 flex items-baseline gap-3">
                <span className="text-3xl font-black text-nepred-600 price-tag">
                  {formatCurrency(product.price)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <>
                    <span className="text-sm text-neutral-400 line-through price-tag">
                      {formatCurrency(product.originalPrice)}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-nepred-100 text-nepred-700 text-xs font-bold price-tag">
                      -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </span>
                  </>
                )}
              </div>

              {/* Short Summary */}
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                {product.summary}
              </p>

              {/* Quick specs pill list */}
              <div className="space-y-2 py-2 border-y border-cream-100 text-xs">
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-neutral-500">Chất liệu:</span>
                  <span className="col-span-2 font-medium text-nepbrown-800">{product.material}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-neutral-500">Kích thước:</span>
                  <span className="col-span-2 font-medium text-nepbrown-800">{product.dimensions}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-neutral-500">Xuất xứ:</span>
                  <span className="col-span-2 font-medium text-nepbrown-800">{product.village}</span>
                </div>
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-nepbrown-800 uppercase tracking-wider">
                  Số lượng:
                </span>
                <div className="flex items-center border border-cream-300 rounded-xl bg-white overflow-hidden shadow-sm">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="p-2.5 text-neutral-500 hover:text-nepbrown-800 hover:bg-cream-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                    aria-label="Giảm số lượng"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-12 text-center text-xs font-bold text-nepbrown-800">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-2.5 text-neutral-500 hover:text-nepbrown-800 hover:bg-cream-100 transition-colors"
                    aria-label="Tăng số lượng"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-xs text-neutral-500">
                  Tạm tính: <span className="font-bold text-nepred-600">{formatCurrency(product.price * quantity)}</span>
                </span>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-cream-100 hover:bg-cream-200 border border-nepbrown-300 text-nepbrown-800 rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-all active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4 text-nepred-600" />
                  <span>Thêm vào giỏ hàng</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-nepred-600 hover:bg-nepred-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-nepred-600/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Zap className="w-4 h-4 fill-white" />
                  <span>Mua ngay (Thanh toán)</span>
                </button>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-2 pt-4 text-center border-t border-cream-100">
                <div className="p-2 rounded-lg bg-cream-50 flex flex-col items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-nepgreen-700" />
                  <span className="text-[10px] text-nepbrown-800 font-medium">100% Thủ công</span>
                </div>
                <div className="p-2 rounded-lg bg-cream-50 flex flex-col items-center gap-1">
                  <Truck className="w-4 h-4 text-nepred-600" />
                  <span className="text-[10px] text-nepbrown-800 font-medium">Bọc chống vỡ</span>
                </div>
                <div className="p-2 rounded-lg bg-cream-50 flex flex-col items-center gap-1">
                  <RotateCcw className="w-4 h-4 text-nepgold-600" />
                  <span className="text-[10px] text-nepbrown-800 font-medium">Đổi trả 7 ngày</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Tabbed Content: Story, Specs, Reviews */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-cream-200 shadow-sm space-y-6">
          <div className="flex border-b border-cream-200 gap-6 sm:gap-10 text-xs sm:text-sm font-bold">
            <button
              onClick={() => setActiveTab('story')}
              className={`pb-4 transition-all relative ${
                activeTab === 'story'
                  ? 'text-nepred-600 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-nepred-600'
                  : 'text-neutral-500 hover:text-nepbrown-800'
              }`}
            >
              Câu Chuyện Chế Tác & Di Sản
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-4 transition-all relative ${
                activeTab === 'specs'
                  ? 'text-nepred-600 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-nepred-600'
                  : 'text-neutral-500 hover:text-nepbrown-800'
              }`}
            >
              Thông Số & Hướng Dẫn Bảo Quản
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-4 transition-all relative ${
                activeTab === 'reviews'
                  ? 'text-nepred-600 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-nepred-600'
                  : 'text-neutral-500 hover:text-nepbrown-800'
              }`}
            >
              Đánh Giá Từ Khách Hàng ({product.reviewsCount})
            </button>
          </div>

          {/* Tab 1: Story */}
          {activeTab === 'story' && (
            <div className="space-y-6 text-sm text-neutral-600 leading-relaxed max-w-4xl">
              <div>
                <h3 className="font-serif font-bold text-lg text-nepbrown-800 mb-2">
                  Ý nghĩa văn hóa & Quá trình chế tác
                </h3>
                <p>{product.description}</p>
              </div>

              <div className="p-6 bg-cream-50 rounded-2xl border border-cream-200 space-y-2">
                <h4 className="font-serif font-bold text-nepgreen-900 flex items-center gap-2">
                  <ScrollText className="w-4 h-4 text-nepbrown-700" strokeWidth={1.5} />
                  Ghi chú từ xưởng nghệ nhân
                </h4>
                <p className="text-xs sm:text-sm text-nepbrown-800 leading-relaxed italic">
                  &ldquo;{product.artisanStory}&rdquo;
                </p>
              </div>
            </div>
          )}

          {/* Tab 2: Specs & Preservation */}
          {activeTab === 'specs' && (
            <div className="space-y-6 text-xs sm:text-sm max-w-3xl">
              <div className="divide-y divide-cream-100 border border-cream-200 rounded-xl overflow-hidden">
                <div className="grid grid-cols-3 p-3.5 bg-cream-50">
                  <span className="font-semibold text-neutral-600">Chất liệu chế tác</span>
                  <span className="col-span-2 text-nepbrown-800">{product.material}</span>
                </div>
                <div className="grid grid-cols-3 p-3.5">
                  <span className="font-semibold text-neutral-600">Kích thước quy chuẩn</span>
                  <span className="col-span-2 text-nepbrown-800">{product.dimensions}</span>
                </div>
                <div className="grid grid-cols-3 p-3.5 bg-cream-50">
                  <span className="font-semibold text-neutral-600">Làng nghề xuất xứ</span>
                  <span className="col-span-2 text-nepbrown-800">{product.village}</span>
                </div>
                <div className="grid grid-cols-3 p-3.5">
                  <span className="font-semibold text-neutral-600">Hướng dẫn bảo quản</span>
                  <span className="col-span-2 text-nepbrown-800 leading-relaxed">{product.preservation}</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Reviews */}
          {activeTab === 'reviews' && (
            <div className="space-y-6 max-w-4xl">
              <div className="flex items-center gap-4 p-4 bg-cream-50 rounded-2xl border border-cream-200">
                <div className="text-center pr-6 border-r border-cream-200">
                  <p className="font-serif text-3xl font-black text-nepbrown-800">{product.rating}</p>
                  <div className="flex text-amber-400 my-1 justify-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-[11px] text-neutral-500">{product.reviewsCount} nhận xét</p>
                </div>
                <div className="text-xs text-neutral-600 space-y-1">
                  <p className="font-semibold text-nepbrown-800">100% đánh giá thực tế từ người mua hàng</p>
                  <p>Mỗi phản hồi giúp các nghệ nhân làng nghề hoàn thiện sản phẩm ngày càng tinh xảo hơn.</p>
                </div>
              </div>

              {/* Sample Reviews */}
              <div className="space-y-4">
                {[
                  {
                    name: 'Nguyễn Phương Linh (Sinh viên USSH)',
                    rating: 5,
                    date: '12/11/2026',
                    comment: 'Sản phẩm bên ngoài đẹp và sắc sảo hơn cả trên hình! Đóng gói cực kỳ kỹ lưỡng với xốp chống va đập. Mua làm quà tặng sinh nhật bạn ai cũng khen tấm tắc.',
                  },
                  {
                    name: 'Trần Minh Quân (Đại học FPT)',
                    rating: 5,
                    date: '08/11/2026',
                    comment: 'Rất ấn tượng với câu chuyện làng nghề in kèm trong hộp. Cảm giác mua một món đồ vừa có giá trị thẩm mỹ vừa ủng hộ được các nghệ nhân bản địa.',
                  },
                  {
                    name: 'Lê Thanh Thảo (Hà Nội)',
                    rating: 4.8,
                    date: '01/11/2026',
                    comment: 'Giao hàng nhanh, shop tư vấn nhiệt tình. Giá cả rất vừa vặn túi tiền sinh viên. Sẽ tiếp tục ủng hộ Nếp Việt dài dài!',
                  },
                ].map((rev, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-cream-200 bg-white space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-nepbrown-800">{rev.name}</span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-semibold">
                          Đã mua hàng
                        </span>
                      </div>
                      <span className="text-neutral-400 text-[11px]">{rev.date}</span>
                    </div>
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs text-neutral-600 leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6 pt-6">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-nepbrown-800">
                Sản Phẩm Cùng Bộ Sưu Tập
              </h2>
              <Link
                href={`/san-pham?category=${product.category}`}
                className="text-xs font-semibold text-nepred-600 hover:text-nepred-700 flex items-center gap-1"
              >
                <span>Xem tất cả</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
