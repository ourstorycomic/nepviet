'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS, CATEGORIES, CRAFT_VILLAGES } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import {
  ArrowRight,
  Sparkles,
  Award,
  ShieldCheck,
  Compass,
  Heart,
  ChevronRight,
  Flame,
  Star,
  CheckCircle2,
  Clock,
  Truck,
  Layers,
  ChevronLeft,
} from 'lucide-react';

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: 'Gìn giữ nếp xưa, thêu dệt nhịp sống trẻ',
      subtitle: 'Tôn vinh tinh hoa gốm Bát Tràng, mây tre Phú Vinh và lụa Vạn Phúc trong không gian sống hiện đại.',
      image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1600&q=85',
      badge: 'Bộ Sưu Tập Mới 2026',
      ctaText: 'Khám phá sản phẩm ngay',
      ctaLink: '/san-pham',
    },
    {
      title: 'Mộc mạc mây tre, tinh tế hồn quê Việt',
      subtitle: 'Từng đường nan tre già được chuốt mỏng như sợi tơ bởi bàn tay tài hoa của nghệ nhân Phú Vinh.',
      image: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=1600&q=85',
      badge: 'Thủ Công Mỹ Nghệ Tuyển Chọn',
      ctaText: 'Xem bộ sưu tập mây tre',
      ctaLink: '/san-pham?category=may-tre',
    },
    {
      title: 'Tranh Đông Hồ & Đồ chơi ký ức dân gian',
      subtitle: 'Sắc điệp lấp lánh và nét vẽ tay chú Tễu đưa người trẻ trở về với những miền ký ức trong trẻo.',
      image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1600&q=85',
      badge: 'Di Sản Văn Hóa Quốc Gia',
      ctaText: 'Khám phá quà tặng dân gian',
      ctaLink: '/san-pham?category=do-choi-qua-tang',
    },
  ];

  const featuredProducts = PRODUCTS.filter((p) => p.isFeatured).slice(0, 4);

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
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
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
              <div className="w-20 h-20 rounded-2xl bg-nepred-600 border border-nepgold-400/40 flex items-center justify-center font-serif text-3xl font-bold shadow-inner mb-3">
                NV
              </div>
              <h3 className="font-serif text-xl font-bold tracking-wider text-cream-50">NẾP VIỆT</h3>
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
                { name: 'Gốm Sứ Bát Tràng', slug: 'gom-su', desc: 'Men lam, men hoả biến nung củi', img: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=600&q=80' },
                { name: 'Mây Tre Đan Phú Vinh', slug: 'may-tre', desc: 'Chuốt nan tre già đan khít', img: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=600&q=80' },
                { name: 'Quà Tặng & Đồ Chơi Dân Gian', slug: 'do-choi-qua-tang', desc: 'Mặt nạ giấy bồi, tò he bột nếp', img: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80' },
                { name: 'Lụa Tơ Tằm Vạn Phúc', slug: 'phu-kien-thoi-trang', desc: 'Dệt hoa văn vân mây cổ điển', img: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=600&q=80' },
                { name: 'Tranh Dân Gian Đông Hồ', slug: 'do-choi-qua-tang', desc: 'Bản khắc gỗ in trên giấy điệp', img: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80' },
                { name: 'Ẩm Thực & Trà Cổ Truyền', slug: 'am-thuc', desc: 'Trà sen Quảng Bá, bánh cốm dẻo', img: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80' },
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
                src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=85"
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
                  <span className="font-serif text-lg font-bold text-amber-300">320.000đ</span>
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
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-nepred-600 mb-1">
              <Flame className="w-3.5 h-3.5 fill-nepred-600" /> Sản phẩm tiêu biểu
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
            <ChevronRight className="w-4 h-4" />
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
          <div className="bg-white p-6 rounded-2xl border border-cream-200 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-nepred-50 text-nepred-600 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base text-stone-900 mb-1">100% Thủ Công Bản Địa</h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                Từng sản phẩm kết tinh từ bàn tay nghệ nhân tại các làng nghề truyền thống lâu đời trên đất nước Việt Nam.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-cream-200 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-nepgreen-50 text-nepgreen-700 flex items-center justify-center flex-shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base text-stone-900 mb-1">Đóng Gói Chống Vỡ An Toàn</h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                Quy chuẩn đóng gói nhiều lớp mút đệm và hộp carton cứng chuyên dụng cho đồ gốm sứ thủ công dễ vỡ.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-cream-200 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base text-stone-900 mb-1">Đổi Mới Trong 7 Ngày</h4>
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
                    src="https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=1000&q=85"
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

    </div>
  );
}
