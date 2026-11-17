'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { formatCurrency } from '@/utils/format';
import {
  ShieldCheck,
  CheckCircle2,
  Truck,
  ArrowLeft,
  ShoppingBag,
  CreditCard,
  Banknote,
  Phone,
  MapPin,
  Calendar,
  Sparkles,
} from 'lucide-react';

interface OrderSuccessData {
  orderId: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  paymentMethod: string;
  total: number;
  date: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart, totalItems, subtotal } = useCart();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: '',
    email: user?.email || '',
    city: 'Hà Nội',
    address: '',
    notes: '',
    paymentMethod: 'COD',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successOrder, setSuccessOrder] = useState<OrderSuccessData | null>(null);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Vui lòng nhập họ và tên người nhận';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại';
    } else if (!/(0[3|5|7|8|9])+([0-9]{8})\b/.test(formData.phone.trim())) {
      newErrors.phone = 'Số điện thoại không hợp lệ (10 số, đầu số Việt Nam)';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Vui lòng nhập địa chỉ nhận hàng chi tiết';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (cart.length === 0 && !successOrder) {
      alert('Giỏ hàng trống! Vui lòng chọn sản phẩm trước khi thanh toán.');
      router.push('/san-pham');
      return;
    }

    setIsSubmitting(true);

    // Simulate order creation
    setTimeout(() => {
      const generatedOrderId = 'NV-' + Math.floor(100000 + Math.random() * 900000);
      const now = new Date();
      const formattedDate = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')} - ${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;

      const orderData: OrderSuccessData = {
        orderId: generatedOrderId,
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        city: formData.city,
        paymentMethod: formData.paymentMethod === 'COD' ? 'Thanh toán khi nhận hàng (COD)' : 'Chuyển khoản xác nhận đơn',
        total: subtotal,
        date: formattedDate,
      };

      setSuccessOrder(orderData);
      clearCart();
      setIsSubmitting(false);
    }, 800);
  };

  // SUCCESS SCREEN
  if (successOrder) {
    return (
      <div className="bg-[#FAF8F5] min-h-screen py-12 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-cream-200 shadow-xl space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="text-center space-y-2">
            <span className="text-xs uppercase tracking-widest text-nepgreen-700 font-bold">
              Xác Nhận Thành Công
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-black text-nepbrown-800">
              Cảm Ơn Bạn Đã Đặt Hàng Tại Nếp Việt!
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-lg mx-auto">
              Đơn hàng của bạn đã được tiếp nhận. Đội ngũ Nếp Việt sẽ liên hệ qua số điện thoại để xác nhận chi tiết và thời gian giao hàng sớm nhất.
            </p>
          </div>

          {/* Order Details Receipt */}
          <div className="bg-cream-50 rounded-2xl p-6 border border-cream-200 space-y-4 text-xs">
            <div className="flex justify-between items-center pb-3 border-b border-cream-200">
              <span className="text-neutral-500">Mã đơn hàng:</span>
              <span className="font-mono font-bold text-sm text-nepred-600">{successOrder.orderId}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-500">Thời gian đặt:</span>
              <span className="font-medium text-nepbrown-800">{successOrder.date}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-500">Người nhận hàng:</span>
              <span className="font-bold text-nepbrown-800">{successOrder.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-500">Số điện thoại:</span>
              <span className="font-medium text-nepbrown-800">{successOrder.phone}</span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-neutral-500">Địa chỉ giao hàng:</span>
              <span className="text-right font-medium text-nepbrown-800 max-w-xs">
                {successOrder.address}, {successOrder.city}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-500">Phương thức thanh toán:</span>
              <span className="font-medium text-nepgreen-800">{successOrder.paymentMethod}</span>
            </div>
            <div className="pt-3 border-t border-cream-200 flex justify-between items-baseline">
              <span className="font-serif font-bold text-sm text-nepbrown-800">Tổng thanh toán dự kiến:</span>
              <span className="font-serif text-xl font-black text-nepred-600">
                {formatCurrency(successOrder.total)}
              </span>
            </div>
          </div>

          <div className="p-4 bg-nepgreen-50 rounded-xl border border-nepgreen-200 text-xs text-nepgreen-900 leading-relaxed flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-nepgreen-700 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Lưu ý quan trọng về vận chuyển:</p>
              <p className="mt-0.5 text-neutral-600">
                Hàng thủ công mỹ nghệ và gốm sứ được Nếp Việt đóng gói theo quy chuẩn hộp kép chống va đập. Quý khách vui lòng đồng kiểm tra hàng cùng bưu tá trước khi thanh toán.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              href="/"
              className="flex-1 py-3 px-4 bg-white border border-cream-300 hover:bg-cream-100 text-nepbrown-800 font-semibold text-xs rounded-xl text-center transition-colors"
            >
              Về trang chủ
            </Link>
            <Link
              href="/san-pham"
              className="flex-1 py-3 px-4 bg-nepred-600 hover:bg-nepred-700 text-white font-semibold text-xs rounded-xl text-center shadow-md transition-colors"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // If cart is empty, redirect prompt
  if (cart.length === 0) {
    return (
      <div className="bg-[#FAF8F5] min-h-[60vh] flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 text-center border border-cream-200 shadow-sm space-y-4">
          <ShoppingBag className="w-12 h-12 text-neutral-400 mx-auto" />
          <h2 className="font-serif text-xl font-bold text-nepbrown-800">
            Giỏ hàng chưa có sản phẩm
          </h2>
          <p className="text-xs text-neutral-500">
            Vui lòng chọn ít nhất một sản phẩm thủ công để tiến hành đặt hàng.
          </p>
          <Link
            href="/san-pham"
            className="inline-block px-6 py-2.5 bg-nepred-600 text-white text-xs font-semibold rounded-xl"
          >
            Quay lại cửa hàng
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Navigation back */}
        <div>
          <Link
            href="/gio-hang"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-500 hover:text-nepred-600 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Quay lại giỏ hàng</span>
          </Link>
          <h1 className="font-serif text-2xl sm:text-3xl font-black text-nepbrown-800 mt-2">
            Thông Tin Đặt Hàng & Thanh Toán
          </h1>
          <p className="text-xs text-neutral-500">
            Hoàn tất biểu mẫu dưới đây để đội ngũ Nếp Việt chuẩn bị và đóng gói sản phẩm gửi đến bạn.
          </p>
        </div>

        {/* 2-Column Checkout Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form (Left 7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-cream-200 shadow-sm space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Recipient Information */}
              <div className="space-y-4">
                <h2 className="font-serif font-bold text-base text-nepbrown-800 flex items-center gap-2 pb-2 border-b border-cream-200">
                  <span className="w-6 h-6 rounded-full bg-nepred-600 text-white text-xs flex items-center justify-center font-bold">1</span>
                  <span>Thông Tin Người Nhận</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-nepbrown-700">
                      Họ và tên người nhận <span className="text-nepred-600">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Ví dụ: Nguyễn Văn An"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-3.5 py-2.5 text-xs rounded-xl border ${
                        errors.name ? 'border-red-500 bg-red-50' : 'border-cream-300 bg-cream-50'
                      } focus:bg-white focus:outline-none focus:border-nepred-600`}
                    />
                    {errors.name && <p className="text-[11px] text-red-600">{errors.name}</p>}
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-nepbrown-700">
                      Số điện thoại <span className="text-nepred-600">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="0912 345 678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full px-3.5 py-2.5 text-xs rounded-xl border ${
                        errors.phone ? 'border-red-500 bg-red-50' : 'border-cream-300 bg-cream-50'
                      } focus:bg-white focus:outline-none focus:border-nepred-600`}
                    />
                    {errors.phone && <p className="text-[11px] text-red-600">{errors.phone}</p>}
                  </div>
                </div>

                {/* Email (Optional) */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-nepbrown-700">
                    Email nhận thông báo đơn hàng (không bắt buộc)
                  </label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-cream-300 bg-cream-50 focus:bg-white focus:outline-none focus:border-nepred-600"
                  />
                </div>
              </div>

              {/* Delivery Address */}
              <div className="space-y-4 pt-2">
                <h2 className="font-serif font-bold text-base text-nepbrown-800 flex items-center gap-2 pb-2 border-b border-cream-200">
                  <span className="w-6 h-6 rounded-full bg-nepred-600 text-white text-xs flex items-center justify-center font-bold">2</span>
                  <span>Địa Chỉ Giao Hàng</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* City */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-nepbrown-700">
                      Tỉnh / Thành phố
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-cream-300 bg-cream-50 focus:bg-white focus:outline-none focus:border-nepred-600 cursor-pointer"
                    >
                      <option value="Hà Nội">Hà Nội</option>
                      <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                      <option value="Đà Nẵng">Đà Nẵng</option>
                      <option value="Hải Phòng">Hải Phòng</option>
                      <option value="Cần Thơ">Cần Thơ</option>
                      <option value="Bắc Ninh">Bắc Ninh</option>
                      <option value="Quảng Nam">Quảng Nam</option>
                      <option value="Tỉnh thành khác">Tỉnh thành khác</option>
                    </select>
                  </div>

                  {/* Detailed Address */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-nepbrown-700">
                      Số nhà, tên đường, phường/xã <span className="text-nepred-600">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Ví dụ: KTX Học viện Bưu chính Viễn thông"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className={`w-full px-3.5 py-2.5 text-xs rounded-xl border ${
                        errors.address ? 'border-red-500 bg-red-50' : 'border-cream-300 bg-cream-50'
                      } focus:bg-white focus:outline-none focus:border-nepred-600`}
                    />
                    {errors.address && <p className="text-[11px] text-red-600">{errors.address}</p>}
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-nepbrown-700">
                    Ghi chú đơn hàng (nếu có yêu cầu gói quà hoặc giao giờ cụ thể)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Ví dụ: Xin gói kèm thiệp chúc mừng sinh nhật, giao vào giờ hành chính..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-cream-300 bg-cream-50 focus:bg-white focus:outline-none focus:border-nepred-600 resize-none"
                  />
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-4 pt-2">
                <h2 className="font-serif font-bold text-base text-nepbrown-800 flex items-center gap-2 pb-2 border-b border-cream-200">
                  <span className="w-6 h-6 rounded-full bg-nepred-600 text-white text-xs flex items-center justify-center font-bold">3</span>
                  <span>Phương Thức Thanh Toán</span>
                </h2>

                <div className="space-y-3">
                  {/* COD */}
                  <label
                    className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                      formData.paymentMethod === 'COD'
                        ? 'border-nepred-600 bg-nepred-50/40 ring-1 ring-nepred-600'
                        : 'border-cream-200 bg-white hover:bg-cream-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="COD"
                      checked={formData.paymentMethod === 'COD'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'COD' })}
                      className="mt-0.5 text-nepred-600 focus:ring-nepred-500"
                    />
                    <div className="flex-1 space-y-1 text-xs">
                      <div className="flex items-center gap-2 font-bold text-nepbrown-800">
                        <Banknote className="w-4 h-4 text-emerald-600" />
                        <span>Thanh toán tiền mặt khi nhận hàng (COD)</span>
                      </div>
                      <p className="text-neutral-500 leading-relaxed">
                        Bạn chỉ thanh toán khi bưu tá giao hàng tận nơi và đã đồng kiểm tra đúng sản phẩm thủ công nguyên vẹn.
                      </p>
                    </div>
                  </label>

                  {/* Bank Transfer demo */}
                  <label
                    className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                      formData.paymentMethod === 'BANK'
                        ? 'border-nepred-600 bg-nepred-50/40 ring-1 ring-nepred-600'
                        : 'border-cream-200 bg-white hover:bg-cream-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="BANK"
                      checked={formData.paymentMethod === 'BANK'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'BANK' })}
                      className="mt-0.5 text-nepred-600 focus:ring-nepred-500"
                    />
                    <div className="flex-1 space-y-1 text-xs">
                      <div className="flex items-center gap-2 font-bold text-nepbrown-800">
                        <CreditCard className="w-4 h-4 text-blue-600" />
                        <span>Chuyển khoản ngân hàng (Cửa hàng sẽ gọi xác nhận)</span>
                      </div>
                      <p className="text-neutral-500 leading-relaxed">
                        Nhân viên CSKH Nếp Việt sẽ liên hệ qua điện thoại gửi thông tin số tài khoản và mã đơn để hoàn tất xác nhận.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 bg-nepred-600 hover:bg-nepred-700 disabled:bg-neutral-300 text-white rounded-2xl font-bold text-sm shadow-xl shadow-nepred-600/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Đang xử lý đơn hàng...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Xác Nhận Đặt Hàng ({formatCurrency(subtotal)})</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>

          {/* Order Summary & Products Preview (Right 5 Cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-cream-200 shadow-sm space-y-6">
            <h2 className="font-serif font-bold text-base text-nepbrown-800 pb-3 border-b border-cream-200 flex items-center justify-between">
              <span>Đơn Hàng ({totalItems} sản phẩm)</span>
              <Link href="/gio-hang" className="text-xs text-nepred-600 hover:underline font-normal">
                Sửa
              </Link>
            </h2>

            {/* Items mini list */}
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1 divide-y divide-cream-100">
              {cart.map((item) => (
                <div key={item.product.id} className="pt-3 first:pt-0 flex items-center gap-3">
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-cream-100 flex-shrink-0 border border-cream-200">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-serif font-bold text-xs text-nepbrown-800 truncate">
                      {item.product.name}
                    </p>
                    <p className="text-[11px] text-neutral-400">
                      SL: {item.quantity} x {formatCurrency(item.product.price)}
                    </p>
                  </div>
                  <span className="font-serif font-bold text-xs text-nepbrown-800 whitespace-nowrap">
                    {formatCurrency(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-2 pt-4 border-t border-cream-200 text-xs">
              <div className="flex justify-between text-neutral-600">
                <span>Tạm tính:</span>
                <span className="font-bold text-nepbrown-800">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Phí vận chuyển:</span>
                <span className="text-emerald-700 font-bold">
                  {subtotal >= 300000 ? 'Miễn phí' : 'Cửa hàng xác nhận sau'}
                </span>
              </div>
              <div className="pt-3 border-t border-cream-200 flex justify-between items-baseline">
                <span className="font-serif font-bold text-sm text-nepbrown-800">Tổng thanh toán:</span>
                <span className="font-serif text-2xl font-black text-nepred-600">
                  {formatCurrency(subtotal)}
                </span>
              </div>
            </div>

            {/* Safe packing note */}
            <div className="p-4 bg-cream-50 rounded-2xl border border-cream-200 text-xs text-neutral-600 space-y-2">
              <div className="flex items-center gap-2 font-bold text-nepgreen-900">
                <ShieldCheck className="w-4 h-4 text-nepgreen-700" />
                <span>Cam kết giao hàng nguyên vẹn</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Nếp Việt cam kết hoàn tiền hoặc 1 đổi 1 ngay lập tức nếu sản phẩm thủ công mỹ nghệ bị trầy xước hoặc nứt vỡ trong quá trình vận chuyển.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
