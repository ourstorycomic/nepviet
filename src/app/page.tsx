'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CATEGORIES, CRAFT_VILLAGES } from '@/data/products';
import { useProducts } from '@/utils/productsCatalog';
import { ProductCard } from '@/components/ProductCard';
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
      ctaText: 'Xem bộ sưu tập mây tre',
      ctaLink: '/san-pham?category=may-tre',
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
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 4);

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

                  <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-cream-50 leading-[1.18] tracking-tight">
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

      {/* 2. BRAND INTRODUCTION BLOCK (WIREFRAME BLOCK 2: LOGO/SEAL LEFT + TEXT RIGHT) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-cream-200/90 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Emblem / Image */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-3xl bg-gradient-to-br from-nepbrown-800 via-nepbrown-700 to-stone-900 p-6 shadow-xl border-2 border-nepgold-500/30 flex flex-col items-center justify-center text-center text-white">
              <div className="w-20 h-20 rounded-2xl bg-nepred-600 border border-nepgold-400/40 flex items-center justify-center font-han text-4xl font-bold shadow-inner mb-3 select-none">
                越
              </div>
              <div className="flex items-center gap-1.5 justify-center">
                <h3 className="font-serif text-xl font-bold tracking-wider text-cream-50">NẾP VIỆT</h3>
                <span className="font-han text-base font-bold text-amber-300">惗越</span>
              </div>
              <p className="text-[11px] uppercase tracking-widest text-nepgold-400 mt-1 font-semibold">
                Thương hiệu Di sản Thủ công
              </p>
              <div className="mt-3 pt-3 border-t border-white/20 text-[10px] text-cream-300">
                Gia Lâm • Chương Mỹ • Hà Đông • Bắc Ninh
              </div>
            </div>
          </div>

          {/* Right Text - Story & Vision */}
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-nepred-50 text-nepred-700 text-xs font-bold uppercase tracking-wider">
              Về thương hiệu Nếp Việt
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-snug">
              Hành trình đưa tinh hoa làng nghề trở lại nhịp sống đương đại
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Nếp Việt được hình thành với sứ mệnh tôn vinh nét đẹp thủ công mỹ nghệ và ẩm thực truyền thống Việt Nam. Chúng tôi tin rằng mỗi chiếc bình gốm vuốt tay, từng chiếc khay mây nan mịn hay bức tranh Đông Hồ in mộc bản không chỉ là một sản phẩm, mà là sự hội tụ của đất, nước, lửa và tâm huyết bền bỉ qua nhiều thế hệ nghệ nhân.
            </p>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Dành riêng cho những người trẻ yêu di sản, Nếp Việt mang đến trải nghiệm mua sắm trực tuyến minh bạch, chuẩn hóa quy cách đóng gói chống vỡ và mức giá dễ tiếp cận, giúp lan tỏa niềm tự hào bản địa đến muôn nơi.
            </p>
            <div className="pt-2 flex items-center gap-6 text-xs text-stone-500 font-medium">
              <span className="flex items-center gap-1.5 text-stone-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 100% Nguồn gốc bản địa
              </span>
              <span className="flex items-center gap-1.5 text-stone-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Bọc hàng chuẩn làng nghề
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 3. SIGNATURE 6 + 1 DARK GRID SECTION (EXACTLY AS IN WIREFRAME BLOCK 3) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-900 rounded-3xl p-6 sm:p-10 border border-stone-800 text-white shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 pb-4 border-b border-stone-800">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-nepgold-400">
                Không gian trưng bày
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-cream-50 mt-1">
                Bộ Sưu Tập Làng Nghề Tuyển Chọn
              </h2>
            </div>
            <Link
              href="/san-pham"
              className="text-xs font-semibold text-amber-300 hover:text-white flex items-center gap-1"
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
                { name: 'Gốm Sứ Bát Tràng', slug: 'gom-su', desc: 'Men lam, men hoả biến nung củi', img: '/showcase/gom-su-bat-trang.png' },
                { name: 'Mây Tre Đan Phú Vinh', slug: 'may-tre', desc: 'Chuốt nan tre già đan khít', img: '/showcase/may-tre-dan-phu-vinh.webp' },
                { name: 'Quà Tặng & Đồ Chơi Dân Gian', slug: 'do-choi-qua-tang', desc: 'Mặt nạ giấy bồi, tò he bột nếp', img: '/showcase/qua-tang-do-choi-dan-gian.webp' },
                { name: 'Lụa Tơ Tằm Vạn Phúc', slug: 'phu-kien-thoi-trang', desc: 'Dệt hoa văn vân mây cổ điển', img: '/showcase/lua-to-tam-van-phuc.jpg' },
                { name: 'Tranh Dân Gian Đông Hồ', slug: 'do-choi-qua-tang', desc: 'Bản khắc gỗ in trên giấy điệp', img: '/showcase/tranh-dan-gian-dong-ho.jpg' },
                { name: 'Ẩm Thực & Trà Cổ Truyền', slug: 'am-thuc', desc: 'Trà sen Quảng Bá, bánh cốm dẻo', img: '/showcase/am-thuc-tra-co-truyen.jpg' },
              ].map((cat, i) => (
                <Link
                  key={i}
                  href={`/san-pham?category=${cat.slug}`}
                  className="group relative overflow-hidden rounded-2xl bg-stone-800 border border-stone-700 hover:border-nepgold-500 transition-all p-3.5 flex items-center gap-3.5 shadow-sm"
                >
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-stone-900 flex-shrink-0">
                    <Image
                      src={cat.img}
                      alt={cat.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-serif font-bold text-xs sm:text-sm text-cream-50 group-hover:text-amber-300 transition-colors truncate">
                      {cat.name}
                    </h4>
                    <p className="text-[11px] text-stone-400 truncate mt-0.5">{cat.desc}</p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Right Large Spotlight Card (5 cols) */}
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden bg-stone-800 border border-stone-700 min-h-[300px] flex flex-col justify-end p-6 group">
              <Image
                src="/products/bo-am-chen-men-lam-bat-trang.jpg"
                alt="Bộ sưu tập Tiêu Điểm Nếp Việt"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-[0.7]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              <div className="relative z-10 space-y-3">
                <span className="px-3 py-1 bg-nepred-600 text-white text-[10px] font-bold uppercase tracking-wider rounded-md inline-block">
                  Tiêu điểm tuần này
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  Bộ Ấm Chén Men Lam Dáng Trúc Bát Tràng
                </h3>
                <p className="text-xs text-cream-200 line-clamp-2">
                  Đất cao lanh tuyển chọn nung ở 1.300°C, họa tiết nhành trúc thanh tao vẽ tay từ mực lam cổ truyền.
                </p>
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-lg font-bold text-amber-300 price-tag">320.000đ</span>
                  <Link
                    href="/san-pham/bo-am-chen-men-lam-bat-trang"
                    className="px-4 py-2 bg-white text-stone-900 rounded-xl text-xs font-bold hover:bg-cream-100 transition-colors"
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
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-nepred-700 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-nepred-600" />
              <span>Sản phẩm tiêu biểu tuyển chọn</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              Được Giới Trẻ Yêu Thích Nhất
            </h2>
          </div>
          <Link
            href="/san-pham"
            className="text-xs font-bold text-nepred-600 hover:text-nepred-700 flex items-center gap-1"
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
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-nepred-700 via-nepred-600 to-nepbrown-800 text-white p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-nepgold-500/20">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-[11px] font-bold uppercase tracking-widest text-amber-300">
              Ưu Đãi Đặc Biệt Cho Sinh Viên
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
              Giảm ngay 10% đơn hàng đầu tiên với mã <span className="font-mono bg-black/30 px-2 py-0.5 rounded text-amber-300 border border-amber-300/30">NEPVIET10</span>
            </h3>
            <p className="text-xs text-cream-200">
              Miễn phí giao hàng toàn quốc cho mọi đơn hàng giá trị từ 300.000đ trở lên.
            </p>
          </div>
          <Link
            href="/san-pham"
            className="px-7 py-3.5 bg-amber-400 hover:bg-amber-300 text-stone-900 font-bold text-xs rounded-xl shadow-lg whitespace-nowrap transition-transform hover:scale-105 active:scale-95"
          >
            Nhận ưu đãi ngay
          </Link>
        </div>
      </section>

      {/* 6. 3 CORE VALUE CARDS (WIREFRAME BLOCK 6: 3 BOXES) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-cream-200 shadow-sm flex items-start gap-4 group hover:border-nepgold-500/40 transition-colors">
            <div className="w-11 h-11 rounded-2xl bg-stone-100/90 border border-stone-200/80 text-stone-800 flex items-center justify-center flex-shrink-0 shadow-2xs group-hover:bg-nepred-50 group-hover:text-nepred-600 group-hover:border-nepred-200 transition-colors">
              <Gem className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base text-stone-900 mb-1">100% Thủ Công Bản Địa</h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                Từng sản phẩm kết tinh từ bàn tay nghệ nhân tại các làng nghề truyền thống lâu đời trên đất nước Việt Nam.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-cream-200 shadow-sm flex items-start gap-4 group hover:border-nepgold-500/40 transition-colors">
            <div className="w-11 h-11 rounded-2xl bg-stone-100/90 border border-stone-200/80 text-stone-800 flex items-center justify-center flex-shrink-0 shadow-2xs group-hover:bg-nepgreen-50 group-hover:text-nepgreen-700 group-hover:border-nepgreen-200 transition-colors">
              <PackageCheck className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base text-stone-900 mb-1">Đóng Gói Chống Vỡ An Toàn</h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                Quy chuẩn đóng gói nhiều lớp mút đệm và hộp carton cứng chuyên dụng cho đồ gốm sứ thủ công dễ vỡ.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-cream-200 shadow-sm flex items-start gap-4 group hover:border-nepgold-500/40 transition-colors">
            <div className="w-11 h-11 rounded-2xl bg-stone-100/90 border border-stone-200/80 text-stone-800 flex items-center justify-center flex-shrink-0 shadow-2xs group-hover:bg-amber-50 group-hover:text-amber-800 group-hover:border-amber-200 transition-colors">
              <RotateCcw className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base text-stone-900 mb-1">Đồng Kiểm & Đổi Mới 7 Ngày</h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                Đồng kiểm hàng khi nhận, hoàn tiền 100% hoặc đổi sản phẩm mới nếu có bất kỳ hư hại nào từ quá trình vận chuyển.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. ARCH STORY SECTION (WIREFRAME BLOCK 7: ARCH IMAGE LEFT + STORY RIGHT) */}
      <section className="bg-cream-100/70 border-y border-cream-200/90 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Traditional Arch Image */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="arch-card overflow-hidden shadow-2xl border-4 border-white aspect-[3/4] relative bg-stone-900">
                  <Image
                    src="/showcase/nghe-nhan-lang-nghe-viet.jpg"
                    alt="Nghệ nhân mây tre đan Phú Vinh Nếp Việt"
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent flex items-end p-6">
                    <div className="text-white">
                      <p className="font-serif text-lg font-bold">Nghệ nhân làng nghề Việt</p>
                      <p className="text-xs text-cream-200 mt-1">Hơn 40 năm gắn bó với từng đường nan tre, nhành lụa</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Cultural Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-nepgreen-100 text-nepgreen-900 text-xs font-semibold">
                <Award className="w-3.5 h-3.5 text-nepgreen-800" />
                <span>Hồn cốt di sản & Bàn tay tài hoa</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-stone-900 leading-snug">
                Mỗi món đồ thủ công là một câu chuyện cần được kể
              </h2>

              <div className="space-y-4 text-sm text-stone-600 leading-relaxed">
                <p>
                  Giữa nhịp sống số hối hả, Nếp Việt ra đời từ tâm huyết của những người trẻ: Làm sao để các làng nghề gốm sứ Bát Tràng, mây tre Phú Vinh, tranh dân gian Đông Hồ hay lụa tơ tằm Vạn Phúc không chỉ dừng lại ở ký ức xưa cũ, mà trở thành một phần thân thuộc trong cuộc sống hiện đại?
                </p>
                <p>
                  Chúng tôi trực tiếp làm việc cùng các xưởng thủ công gia đình, trân trọng từng đường kim, nét vẽ, giọt men hoả biến. Mỗi đơn hàng của bạn không chỉ mang về một món đồ tinh tế, mà còn góp phần gìn giữ ngọn lửa nghề cho thế hệ sau.
                </p>
              </div>

              {/* Craft village quick chips */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                {CRAFT_VILLAGES.slice(0, 3).map((v) => (
                  <div key={v.id} className="p-3.5 bg-white rounded-xl border border-cream-200/90 shadow-sm">
                    <p className="font-serif font-bold text-xs text-stone-900">{v.name}</p>
                    <p className="text-[11px] text-stone-500 mt-0.5">{v.location}</p>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  href="/van-hoa"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-nepgreen-800 hover:bg-nepgreen-900 text-white font-semibold text-xs shadow-md transition-all"
                >
                  <span>Khám phá các làng nghề Việt Nam</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. KHÔNG GIAN SỐ & MÃ QR DI SẢN (THEO SƠ ĐỒ WIREFRAME DỰ ÁN) */}
      <section className="py-16 bg-cream-50/60 border-b border-cream-200/90 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-cream-200/80 shadow-xl shadow-stone-200/40 relative">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-cream-200">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-nepred-50 text-nepred-700 text-xs font-bold border border-nepred-200">
                  <QrCode className="w-3.5 h-3.5" />
                  <span>Cổng Kết Nối Số & Truy Xuất Di Sản</span>
                </div>
                <h2 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900">
                  Quét Mã QR Tiện Ích Nếp Việt
                </h2>
                <p className="text-xs sm:text-sm text-stone-500 max-w-xl">
                  Theo chuẩn thiết kế đa kênh, bạn có thể quét nhanh bằng ứng dụng ngân hàng hoặc camera điện thoại để trải nghiệm dịch vụ di sản.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-stone-400 italic">4 Cổng mã chuẩn hóa theo Wireframe</span>
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
                className="group p-5 rounded-2xl bg-cream-50/50 hover:bg-white border border-cream-200 hover:border-nepred-500 hover:shadow-lg transition-all cursor-pointer flex flex-col items-center text-center"
              >
                <div className="w-full flex items-center justify-between text-[11px] mb-3">
                  <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold">Napas 247</span>
                  <span className="text-stone-400 group-hover:text-nepred-600 transition-colors flex items-center gap-0.5">
                    Quét thử <ChevronRight className="w-3 h-3" />
                  </span>
                </div>

                <div className="relative w-40 h-40 bg-white rounded-xl p-2 shadow-sm border border-cream-300 group-hover:border-nepred-400 group-hover:scale-105 transition-all flex items-center justify-center">
                  <img
                    src="https://img.vietqr.io/image/MB-0968999888-compact2.png?amount=100000&addInfo=NEPVIET%20DISAN&accountName=CONG%20TY%20TNHH%20NEP%20VIET"
                    alt="VietQR Nếp Việt"
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>

                <h3 className="font-serif font-bold text-sm text-stone-900 mt-4 group-hover:text-nepred-600 transition-colors">
                  VietQR Chuyển Khoản 24/7
                </h3>
                <p className="text-[11px] text-stone-500 mt-1 line-clamp-2">
                  Quét chuyển khoản siêu tốc qua MB, Vietcombank, Techcombank, TPBank.
                </p>

                <div className="mt-4 pt-3 border-t border-cream-200/80 w-full">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-nepred-600">
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
                className="group p-5 rounded-2xl bg-cream-50/50 hover:bg-white border border-cream-200 hover:border-nepgold-500 hover:shadow-lg transition-all cursor-pointer flex flex-col items-center text-center"
              >
                <div className="w-full flex items-center justify-between text-[11px] mb-3">
                  <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold">App Di Sản</span>
                  <span className="text-stone-400 group-hover:text-nepgold-600 transition-colors flex items-center gap-0.5">
                    Tải App <ChevronRight className="w-3 h-3" />
                  </span>
                </div>

                <div className="relative w-40 h-40 bg-white rounded-xl p-2 shadow-sm border border-cream-300 group-hover:border-nepgold-400 group-hover:scale-105 transition-all flex items-center justify-center">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https%3A%2F%2Fnepviet.vercel.app%2F"
                    alt="App Nếp Việt QR"
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>

                <h3 className="font-serif font-bold text-sm text-stone-900 mt-4 group-hover:text-nepgold-600 transition-colors">
                  Ứng Dụng Nếp Việt 3D
                </h3>
                <p className="text-[11px] text-stone-500 mt-1 line-clamp-2">
                  Tour làng nghề 3D & gợi ý quà tặng theo ngân sách sinh viên.
                </p>

                <div className="mt-4 pt-3 border-t border-cream-200/80 w-full">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-nepgold-600">
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Tải về điện thoại</span>
                  </span>
                </div>
              </div>

              {/* Card 3: Zalo OA */}
              <div
                onClick={() => setActiveQrModal({
                  id: 'zalo',
                  title: 'Zalo Official Account & Hotline Nghệ Nhân',
                  badge: 'Tư Vấn Trực Tuyến 24/7',
                  description: 'Trao đổi trực tiếp cùng các nghệ nhân Bát Tràng, Đông Hồ; gửi yêu cầu gói quà theo phong cách truyền thống hoặc đặt làm theo mẫu riêng.',
                  qrUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https%3A%2F%2Fzalo.me%2Fnepviet',
                  type: 'zalo',
                })}
                className="group p-5 rounded-2xl bg-cream-50/50 hover:bg-white border border-cream-200 hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer flex flex-col items-center text-center"
              >
                <div className="w-full flex items-center justify-between text-[11px] mb-3">
                  <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold border border-blue-200">Zalo OA</span>
                  <span className="text-stone-400 group-hover:text-blue-600 transition-colors flex items-center gap-0.5">
                    Nhắn tin <ChevronRight className="w-3 h-3" />
                  </span>
                </div>

                <div className="relative w-40 h-40 bg-white rounded-xl p-2 shadow-sm border border-cream-300 group-hover:border-blue-400 group-hover:scale-105 transition-all flex items-center justify-center">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https%3A%2F%2Fzalo.me%2Fnepviet"
                    alt="Zalo Nếp Việt QR"
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>

                <h3 className="font-serif font-bold text-sm text-stone-900 mt-4 group-hover:text-blue-600 transition-colors">
                  Zalo Nghệ Nhân & Hotline
                </h3>
                <p className="text-[11px] text-stone-500 mt-1 line-clamp-2">
                  Tư vấn quà tặng, yêu cầu gói thiệp thủ công & bảo hành đổi trả 1:1.
                </p>

                <div className="mt-4 pt-3 border-t border-cream-200/80 w-full">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600">
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
                  badge: 'Chứng Nhận OCOP 4-5 Sao',
                  description: 'Mỗi sản phẩm Nếp Việt đều được cấp mã định danh điện tử gắn kèm tem chống giả để tra cứu tên nghệ nhân, xưởng chế tác và giấy chứng nhận nguyên liệu.',
                  qrUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https%3A%2F%2Fnepviet.vercel.app%2Fvan-hoa',
                  type: 'ocop',
                })}
                className="group p-5 rounded-2xl bg-cream-50/50 hover:bg-white border border-cream-200 hover:border-nepgreen-600 hover:shadow-lg transition-all cursor-pointer flex flex-col items-center text-center"
              >
                <div className="w-full flex items-center justify-between text-[11px] mb-3">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">OCOP Việt Nam</span>
                  <span className="text-stone-400 group-hover:text-nepgreen-700 transition-colors flex items-center gap-0.5">
                    Tra cứu <ChevronRight className="w-3 h-3" />
                  </span>
                </div>

                <div className="relative w-40 h-40 bg-white rounded-xl p-2 shadow-sm border border-cream-300 group-hover:border-nepgreen-500 group-hover:scale-105 transition-all flex items-center justify-center">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https%3A%2F%2Fnepviet.vercel.app%2Fvan-hoa"
                    alt="Truy xuất di sản QR"
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>

                <h3 className="font-serif font-bold text-sm text-stone-900 mt-4 group-hover:text-nepgreen-700 transition-colors">
                  Truy Xuất Nguồn Gốc Làng Nghề
                </h3>
                <p className="text-[11px] text-stone-500 mt-1 line-clamp-2">
                  Xác thực nguồn gốc gốm Bát Tràng, lụa Vạn Phúc, mây tre Phú Vinh chính hiệu.
                </p>

                <div className="mt-4 pt-3 border-t border-cream-200/80 w-full">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-nepgreen-700">
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
