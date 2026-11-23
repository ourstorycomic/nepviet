'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  PackageCheck,
  Gem,
  RotateCcw,
  Heart,
  QrCode,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export function Footer() {
  const pathname = usePathname();

  // Ẩn Footer khách hàng khi đang ở trong trang Quản trị Admin
  if (pathname?.startsWith('/admin')) {
    return null;
  }
  return (
    <footer className="bg-stone-900 text-cream-100 pt-16 pb-12 border-t border-stone-800">
      
      {/* 3 Core Value Cards - Heritage Refined */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-stone-850/80 p-6 rounded-2xl border border-stone-800 hover:border-nepgold-500/40 transition-colors flex items-start gap-4 group">
            <div className="w-11 h-11 rounded-xl bg-stone-800 border border-stone-700/80 text-nepgold-400 flex items-center justify-center flex-shrink-0 shadow-inner group-hover:border-nepgold-500/50 group-hover:text-amber-300 transition-colors">
              <Gem className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base text-cream-50 mb-1">100% Thủ Công Bản Địa</h4>
              <p className="text-xs text-cream-200/80 leading-relaxed">
                Từng sản phẩm kết tinh từ bàn tay nghệ nhân tại các làng nghề truyền thống Bát Tràng, Phú Vinh, Vạn Phúc, Đông Hồ...
              </p>
            </div>
          </div>

          <div className="bg-stone-850/80 p-6 rounded-2xl border border-stone-800 hover:border-nepgold-500/40 transition-colors flex items-start gap-4 group">
            <div className="w-11 h-11 rounded-xl bg-stone-800 border border-stone-700/80 text-nepgold-400 flex items-center justify-center flex-shrink-0 shadow-inner group-hover:border-nepgold-500/50 group-hover:text-amber-300 transition-colors">
              <PackageCheck className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base text-cream-50 mb-1">Đóng Gói Chống Vỡ An Toàn</h4>
              <p className="text-xs text-cream-200/80 leading-relaxed">
                Quy chuẩn đóng gói nhiều lớp mút đệm và hộp carton cứng chuyên dụng cho đồ gốm sứ thủ công mỹ nghệ dễ vỡ.
              </p>
            </div>
          </div>

          <div className="bg-stone-850/80 p-6 rounded-2xl border border-stone-800 hover:border-nepgold-500/40 transition-colors flex items-start gap-4 group">
            <div className="w-11 h-11 rounded-xl bg-stone-800 border border-stone-700/80 text-nepgold-400 flex items-center justify-center flex-shrink-0 shadow-inner group-hover:border-nepgold-500/50 group-hover:text-amber-300 transition-colors">
              <RotateCcw className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base text-cream-50 mb-1">Đồng Hành & Đổi Mới 7 Ngày</h4>
              <p className="text-xs text-cream-200/80 leading-relaxed">
                Mức giá tối ưu cho học sinh, sinh viên; chính sách hỗ trợ đổi mới trong 7 ngày nếu có lỗi từ chế tác hoặc vận chuyển.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-nepred-700 to-nepbrown-800 text-white flex items-center justify-center font-han text-2xl font-bold shadow-md border border-nepgold-500/30 select-none">
                越
              </div>
              <div className="flex flex-col">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-2xl font-bold tracking-wider text-cream-50">
                    NẾP VIỆT
                  </span>
                  <span className="font-han text-base font-bold text-nepgold-400 select-none tracking-wider">
                    惗越
                  </span>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-nepgold-500 font-semibold font-sans">
                  Công ty TNHH Văn Hóa & Thủ Công Nếp Việt
                </span>
              </div>
            </div>
            
            <p className="text-xs text-cream-200/90 leading-relaxed max-w-sm">
              Nếp Việt là doanh nghiệp xã hội kết nối giới trẻ với các giá trị di sản thủ công và ẩm thực truyền thống Việt Nam. Chúng tôi tin rằng mỗi sản phẩm thủ công đều có một linh hồn và một câu chuyện đáng được trân trọng.
            </p>

            <div className="space-y-2 pt-2 text-xs text-cream-200">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-nepgold-500 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <span>Trụ sở: Tòa nhà A2, Học viện Công nghệ Bưu chính Viễn thông, Hà Đông, Hà Nội</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-nepgold-500 flex-shrink-0" strokeWidth={1.5} />
                <span>Hotline: 1900 6868 (Miễn phí 08:00 - 21:30 hàng ngày)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-nepgold-500 flex-shrink-0" strokeWidth={1.5} />
                <span>Email: lienhe@nepviet.vn / hotro@nepviet.vn</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-nepgold-500 flex-shrink-0" strokeWidth={1.5} />
                <span>Xưởng trưng bày: Thôn Giang Cao, Làng gốm Bát Tràng, Gia Lâm, Hà Nội</span>
              </div>
            </div>

            {/* Business Registration Details */}
            <div className="pt-2 text-[11px] text-stone-400 space-y-1">
              <p>Mã số doanh nghiệp: <strong className="text-cream-200 font-sans">0109886868</strong> do Sở KH&ĐT TP. Hà Nội cấp</p>
              <p>Người đại diện pháp luật: Nhóm Sáng Lập Nếp Việt (Khoa Đa Phương Tiện - PTIT)</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-cream-50 tracking-wide uppercase border-b border-stone-800 pb-2">
              Bộ Sưu Tập
            </h4>
            <ul className="space-y-2 text-xs text-cream-200">
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
                <Link href="/san-pham?category=phu-kien-thoi-trang" className="hover:text-amber-300 transition-colors">
                  Trang phục & Phụ kiện
                </Link>
              </li>
              <li>
                <Link href="/san-pham?category=am-thuc" className="hover:text-amber-300 transition-colors">
                  Ẩm thực & Trà sen
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies & Support */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-cream-50 tracking-wide uppercase border-b border-stone-800 pb-2">
              Chính Sách Khách Hàng
            </h4>
            <ul className="space-y-2 text-xs text-cream-200">
              <li>
                <Link href="/gio-hang" className="hover:text-amber-300 transition-colors">
                  Kiểm tra giỏ hàng
                </Link>
              </li>
              <li>
                <Link href="/thanh-toan" className="hover:text-amber-300 transition-colors">
                  Phương thức thanh toán COD
                </Link>
              </li>
              <li>
                <Link href="/lien-he" className="hover:text-amber-300 transition-colors">
                  Chính sách đóng gói chống vỡ & FAQ
                </Link>
              </li>
              <li>
                <Link href="/lien-he" className="hover:text-amber-300 transition-colors">
                  Quy định đổi trả hàng 7 ngày 1:1
                </Link>
              </li>
              <li>
                <Link href="/tin-tuc" className="hover:text-amber-300 transition-colors">
                  Tin tức & Sự kiện làng nghề
                </Link>
              </li>
              <li>
                <Link href="/van-hoa" className="hover:text-amber-300 transition-colors">
                  Khám phá văn hóa di sản
                </Link>
              </li>
              <li>
                <Link href="/gioi-thieu" className="hover:text-amber-300 transition-colors">
                  Câu chuyện thương hiệu
                </Link>
              </li>
              <li className="pt-1 border-t border-stone-800">
                <Link href="/admin" className="text-amber-400 hover:text-white transition-colors font-bold inline-flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" strokeWidth={1.5} /> Cổng Quản Trị (Admin)
                </Link>
              </li>
            </ul>
          </div>

          {/* Enterprise Certifications & QR */}
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-sm text-cream-50 tracking-wide uppercase border-b border-stone-800 pb-2">
              Chứng Nhận & Kết Nối
            </h4>
            
            {/* Ministry of Industry and Trade badge (official trust signal) */}
            <div className="p-3 bg-stone-850 rounded-xl border border-stone-800 space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4" strokeWidth={1.5} />
                <span>Đã Đăng Ký Bộ Công Thương</span>
              </div>
              <p className="text-[10px] text-stone-400">
                Hệ thống thương mại điện tử tuân thủ đầy đủ quy định về bảo vệ quyền lợi người tiêu dùng.
              </p>
            </div>

            {/* SSL Badge */}
            <div className="flex items-center gap-2 text-xs text-stone-300">
              <Lock className="w-3.5 h-3.5 text-nepgold-500" strokeWidth={1.5} />
              <span>Bảo mật chuẩn SSL 256-bit</span>
            </div>

            {/* QR code */}
            <div className="pt-1 flex items-center gap-3">
              <div className="p-2 bg-white rounded-xl shadow-md">
                <QrCode className="w-14 h-14 text-stone-900" />
              </div>
              <div className="text-[11px] text-cream-200">
                <p className="font-bold text-amber-300">Quét mã nhận ưu đãi</p>
                <p className="text-stone-400">Mã: NEPVIET10</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar with payment partner logos */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <p>© 2026 CÔNG TY TNHH NẾP VIỆT • Học phần Ứng dụng Thiết kế Web (Nhóm 05 - PTIT). Giữ toàn bộ bản quyền.</p>
          <div className="flex items-center gap-3 text-stone-400">
            <span className="text-[11px] text-stone-500">Đối tác vận chuyển: Viettel Post • GHTK • GHN</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
