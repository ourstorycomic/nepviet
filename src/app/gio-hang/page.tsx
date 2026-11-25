'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/utils/format';
import {
  ShoppingBag,
  Trash2,
  Minus,
  Plus,
  ArrowRight,
  ArrowLeft,
  Tag,
  ShieldCheck,
  Truck,
  Sparkles,
} from 'lucide-react';

export default function CartPage() {
  const router = useRouter();
  const { cart, updateQuantity, removeFromCart, clearCart, totalItems, subtotal } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  const FREE_SHIPPING_THRESHOLD = 300000;
  const progressToFreeShipping = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');

    const cleanCode = couponCode.trim().toUpperCase();
    if (!cleanCode) {
      setCouponError('Vui lòng nhập mã giảm giá');
      return;
    }

    if (cleanCode === 'NEPVIET10') {
      const discount = Math.round(subtotal * 0.1);
      setAppliedDiscount(discount);
      setCouponSuccess('Áp dụng thành công mã NEPVIET10 (-10%)!');
    } else if (cleanCode === 'SINHVIEN') {
      const discount = Math.min(subtotal, 20000);
      setAppliedDiscount(discount);
      setCouponSuccess('Áp dụng ưu đãi sinh viên (-20.000đ)!');
    } else {
      setCouponError('Mã ưu đãi không hợp lệ hoặc đã hết hạn.');
    }
  };

  const finalTotal = Math.max(0, subtotal - appliedDiscount);

  if (cart.length === 0) {
    return (
      <div className="bg-[#14100E] text-[#EDE4D8] min-h-[70vh] flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full bg-[#1C1614] rounded-3xl p-8 sm:p-12 text-center border border-[#362924] shadow-xl space-y-6">
          <div className="w-20 h-20 rounded-full bg-[#231B19] text-[#C5A880] mx-auto flex items-center justify-center border border-[#382B26]">
            <ShoppingBag className="w-10 h-10 text-[#C5A880]" />
          </div>
          <div className="space-y-2">
            <h1 className="font-headline text-2xl font-black text-[#FAF6F0]">
              Giỏ hàng của bạn đang trống
            </h1>
            <p className="text-xs sm:text-sm text-[#EDE4D8]/70 leading-relaxed font-subtext">
              Bạn chưa thêm sản phẩm thủ công nào vào giỏ hàng. Hãy khám phá các tuyệt tác từ các làng nghề Việt Nam ngay hôm nay!
            </p>
          </div>
          <div>
            <Link
              href="/san-pham"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#A82B1D] hover:bg-[#8E2216] text-white rounded-xl text-xs sm:text-sm font-bold shadow-md border border-[#D4AF37]/30 transition-all"
            >
              <span>Khám phá sản phẩm ngay</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#14100E] text-[#EDE4D8] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#362924] gap-4">
          <div>
            <h1 className="font-headline text-2xl sm:text-4xl font-black text-[#FAF6F0] tracking-tight">
              Giỏ Hàng Của Bạn
            </h1>
            <p className="text-xs text-[#EDE4D8]/70 mt-1">
              Bạn đang có <span className="font-bold text-[#C5A880]">{totalItems}</span> sản phẩm trong giỏ hàng
            </p>
          </div>
          <button
            onClick={clearCart}
            className="text-xs text-[#8C7A70] hover:text-[#A82B1D] flex items-center gap-1 font-medium transition-colors self-start sm:self-auto"
          >
            <Trash2 className="w-3.5 h-3.5" /> Xóa tất cả sản phẩm
          </button>
        </div>

        {/* Free Shipping Progress Alert */}
        <div className="bg-[#1C1614] rounded-2xl p-4 sm:p-5 border border-[#362924] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-[#EDE4D8] flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-[#C5A880]" />
              {subtotal >= FREE_SHIPPING_THRESHOLD ? (
                <span className="text-emerald-400 font-bold">
                  Chúc mừng! Đơn hàng của bạn đã đủ điều kiện được Miễn Phí Vận Chuyển.
                </span>
              ) : (
                <span>
                  Mua thêm <strong className="text-[#D4AF37]">{formatCurrency(remainingForFreeShipping)}</strong> để nhận ưu đãi <strong>Miễn phí vận chuyển</strong>
                </span>
              )}
            </span>
            <span className="text-[#C5A880] font-bold">{progressToFreeShipping}%</span>
          </div>
          <div className="w-full bg-[#14100E] rounded-full h-2.5 overflow-hidden border border-[#362924]">
            <div
              className="bg-[#C5A880] h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${progressToFreeShipping}%` }}
            />
          </div>
        </div>

        {/* Main Layout: Cart Items List + Order Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Cart Items (Left 8 Cols) */}
          <div className="lg:col-span-8 bg-[#1C1614] rounded-3xl p-4 sm:p-8 border border-[#362924] shadow-xl divide-y divide-[#362924]">
            {cart.map((item) => (
              <div key={item.product.id} className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                
                {/* Thumbnail & Title */}
                <div className="flex items-center gap-4 flex-1">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-[#14100E] border border-[#362924] flex-shrink-0">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-[#C5A880] font-bold uppercase tracking-wider">
                      {item.product.categoryName}
                    </span>
                    <Link
                      href={`/san-pham/${item.product.slug}`}
                      className="block font-headline font-bold text-sm sm:text-base text-[#FAF6F0] hover:text-[#C5A880] transition-colors line-clamp-1"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-xs text-[#8C7A70]">
                      Đơn giá: {formatCurrency(item.product.price)}
                    </p>
                  </div>
                </div>

                {/* Quantity & Subtotal */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                  {/* Quantity Controller */}
                  <div className="flex items-center border border-[#362924] rounded-xl bg-[#14100E] overflow-hidden shadow-sm">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="p-1.5 text-[#8C7A70] hover:text-[#FAF6F0] hover:bg-[#251D1A] transition-colors"
                      aria-label="Giảm"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-9 text-center text-xs font-bold text-[#FAF6F0]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="p-1.5 text-[#8C7A70] hover:text-[#FAF6F0] hover:bg-[#251D1A] transition-colors"
                      aria-label="Tăng"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Total for item */}
                  <div className="text-right min-w-[90px]">
                    <p className="font-bold text-sm sm:text-base text-[#D4AF37] price-tag">
                      {formatCurrency(item.product.price * item.quantity)}
                    </p>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-2 text-[#8C7A70] hover:text-[#A82B1D] rounded-lg hover:bg-[#241A16] transition-colors"
                    title="Xóa sản phẩm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

              </div>
            ))}

            {/* Back link */}
            <div className="pt-6 mt-6">
              <Link
                href="/san-pham"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#C5A880] hover:text-white transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Tiếp tục chọn thêm sản phẩm khác</span>
              </Link>
            </div>
          </div>

          {/* Order Summary Card (Right 4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Promo Code Box */}
            <div className="bg-[#1C1614] rounded-3xl p-6 border border-[#362924] shadow-sm space-y-3">
              <h3 className="font-headline font-bold text-sm text-[#FAF6F0] flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-[#C5A880]" />
                <span>Mã Ưu Đãi / Voucher</span>
              </h3>
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Nhập NEPVIET10..."
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs uppercase rounded-xl border border-[#362924] bg-[#14100E] focus:outline-none focus:border-[#C5A880] text-[#FAF6F0] placeholder-[#8C7A70] font-mono"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#251D1A] hover:bg-[#322621] text-[#EDE4D8] border border-[#3E2D26] rounded-xl text-xs font-semibold shadow-sm transition-colors whitespace-nowrap"
                >
                  Áp dụng
                </button>
              </form>

              {couponSuccess && (
                <p className="text-xs text-emerald-400 font-medium">{couponSuccess}</p>
              )}
              {couponError && (
                <p className="text-xs text-[#A82B1D] font-medium">{couponError}</p>
              )}
              <p className="text-[11px] text-[#8C7A70]">
                Gợi ý mã khuyến mãi: <span className="font-mono text-[#D4AF37] font-bold">NEPVIET10</span> (-10%) hoặc <span className="font-mono text-[#D4AF37] font-bold">SINHVIEN</span> (-20k)
              </p>
            </div>

            {/* Price Calculations */}
            <div className="bg-[#1C1614] rounded-3xl p-6 border border-[#362924] shadow-xl space-y-4">
              <h3 className="font-headline font-bold text-base text-[#FAF6F0] pb-3 border-b border-[#362924]">
                Tóm Tắt Đơn Hàng
              </h3>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between text-[#EDE4D8]/80">
                  <span>Tổng số lượng:</span>
                  <span className="font-bold text-[#FAF6F0]">{totalItems} món</span>
                </div>
                <div className="flex justify-between text-[#EDE4D8]/80">
                  <span>Tạm tính hàng hóa:</span>
                  <span className="font-bold text-[#FAF6F0]">{formatCurrency(subtotal)}</span>
                </div>

                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-medium">
                    <span>Giảm giá khuyến mãi:</span>
                    <span>-{formatCurrency(appliedDiscount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#EDE4D8]/80">
                  <span>Phí vận chuyển:</span>
                  <span className="text-right text-[#C5A880] font-medium">
                    {subtotal >= FREE_SHIPPING_THRESHOLD ? (
                      <span className="text-emerald-400 font-bold">Miễn phí (Freeship)</span>
                    ) : (
                      <span>Cửa hàng xác nhận</span>
                    )}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#362924] flex justify-between items-baseline">
                <span className="font-headline font-bold text-sm text-[#FAF6F0]">Tổng thanh toán:</span>
                <span className="text-2xl font-black text-[#D4AF37] price-tag">
                  {formatCurrency(finalTotal)}
                </span>
              </div>

              <p className="text-[11px] text-[#8C7A70] italic">
                * Chưa bao gồm phụ phí vùng sâu/vùng xa nếu có. Nhân viên Nếp Việt sẽ liên hệ xác nhận chi tiết.
              </p>

              <button
                onClick={() => router.push('/thanh-toan')}
                className="w-full inline-flex items-center justify-center gap-2 py-4 bg-[#A82B1D] hover:bg-[#8E2216] text-white rounded-2xl text-sm font-bold shadow-lg shadow-black/40 border border-[#D4AF37]/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Tiến hành thanh toán</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-[#8C7A70]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Bảo mật thông tin & Đổi trả trong 7 ngày</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
