'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { CheckCircle2, ShoppingBag, X } from 'lucide-react';

export function Toast() {
  const { toastMessage, clearToast, totalItems } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full animate-bounce-short">
      <div className="bg-nepgreen-900 text-white rounded-xl shadow-2xl p-4 border border-nepgreen-700 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-nepgreen-800 flex items-center justify-center text-amber-300 flex-shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-cream-50 leading-snug">{toastMessage}</p>
            <p className="text-xs text-cream-200 mt-0.5">Giỏ hàng hiện có {totalItems} sản phẩm</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Link
            href="/gio-hang"
            onClick={clearToast}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-nepred-600 hover:bg-nepred-700 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Xem giỏ
          </Link>
          <button
            onClick={clearToast}
            className="p-1 text-cream-200 hover:text-white rounded-lg hover:bg-nepgreen-800 transition-colors"
            aria-label="Đóng thông báo"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
