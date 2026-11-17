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
    <div className="group bg-white rounded-2xl overflow-hidden border border-cream-200/90 hover:border-nepred-600/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Product Image Container */}
      <Link
        href={`/san-pham/${product.slug}`}
        className="relative aspect-square w-full overflow-hidden bg-cream-100 block"
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <span className="px-2.5 py-1 bg-nepred-600 text-white text-[10px] font-bold uppercase tracking-wider rounded-md shadow-sm">
              {product.badge}
            </span>
          </div>
        )}

        {/* Quick View Overlay Button */}
        <div className="absolute inset-0 bg-stone-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="px-4 py-2 bg-white/95 backdrop-blur-sm text-stone-900 text-xs font-semibold rounded-full shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5 text-nepred-600" /> Xem chi tiết
          </span>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Craft Origin */}
          <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1.5">
            <span className="text-nepgreen-800 font-semibold truncate max-w-[170px] flex items-center gap-1">
              <MapPin className="w-3 h-3 text-nepgreen-700" />
              {product.categoryName}
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-medium">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-stone-800 font-bold">{product.rating}</span>
              <span className="text-stone-400 text-[10px]">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <Link
            href={`/san-pham/${product.slug}`}
            className="block text-sm sm:text-base font-serif font-bold text-stone-900 group-hover:text-nepred-600 transition-colors line-clamp-2 leading-snug mb-2"
            title={product.name}
          >
            {product.name}
          </Link>

          {/* Short summary */}
          <p className="text-xs text-stone-500 line-clamp-2 mb-3 leading-relaxed">
            {product.summary}
          </p>
        </div>

        {/* Price & Add to Cart button */}
        <div className="pt-3 border-t border-cream-100 flex items-center justify-between gap-2 mt-auto">
          <div>
            <div className="text-base sm:text-lg font-bold text-nepred-600 font-serif">
              {formatCurrency(product.price)}
            </div>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-stone-400 line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-nepgreen-900 hover:bg-nepred-600 text-cream-50 hover:text-white rounded-xl text-xs font-semibold shadow-sm transition-all duration-200 active:scale-95"
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
