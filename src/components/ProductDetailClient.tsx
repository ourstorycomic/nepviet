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
    <div className="bg-[#14100E] text-[#EDE4D8] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Breadcrumb Navigation */}
        <nav className="text-xs text-[#8C7A70] flex items-center gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-white transition-colors">
            Trang chủ
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#8C7A70]" />
          <Link href="/san-pham" className="hover:text-white transition-colors">
            Sản phẩm
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#8C7A70]" />
          <Link
            href={`/san-pham?category=${product.category}`}
            className="hover:text-[#C5A880] transition-colors"
          >
            {product.categoryName}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#8C7A70]" />
          <span className="text-[#FAF6F0] font-semibold truncate max-w-xs sm:max-w-md">
            {product.name}
          </span>
        </nav>

        {/* Main Product Info Section */}
        <div className="card-lacquer-soft rounded-[32px] p-6 sm:p-10 border border-[#382B26]/80 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Gallery / Images (Left 6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-square w-full rounded-[24px] overflow-hidden bg-[#14100E] border border-[#382B26]/80 shadow-lg">
              <Image
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center transition-all duration-300"
              />
              {product.badge && (
                <span className="absolute top-4 left-4 px-3 py-1.5 bg-[#8B1E2B] text-white text-xs font-bold rounded-xl shadow-md border border-[#D4AF37]/30">
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
                    className={`relative w-20 h-20 rounded-[16px] overflow-hidden border-2 transition-all flex-shrink-0 ${
                      selectedImageIndex === idx
                        ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/30 scale-105'
                        : 'border-[#362924] hover:border-[#8C7A70]'
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
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#241A16] text-[#C5A880] rounded-full text-xs font-semibold border border-[#382B26]">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                  {product.village}
                </span>
                <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Còn hàng
                </span>
              </div>

              {/* Product Title */}
              <h1 className="font-headline text-2xl sm:text-4xl font-black text-[#FAF6F0] leading-[1.6] tracking-[0.015em] text-gold-luminous">
                {product.name}
              </h1>

              {/* Rating and Reviews */}
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'fill-stone-700 text-stone-700'
                      }`}
                    />
                  ))}
                  <span className="font-bold ml-1 text-[#FAF6F0]">{product.rating}</span>
                </div>
                <span className="text-[#362924]">|</span>
                <span className="text-[#8C7A70] font-medium">
                  {product.reviewsCount} đánh giá từ người mua
                </span>
                <span className="text-[#362924]">|</span>
                <span className="text-[#8C7A70] font-medium">
                  Mã SP: <span className="font-mono text-[#EDE4D8]">{product.id.toUpperCase()}</span>
                </span>
              </div>

              {/* Price Block */}
              <div className="p-4 bg-[#231B19] rounded-2xl border border-[#382B26] flex items-baseline gap-3">
                <span className="text-3xl font-black text-[#D4AF37] price-tag">
                  {formatCurrency(product.price)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <>
                    <span className="text-sm text-[#8C7A70] line-through price-tag">
                      {formatCurrency(product.originalPrice)}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#A82B1D]/20 text-[#A82B1D] border border-[#A82B1D]/40 text-xs font-bold price-tag">
                      -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </span>
                  </>
                )}
              </div>

              {/* Short Summary */}
              <p className="text-xs sm:text-sm text-[#EDE4D8]/80 leading-relaxed">
                {product.summary}
              </p>

              {/* Quick specs pill list */}
              <div className="space-y-2 py-2 border-y border-[#362924] text-xs">
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-[#8C7A70]">Chất liệu:</span>
                  <span className="col-span-2 font-medium text-[#FAF6F0]">{product.material}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-[#8C7A70]">Kích thước:</span>
                  <span className="col-span-2 font-medium text-[#FAF6F0]">{product.dimensions}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-[#8C7A70]">Xuất xứ:</span>
                  <span className="col-span-2 font-medium text-[#FAF6F0]">{product.village}</span>
                </div>
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-[#EDE4D8] uppercase tracking-wider">
                  Số lượng:
                </span>
                <div className="flex items-center border border-[#362924] rounded-xl bg-[#14100E] overflow-hidden shadow-sm">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="p-2.5 text-[#8C7A70] hover:text-[#FAF6F0] hover:bg-[#251D1A] disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                    aria-label="Giảm số lượng"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-12 text-center text-xs font-bold text-[#FAF6F0]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-2.5 text-[#8C7A70] hover:text-[#FAF6F0] hover:bg-[#251D1A] transition-colors"
                    aria-label="Tăng số lượng"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-xs text-[#8C7A70]">
                  Tạm tính: <span className="font-bold text-[#D4AF37]">{formatCurrency(product.price * quantity)}</span>
                </span>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#231B19] hover:bg-[#2C221F] border border-[#3E2D26] text-[#EDE4D8] rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-all active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4 text-[#C5A880]" />
                  <span>Thêm vào giỏ hàng</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#A82B1D] hover:bg-[#8E2216] text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-black/40 border border-[#D4AF37]/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Zap className="w-4 h-4 fill-white" />
                  <span>Mua ngay (Thanh toán)</span>
                </button>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-2 pt-4 text-center border-t border-[#362924]">
                <div className="p-2.5 rounded-xl bg-[#231B19] border border-[#382B26] flex flex-col items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                  <span className="text-[10px] text-[#EDE4D8] font-medium">100% Thủ công</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#231B19] border border-[#382B26] flex flex-col items-center gap-1">
                  <Truck className="w-4 h-4 text-[#C5A880]" />
                  <span className="text-[10px] text-[#EDE4D8] font-medium">Bọc chống vỡ</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#231B19] border border-[#382B26] flex flex-col items-center gap-1">
                  <RotateCcw className="w-4 h-4 text-[#C5A880]" />
                  <span className="text-[10px] text-[#EDE4D8] font-medium">Đổi trả 7 ngày</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Tabbed Content: Story, Specs, Reviews */}
        <div className="bg-[#1C1614] rounded-3xl p-6 sm:p-10 border border-[#362924] shadow-xl space-y-6">
          <div className="flex border-b border-[#362924] gap-6 sm:gap-10 text-xs sm:text-sm font-bold">
            <button
              onClick={() => setActiveTab('story')}
              className={`pb-4 transition-all relative ${
                activeTab === 'story'
                  ? 'text-[#C5A880] after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#C5A880]'
                  : 'text-[#8C7A70] hover:text-[#EDE4D8]'
              }`}
            >
              Câu Chuyện Chế Tác & Di Sản
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-4 transition-all relative ${
                activeTab === 'specs'
                  ? 'text-[#C5A880] after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#C5A880]'
                  : 'text-[#8C7A70] hover:text-[#EDE4D8]'
              }`}
            >
              Thông Số & Hướng Dẫn Bảo Quản
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-4 transition-all relative ${
                activeTab === 'reviews'
                  ? 'text-[#C5A880] after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#C5A880]'
                  : 'text-[#8C7A70] hover:text-[#EDE4D8]'
              }`}
            >
              Đánh Giá Từ Khách Hàng ({product.reviewsCount})
            </button>
          </div>

          {/* Tab 1: Story */}
          {activeTab === 'story' && (
            <div className="space-y-6 text-sm text-[#EDE4D8]/80 leading-relaxed max-w-4xl">
              <div>
                <h3 className="font-headline font-bold text-lg text-[#FAF6F0] mb-2">
                  Ý nghĩa văn hóa & Quá trình chế tác
                </h3>
                <p>{product.description}</p>
              </div>

              <div className="p-6 bg-[#231B19] rounded-2xl border border-[#382B26] space-y-2">
                <h4 className="font-headline font-bold text-[#C5A880] flex items-center gap-2">
                  <ScrollText className="w-4 h-4 text-[#C5A880]" strokeWidth={1.5} />
                  Ghi chú từ xưởng nghệ nhân
                </h4>
                <p className="text-xs sm:text-sm text-[#EDE4D8] leading-relaxed italic">
                  &ldquo;{product.artisanStory}&rdquo;
                </p>
              </div>
            </div>
          )}

          {/* Tab 2: Specs & Preservation */}
          {activeTab === 'specs' && (
            <div className="space-y-6 text-xs sm:text-sm max-w-3xl">
              <div className="divide-y divide-[#362924] border border-[#362924] rounded-xl overflow-hidden">
                <div className="grid grid-cols-3 p-3.5 bg-[#231B19]">
                  <span className="font-semibold text-[#8C7A70]">Chất liệu chế tác</span>
                  <span className="col-span-2 text-[#FAF6F0]">{product.material}</span>
                </div>
                <div className="grid grid-cols-3 p-3.5 bg-[#1C1614]">
                  <span className="font-semibold text-[#8C7A70]">Kích thước quy chuẩn</span>
                  <span className="col-span-2 text-[#FAF6F0]">{product.dimensions}</span>
                </div>
                <div className="grid grid-cols-3 p-3.5 bg-[#231B19]">
                  <span className="font-semibold text-[#8C7A70]">Làng nghề xuất xứ</span>
                  <span className="col-span-2 text-[#FAF6F0]">{product.village}</span>
                </div>
                <div className="grid grid-cols-3 p-3.5 bg-[#1C1614]">
                  <span className="font-semibold text-[#8C7A70]">Hướng dẫn bảo quản</span>
                  <span className="col-span-2 text-[#FAF6F0] leading-relaxed">{product.preservation}</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Reviews */}
          {activeTab === 'reviews' && (
            <div className="space-y-6 max-w-4xl">
              <div className="flex items-center gap-4 p-4 bg-[#231B19] rounded-2xl border border-[#382B26]">
                <div className="text-center pr-6 border-r border-[#362924]">
                  <p className="font-headline text-3xl font-black text-[#FAF6F0]">{product.rating}</p>
                  <div className="flex text-amber-400 my-1 justify-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-[11px] text-[#8C7A70]">{product.reviewsCount} nhận xét</p>
                </div>
                <div className="text-xs text-[#EDE4D8]/80 space-y-1">
                  <p className="font-semibold text-[#FAF6F0]">100% đánh giá thực tế từ người mua hàng</p>
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
                  <div key={idx} className="p-4 rounded-xl border border-[#362924] bg-[#231B19] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#FAF6F0]">{rev.name}</span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-900/40 border border-emerald-700/50 text-emerald-400 text-[10px] font-semibold">
                          Đã mua hàng
                        </span>
                      </div>
                      <span className="text-[#8C7A70] text-[11px]">{rev.date}</span>
                    </div>
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs text-[#EDE4D8]/80 leading-relaxed">{rev.comment}</p>
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
              <h2 className="font-headline text-2xl sm:text-3xl font-black text-[#FAF6F0]">
                Tác Phẩm Cùng Bộ Sưu Tập
              </h2>
              <Link
                href={`/san-pham?category=${product.category}`}
                className="text-xs font-semibold text-[#C5A880] hover:text-white flex items-center gap-1 transition-colors"
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
