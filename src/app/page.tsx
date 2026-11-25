'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CATEGORIES, CRAFT_VILLAGES } from '@/data/products';
import { useProducts } from '@/utils/productsCatalog';
import { ProductCard } from '@/components/ProductCard';
import { GoldWavyLine, TraditionalFlourish } from '@/components/GoldWavyLine';
import {
  ArrowRight,
  Award,
  ShieldCheck,
  Compass,
  Heart,
  ChevronRight,
  Star,
  CheckCircle2,
  Clock,
  Gem,
  PackageCheck,
  RotateCcw,
  Layers,
  ChevronLeft,
  QrCode,
  Smartphone,
  MessageCircle,
  ExternalLink,
  X,
  Copy,
  Check,
  CreditCard,
} from 'lucide-react';

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // QR Wireframe Modal state
  const [activeQrModal, setActiveQrModal] = useState<null | {
    id: string;
    title: string;
    badge: string;
    description: string;
    qrUrl: string;
    type: 'vietqr' | 'app' | 'zalo' | 'ocop';
  }>(null);
  const [selectedBank, setSelectedBank] = useState<'MB' | 'VCB' | 'TCB' | 'TPB'>('MB');
  const [sampleAmount, setSampleAmount] = useState<number>(100000);
  const [copiedAcc, setCopiedAcc] = useState(false);
  const [copiedMemo, setCopiedMemo] = useState(false);

  const BANK_LIST = {
    MB: { name: 'MB Bank (Quân Đội)', acc: '0968999888', owner: 'CONG TY TNHH NEP VIET' },
    VCB: { name: 'Vietcombank', acc: '1029886868', owner: 'CONG TY TNHH NEP VIET' },
    TCB: { name: 'Techcombank', acc: '1903678999', owner: 'CONG TY TNHH NEP VIET' },
    TPB: { name: 'TPBank', acc: '0888999666', owner: 'CONG TY TNHH NEP VIET' },
  };

  const getVietQrUrl = (bank: 'MB' | 'VCB' | 'TCB' | 'TPB', amount: number) => {
    const acc = BANK_LIST[bank].acc;
    const owner = encodeURIComponent(BANK_LIST[bank].owner);
    const memo = encodeURIComponent('NEPVIET DISAN');
    return `https://img.vietqr.io/image/${bank}-${acc}-compact2.png?amount=${amount}&addInfo=${memo}&accountName=${owner}`;
  };

  const heroSlides = [
    {
      title: 'Gìn giữ nếp xưa, thêu dệt nhịp sống trẻ',
      subtitle: 'Tôn vinh tinh hoa gốm Bát Tràng, mây tre Phú Vinh và lụa Vạn Phúc trong không gian sống hiện đại.',
      image: '/showcase/gom-su-bat-trang.png',
      badge: 'Bộ Sưu Tập Mới 2026',
      ctaText: 'Khám phá sản phẩm ngay',
      ctaLink: '/san-pham',
    },
    {
      title: 'Mộc mạc mây tre, tinh tế hồn quê Việt',
      subtitle: 'Từng đường nan tre già được chuốt mỏng như sợi tơ bởi bàn tay tài hoa của nghệ nhân Phú Vinh.',
      image: '/showcase/banner-moc-mac-may-tre.jpg',
      badge: 'Thủ Công Mỹ Nghệ Tuyển Chọn',
      ctaText: 'Xem bộ sưu tập thủ công',
      ctaLink: '/san-pham?category=thu-cong-my-nghe',
    },
    {
      title: 'Tranh Đông Hồ & Đồ chơi ký ức dân gian',
      subtitle: 'Sắc điệp lấp lánh và nét vẽ tay chú Tễu đưa người trẻ trở về với những miền ký ức trong trẻo.',
      image: '/showcase/banner-tranh-dong-ho-do-choi.jpg',
      badge: 'Di Sản Văn Hóa Quốc Gia',
      ctaText: 'Khám phá quà tặng dân gian',
      ctaLink: '/san-pham?category=do-choi-qua-tang',
    },
  ];

  const { products } = useProducts();
  const featuredProducts = products
    .filter(
      (p) =>
        p.isFeatured &&
        p.approvalStatus !== 'pending' &&
        p.approvalStatus !== 'rejected' &&
        (!p.badge || !p.badge.includes('Chờ'))
    )
    .slice(0, 4);

  return (
    <div className="space-y-16 sm:space-y-20 pb-20 overflow-hidden">
      
      {/* 1. HERO SLIDER CAROUSEL (AS SKETCHED IN WIREFRAME) */}
      <section className="relative w-full bg-stone-900 text-white overflow-hidden">
        <div className="relative h-[480px] sm:h-[560px] lg:h-[620px] w-full">
          {heroSlides.map((slide, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                currentSlide === idx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={idx === 0}
                className="object-cover object-center filter brightness-[0.72]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-stone-950/80 via-stone-900/50 to-transparent" />

              <div className="relative max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
                <div className="max-w-2xl space-y-5">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-nepred-600/90 text-white border border-nepred-400/40 text-xs font-semibold tracking-wide backdrop-blur-sm shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>{slide.badge}</span>
                  </div>

                  <h1 className="font-headline text-3xl sm:text-5xl lg:text-6xl font-black text-cream-50 leading-[1.3] tracking-normal">
                    {slide.title}
                  </h1>

                  <p className="text-sm sm:text-base text-cream-200 leading-relaxed font-normal max-w-xl">
                    {slide.subtitle}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <Link
                      href={slide.ctaLink}
                      className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-nepred-600 hover:bg-nepred-700 text-white font-semibold text-sm shadow-xl shadow-nepred-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                      <span>{slide.ctaText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      href="/van-hoa"
                      className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-cream-100 backdrop-blur-md border border-white/20 font-semibold text-sm transition-all"
                    >
                      <Compass className="w-4 h-4 text-amber-300" />
                      <span>Câu chuyện làng nghề</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Slider Controls (Next / Prev & Dots as in Wireframe) */}
          <div className="absolute bottom-6 left-0 right-0 z-20">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {heroSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      currentSlide === i ? 'w-8 bg-amber-400' : 'w-2.5 bg-white/50 hover:bg-white/80'
                    }`}
                    aria-label={`Chuyển tới slide ${i + 1}`}
                  />
                ))}
              </div>

              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={() => setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md transition-colors"
                  aria-label="Slide trước"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1))}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md transition-colors"
                  aria-label="Slide tiếp theo"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Traditional Gold Wave Divider */}
      <GoldWavyLine className="max-w-6xl mx-auto opacity-70" />

      {/* 2. BRAND INTRODUCTION BLOCK (WIREFRAME BLOCK 2: LOGO/SEAL LEFT + TEXT RIGHT) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card-lacquer-soft rounded-[32px] p-8 sm:p-12 lg:p-14 border border-[#3D2D26]/80 relative overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center text-[#EDE4D8]">
          {/* Subtle warm ambient light glow */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#D4AF37]/8 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#8B1E2B]/12 rounded-full blur-3xl pointer-events-none" />
          
          {/* Left Emblem / Image with Red Lacquer Pattern */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="animate-soft-float animate-shimmer-aura relative w-56 h-56 sm:w-64 sm:h-64 rounded-[32px] bg-[#3D0A10] p-6 shadow-2xl border-2 border-[#D4AF37]/60 flex flex-col items-center justify-center text-center text-white overflow-hidden group">
              {/* Pattern overlay - Clearly visible */}
              <div
                className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-90"
                style={{ backgroundImage: `url('/patterns/background-hoa-van.webp')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A0507]/60 via-transparent to-black/20 pointer-events-none" />

              <div className="animate-pulse-seal relative z-10 w-20 h-20 rounded-[22px] bg-gradient-to-br from-nepred-700 via-nepred-600 to-nepbrown-800 border border-nepgold-400/60 flex items-center justify-center shadow-xl mb-3 select-none flex-shrink-0 group-hover:scale-105 transition-transform duration-500">
                <div className="absolute inset-1 rounded-[16px] border border-dashed border-[#D4AF37]/60 pointer-events-none" />
                <span className="font-han text-4xl font-bold text-cream-50 drop-shadow-sm">越</span>
              </div>
              <div className="relative z-10 flex items-center gap-2 justify-center">
                <h3 className="font-headline text-xl font-bold tracking-wider text-white">NẾP VIỆT</h3>
                <span className="font-han text-base font-bold text-[#D4AF37]">惗越</span>
              </div>
              <p className="relative z-10 text-[11px] uppercase tracking-widest text-[#E2CA9E] mt-1 font-semibold">
                Thương hiệu Di sản & Văn hóa Việt
              </p>
              <div className="relative z-10 mt-3 pt-3 border-t border-[#4A2D26] text-[10px] text-[#CFC4B6] uppercase tracking-wider font-medium">
                Tinh hoa bản địa • Bản sắc dân tộc
              </div>
            </div>
          </div>

          {/* Right Text - Story & Vision */}
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2A1513] text-[#E2CA9E] border border-[#C5A880]/40 text-xs font-bold uppercase tracking-wider shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
              <span>Về thương hiệu Nếp Việt</span>
            </div>
            <h2 className="font-headline text-2xl sm:text-4xl lg:text-[42px] font-bold text-white leading-[1.75] tracking-[0.02em] text-gold-luminous">
              Kết nối thế hệ trẻ với các giá trị văn hóa <br className="hidden sm:inline" />
              & ẩm thực truyền thống Việt Nam
            </h2>
            <p className="text-sm sm:text-base text-[#D8CDC0] leading-[1.8] font-normal">
              Nếp Việt được hình thành với sứ mệnh tôn vinh nét đẹp của các sản phẩm văn hóa và ẩm thực truyền thống Việt Nam. Chúng tôi tin rằng mỗi sản phẩm không chỉ là một món đồ thông thường, mà là hiện thân của nếp sống, phong tục và những giá trị văn hóa tinh thần được gìn giữ qua nhiều thế hệ.
            </p>
            <p className="text-sm sm:text-base text-[#D8CDC0] leading-[1.8] font-normal">
              Dành riêng cho những người trẻ yêu di sản, Nếp Việt mang đến trải nghiệm mua sắm trực tuyến thuận tiện và minh bạch, kết hợp hài hòa giữa nhu cầu tiêu dùng hiện đại và hành trình khám phá những giá trị văn hóa truyền thống của dân tộc.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-[#C5A880] font-semibold">
              <span className="flex items-center gap-2 text-[#EDE4D8]">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> Tôn vinh giá trị văn hóa Việt
              </span>
              <span className="flex items-center gap-2 text-[#EDE4D8]">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> Trải nghiệm khám phá trực quan
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 3. SIGNATURE 6 + 1 DARK GRID SECTION (EXACTLY AS IN WIREFRAME BLOCK 3) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-[#3D0A10] rounded-[32px] p-6 sm:p-10 border border-[#52121A] text-white shadow-2xl overflow-hidden">
          {/* Dong Son Lacquer Pattern Background - High Visibility */}
          <div
            className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-85"
            style={{ backgroundImage: `url('/patterns/background-hoa-van.webp')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A0507]/90 via-transparent to-black/30 pointer-events-none" />

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 pb-4 border-b border-[#3E1015]">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
                Không gian trưng bày di sản
              </span>
              <h2 className="font-headline text-2xl sm:text-4xl font-bold text-white mt-1">
                Bộ Sưu Tập Tuyển Chọn Nếp Việt
              </h2>
            </div>
            <Link
              href="/san-pham"
              className="text-xs font-semibold text-[#E2CA9E] hover:text-white flex items-center gap-1"
            >
              <span>Xem tất cả sản phẩm</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 6 + 1 Layout: 6 cards left (2 cols x 3 rows) + 1 large card right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Left 6 category tiles (7 cols) */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-2 gap-4">
              {[
                { name: 'Đồ Thủ Công Mỹ Nghệ', slug: 'thu-cong-my-nghe', desc: 'Gốm sứ & mây tre đan tinh hoa', img: '/showcase/gom-su-bat-trang.png' },
                { name: 'Mây Tre Đan Truyền Thống', slug: 'thu-cong-my-nghe', desc: 'Nan tre già chuốt mịn tự nhiên', img: '/showcase/may-tre-dan-phu-vinh.webp' },
                { name: 'Quà Tặng & Đồ Chơi Dân Gian', slug: 'do-choi-qua-tang', desc: 'Mặt nạ giấy bồi, tò he bột nếp', img: '/showcase/qua-tang-do-choi-dan-gian.webp' },
                { name: 'Trang Phục & Phụ Kiện Việt', slug: 'phu-kien-thoi-trang', desc: 'Lụa tơ tằm, túi thêu hoa văn', img: '/showcase/lua-to-tam-van-phuc.jpg' },
                { name: 'Tranh Dân Gian Truyền Thống', slug: 'do-choi-qua-tang', desc: 'Bản sắc nghệ thuật hội họa Việt', img: '/showcase/tranh-dan-gian-dong-ho.jpg' },
                { name: 'Ẩm Thực & Trà Cổ Truyền', slug: 'am-thuc', desc: 'Trà sen Quảng Bá, bánh cốm dẻo', img: '/showcase/am-thuc-tra-co-truyen.jpg' },
              ].map((cat, i) => (
                <div key={i} className="group py-1">
                  <Link
                    href={`/san-pham?category=${cat.slug}`}
                    className="relative overflow-hidden rounded-[22px] bg-[#1A0609]/90 backdrop-blur-sm border border-[#4A161E]/70 group-hover:border-[#D4AF37] group-hover:bg-[#25090E] group-hover:-translate-y-1.5 transition-all duration-400 ease-out p-3.5 sm:p-4 flex items-center gap-3.5 shadow-md group-hover:shadow-[0_16px_35px_-8px_rgba(0,0,0,0.85),0_0_22px_-3px_rgba(212,175,55,0.3)] block"
                  >
                    <div className="relative w-16 h-16 rounded-[16px] overflow-hidden bg-[#24080B] flex-shrink-0 shadow-inner">
                      <Image
                        src={cat.img}
                        alt={cat.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-headline font-bold text-xs sm:text-sm text-white group-hover:text-[#D4AF37] transition-colors truncate">
                        {cat.name}
                      </h4>
                      <p className="text-[11px] text-[#C5B8A8] truncate mt-0.5">{cat.desc}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {/* Right Large Spotlight Card (5 cols) */}
            <div className="lg:col-span-5 relative rounded-[28px] overflow-hidden bg-[#180507] border border-[#52121A] hover:border-[#D4AF37] min-h-[300px] flex flex-col justify-end p-6 sm:p-8 group shadow-xl hover:shadow-[0_20px_45px_-10px_rgba(0,0,0,0.9),0_0_30px_-5px_rgba(212,175,55,0.25)] transition-all duration-500 ease-out">
              <Image
                src="/products/bo-am-chen-men-lam-bat-trang.jpg"
                alt="Bộ sưu tập Tiêu Điểm Nếp Việt"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-[0.7]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              <div className="relative z-10 space-y-3">
                <span className="px-3 py-1 bg-[#A82B1D] text-white text-[10px] font-bold uppercase tracking-wider rounded-md inline-block border border-[#D4AF37]/30">
                  Tiêu điểm tuần này
                </span>
                <h3 className="font-headline text-xl sm:text-2xl font-bold text-white">
                  Bộ Ấm Chén Men Lam Gốm Bát Tràng Dáng Trúc
                </h3>
                <p className="text-xs text-[#EDE4D8] line-clamp-2">
                  Đất cao lanh tuyển chọn nung ở 1.300°C, họa tiết nhành trúc thanh tao vẽ tay từ mực lam cổ truyền.
                </p>
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-lg font-bold text-[#E58370] price-tag">320.000đ</span>
                  <Link
                    href="/san-pham/bo-am-chen-men-lam-bat-trang"
                    className="px-4 py-2 bg-white text-stone-900 rounded-xl text-xs font-bold hover:bg-[#F5EFE6] transition-colors"
                  >
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS ROW (WIREFRAME BLOCK 4: 4 CARDS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#D4AF37] mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              <span>Sản phẩm tiêu biểu tuyển chọn</span>
            </div>
            <h2 className="font-headline text-2xl sm:text-4xl font-bold text-white">
              Được Giới Trẻ Yêu Thích Nhất
            </h2>
          </div>
          <Link
            href="/san-pham"
            className="text-xs font-bold text-[#E2CA9E] hover:text-white flex items-center gap-1"
          >
            <span>Xem thêm tất cả sản phẩm</span>
            <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
          </Link>
        </div>

        {/* 4-column row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. PROMOTION CTA STRIP (WIREFRAME BLOCK 5: HORIZONTAL STRIP) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[28px] bg-[#3D0A10] text-white p-7 sm:p-10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 border-2 border-[#D4AF37]/50 animate-shimmer-aura">
          {/* Dong Son Lacquer Pattern Background - High Visibility */}
          <div
            className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-90"
            style={{ backgroundImage: `url('/patterns/background-hoa-van.webp')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#24080B]/60 via-transparent to-[#14100E]/75 pointer-events-none" />
          <div className="relative z-10 space-y-2 text-center md:text-left">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#D4AF37]">
              Ưu Đãi Đặc Biệt Cho Sinh Viên
            </span>
            <h3 className="font-headline text-xl sm:text-3xl font-bold text-white leading-snug">
              Giảm ngay 10% đơn hàng đầu tiên với mã <span className="font-mono bg-black/40 px-3 py-1 rounded-xl text-[#D4AF37] border border-[#D4AF37]/50 shadow-inner">NEPVIET10</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#EDE4D8]">
              Miễn phí giao hàng toàn quốc cho mọi đơn hàng giá trị từ 300.000đ trở lên.
            </p>
          </div>
          <Link
            href="/san-pham"
            className="relative z-10 px-8 py-4 bg-[#D4AF37] hover:bg-[#E2CA9E] text-stone-900 font-bold text-xs sm:text-sm rounded-[18px] shadow-xl whitespace-nowrap transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-[0_10px_25px_-5px_rgba(212,175,55,0.5)]"
          >
            Nhận ưu đãi ngay
          </Link>
        </div>
      </section>

      {/* 6. 3 CORE VALUE CARDS (WIREFRAME BLOCK 6: 3 BOXES) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card-lacquer-soft p-7 rounded-[28px] border border-[#382B26]/80 flex items-start gap-4 group">
            <div className="w-12 h-12 rounded-[18px] bg-[#241C1A] border border-[#382B26] text-[#D4AF37] flex items-center justify-center flex-shrink-0 shadow-inner group-hover:border-[#D4AF37]/60 group-hover:scale-105 transition-all duration-400">
              <Gem className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <div>
              <h4 className="font-headline font-bold text-base text-white mb-1 group-hover:text-[#E2CA9E] transition-colors leading-snug">100% Giá Trị Văn Hóa Bản Địa</h4>
              <p className="text-xs text-[#C5B8A8] leading-relaxed">
                Từng sản phẩm kết tinh từ sự khéo léo và giá trị văn hóa truyền thống lâu đời trên đất nước Việt Nam.
              </p>
            </div>
          </div>

          <div className="card-lacquer-soft p-7 rounded-[28px] border border-[#382B26]/80 flex items-start gap-4 group">
            <div className="w-12 h-12 rounded-[18px] bg-[#241C1A] border border-[#382B26] text-[#D4AF37] flex items-center justify-center flex-shrink-0 shadow-inner group-hover:border-[#D4AF37]/60 group-hover:scale-105 transition-all duration-400">
              <PackageCheck className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <div>
              <h4 className="font-headline font-bold text-base text-white mb-1 group-hover:text-[#E2CA9E] transition-colors leading-snug">Đóng Gói Chống Vỡ An Toàn</h4>
              <p className="text-xs text-[#C5B8A8] leading-relaxed">
                Quy chuẩn đóng gói nhiều lớp mút đệm và hộp carton cứng chuyên dụng cho đồ thủ công mỹ nghệ dễ vỡ.
              </p>
            </div>
          </div>

          <div className="card-lacquer-soft p-7 rounded-[28px] border border-[#382B26]/80 flex items-start gap-4 group">
            <div className="w-12 h-12 rounded-[18px] bg-[#241C1A] border border-[#382B26] text-[#D4AF37] flex items-center justify-center flex-shrink-0 shadow-inner group-hover:border-[#D4AF37]/60 group-hover:scale-105 transition-all duration-400">
              <RotateCcw className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <div>
              <h4 className="font-headline font-bold text-base text-white mb-1 group-hover:text-[#E2CA9E] transition-colors leading-snug">Đồng Kiểm & Đổi Mới 7 Ngày</h4>
              <p className="text-xs text-[#C5B8A8] leading-relaxed">
                Đồng kiểm hàng khi nhận, hỗ trợ hoàn tiền hoặc đổi sản phẩm mới nếu có bất kỳ hư hại nào từ quá trình vận chuyển.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. ARCH STORY SECTION (WIREFRAME BLOCK 7: ARCH IMAGE LEFT + STORY RIGHT) */}
      <section className="bg-[#181210] border-y border-[#2C211D] py-16 sm:py-20 text-[#EDE4D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Traditional Arch Image */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="arch-card overflow-hidden shadow-2xl border-4 border-[#3D2D26] aspect-[3/4] relative bg-stone-900">
                  <Image
                    src="/showcase/nghe-nhan-lang-nghe-viet.jpg"
                    alt="Tinh hoa di sản Việt Nếp Việt"
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-transparent to-transparent flex items-end p-6">
                    <div className="text-white">
                      <p className="font-headline text-lg font-bold">Nét đẹp văn hóa dân tộc</p>
                      <p className="text-xs text-[#EDE4D8] mt-1">Gìn giữ hồn cốt di sản và thổi luồng gió mới vào nhịp sống hiện đại</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Cultural Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2A1513] text-[#E2CA9E] border border-[#C5A880]/30 text-xs font-semibold">
                <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Hồn cốt di sản & Giá trị truyền thống</span>
              </div>

              <h2 className="font-headline text-2xl sm:text-4xl font-bold text-white leading-snug">
                Mỗi món đồ văn hóa là một câu chuyện cần được sẻ chia
              </h2>

              <div className="space-y-4 text-sm text-[#CFC4B6] leading-relaxed">
                <p>
                  Giữa nhịp sống số hối hả, Nếp Việt ra đời từ tâm huyết của những người trẻ: Làm sao để các sản phẩm văn hóa và ẩm thực truyền thống không chỉ dừng lại ở ký ức xưa cũ, mà trở thành một phần thân thuộc, gần gũi trong đời sống thường nhật?
                </p>
                <p>
                  Nền tảng tập trung nghiên cứu hành vi người dùng, tổ chức danh mục rõ ràng và hỗ trợ trải nghiệm tìm hiểu nguồn gốc, ý nghĩa văn hóa của từng sản phẩm. Mỗi lựa chọn của bạn đều góp phần tôn vinh và tiếp nối những giá trị văn hóa quý báu của dân tộc.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/san-pham"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#A82B1D] hover:bg-[#C03525] text-white font-semibold text-xs shadow-md transition-all"
                >
                  <span>Khám phá các sản phẩm ngay</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. KHÔNG GIAN SỐ & MÃ QR DI SẢN (THEO SƠ ĐỒ WIREFRAME DỰ ÁN) */}
      <section className="py-16 bg-[#14100E] border-b border-[#2C211D] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-[#1C1614] rounded-3xl p-6 sm:p-10 border border-[#362924] shadow-2xl relative text-[#EDE4D8]">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-[#362924]">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2A1513] text-[#E2CA9E] text-xs font-bold border border-[#C5A880]/30">
                  <QrCode className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Cổng Kết Nối Số & Truy Xuất Di Sản</span>
                </div>
                <h2 className="font-headline font-bold text-2xl sm:text-4xl text-white">
                  Quét Mã QR Tiện Ích Nếp Việt
                </h2>
                <p className="text-xs sm:text-sm text-[#A89C90] max-w-xl">
                  Theo chuẩn thiết kế đa kênh, bạn có thể quét nhanh bằng ứng dụng ngân hàng hoặc camera điện thoại để trải nghiệm dịch vụ di sản.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-[#A89C90] italic">4 Cổng mã chuẩn hóa theo Wireframe</span>
              </div>
            </div>

            {/* 4 QR Cards Matching Wireframe */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Card 1: VietQR */}
              <div
                onClick={() => setActiveQrModal({
                  id: 'vietqr',
                  title: 'Thanh Toán Nhanh VietQR (Napas 247)',
                  badge: 'Thanh toán không dùng tiền mặt',
                  description: 'Chuyển khoản trực tiếp liên ngân hàng 24/7 không cần nhập tay thông tin, hệ thống tự động nhận lệnh đơn hàng tức thì.',
                  qrUrl: getVietQrUrl(selectedBank, sampleAmount),
                  type: 'vietqr',
                })}
                className="group p-5 rounded-2xl bg-[#221A17] hover:bg-[#2A201C] border border-[#382B26] hover:border-[#C5A880]/60 hover:shadow-2xl transition-all cursor-pointer flex flex-col items-center text-center text-[#EDE4D8]"
              >
                <div className="w-full flex items-center justify-between text-[11px] mb-3">
                  <span className="px-2 py-0.5 rounded-full bg-blue-950/60 text-blue-300 border border-blue-800/40 font-bold">Napas 247</span>
                  <span className="text-stone-400 group-hover:text-[#E2CA9E] transition-colors flex items-center gap-0.5">
                    Quét thử <ChevronRight className="w-3 h-3" />
                  </span>
                </div>

                <div className="relative w-40 h-40 bg-white rounded-xl p-2 shadow-sm border border-[#382B26] group-hover:scale-105 transition-all flex items-center justify-center">
                  <img
                    src="https://img.vietqr.io/image/MB-0968999888-compact2.png?amount=100000&addInfo=NEPVIET%20DISAN&accountName=CONG%20TY%20TNHH%20NEP%20VIET"
                    alt="VietQR Nếp Việt"
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>

                <h3 className="font-headline font-bold text-sm text-white mt-4 group-hover:text-[#E2CA9E] transition-colors">
                  VietQR Chuyển Khoản 24/7
                </h3>
                <p className="text-[11px] text-[#A89C90] mt-1 line-clamp-2">
                  Quét chuyển khoản siêu tốc qua MB, Vietcombank, Techcombank, TPBank.
                </p>

                <div className="mt-4 pt-3 border-t border-[#382B26] w-full">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E58370]">
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Mở cổng thanh toán</span>
                  </span>
                </div>
              </div>

              {/* Card 2: Mobile App */}
              <div
                onClick={() => setActiveQrModal({
                  id: 'app',
                  title: 'Tải Ứng Dụng Di Động Nếp Việt',
                  badge: 'iOS & Android App',
                  description: 'Trải nghiệm không gian thực tế ảo 3D làng nghề, theo dõi đơn hàng thời gian thực và nhận đặc quyền voucher thành viên mới.',
                  qrUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https%3A%2F%2Fnepviet.vercel.app%2F',
                  type: 'app',
                })}
                className="group p-5 rounded-2xl bg-[#221A17] hover:bg-[#2A201C] border border-[#382B26] hover:border-[#C5A880]/60 hover:shadow-2xl transition-all cursor-pointer flex flex-col items-center text-center text-[#EDE4D8]"
              >
                <div className="w-full flex items-center justify-between text-[11px] mb-3">
                  <span className="px-2 py-0.5 rounded-full bg-amber-950/60 text-amber-300 border border-amber-800/40 font-bold">App Di Sản</span>
                  <span className="text-stone-400 group-hover:text-[#D4AF37] transition-colors flex items-center gap-0.5">
                    Tải App <ChevronRight className="w-3 h-3" />
                  </span>
                </div>

                <div className="relative w-40 h-40 bg-white rounded-xl p-2 shadow-sm border border-[#382B26] group-hover:scale-105 transition-all flex items-center justify-center">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https%3A%2F%2Fnepviet.vercel.app%2F"
                    alt="App Nếp Việt QR"
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>

                <h3 className="font-headline font-bold text-sm text-white mt-4 group-hover:text-[#D4AF37] transition-colors">
                  Ứng Dụng Nếp Việt 3D
                </h3>
                <p className="text-[11px] text-[#A89C90] mt-1 line-clamp-2">
                  Tour khám phá không gian văn hóa & gợi ý quà tặng theo ngân sách.
                </p>

                <div className="mt-4 pt-3 border-t border-[#382B26] w-full">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37]">
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Tải về điện thoại</span>
                  </span>
                </div>
              </div>

              {/* Card 3: Zalo OA */}
              <div
                onClick={() => setActiveQrModal({
                  id: 'zalo',
                  title: 'Zalo Official Account & Hotline Hỗ Trợ',
                  badge: 'Tư Vấn Trực Tuyến 24/7',
                  description: 'Trao đổi trực tiếp cùng đội ngũ tư vấn Nếp Việt; gửi yêu cầu gói quà theo phong cách truyền thống hoặc giải đáp thông tin sản phẩm.',
                  qrUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https%3A%2F%2Fzalo.me%2Fnepviet',
                  type: 'zalo',
                })}
                className="group p-5 rounded-2xl bg-[#221A17] hover:bg-[#2A201C] border border-[#382B26] hover:border-blue-500/60 hover:shadow-2xl transition-all cursor-pointer flex flex-col items-center text-center text-[#EDE4D8]"
              >
                <div className="w-full flex items-center justify-between text-[11px] mb-3">
                  <span className="px-2 py-0.5 rounded-full bg-blue-950/60 text-blue-300 font-bold border border-blue-800/40">Zalo OA</span>
                  <span className="text-stone-400 group-hover:text-blue-400 transition-colors flex items-center gap-0.5">
                    Nhắn tin <ChevronRight className="w-3 h-3" />
                  </span>
                </div>

                <div className="relative w-40 h-40 bg-white rounded-xl p-2 shadow-sm border border-[#382B26] group-hover:scale-105 transition-all flex items-center justify-center">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https%3A%2F%2Fzalo.me%2Fnepviet"
                    alt="Zalo Nếp Việt QR"
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>

                <h3 className="font-headline font-bold text-sm text-white mt-4 group-hover:text-blue-400 transition-colors">
                  Zalo Tư Vấn & Hotline
                </h3>
                <p className="text-[11px] text-[#A89C90] mt-1 line-clamp-2">
                  Tư vấn quà tặng, yêu cầu gói thiệp truyền thống & hỗ trợ đổi trả 1:1.
                </p>

                <div className="mt-4 pt-3 border-t border-[#382B26] w-full">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400">
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Trò chuyện trực tiếp</span>
                  </span>
                </div>
              </div>

              {/* Card 4: OCOP & Traceability */}
              <div
                onClick={() => setActiveQrModal({
                  id: 'ocop',
                  title: 'Tem Điện Tử Truy Xuất Nguồn Gốc Di Sản',
                  badge: 'Chứng Nhận Chất Lượng',
                  description: 'Mỗi sản phẩm Nếp Việt đều được cấp mã định danh điện tử gắn kèm tem để tra cứu thông tin xuất xứ và giá trị văn hóa.',
                  qrUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https%3A%2F%2Fnepviet.vercel.app%2Fvan-hoa',
                  type: 'ocop',
                })}
                className="group p-5 rounded-2xl bg-[#221A17] hover:bg-[#2A201C] border border-[#382B26] hover:border-emerald-500/60 hover:shadow-2xl transition-all cursor-pointer flex flex-col items-center text-center text-[#EDE4D8]"
              >
                <div className="w-full flex items-center justify-between text-[11px] mb-3">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-950/60 text-emerald-300 font-bold border border-emerald-800/40">Di Sản Việt</span>
                  <span className="text-stone-400 group-hover:text-emerald-400 transition-colors flex items-center gap-0.5">
                    Tra cứu <ChevronRight className="w-3 h-3" />
                  </span>
                </div>

                <div className="relative w-40 h-40 bg-white rounded-xl p-2 shadow-sm border border-[#382B26] group-hover:scale-105 transition-all flex items-center justify-center">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https%3A%2F%2Fnepviet.vercel.app%2Fvan-hoa"
                    alt="Truy xuất di sản QR"
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>

                <h3 className="font-headline font-bold text-sm text-white mt-4 group-hover:text-emerald-400 transition-colors">
                  Truy Xuất Nguồn Gốc Di Sản
                </h3>
                <p className="text-[11px] text-[#A89C90] mt-1 line-clamp-2">
                  Xác thực thông tin xuất xứ và nét đặc trưng văn hóa của từng sản phẩm.
                </p>

                <div className="mt-4 pt-3 border-t border-[#382B26] w-full">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Kiểm chứng xuất xứ</span>
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* QR MODAL PREVIEW & BANK TRANSFER TESTING */}
      {activeQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-stone-200 shadow-2xl relative space-y-6">
            <button
              type="button"
              onClick={() => setActiveQrModal(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-800 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div>
              <span className="text-[11px] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full bg-nepred-100 text-nepred-800">
                {activeQrModal.badge}
              </span>
              <h3 className="font-serif font-bold text-xl text-stone-900 mt-2">
                {activeQrModal.title}
              </h3>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                {activeQrModal.description}
              </p>
            </div>

            {/* QR Content */}
            {activeQrModal.type === 'vietqr' ? (
              <div className="space-y-4">
                {/* Bank Selector */}
                <div>
                  <label className="block text-[11px] font-bold text-stone-600 mb-1.5">
                    Chọn ngân hàng chuyển khoản mẫu:
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {(['MB', 'VCB', 'TCB', 'TPB'] as const).map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setSelectedBank(b)}
                        className={`py-2 px-1 text-center rounded-xl border text-xs font-bold transition-all ${
                          selectedBank === b
                            ? 'border-nepred-600 bg-nepred-50 text-nepred-700 shadow-sm'
                            : 'border-stone-200 hover:bg-stone-50 text-stone-600'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amount Selector */}
                <div>
                  <label className="block text-[11px] font-bold text-stone-600 mb-1.5">
                    Số tiền mẫu chuyển khoản:
                  </label>
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    {[50000, 100000, 250000, 500000].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setSampleAmount(amt)}
                        className={`py-1.5 px-1 rounded-lg border text-center font-mono font-bold transition-all ${
                          sampleAmount === amt
                            ? 'border-nepgreen-700 bg-nepgreen-50 text-nepgreen-800'
                            : 'border-stone-200 hover:bg-stone-50 text-stone-600'
                        }`}
                      >
                        {amt.toLocaleString('vi-VN')}đ
                      </button>
                    ))}
                  </div>
                </div>

                {/* Live QR Image Box */}
                <div className="p-4 rounded-2xl bg-cream-50 border border-cream-200 flex flex-col items-center">
                  <div className="w-52 h-52 bg-white rounded-2xl p-2.5 shadow-md border border-cream-300">
                    <img
                      src={getVietQrUrl(selectedBank, sampleAmount)}
                      alt="Mã VietQR"
                      className="w-full h-full object-contain rounded-xl"
                    />
                  </div>
                  <p className="text-[11px] text-stone-500 mt-2 text-center">
                    Quét tự động điền: <strong>{BANK_LIST[selectedBank].name}</strong> • STK: <strong>{BANK_LIST[selectedBank].acc}</strong>
                  </p>
                </div>

                {/* Copy info buttons */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(BANK_LIST[selectedBank].acc);
                      setCopiedAcc(true);
                      setTimeout(() => setCopiedAcc(false), 2000);
                    }}
                    className="py-2.5 px-3 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 font-semibold text-stone-700 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    {copiedAcc ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedAcc ? 'Đã sao chép STK' : 'Sao chép STK'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText('NEPVIET DISAN');
                      setCopiedMemo(true);
                      setTimeout(() => setCopiedMemo(false), 2000);
                    }}
                    className="py-2.5 px-3 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 font-semibold text-stone-700 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    {copiedMemo ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedMemo ? 'Đã sao chép nội dung' : 'Sao chép cú pháp'}</span>
                  </button>
                </div>

                <div className="pt-2">
                  <Link
                    href="/thanh-toan"
                    className="w-full py-3 rounded-xl bg-nepred-600 hover:bg-nepred-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-nepred-600/20 transition-all"
                  >
                    <span>Trải nghiệm luồng thanh toán đơn hàng thực tế</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-6 rounded-2xl bg-cream-50 border border-cream-200 flex flex-col items-center">
                  <div className="w-56 h-56 bg-white rounded-2xl p-3 shadow-md border border-cream-300">
                    <img
                      src={activeQrModal.qrUrl}
                      alt={activeQrModal.title}
                      className="w-full h-full object-contain rounded-xl"
                    />
                  </div>
                  <p className="text-xs text-stone-600 mt-3 text-center">
                    Mở camera trên điện thoại iPhone hoặc Android để quét mã trực tiếp
                  </p>
                  <p className="text-[11px] font-mono font-semibold text-nepred-600 mt-1">
                    {activeQrModal.type === 'ocop' ? 'https://nepviet.vercel.app/van-hoa' : activeQrModal.type === 'app' ? 'https://nepviet.vercel.app/' : 'https://zalo.me/nepviet'}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveQrModal(null)}
                    className="flex-1 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs text-center transition-colors"
                  >
                    Đóng cửa sổ
                  </button>
                  <a
                    href={activeQrModal.type === 'ocop' ? 'https://nepviet.vercel.app/van-hoa' : activeQrModal.type === 'app' ? 'https://nepviet.vercel.app/' : 'https://zalo.me/nepviet'}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-3 rounded-xl bg-cream-200 hover:bg-cream-300 text-stone-800 font-bold text-xs text-center transition-colors flex items-center justify-center gap-1"
                  >
                    <span>Mở liên kết ngay</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
