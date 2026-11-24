'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { useProducts } from '@/utils/productsCatalog';
import { ProductDetailClient } from '@/components/ProductDetailClient';
import { PackageX, ArrowLeft } from 'lucide-react';

interface ProductDetailViewProps {
  slug: string;
  initialProduct?: Product;
}

export function ProductDetailView({ slug, initialProduct }: ProductDetailViewProps) {
  const { products, isLoaded } = useProducts();

  const product = products.find((p) => p.slug === slug) || initialProduct;

  if (!product) {
    if (!isLoaded) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center bg-[#FAF8F5]">
          <div className="text-center space-y-3">
            <div className="w-8 h-8 border-3 border-nepred-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-stone-500">Đang tải thông tin sản phẩm Nếp Việt...</p>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#FAF8F5] px-4 py-16">
        <div className="max-w-md w-full text-center bg-white p-8 rounded-3xl border border-stone-200/80 shadow-sm space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-nepred-600 flex items-center justify-center mx-auto">
            <PackageX className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h1 className="font-serif text-xl font-bold text-stone-900">
              Sản phẩm chưa có hoặc đã ngừng kinh doanh
            </h1>
            <p className="text-xs text-stone-500 leading-relaxed">
              Món quà thủ công bạn đang tìm kiếm có thể đã được cập nhật hoặc không còn trong danh mục hiện tại.
            </p>
          </div>
          <Link
            href="/san-pham"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-nepred-600 text-white text-xs font-bold hover:bg-nepred-700 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Khám phá các sản phẩm khác</span>
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}
