'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { formatCurrency } from '@/utils/format';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Star, Eye, MapPin } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className="group bg-[#1C1614] rounded-[26px] overflow-hidden border border-[#382B26] hover:border-[#5C4336] shadow-lg hover:shadow-[0_20px_45px_-10px_rgba(0,0,0,0.85),0_0_25px_-5px_rgba(212,175,55,0.18)] transition-[border-color,box-shadow] duration-500 ease-out flex flex-col text-[#EDE4D8]">
      {/* Product Image Container */}
      <Link
        href={`/san-pham/${product.slug}`}
        className="relative aspect-square w-full overflow-hidden bg-[#241C1A] rounded-t-[25px] block"
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover object-center group-hover:scale-106 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <span className="px-2.5 py-1 bg-gradient-to-r from-[#8B1E2B] to-[#A32434] text-white text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-md border border-[#D4AF37]/40">
              {product.badge}
            </span>
          </div>
        )}

        {/* Quick View Overlay Button */}
        <div className="absolute inset-0 bg-black/45 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <span className="px-4 py-2 bg-[#1C1614]/95 text-[#EDE4D8] border border-[#D4AF37]/50 text-xs font-semibold rounded-full shadow-xl flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <Eye className="w-3.5 h-3.5 text-[#D4AF37]" /> Xem chi tiết
          </span>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Craft Origin */}
          <div className="flex items-center justify-between text-[11px] text-[#A89C90] mb-1.5">
            <span className="text-[#C5A880] font-semibold truncate max-w-[170px] flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#C5A880]" />
              {product.categoryName}
            </span>
            <div className="flex items-center gap-1 text-amber-400 font-medium">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-white font-bold">{product.rating}</span>
              <span className="text-[#8A7D71] text-[10px]">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <Link
            href={`/san-pham/${product.slug}`}
            className="block text-sm sm:text-base font-headline font-bold text-white group-hover:text-[#E2CA9E] transition-colors line-clamp-2 leading-snug mb-2"
            title={product.name}
          >
            {product.name}
          </Link>

          {/* Short summary */}
          <p className="text-xs text-[#A89C90] line-clamp-2 mb-3 leading-relaxed">
            {product.summary}
          </p>
        </div>

        {/* Price & Add to Cart button */}
        <div className="pt-3 border-t border-[#2C211D] flex items-center justify-between gap-2 mt-auto">
          <div>
            <div className="text-base sm:text-lg font-bold text-[#E58370] price-tag">
              {formatCurrency(product.price)}
            </div>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-stone-500 line-through price-tag">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#2E201B] hover:bg-[#A82B1D] text-[#EDE4D8] hover:text-white border border-[#44332D] rounded-xl text-xs font-semibold shadow-sm transition-all duration-200 active:scale-95"
            title="Thêm vào giỏ hàng"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Thêm giỏ</span>
          </button>
        </div>
      </div>
    </div>
  );
}
