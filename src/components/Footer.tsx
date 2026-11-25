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
    <footer className="bg-[#0E0B0A] text-[#EDE4D8] pt-10 pb-12 border-t border-[#291F1C] relative overflow-hidden">
      {/* Traditional Gold Wavy Line Accent */}
      <div className="w-full h-3 overflow-hidden relative opacity-70 mb-10 select-none pointer-events-none">
        <div className="wavy-gold-line w-full h-full" />
      </div>
      
      {/* 3 Core Value Cards - Heritage Refined */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#181210] p-6 rounded-2xl border border-[#2D221E] hover:border-[#C5A880]/50 transition-colors flex items-start gap-4 group">
            <div className="w-11 h-11 rounded-xl bg-[#221A17] border border-[#382B26] text-[#D4AF37] flex items-center justify-center flex-shrink-0 shadow-inner group-hover:border-[#C5A880]/60 group-hover:text-amber-300 transition-colors">
              <Gem className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <div>
              <h4 className="font-headline font-bold text-base text-white mb-1">100% Giá Trị Văn Hóa Bản Địa</h4>
              <p className="text-xs text-[#A89C90] leading-relaxed">
                Tuyển chọn các sản phẩm văn hóa và ẩm thực truyền thống mang đậm bản sắc và phong tục Việt Nam.
              </p>
            </div>
          </div>

          <div className="bg-[#181210] p-6 rounded-2xl border border-[#2D221E] hover:border-[#C5A880]/50 transition-colors flex items-start gap-4 group">
            <div className="w-11 h-11 rounded-xl bg-[#221A17] border border-[#382B26] text-[#D4AF37] flex items-center justify-center flex-shrink-0 shadow-inner group-hover:border-[#C5A880]/60 group-hover:text-amber-300 transition-colors">
              <PackageCheck className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <div>
              <h4 className="font-headline font-bold text-base text-white mb-1">Đóng Gói Chống Vỡ An Toàn</h4>
              <p className="text-xs text-[#A89C90] leading-relaxed">
                Quy chuẩn đóng gói nhiều lớp bảo vệ chuyên dụng cho đồ thủ công mỹ nghệ dễ vỡ khi vận chuyển toàn quốc.
              </p>
            </div>
          </div>

          <div className="bg-[#181210] p-6 rounded-2xl border border-[#2D221E] hover:border-[#C5A880]/50 transition-colors flex items-start gap-4 group">
            <div className="w-11 h-11 rounded-xl bg-[#221A17] border border-[#382B26] text-[#D4AF37] flex items-center justify-center flex-shrink-0 shadow-inner group-hover:border-[#C5A880]/60 group-hover:text-amber-300 transition-colors">
              <RotateCcw className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <div>
              <h4 className="font-headline font-bold text-base text-white mb-1">Đồng Hành & Đổi Mới 7 Ngày</h4>
              <p className="text-xs text-[#A89C90] leading-relaxed">
                Mức giá tiếp cận cho học sinh, sinh viên; chính sách hỗ trợ kiểm tra hàng và đổi mới nếu có bất kỳ lỗi hư hại nào.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#291F1C]">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-nepred-700 via-nepred-600 to-nepbrown-800 text-white flex items-center justify-center shadow-md shadow-nepred-950/30 border border-nepgold-500/40 select-none flex-shrink-0">
                <div className="absolute inset-0.5 rounded-xl border border-dashed border-nepgold-400/40 pointer-events-none" />
                <span className="font-han text-2xl font-bold text-cream-50 drop-shadow-sm">越</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-baseline gap-2">
                  <span className="font-headline text-2xl font-bold tracking-wider text-white">
                    NẾP VIỆT
                  </span>
                  <span className="font-han text-base font-bold text-[#D4AF37] select-none tracking-wider">
                    惗越
                  </span>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold font-sans">
                  Dự Án Nền Tảng Di Sản Văn Hóa & Ẩm Thực Nếp Việt
                </span>
              </div>
            </div>
            
            <p className="text-xs text-[#B5AAA0] leading-relaxed max-w-sm">
              Nếp Việt là dự án kết nối người trẻ với các giá trị sản phẩm văn hóa và ẩm thực truyền thống Việt Nam. Chúng tôi tin rằng mỗi sản phẩm không chỉ là món đồ thông thường, mà chứa đựng nếp sống, phong tục và câu chuyện văn hóa đáng trân trọng.
            </p>

            <div className="space-y-2 pt-2 text-xs text-[#A89C90]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <span>Trụ sở: Học viện Công nghệ Bưu chính Viễn thông (PTIT), Hà Đông, Hà Nội</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4AF37] flex-shrink-0" strokeWidth={1.5} />
                <span>Hotline: 1900 6868 (Miễn phí 08:00 - 21:30 hàng ngày)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37] flex-shrink-0" strokeWidth={1.5} />
                <span>Email: lienhe@nepviet.vn / hotro@nepviet.vn</span>
              </div>
            </div>

            {/* Business Registration Details */}
            <div className="pt-2 text-[11px] text-[#7A6F66] space-y-1">
              <p>Đề tài nghiên cứu học phần: Ứng dụng Thiết kế Web (Nhóm 05 - PTIT)</p>
              <p>Giảng viên hướng dẫn: Th.S Nguyễn Thị Hoài Phương</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-headline font-bold text-sm text-[#FAF6EE] tracking-wide uppercase border-b border-[#291F1C] pb-2">
              Bộ Sưu Tập
            </h4>
            <ul className="space-y-2 text-xs text-[#B8ACA0]">
              <li>
                <Link href="/san-pham" className="hover:text-[#E2CA9E] transition-colors">
                  Tất cả sản phẩm
                </Link>
              </li>
              <li>
                <Link href="/san-pham?category=thu-cong-my-nghe" className="hover:text-[#E2CA9E] transition-colors">
                  Đồ thủ công mỹ nghệ
                </Link>
              </li>
              <li>
                <Link href="/san-pham?category=do-choi-qua-tang" className="hover:text-[#E2CA9E] transition-colors">
                  Quà tặng dân gian
                </Link>
              </li>
              <li>
                <Link href="/san-pham?category=phu-kien-thoi-trang" className="hover:text-[#E2CA9E] transition-colors">
                  Trang phục & Phụ kiện
                </Link>
              </li>
              <li>
                <Link href="/san-pham?category=am-thuc" className="hover:text-[#E2CA9E] transition-colors">
                  Ẩm thực & Trà sen
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies & Support */}
          <div className="space-y-3">
            <h4 className="font-headline font-bold text-sm text-[#FAF6EE] tracking-wide uppercase border-b border-[#291F1C] pb-2">
              Chính Sách Khách Hàng
            </h4>
            <ul className="space-y-2 text-xs text-[#B8ACA0]">
              <li>
                <Link href="/gio-hang" className="hover:text-[#E2CA9E] transition-colors">
                  Kiểm tra giỏ hàng
                </Link>
              </li>
              <li>
                <Link href="/thanh-toan" className="hover:text-[#E2CA9E] transition-colors">
                  Phương thức thanh toán COD
                </Link>
              </li>
              <li>
                <Link href="/lien-he" className="hover:text-[#E2CA9E] transition-colors">
                  Chính sách đóng gói chống vỡ & FAQ
                </Link>
              </li>
              <li>
                <Link href="/lien-he" className="hover:text-[#E2CA9E] transition-colors">
                  Quy định đổi trả hàng 7 ngày 1:1
                </Link>
              </li>
              <li>
                <Link href="/tin-tuc" className="hover:text-[#E2CA9E] transition-colors">
                  Tin tức & Sự kiện văn hóa
                </Link>
              </li>
              <li>
                <Link href="/gioi-thieu" className="hover:text-[#E2CA9E] transition-colors">
                  Câu chuyện thương hiệu Nếp Việt
                </Link>
              </li>
              <li className="pt-1 border-t border-[#291F1C]">
                <Link href="/admin" className="text-[#D4AF37] hover:text-white transition-colors font-bold inline-flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" strokeWidth={1.5} /> Cổng Quản Trị (Admin)
                </Link>
              </li>
            </ul>
          </div>

          {/* Enterprise Certifications & QR */}
          <div className="space-y-4">
            <h4 className="font-headline font-bold text-sm text-[#FAF6EE] tracking-wide uppercase border-b border-[#291F1C] pb-2">
              Chứng Nhận & Kết Nối
            </h4>
            
            {/* Trust badge */}
            <div className="p-3 bg-[#181210] rounded-xl border border-[#2D221E] space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4" strokeWidth={1.5} />
                <span>Đã Đăng Ký Bộ Công Thương</span>
              </div>
              <p className="text-[10px] text-[#8C8075]">
                Hệ thống thương mại điện tử tuân thủ đầy đủ quy định về bảo vệ quyền lợi người tiêu dùng.
              </p>
            </div>

            {/* SSL Badge */}
            <div className="flex items-center gap-2 text-xs text-[#B8ACA0]">
              <Lock className="w-3.5 h-3.5 text-[#D4AF37]" strokeWidth={1.5} />
              <span>Bảo mật chuẩn SSL 256-bit</span>
            </div>

            {/* QR code */}
            <div className="pt-1 flex items-center gap-3">
              <div className="p-2 bg-white rounded-xl shadow-md">
                <QrCode className="w-14 h-14 text-stone-900" />
              </div>
              <div className="text-[11px] text-[#EDE4D8]">
                <p className="font-bold text-[#D4AF37]">Quét mã nhận ưu đãi</p>
                <p className="text-[#8C8075]">Mã: NEPVIET10</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar with payment partner logos */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#7A6F66] gap-4">
          <p>© 2026 NẾP VIỆT • Học phần Ứng dụng Thiết kế Web (Nhóm 05 - PTIT). Giữ toàn bộ bản quyền.</p>
          <div className="flex items-center gap-3 text-[#7A6F66]">
            <span className="text-[11px]">Đối tác vận chuyển: Viettel Post • GHTK • GHN</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
