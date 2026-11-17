import React from 'react';
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
} from 'lucide-react';

export default function HomePage() {
  const featuredProducts = PRODUCTS.filter((p) => p.isFeatured).slice(0, 8);

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 overflow-hidden">
      
      {/* 1. LUXURY ENTERPRISE HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F5EFE6]/80 via-cream-50 to-[#FAF8F5] pt-10 sm:pt-16 pb-16 sm:pb-24 border-b border-cream-200/80">
        
        {/* Subtle patterned background aura */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-nepgold-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/3 left-10 w-80 h-80 bg-nepred-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* National Heritage Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-nepgold-500/30 shadow-sm text-nepbrown-800 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-nepred-600" />
                <span className="text-nepred-700 font-bold uppercase tracking-wider text-[11px]">Nếp Việt</span>
                <span className="text-stone-300">|</span>
                <span className="text-stone-600">Thương hiệu Quà tặng & Thủ công Mỹ nghệ Bản địa</span>
              </div>

              {/* Main Headline - Perfect Vietnamese Typography */}
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-stone-900 tracking-tight leading-[1.18]">
                Gìn giữ <span className="text-nepred-600 font-serif italic">nếp xưa</span>, thêu dệt nhịp sống trẻ
              </h1>

              {/* Refined Subtitle */}
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
                Nếp Việt là điểm chạm kết nối thế hệ trẻ với các tạo tác gốm sứ men lam Bát Tràng, mây tre đan Phú Vinh, lụa tơ tằm Vạn Phúc và nghệ thuật dân gian trăm năm. Tinh tuyển từ bàn tay nghệ nhân ưu tú, chuẩn mực và tinh tế trong từng chi tiết.
              </p>

              {/* Enterprise CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link
                  href="/san-pham"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-nepred-600 hover:bg-nepred-700 text-white font-semibold text-sm shadow-xl shadow-nepred-600/25 hover:shadow-2xl transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Khám phá bộ sưu tập</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/van-hoa"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-white hover:bg-cream-100 border border-cream-300 text-stone-800 font-semibold text-sm shadow-sm transition-all hover:border-nepgold-500"
                >
                  <Compass className="w-4 h-4 text-nepgreen-700" />
                  <span>Hành trình di sản làng nghề</span>
                </Link>
              </div>

              {/* Enterprise Trust Stats */}
              <div className="pt-8 border-t border-cream-200 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
                <div className="space-y-0.5">
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">100%</p>
                  <p className="text-xs text-stone-500 font-medium">Thủ công bản địa</p>
                </div>
                <div className="space-y-0.5">
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-nepred-600">15+</p>
                  <p className="text-xs text-stone-500 font-medium">Làng nghề đối tác</p>
                </div>
                <div className="space-y-0.5">
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-nepgreen-800">4.9 / 5</p>
                  <p className="text-xs text-stone-500 font-medium">10.000+ Khách hàng</p>
                </div>
              </div>
            </div>

            {/* Right Visual - Architectural Arch Showcase */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md">
                
                {/* Decorative border frame */}
                <div className="absolute -inset-3 bg-gradient-to-tr from-nepgold-400/20 via-nepred-600/10 to-nepgreen-700/20 rounded-[38px] transform -rotate-1 -z-10 shadow-xl" />
                
                {/* Traditional Vietnamese Arch Window */}
                <div className="relative overflow-hidden arch-card bg-cream-200 shadow-2xl border-4 border-white aspect-[4/5] w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1000&q=85"
                    alt="Bộ sưu tập Gốm Bát Tràng Nếp Việt"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover object-center hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Subtle vignette gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-black/10" />

                  {/* Floating Certified Badge */}
                  <div className="absolute top-5 right-5 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-cream-200 shadow-md flex items-center gap-1.5 text-[11px] font-bold text-stone-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Chứng nhận làng nghề</span>
                  </div>

                  {/* Floating Craft Card at bottom */}
                  <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl border border-cream-200 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-nepred-600 block">
                        Bộ sưu tập thu đông
                      </span>
                      <p className="text-xs sm:text-sm font-serif font-bold text-stone-900 mt-0.5">
                        Gốm Bát Tràng & Mây Tre Phú Vinh
                      </p>
                      <p className="text-[11px] text-stone-500">Tuyển chọn bởi các nghệ nhân ưu tú</p>
                    </div>
                    <span className="w-9 h-9 rounded-xl bg-nepred-50 text-nepred-600 flex items-center justify-center flex-shrink-0 shadow-inner">
                      <Heart className="w-4 h-4 fill-nepred-600" />
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. MEDIA TRUST & ENDORSEMENT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-6 border border-cream-200/90 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-xs font-bold uppercase tracking-widest text-nepgold-600">Bảo chứng di sản</p>
            <p className="font-serif font-bold text-sm text-stone-900 mt-0.5">
              Đồng hành cùng 15+ hợp tác xã & làng nghề truyền thống Việt Nam
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-serif font-bold text-stone-400">
            <span className="hover:text-stone-700 transition-colors">BÁT TRÀNG</span>
            <span className="hover:text-stone-700 transition-colors">VẠN PHÚC</span>
            <span className="hover:text-stone-700 transition-colors">PHÚ VINH</span>
            <span className="hover:text-stone-700 transition-colors">ĐÔNG HỒ</span>
            <span className="hover:text-stone-700 transition-colors">XUÂN LA</span>
          </div>
        </div>
      </section>

      {/* 3. FEATURED CATEGORIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-nepgreen-800 mb-1">
              <Sparkles className="w-3.5 h-3.5" /> Bộ sưu tập đặc sắc
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-stone-900">
              Danh Mục Sản Phẩm Nổi Bật
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-xl">
              Phân loại khoa học theo 5 dòng sản phẩm thủ công cốt lõi, phù hợp nhu cầu trang trí, sử dụng hàng ngày và làm quà tặng văn hóa.
            </p>
          </div>
          <Link
            href="/san-pham"
            className="inline-flex items-center gap-1 text-xs font-bold text-nepred-600 hover:text-nepred-700 group flex-shrink-0"
          >
            <span>Xem tất cả danh mục</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={`/san-pham?category=${category.slug}`}
              className="group relative overflow-hidden rounded-2xl bg-white border border-cream-200/90 shadow-sm hover:shadow-xl hover:border-nepred-600/40 transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream-100">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 640px) 50vw, 20vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                  <span className="text-[10px] font-medium opacity-90 block">
                    {category.itemCount} sản phẩm tuyển chọn
                  </span>
                </div>
              </div>
              <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
                <h3 className="font-serif font-bold text-xs sm:text-sm text-stone-900 group-hover:text-nepred-600 transition-colors line-clamp-1">
                  {category.name}
                </h3>
                <p className="text-[11px] text-stone-500 line-clamp-2 mt-1 leading-relaxed">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-nepred-600 mb-1">
              <Flame className="w-3.5 h-3.5 fill-nepred-600" /> Tinh hoa chọn lọc
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-stone-900">
              Sản Phẩm Thủ Công Tiêu Biểu
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-xl">
              Các sản phẩm được nhiều bạn trẻ và sinh viên yêu thích nhờ tính thẩm mỹ, giá thành hợp lý và câu chuyện di sản phía sau.
            </p>
          </div>
          <Link
            href="/san-pham"
            className="inline-flex items-center gap-1 text-xs font-bold text-nepred-600 hover:text-nepred-700 group flex-shrink-0"
          >
            <span>Xem thêm sản phẩm</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4-column responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. CULTURAL STORY & ARTISAN SECTION */}
      <section className="bg-cream-100/70 border-y border-cream-200/90 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Arch Image */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="arch-card overflow-hidden shadow-2xl border-4 border-white aspect-[3/4] relative bg-nepbrown-100">
                  <Image
                    src="https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=1000&q=85"
                    alt="Nghệ nhân mây tre đan Phú Vinh"
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent flex items-end p-6">
                    <div className="text-white">
                      <p className="font-serif text-lg font-bold">Nghệ nhân làng nghề Việt</p>
                      <p className="text-xs text-cream-200 mt-1">Hơn 40 năm bền bỉ gìn giữ từng đường nan tre, giọt men màu</p>
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

      {/* 6. VIP / STUDENT CLUB DISCOUNT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-nepbrown-900 via-nepbrown-800 to-nepbrown-900 text-white p-8 sm:p-12 shadow-2xl border border-nepgold-500/20 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="px-3.5 py-1 bg-nepred-600 text-white text-[11px] font-bold rounded-full uppercase tracking-wider inline-block">
              Ưu đãi bạn trẻ & Sinh viên
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-cream-50">
              Nhận ngay giảm 10% cho đơn hàng đầu tiên
            </h3>
            <p className="text-xs sm:text-sm text-cream-200 leading-relaxed">
              Nhập mã ưu đãi <span className="font-mono font-bold text-amber-300 bg-black/40 px-2 py-0.5 rounded border border-amber-300/30">NEPVIET10</span> tại bước thanh toán để chung tay lan tỏa vẻ đẹp thủ công truyền thống.
            </p>
          </div>
          <Link
            href="/san-pham"
            className="px-8 py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-900 font-bold text-xs sm:text-sm shadow-xl whitespace-nowrap transition-transform hover:scale-105 active:scale-95"
          >
            Mua sắm ngay bây giờ
          </Link>
        </div>
      </section>

    </div>
  );
}
