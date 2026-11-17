import React from 'react';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Truck,
  Sparkles,
  Heart,
  QrCode,
} from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-nepbrown-800 text-cream-100 pt-16 pb-12 border-t border-nepbrown-700">
      {/* 3 Core Value Cards as shown in wireframe */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-nepbrown-700/60 p-6 rounded-2xl border border-nepbrown-600/50 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-nepred-600 text-white flex items-center justify-center flex-shrink-0 shadow-md">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base text-cream-50 mb-1">100% Thủ Công Bản Địa</h4>
              <p className="text-xs text-cream-200/90 leading-relaxed">
                Từng sản phẩm kết tinh từ bàn tay nghệ nhân tại các làng nghề truyền thống Bát Tràng, Phú Vinh, Vạn Phúc, Đông Hồ...
              </p>
            </div>
          </div>

          <div className="bg-nepbrown-700/60 p-6 rounded-2xl border border-nepbrown-600/50 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-nepgreen-700 text-white flex items-center justify-center flex-shrink-0 shadow-md">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base text-cream-50 mb-1">Đóng Gói Chống Vỡ An Toàn</h4>
              <p className="text-xs text-cream-200/90 leading-relaxed">
                Quy chuẩn đóng gói nhiều lớp mút đệm và hộp carton cứng chuyên dụng cho đồ gốm sứ thủ công mỹ nghệ dễ vỡ.
              </p>
            </div>
          </div>

          <div className="bg-nepbrown-700/60 p-6 rounded-2xl border border-nepbrown-600/50 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-nepgold-600 text-white flex items-center justify-center flex-shrink-0 shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base text-cream-50 mb-1">Đồng Hành Cùng Người Trẻ</h4>
              <p className="text-xs text-cream-200/90 leading-relaxed">
                Mức giá tối ưu cho học sinh, sinh viên; chính sách hỗ trợ đổi mới trong 7 ngày nếu có lỗi từ chế tác hoặc vận chuyển.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-nepbrown-700/80">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-nepred-600 text-white flex items-center justify-center font-serif text-xl font-bold shadow-md">
                NV
              </div>
              <span className="font-serif text-2xl font-bold tracking-wider text-cream-50">
                NẾP VIỆT
              </span>
            </div>
            <p className="text-xs text-cream-200/90 leading-relaxed max-w-sm">
              Nếp Việt là dự án thương mại điện tử kết nối giới trẻ với các giá trị di sản thủ công và ẩm thực truyền thống Việt Nam. Chúng tôi tin rằng mỗi sản phẩm thủ công đều có một linh hồn và một câu chuyện đáng được trân trọng.
            </p>
            <div className="space-y-2 pt-2 text-xs text-cream-200">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-nepred-500 flex-shrink-0" />
                <span>Học viện Công nghệ Bưu chính Viễn thông, Hà Đông, Hà Nội</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-nepred-500 flex-shrink-0" />
                <span>1900 6868 (Hotline hỗ trợ miễn phí 8:00 - 21:00)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-nepred-500 flex-shrink-0" />
                <span>lienhe@nepviet.vn / hotro@nepviet.vn</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-nepred-500 flex-shrink-0" />
                <span>Thứ 2 - Chủ Nhật: 08:00 - 21:30</span>
              </div>
            </div>
          </div>

          {/* Nav Links */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-cream-50 tracking-wide uppercase border-b border-nepbrown-700 pb-2">
              Khám Phá
            </h4>
            <ul className="space-y-2 text-xs text-cream-200">
              <li>
                <Link href="/" className="hover:text-amber-300 transition-colors">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link href="/san-pham" className="hover:text-amber-300 transition-colors">
                  Tất cả sản phẩm
                </Link>
              </li>
              <li>
                <Link href="/san-pham?category=gom-su" className="hover:text-amber-300 transition-colors">
                  Gốm sứ Bát Tràng
                </Link>
              </li>
              <li>
                <Link href="/san-pham?category=may-tre" className="hover:text-amber-300 transition-colors">
                  Mây tre đan Phú Vinh
                </Link>
              </li>
              <li>
                <Link href="/san-pham?category=do-choi-qua-tang" className="hover:text-amber-300 transition-colors">
                  Quà tặng dân gian
                </Link>
              </li>
              <li>
                <Link href="/van-hoa" className="hover:text-amber-300 transition-colors">
                  Văn hóa & Làng nghề
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-cream-50 tracking-wide uppercase border-b border-nepbrown-700 pb-2">
              Chính Sách & Hỗ Trợ
            </h4>
            <ul className="space-y-2 text-xs text-cream-200">
              <li>
                <Link href="/gio-hang" className="hover:text-amber-300 transition-colors">
                  Kiểm tra giỏ hàng
                </Link>
              </li>
              <li>
                <Link href="/thanh-toan" className="hover:text-amber-300 transition-colors">
                  Hướng dẫn thanh toán COD
                </Link>
              </li>
              <li>
                <span className="cursor-pointer hover:text-amber-300 transition-colors">
                  Chính sách đóng gói & vận chuyển
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-amber-300 transition-colors">
                  Chính sách bảo hành và đổi trả 7 ngày
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-amber-300 transition-colors">
                  Bảo mật thông tin khách hàng
                </span>
              </li>
              <li>
                <Link href="/gioi-thieu" className="hover:text-amber-300 transition-colors">
                  Về dự án Nếp Việt
                </Link>
              </li>
            </ul>
          </div>

          {/* QR & Mobile Connect (as shown in wireframe) */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-cream-50 tracking-wide uppercase border-b border-nepbrown-700 pb-2">
              Kết Nối & Quét Mã
            </h4>
            <p className="text-xs text-cream-200 leading-relaxed">
              Quét mã QR để theo dõi các câu chuyện văn hóa và nhận ưu đãi sinh viên 10%:
            </p>
            <div className="p-3 bg-white rounded-xl inline-block shadow-md">
              {/* Responsive SVG QR code representation */}
              <div className="w-24 h-24 bg-neutral-900 rounded flex items-center justify-center p-2 text-white">
                <QrCode className="w-20 h-20 text-white" />
              </div>
            </div>
            <p className="text-[11px] text-cream-300">
              Mã ưu đãi độc quyền: <span className="font-mono text-amber-300 font-bold">NEPVIET10</span>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-cream-300 gap-4">
          <p>© 2026 Nếp Việt – Dự án học phần Ứng dụng Thiết kế Web (Nhóm 05 - PTIT). Mọi quyền được bảo lưu.</p>
          <div className="flex items-center gap-1 text-cream-300">
            <span>Thiết kế bằng</span>
            <Heart className="w-3.5 h-3.5 text-nepred-500 fill-nepred-500" />
            <span>cho di sản Việt</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
