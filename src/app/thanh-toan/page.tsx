'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { insertOrderToDb } from '@/services/supabaseService';
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
  PackageCheck,
  Copy,
  Check,
  QrCode,
  AlertCircle,
  HelpCircle,
  Download,
  Clock,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';

interface OrderSuccessData {
  orderId: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  paymentMethod: 'COD' | 'BANK';
  total: number;
  date: string;
  bankInfo?: {
    bankCode: string;
    bankName: string;
    accountNo: string;
    accountName: string;
    branch: string;
    memo: string;
    qrUrl: string;
  };
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
    paymentMethod: 'COD' as 'COD' | 'BANK',
    selectedBank: 'MB' as 'MB' | 'VCB' | 'TCB' | 'TPB',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successOrder, setSuccessOrder] = useState<OrderSuccessData | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // VietQR countdown & payment simulation
  const [countdown, setCountdown] = useState(900); // 15:00 minutes
  const [isVerifyingPayment, setIsVerifyingPayment] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [transactionCode, setTransactionCode] = useState('');
  const [showLivePreview, setShowLivePreview] = useState(false);

  React.useEffect(() => {
    if (!successOrder || successOrder.paymentMethod !== 'BANK' || isPaid) return;
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [successOrder, isPaid]);

  const formatCountdown = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const BANK_ACCOUNTS = {
    MB: {
      code: 'MB',
      bankName: 'MB Bank (Ngân hàng Quân Đội)',
      shortName: 'MB Bank',
      accountNo: '0968999888',
      accountName: 'CONG TY TNHH NEP VIET',
      branch: 'Hội sở chính / Chi nhánh Cầu Giấy, Hà Nội',
      badgeColor: 'bg-blue-600',
    },
    VCB: {
      code: 'VCB',
      bankName: 'Vietcombank (Ngân hàng Ngoại Thương)',
      shortName: 'Vietcombank',
      accountNo: '1029886868',
      accountName: 'CONG TY TNHH NEP VIET',
      branch: 'Chi nhánh Thăng Long, Hà Nội',
      badgeColor: 'bg-emerald-600',
    },
    TCB: {
      code: 'TCB',
      bankName: 'Techcombank (Kỹ Thương Việt Nam)',
      shortName: 'Techcombank',
      accountNo: '1903678999',
      accountName: 'CONG TY TNHH NEP VIET',
      branch: 'Chi nhánh Trung Hòa, Cầu Giấy',
      badgeColor: 'bg-red-600',
    },
    TPB: {
      code: 'TPB',
      bankName: 'TPBank (Ngân hàng Tiên Phong)',
      shortName: 'TPBank',
      accountNo: '0888999666',
      accountName: 'CONG TY TNHH NEP VIET',
      branch: 'Chi nhánh Hà Nội',
      badgeColor: 'bg-purple-600',
    },
  };

  const currentBank = BANK_ACCOUNTS[formData.selectedBank];

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

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleSimulatePayment = () => {
    if (!successOrder) return;
    setIsVerifyingPayment(true);
    setTimeout(() => {
      const transId = 'FT241118' + Math.floor(100000 + Math.random() * 900000);
      setIsVerifyingPayment(false);
      setIsPaid(true);
      setTransactionCode(transId);

      // Lưu đơn hàng vào danh sách đơn hàng Admin
      try {
        const existing = JSON.parse(localStorage.getItem('nepviet_custom_orders') || '[]');
        const newOrder = {
          id: successOrder.orderId,
          customer: successOrder.name,
          phone: successOrder.phone,
          city: successOrder.city,
          total: successOrder.total,
          method: 'VIETQR',
          status: 'Đã thanh toán',
          transactionCode: transId,
          paidAt: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
          date: successOrder.date,
        };
        localStorage.setItem('nepviet_custom_orders', JSON.stringify([newOrder, ...existing]));
      } catch (e) {
        console.error(e);
      }
    }, 2000);
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

    setTimeout(() => {
      const generatedOrderId = 'NV-' + Math.floor(100000 + Math.random() * 900000);
      const now = new Date();
      const formattedDate = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')} - ${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;

      // Generate VietQR URL
      const memo = `${generatedOrderId.replace('-', '')} ${formData.phone.slice(-4)}`;
      const qrUrl = `https://img.vietqr.io/image/${formData.selectedBank}-${currentBank.accountNo}-compact2.png?amount=${subtotal}&addInfo=${encodeURIComponent(memo)}&accountName=${encodeURIComponent(currentBank.accountName)}`;

      const orderData: OrderSuccessData = {
        orderId: generatedOrderId,
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        city: formData.city,
        paymentMethod: formData.paymentMethod,
        total: subtotal,
        date: formattedDate,
        bankInfo: formData.paymentMethod === 'BANK' ? {
          bankCode: currentBank.code,
          bankName: currentBank.bankName,
          accountNo: currentBank.accountNo,
          accountName: currentBank.accountName,
          branch: currentBank.branch,
          memo: memo,
          qrUrl: qrUrl,
        } : undefined,
      };

      setSuccessOrder(orderData);

      // Lưu đơn hàng lập tức vào cơ sở dữ liệu hệ thống (cho cả Admin và Kênh Nghệ Nhân)
      try {
        const existing = JSON.parse(localStorage.getItem('nepviet_custom_orders') || '[]');
        const newOrderRecord = {
          id: generatedOrderId,
          customer: formData.name.trim(),
          customerName: formData.name.trim(),
          phone: formData.phone.trim(),
          address: formData.address.trim(),
          city: formData.city,
          total: subtotal,
          method: formData.paymentMethod === 'BANK' ? 'VIETQR' : 'COD',
          paymentMethod: formData.paymentMethod === 'BANK' ? 'VIETQR' : 'COD',
          status: 'pending',
          items: cart.map((i) => ({
            id: i.product.id,
            name: i.product.name,
            price: i.product.price,
            quantity: i.quantity,
            image: i.product.images[0] || '/products/bo-am-chen-men-lam-bat-trang.jpg',
            village: i.product.village,
          })),
          date: formattedDate,
        };
        localStorage.setItem('nepviet_custom_orders', JSON.stringify([newOrderRecord, ...existing]));

        // Đồng bộ đơn hàng lên bảng public.orders trên Supabase Cloud
        insertOrderToDb({
          id: generatedOrderId,
          customer_name: formData.name.trim(),
          phone: formData.phone.trim(),
          city: formData.city,
          address: formData.address.trim(),
          notes: formData.notes.trim() || undefined,
          items: newOrderRecord.items,
          total: subtotal,
          payment_method: formData.paymentMethod === 'BANK' ? 'VIETQR' : 'COD',
          status: 'pending',
          transaction_code: orderData.bankInfo?.memo,
        }).catch((err) => console.warn('Supabase sync order warning:', err));

        // Cập nhật tức thì vào bộ nhớ Admin Portal
        const adminOrders = JSON.parse(localStorage.getItem('nepviet_orders_db') || '[]');
        const adminFormatted = {
          id: generatedOrderId,
          customerName: formData.name.trim(),
          phone: formData.phone.trim(),
          city: formData.city,
          itemsCount: cart.length,
          total: subtotal,
          paymentMethod: (formData.paymentMethod === 'BANK' ? 'VIETQR' : 'COD') as any,
          status: 'pending' as const,
          date: formattedDate,
          transactionCode: orderData.bankInfo?.memo,
          isPaid: false,
        };
        localStorage.setItem('nepviet_orders_db', JSON.stringify([adminFormatted, ...adminOrders]));
      } catch (e) {
        console.error(e);
      }

      clearCart();
      setIsSubmitting(false);
    }, 700);
  };

  // SUCCESS CONFIRMATION SCREEN
  if (successOrder) {
    return (
      <div className="bg-[#FAF8F5] min-h-screen py-12 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-cream-200 shadow-xl space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="text-center space-y-2">
            <span className="text-xs uppercase tracking-widest text-nepgreen-800 font-bold">
              Tiếp Nhận Đơn Hàng Thành Công
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              Cảm Ơn Bạn Đã Đồng Hành Cùng Nếp Việt!
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-lg mx-auto">
              Đơn hàng của bạn đã được ghi nhận trên hệ thống. Mã đơn hàng của bạn là <strong className="text-nepred-600 font-mono text-sm">{successOrder.orderId}</strong>.
            </p>
          </div>

          {/* If Bank Transfer, show QR & Account Details */}
          {successOrder.paymentMethod === 'BANK' && successOrder.bankInfo && (
            <div className="bg-gradient-to-br from-amber-50/70 via-cream-50 to-stone-50 rounded-3xl p-6 border-2 border-nepgold-500/40 shadow-md space-y-5">
              
              {/* VietQR Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-nepgold-500/20">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-nepred-600 text-white flex items-center justify-center shadow-sm">
                    <QrCode className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-sm text-stone-900 flex items-center gap-2">
                      <span>Cổng Chuyển Khoản VietQR Nhanh 24/7</span>
                      <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">
                        Napas 247
                      </span>
                    </h3>
                    <p className="text-[11px] text-stone-500">Chuẩn thanh toán quốc gia EMVCo liên ngân hàng</p>
                  </div>
                </div>

                {/* Countdown & Status */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-mono font-bold">
                    <Clock className="w-3.5 h-3.5 text-nepred-600" />
                    <span>{formatCountdown(countdown)}</span>
                  </div>
                  <span className={`text-[11px] px-2.5 py-1 rounded-full font-bold ${
                    isPaid ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {isPaid ? '✓ Đã khớp lệnh' : 'Chờ thanh toán'}
                  </span>
                </div>
              </div>

              {/* QR Code and Account Information */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                {/* VietQR Code Frame */}
                <div className="sm:col-span-5 flex flex-col items-center">
                  <div className="relative w-52 h-52 bg-white rounded-2xl p-2.5 shadow-lg border-2 border-stone-200 flex items-center justify-center">
                    <img
                      src={successOrder.bankInfo.qrUrl}
                      alt="Mã VietQR thanh toán Nếp Việt"
                      className="w-full h-full object-contain rounded-xl"
                    />
                    {isPaid && (
                      <div className="absolute inset-0 bg-emerald-900/80 backdrop-blur-[2px] rounded-2xl flex flex-col items-center justify-center text-white p-4 text-center animate-fadeIn">
                        <CheckCircle2 className="w-12 h-12 text-emerald-400 mb-1" />
                        <span className="font-bold text-sm">ĐÃ THANH TOÁN</span>
                        <span className="font-mono text-[11px] text-emerald-200 mt-0.5">{transactionCode}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mt-3">
                    <a
                      href={successOrder.bankInfo.qrUrl}
                      download={`VietQR-${successOrder.orderId}.png`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-[11px] font-semibold text-stone-700 transition-colors shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5 text-nepred-600" />
                      <span>Tải ảnh QR</span>
                    </a>
                  </div>
                </div>

                {/* Account Details with Copy Buttons */}
                <div className="sm:col-span-7 space-y-2.5 text-xs">
                  <div className="p-2.5 bg-white rounded-xl border border-cream-200">
                    <p className="text-[11px] text-stone-500">Ngân hàng thụ hưởng</p>
                    <p className="font-bold text-stone-900 mt-0.5">{successOrder.bankInfo.bankName}</p>
                    <p className="text-[10px] text-stone-500">{successOrder.bankInfo.branch}</p>
                  </div>

                  <div className="p-2.5 bg-white rounded-xl border border-cream-200 flex items-center justify-between">
                    <div>
                      <p className="text-[11px] text-stone-500">Số tài khoản</p>
                      <p className="font-mono font-bold text-sm text-stone-900 mt-0.5">{successOrder.bankInfo.accountNo}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(successOrder.bankInfo!.accountNo, 'acc')}
                      className="px-2.5 py-1.5 rounded-lg bg-cream-100 hover:bg-cream-200 text-stone-700 text-[11px] font-semibold flex items-center gap-1 transition-colors"
                    >
                      {copiedField === 'acc' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedField === 'acc' ? 'Đã chép' : 'Sao chép'}</span>
                    </button>
                  </div>

                  <div className="p-2.5 bg-white rounded-xl border border-cream-200 flex items-center justify-between">
                    <div>
                      <p className="text-[11px] text-stone-500">Chủ tài khoản</p>
                      <p className="font-bold text-stone-900 mt-0.5">{successOrder.bankInfo.accountName}</p>
                    </div>
                  </div>

                  <div className="p-2.5 bg-white rounded-xl border border-cream-200 flex items-center justify-between">
                    <div>
                      <p className="text-[11px] text-stone-500">Nội dung chuyển khoản (Memo bắt buộc)</p>
                      <p className="font-mono font-bold text-nepred-600 mt-0.5">{successOrder.bankInfo.memo}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(successOrder.bankInfo!.memo, 'memo')}
                      className="px-2.5 py-1.5 rounded-lg bg-cream-100 hover:bg-cream-200 text-stone-700 text-[11px] font-semibold flex items-center gap-1 transition-colors"
                    >
                      {copiedField === 'memo' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedField === 'memo' ? 'Đã chép' : 'Sao chép'}</span>
                    </button>
                  </div>

                  <div className="p-2.5 bg-nepred-50 rounded-xl border border-nepred-100 flex items-center justify-between">
                    <div>
                      <p className="text-[11px] text-nepred-700 font-medium">Số tiền cần thanh toán</p>
                      <p className="font-bold text-base text-nepred-600 price-tag">{formatCurrency(successOrder.total)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Bank Simulation Action */}
              <div className="pt-2 border-t border-nepgold-500/20 space-y-3">
                {!isPaid ? (
                  <button
                    type="button"
                    onClick={handleSimulatePayment}
                    disabled={isVerifyingPayment}
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-nepgreen-800 to-nepgreen-700 hover:from-nepgreen-900 hover:to-nepgreen-800 text-white font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    {isVerifyingPayment ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-emerald-300" />
                        <span>Đang truy vấn đối soát Napas 247 & Ngân hàng...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                        <span>Tôi Đã Chuyển Khoản Xong (Mô Phỏng Khớp Lệnh Ngay)</span>
                      </>
                    )}
                  </button>
                ) : (
                  <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 space-y-2 animate-fadeIn">
                    <div className="flex items-center justify-between font-bold">
                      <span className="flex items-center gap-1.5 text-emerald-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Chứng Nhận Khớp Lệnh Thành Công 100%</span>
                      </span>
                      <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-emerald-200/70 text-emerald-900">
                        {transactionCode}
                      </span>
                    </div>
                    <p className="text-[11px] text-emerald-800 leading-relaxed">
                      Cổng thanh toán Napas 247 đã đối soát thành công số tiền {formatCurrency(successOrder.total)}. Trạng thái đơn hàng {successOrder.orderId} đã được tự động đồng bộ sang bộ phận kho xưởng để xuất kho vận chuyển!
                    </p>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* Order Details Receipt */}
          <div className="bg-cream-50 rounded-2xl p-6 border border-cream-200 space-y-3.5 text-xs">
            <div className="flex justify-between items-center pb-2.5 border-b border-cream-200">
              <span className="text-stone-500">Thời gian tạo đơn:</span>
              <span className="font-medium text-stone-800">{successOrder.date}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-stone-500">Người nhận hàng:</span>
              <span className="font-bold text-stone-900">{successOrder.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-stone-500">Số điện thoại:</span>
              <span className="font-medium text-stone-800">{successOrder.phone}</span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-stone-500">Địa chỉ giao hàng:</span>
              <span className="text-right font-medium text-stone-800 max-w-xs">
                {successOrder.address}, {successOrder.city}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-stone-500">Phương thức thanh toán:</span>
              <span className="font-semibold text-nepgreen-800">
                {successOrder.paymentMethod === 'COD' ? 'Thanh toán tiền mặt khi nhận hàng (COD)' : 'Chuyển khoản ngân hàng VietQR'}
              </span>
            </div>
            <div className="pt-3 border-t border-cream-200 flex justify-between items-baseline">
              <span className="font-serif font-bold text-sm text-stone-900">Tổng thanh toán:</span>
              <span className="text-xl font-bold text-nepred-600 price-tag">
                {formatCurrency(successOrder.total)}
              </span>
            </div>
          </div>

          <div className="p-4 bg-nepgreen-50 rounded-xl border border-nepgreen-200 text-xs text-nepgreen-900 leading-relaxed flex items-start gap-3">
            <PackageCheck className="w-4 h-4 text-nepgreen-700 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
            <div>
              <p className="font-bold">Quy chuẩn đóng gói & đồng kiểm tra hàng:</p>
              <p className="mt-0.5 text-stone-600">
                Hàng thủ công mỹ nghệ và gốm sứ được Nếp Việt đóng gói theo quy chuẩn hộp kép chống va đập. Quý khách vui lòng đồng kiểm tra hàng cùng bưu tá trước khi thanh toán.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              href="/"
              className="flex-1 py-3.5 px-4 bg-white border border-cream-300 hover:bg-cream-100 text-stone-800 font-semibold text-xs rounded-xl text-center transition-colors shadow-sm"
            >
              Về trang chủ
            </Link>
            <Link
              href="/san-pham"
              className="flex-1 py-3.5 px-4 bg-nepred-600 hover:bg-nepred-700 text-white font-semibold text-xs rounded-xl text-center shadow-md transition-colors"
            >
              Tiếp tục khám phá sản phẩm
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
          <ShoppingBag className="w-12 h-12 text-stone-400 mx-auto" />
          <h2 className="font-serif text-xl font-bold text-stone-900">
            Giỏ hàng chưa có sản phẩm
          </h2>
          <p className="text-xs text-stone-500">
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
            className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-nepred-600 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Quay lại giỏ hàng</span>
          </Link>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-2">
            Thông Tin Đặt Hàng & Thanh Toán
          </h1>
          <p className="text-xs text-stone-500">
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
                <h2 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2 pb-2 border-b border-cream-200">
                  <span className="w-6 h-6 rounded-full bg-nepred-600 text-white text-xs flex items-center justify-center font-bold">1</span>
                  <span>Thông Tin Người Nhận</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-stone-700">
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
                    <label className="block text-xs font-bold text-stone-700">
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
                  <label className="block text-xs font-bold text-stone-700">
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
                <h2 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2 pb-2 border-b border-cream-200">
                  <span className="w-6 h-6 rounded-full bg-nepred-600 text-white text-xs flex items-center justify-center font-bold">2</span>
                  <span>Địa Chỉ Giao Hàng</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* City */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-stone-700">
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
                    <label className="block text-xs font-bold text-stone-700">
                      Số nhà, tên đường, phường/xã <span className="text-nepred-600">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Ví dụ: 122 Hoàng Quốc Việt, Cầu Giấy"
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
                  <label className="block text-xs font-bold text-stone-700">
                    Ghi chú đơn hàng (nếu có yêu cầu gói quà hoặc giao giờ cụ thể)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Ví dụ: Xin bọc thiệp chúc mừng sinh nhật, giao ngoài giờ hành chính..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-cream-300 bg-cream-50 focus:bg-white focus:outline-none focus:border-nepred-600 resize-none"
                  />
                </div>
              </div>

              {/* Payment Methods - Detailed Bank Transfer */}
              <div className="space-y-4 pt-2">
                <h2 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2 pb-2 border-b border-cream-200">
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
                      <div className="flex items-center gap-2 font-bold text-stone-900">
                        <Banknote className="w-4 h-4 text-emerald-600" />
                        <span>Thanh toán tiền mặt khi nhận hàng (COD)</span>
                      </div>
                      <p className="text-stone-500 leading-relaxed">
                        Bạn chỉ thanh toán khi bưu tá giao hàng tận nơi và đã đồng kiểm tra đúng sản phẩm thủ công nguyên vẹn.
                      </p>
                    </div>
                  </label>

                  {/* Bank Transfer (VietQR Detailed) */}
                  <div
                    className={`rounded-2xl border transition-all overflow-hidden ${
                      formData.paymentMethod === 'BANK'
                        ? 'border-nepred-600 bg-white ring-1 ring-nepred-600'
                        : 'border-cream-200 bg-white hover:bg-cream-50'
                    }`}
                  >
                    <label className="flex items-start gap-3 p-4 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="BANK"
                        checked={formData.paymentMethod === 'BANK'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'BANK' })}
                        className="mt-0.5 text-nepred-600 focus:ring-nepred-500"
                      />
                      <div className="flex-1 space-y-1 text-xs">
                        <div className="flex items-center gap-2 font-bold text-stone-900">
                          <CreditCard className="w-4 h-4 text-blue-600" />
                          <span>Chuyển khoản ngân hàng qua VietQR (Nhanh 24/7)</span>
                        </div>
                        <p className="text-stone-500 leading-relaxed">
                          Hệ thống sẽ hiển thị mã VietQR tạo tự động đúng số tiền đơn hàng để bạn quét trực tiếp bằng mọi app ngân hàng.
                        </p>
                      </div>
                    </label>

                    {/* Detailed Bank Selection when BANK is chosen */}
                    {formData.paymentMethod === 'BANK' && (
                      <div className="p-4 bg-cream-50/80 border-t border-cream-200 space-y-4 text-xs">
                        <div className="flex items-center justify-between">
                          <p className="font-bold text-stone-800">Chọn ngân hàng chuyển khoản VietQR:</p>
                          <button
                            type="button"
                            onClick={() => setShowLivePreview(!showLivePreview)}
                            className="text-[11px] font-semibold text-nepred-600 hover:text-nepred-700 underline flex items-center gap-1"
                          >
                            <QrCode className="w-3.5 h-3.5" />
                            <span>{showLivePreview ? 'Ẩn xem trước' : 'Xem trước mã QR'}</span>
                          </button>
                        </div>

                        {/* 4 Banks Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {(['MB', 'VCB', 'TCB', 'TPB'] as const).map((bKey) => {
                            const b = BANK_ACCOUNTS[bKey];
                            const isSel = formData.selectedBank === bKey;
                            return (
                              <button
                                key={bKey}
                                type="button"
                                onClick={() => setFormData({ ...formData, selectedBank: bKey })}
                                className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all ${
                                  isSel
                                    ? 'border-nepred-600 bg-white shadow-sm ring-1 ring-nepred-500'
                                    : 'border-cream-300 bg-white hover:bg-stone-50'
                                }`}
                              >
                                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded text-white w-fit ${b.badgeColor}`}>
                                  {bKey}
                                </span>
                                <span className="font-bold text-stone-900 text-xs mt-1.5">{b.shortName}</span>
                                <span className="text-[10px] text-stone-400 font-mono mt-0.5">{b.accountNo}</span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Account Preview */}
                        <div className="p-3 bg-white rounded-xl border border-cream-200 space-y-1.5 text-[11px]">
                          <div className="flex justify-between">
                            <span className="text-stone-500">Ngân hàng:</span>
                            <span className="font-bold text-stone-900">{currentBank.bankName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-stone-500">Số tài khoản:</span>
                            <span className="font-mono font-bold text-stone-900">{currentBank.accountNo}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-stone-500">Chủ tài khoản:</span>
                            <span className="font-bold text-stone-900">{currentBank.accountName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-stone-500">Chi nhánh:</span>
                            <span className="text-stone-700">{currentBank.branch}</span>
                          </div>
                        </div>

                        {/* Live VietQR Preview Box */}
                        {showLivePreview && (
                          <div className="p-4 bg-white rounded-2xl border-2 border-dashed border-nepgold-500/50 flex flex-col items-center space-y-2 animate-fadeIn">
                            <div className="flex items-center gap-1.5 text-[11px] font-bold text-stone-800">
                              <QrCode className="w-4 h-4 text-nepred-600" />
                              <span>Mã VietQR xem trước (Tạm tính: {formatCurrency(subtotal)})</span>
                            </div>
                            <div className="w-44 h-44 bg-white rounded-xl p-2 shadow-sm border border-stone-200">
                              <img
                                src={`https://img.vietqr.io/image/${formData.selectedBank}-${currentBank.accountNo}-compact2.png?amount=${subtotal}&addInfo=NEPVIET%20ORDER&accountName=${encodeURIComponent(currentBank.accountName)}`}
                                alt="Mã VietQR xem trước"
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <p className="text-[10px] text-stone-500 text-center max-w-xs">
                              Mã VietQR chính thức gắn với mã đơn hàng của bạn sẽ được kích hoạt ngay khi bạn bấm xác nhận đặt hàng bên dưới.
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 bg-nepred-600 hover:bg-nepred-700 disabled:bg-stone-300 text-white rounded-2xl font-bold text-sm shadow-xl shadow-nepred-600/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
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
            <h2 className="font-serif font-bold text-base text-stone-900 pb-3 border-b border-cream-200 flex items-center justify-between">
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
                    <p className="font-serif font-bold text-xs text-stone-900 truncate">
                      {item.product.name}
                    </p>
                    <p className="text-[11px] text-stone-400">
                      SL: {item.quantity} x {formatCurrency(item.product.price)}
                    </p>
                  </div>
                  <span className="font-bold text-xs text-stone-900 whitespace-nowrap price-tag">
                    {formatCurrency(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-2 pt-4 border-t border-cream-200 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Tạm tính hàng hóa:</span>
                <span className="font-bold text-stone-900">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Phí vận chuyển:</span>
                <span className="text-emerald-700 font-bold">
                  {subtotal >= 300000 ? 'Miễn phí (Freeship)' : 'Cửa hàng xác nhận'}
                </span>
              </div>
              <div className="pt-3 border-t border-cream-200 flex justify-between items-baseline">
                <span className="font-serif font-bold text-sm text-stone-900">Tổng thanh toán:</span>
                <span className="text-2xl font-bold text-nepred-600 price-tag">
                  {formatCurrency(subtotal)}
                </span>
              </div>
            </div>

            {/* Safe packing note */}
            <div className="p-4 bg-cream-50 rounded-2xl border border-cream-200 text-xs text-stone-600 space-y-2">
              <div className="flex items-center gap-2 font-bold text-nepgreen-900">
                <ShieldCheck className="w-4 h-4 text-nepgreen-700" />
                <span>Cam kết giao hàng nguyên vẹn</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Nếp Việt cam kết bồi thường 100% hoặc gửi bù sản phẩm mới ngay lập tức nếu hàng thủ công mỹ nghệ bị trầy xước, nứt vỡ trong quá trình vận chuyển.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
