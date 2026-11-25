import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Target, Compass, ArrowRight, ShieldCheck, Sparkles, HeartHandshake } from 'lucide-react';
import { GoldWavyLine, TraditionalFlourish } from '@/components/GoldWavyLine';

export default function AboutPage() {
  return (
    <div className="bg-[#14100E] text-[#EDE4D8] min-h-screen py-12 sm:py-20 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Story Intro */}
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1C1614] text-[#C5A880] border border-[#362924] text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A82B1D]" />
            <span>Câu chuyện thương hiệu Nếp Việt</span>
          </div>
          <h1 className="font-headline text-3xl sm:text-5xl lg:text-6xl font-black text-[#FAF6F0] leading-[1.65] tracking-[0.02em] text-gold-luminous">
            Kết Nối Giới Trẻ Với Tinh Hoa Di Sản
          </h1>
          <TraditionalFlourish />
          <p className="text-sm sm:text-base text-[#EDE4D8]/85 leading-relaxed max-w-2xl mx-auto font-subtext">
            Nếp Việt khởi nguồn từ đề tài học phần Ứng dụng Thiết kế Web tại Học viện Công nghệ Bưu chính Viễn thông (PTIT), được kiến tạo nhằm giới thiệu các sản phẩm văn hóa thủ công mỹ nghệ và ẩm thực truyền thống Việt Nam đến với thế hệ trẻ.
          </p>
          <GoldWavyLine className="pt-2 opacity-70" />
        </div>

        {/* Vision & Mission Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="card-lacquer-soft rounded-[32px] p-8 sm:p-10 border border-[#382B26]/80 shadow-xl space-y-5 hover:border-[#D4AF37]/60 transition-colors">
            <div className="w-12 h-12 rounded-[18px] bg-[#231B19] border border-[#382B26] text-[#C5A880] flex items-center justify-center shadow-md">
              <Target className="w-6 h-6 text-[#C5A880]" strokeWidth={1.5} />
            </div>
            <h2 className="font-headline text-2xl sm:text-3xl font-black text-[#FAF6F0] leading-snug">
              Sứ Mệnh Của Chúng Tôi
            </h2>
            <p className="text-xs sm:text-sm text-[#EDE4D8]/80 leading-relaxed font-subtext">
              Trở thành cầu nối tin cậy giữa các giá trị văn hóa truyền thống và người tiêu dùng trẻ. Chúng tôi không chỉ cung cấp sản phẩm, mà trao gửi câu chuyện văn hóa, sự tỉ mỉ và niềm tự hào dân tộc trong từng chế tác thủ công mỹ nghệ và phong vị ẩm thực cổ truyền.
            </p>
          </div>

          <div className="card-lacquer-soft rounded-[32px] p-8 sm:p-10 border border-[#382B26]/80 shadow-xl space-y-5 hover:border-[#D4AF37]/60 transition-colors">
            <div className="w-12 h-12 rounded-[18px] bg-[#231B19] border border-[#382B26] text-[#C5A880] flex items-center justify-center shadow-md">
              <Compass className="w-6 h-6 text-[#C5A880]" strokeWidth={1.5} />
            </div>
            <h2 className="font-headline text-2xl sm:text-3xl font-black text-[#FAF6F0] leading-snug">
              Tầm Nhìn Dài Hạn
            </h2>
            <p className="text-xs sm:text-sm text-[#EDE4D8]/80 leading-relaxed font-subtext">
              Xây dựng Nếp Việt thành nền tảng thương mại điện tử di sản hàng đầu dành cho học sinh, sinh viên và người trẻ tuổi, nơi người dùng có thể tìm thấy những món quà lưu niệm ý nghĩa, vật phẩm văn hóa tinh tế và ẩm thực truyền thống với mức giá phù hợp.
            </p>
          </div>
        </div>

        {/* 3 Core Values - Red Lacquer Pattern */}
        <div className="relative rounded-[32px] p-8 sm:p-12 overflow-hidden bg-[#3D0A10] border border-[#52121A] shadow-2xl space-y-10">
          <div
            className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-90"
            style={{ backgroundImage: `url('/patterns/background-hoa-van.webp')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#24080B]/60 via-transparent to-black/30 pointer-events-none" />

          <div className="relative z-10 text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
              Giá trị cốt lõi
            </span>
            <h2 className="font-headline text-2xl sm:text-4xl font-black text-[#FAF6F0] leading-snug">
              3 Trụ Cột Định Hình Nếp Việt
            </h2>
            <TraditionalFlourish />
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#180507]/90 backdrop-blur-md p-7 rounded-[24px] border border-[#3E1015] hover:border-[#D4AF37]/60 shadow-lg space-y-3 transition-colors">
              <span className="font-headline font-black text-[#D4AF37] text-3xl">01</span>
              <h3 className="font-headline font-bold text-lg text-[#FAF6F0]">Tính Bản Địa & Chân Thực</h3>
              <p className="text-xs text-[#EDE4D8]/80 leading-relaxed font-subtext">
                Minh bạch 100% về nguồn gốc xuất xứ, làng nghề và vật liệu. Tôn vinh nét đẹp văn hóa và giá trị truyền thống Việt Nam.
              </p>
            </div>

            <div className="bg-[#180507]/90 backdrop-blur-md p-7 rounded-2xl border border-[#3E1015] hover:border-[#D4AF37]/60 shadow-lg space-y-3 transition-colors">
              <span className="font-headline font-black text-[#C5A880] text-3xl">02</span>
              <h3 className="font-headline font-bold text-lg text-[#FAF6F0]">Thẩm Mỹ Trẻ Trung</h3>
              <p className="text-xs text-[#EDE4D8]/80 leading-relaxed font-subtext">
                Ứng dụng ngôn ngữ thiết kế UI/UX hiện đại, kết hợp nhịp điệu trầm ấm của sơn mài với phong cách tối giản, trực quan.
              </p>
            </div>

            <div className="bg-[#180507]/90 backdrop-blur-md p-7 rounded-2xl border border-[#3E1015] hover:border-[#D4AF37]/60 shadow-lg space-y-3 transition-colors">
              <span className="font-headline font-black text-[#A82B1D] text-3xl">03</span>
              <h3 className="font-headline font-bold text-lg text-[#FAF6F0]">Trải Nghiệm An Tâm</h3>
              <p className="text-xs text-[#EDE4D8]/80 leading-relaxed font-subtext">
                Quy trình bọc hàng chống va đập tiêu chuẩn cao, thanh toán COD linh hoạt, hỗ trợ đồng kiểm tra hàng khi nhận và chăm sóc tận tâm.
              </p>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center pt-4">
          <Link
            href="/san-pham"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#A82B1D] hover:bg-[#8E2216] text-white rounded-xl font-bold text-xs sm:text-sm shadow-lg shadow-black/40 border border-[#D4AF37]/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Khám phá các sản phẩm văn hóa & ẩm thực ngay</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
