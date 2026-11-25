import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CRAFT_VILLAGES } from '@/data/products';
import { MapPin, Compass, ArrowRight } from 'lucide-react';
import { GoldWavyLine, TraditionalFlourish } from '@/components/GoldWavyLine';

export default function CultureHeritagePage() {
  const steps = [
    {
      step: '01',
      title: 'Khai thác & Chọn lọc nguyên liệu bản địa',
      desc: 'Đất sét cao lanh phù sa sông Hồng, cật tre nứa già từ rừng tự nhiên, sợi tơ tằm thiên nhiên được tuyển lựa khắt khe.',
    },
    {
      step: '02',
      title: 'Tạo tác thủ công theo lối cổ truyền',
      desc: 'Bàn tay nghệ nhân vuốt gốm, chuốt nan tre mỏng tang, dệt lụa trên khung cửi cổ và khắc ván gỗ tỉ mỉ từng chi tiết nhỏ.',
    },
    {
      step: '03',
      title: 'Nung ủ & Hoàn thiện tự nhiên',
      desc: 'Nung củi nhiệt độ cao biến hóa men hỏa biến, sấy hun khói mây tre chống mối mọt an toàn, phơi nắng tự nhiên.',
    },
    {
      step: '04',
      title: 'Đưa di sản vào đời sống người trẻ',
      desc: 'Đóng gói theo quy chuẩn hiện đại, gửi gắm câu chuyện văn hóa đến từng bàn học, góc phòng và những món quà tặng ý nghĩa.',
    },
  ];

  return (
    <div className="bg-[#14100E] text-[#EDE4D8] min-h-screen py-10 sm:py-16 space-y-16 sm:space-y-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* 1. HERO BANNER - SƠN MÀI ĐỎ & HỌA TIẾT CỔ TRUYỀN */}
        <div className="relative w-full py-16 sm:py-24 px-6 sm:px-12 rounded-[32px] overflow-hidden bg-[#3D0A10] border border-[#52121A] shadow-2xl text-center">
          {/* Dong Son Lacquer Pattern Background - High Visibility */}
          <div
            className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-90"
            style={{ backgroundImage: `url('/patterns/background-hoa-van.webp')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#24080B]/40 via-transparent to-[#14100E]/80 pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#180507]/90 text-[#C5A880] border border-[#C5A880]/40 text-xs font-semibold backdrop-blur-sm shadow-md">
              <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Hành trình tìm về nguồn cội thủ công Việt Nam</span>
            </div>

            <h1 className="font-headline text-3xl sm:text-5xl lg:text-6xl font-black text-[#FAF6F0] leading-[1.65] tracking-[0.02em] text-gold-luminous">
              Văn Hóa & Các Làng Nghề Trăm Năm Tuổi
            </h1>

            <TraditionalFlourish className="my-2" />

            <p className="text-sm sm:text-base text-[#EDE4D8]/85 leading-relaxed font-subtext max-w-2xl mx-auto">
              Việt Nam có hàng ngàn làng nghề thủ công truyền thống, nơi lưu giữ tinh hoa trí tuệ và tâm hồn dân tộc qua bao thăng trầm thời gian. Nếp Việt trân trọng đồng hành cùng các nghệ nhân bảo tồn và lan tỏa những giá trị vô giá ấy.
            </p>

            <GoldWavyLine className="pt-4" />
          </div>
        </div>

        {/* 2. CRAFT VILLAGES GRID */}
        <div className="space-y-10">
          <div className="text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#362924]">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
                Di sản làng nghề
              </span>
              <h2 className="font-headline text-2xl sm:text-4xl font-black text-[#FAF6F0] mt-1 leading-snug">
                Các Làng Nghề Nổi Bật Tại Nếp Việt
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#C5A880] font-medium">
              Những cái nôi di sản thủ công được Nếp Việt chọn lọc trực tiếp
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CRAFT_VILLAGES.map((village) => (
              <div key={village.id} className="group py-2">
                <div className="h-full bg-[#1C1614] rounded-[28px] overflow-hidden border border-[#3E2F29] group-hover:border-[#D4AF37] shadow-xl group-hover:shadow-[0_25px_55px_-12px_rgba(0,0,0,0.95),0_0_35px_-4px_rgba(212,175,55,0.35)] transition-all duration-500 ease-out group-hover:-translate-y-2.5 flex flex-col justify-between">
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#14100E] rounded-t-[27px]">
                    <Image
                      src={village.image}
                      alt={village.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-110 group-hover:brightness-[0.95] transition-all duration-700 ease-out filter brightness-[0.8]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1C1614] via-transparent to-black/30 pointer-events-none" />
                    <div className="absolute top-3.5 left-3.5 z-10">
                      <span className="px-3 py-1 bg-[#A82B1D] text-white text-[11px] font-bold rounded-full shadow-md border border-[#D4AF37]/30 group-hover:border-[#D4AF37] group-hover:shadow-[0_0_12px_rgba(212,175,55,0.5)] transition-all">
                        {village.history}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-1.5 text-xs text-[#C5A880] font-semibold">
                        <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                        <span>{village.location}</span>
                      </div>
                      <h3 className="font-headline font-bold text-xl text-[#FAF6F0] group-hover:text-[#D4AF37] transition-colors leading-snug">
                        {village.name}
                      </h3>
                      <p className="text-xs text-[#EDE4D8]/80 leading-relaxed font-subtext">
                        {village.highlight}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#362924] group-hover:border-[#4A3830] transition-colors">
                      <Link
                        href="/san-pham"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[14px] bg-[#251D1A] group-hover:bg-[#8B1E2B] text-xs font-semibold text-[#EDE4D8] group-hover:text-white border border-[#3E2D26] group-hover:border-[#D4AF37]/60 group-hover:shadow-md transition-all duration-300"
                      >
                        <span>Xem sản phẩm từ làng nghề</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#C5A880] group-hover:text-white group-hover:translate-x-1.5 transition-all" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. PROCESS FLOW - SƠN MÀI ĐỎ & HỌA TIẾT ĐÔNG SƠN */}
        <div className="relative rounded-[32px] p-8 sm:p-14 overflow-hidden bg-[#3D0A10] border border-[#52121A] shadow-2xl space-y-10">
          {/* Dong Son Lacquer Pattern Background - High Visibility */}
          <div
            className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-85"
            style={{ backgroundImage: `url('/patterns/background-hoa-van.webp')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#24080B]/60 via-transparent to-[#14100E]/85 pointer-events-none" />

          <div className="relative z-10 text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
              Quy trình chế tác thủ công
            </span>
            <h2 className="font-headline text-2xl sm:text-4xl font-black text-[#FAF6F0] tracking-[0.02em] leading-[1.65]">
              Từ Đất, Tre, Tơ Đến Tác Phẩm Nghệ Thuật
            </h2>
            <TraditionalFlourish />
            <p className="text-xs sm:text-sm text-[#EDE4D8]/85 leading-relaxed font-subtext">
              Để tạo nên một sản phẩm thủ công hoàn chỉnh, mỗi người nghệ nhân phải trải qua hàng chục công đoạn đòi hỏi sự kiên nhẫn và bàn tay khéo léo.
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((st) => (
              <div
                key={st.step}
                className="bg-[#180507]/90 backdrop-blur-md p-6 rounded-[22px] border border-[#3E1015] hover:border-[#6B222B] shadow-lg hover:shadow-[0_12px_28px_-8px_rgba(0,0,0,0.8),0_0_18px_-3px_rgba(212,175,55,0.15)] transition-[border-color,box-shadow] duration-400 space-y-3 group"
              >
                <span className="font-headline text-3xl sm:text-4xl font-black text-[#D4AF37] block group-hover:scale-105 transition-transform">
                  {st.step}
                </span>
                <h3 className="font-headline font-bold text-sm text-[#FAF6F0] leading-snug">
                  {st.title}
                </h3>
                <p className="text-xs text-[#EDE4D8]/75 leading-relaxed font-subtext">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="relative z-10 pt-4">
            <GoldWavyLine />
          </div>
        </div>

      </div>
    </div>
  );
}
