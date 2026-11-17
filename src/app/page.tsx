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
} from 'lucide-react';

export default function HomePage() {
  const featuredProducts = PRODUCTS.filter((p) => p.isFeatured).slice(0, 8);

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* 1. HERO BANNER SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-cream-100 via-cream-50 to-[#FAF8F5] pt-8 sm:pt-14 pb-16 sm:pb-24 border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-nepred-50 border border-nepred-100 text-nepred-700 text-xs font-semibold tracking-wide shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-nepred-600" />
                <span>Nền tảng quà tặng thủ công & di sản văn hóa Việt Nam</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-nepbrown-800 tracking-tight leading-[1.15]">
                Gìn giữ <span className="text-nepred-600 underline decoration-nepgold-500 decoration-wavy decoration-2 underline-offset-8">nếp xưa</span>, thêu dệt nhịp sống trẻ
              </h1>

              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Nếp Việt mang đến những sản phẩm thủ công tinh xảo, quà tặng văn hóa và phong vị ẩm thực cổ truyền từ các làng nghề Việt Nam. Tỉ mỉ từ bàn tay nghệ nhân, ấm áp và gần gũi với phong cách sống đương đại của người trẻ.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/san-pham"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-nepred-600 hover:bg-nepred-700 text-white font-semibold text-sm shadow-lg shadow-nepred-600/25 hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Khám phá sản phẩm</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/van-hoa"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white hover:bg-cream-100 border border-cream-300 text-nepbrown-800 font-semibold text-sm shadow-sm transition-all"
                >
                  <Compass className="w-4 h-4 text-nepgreen-700" />
                  <span>Văn hóa & Làng nghề</span>
                </Link>
              </div>

              {/* Stats Highlights */}
              <div className="pt-6 border-t border-cream-200/80 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
                <div>
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-nepbrown-800">100%</p>
                  <p className="text-xs text-neutral-500">Thủ công bản địa</p>
                </div>
                <div>
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-nepred-600">15+</p>
                  <p className="text-xs text-neutral-500">Làng nghề kết nối</p>
                </div>
                <div>
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-nepgreen-700">4.9/5</p>
                  <p className="text-xs text-neutral-500">Hài lòng từ giới trẻ</p>
                </div>
              </div>
            </div>

            {/* Right Visual - Arch Showcase inspired by wireframe */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md">
                {/* Decorative background shape */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-nepgold-100/60 to-nepred-100/40 rounded-3xl transform -rotate-2 -z-10" />
                
                {/* Traditional Vietnamese Arch Window */}
                <div className="relative overflow-hidden arch-card bg-cream-200 shadow-2xl border-4 border-white aspect-[4/5] w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1000&q=85"
                    alt="Gốm sứ Bát Tràng Nếp Việt"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover object-center"
                  />
                  {/* Floating Cultural Badge */}
                  <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-white/95 backdrop-blur-md shadow-lg border border-cream-200 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-nepred-600">
                        Di sản đương đại
                      </span>
                      <p className="text-xs sm:text-sm font-serif font-bold text-nepbrown-800">
                        Gốm Bát Tràng & Mây tre Phú Vinh
                      </p>
                    </div>
                    <span className="w-8 h-8 rounded-full bg-cream-100 text-nepgreen-700 flex items-center justify-center flex-shrink-0">
                      <Heart className="w-4 h-4 fill-nepred-600 text-nepred-600" />
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. FEATURED CATEGORIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-nepgreen-700 mb-1">
              <Sparkles className="w-3.5 h-3.5" /> Bộ sưu tập đặc sắc
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-black text-nepbrown-800">
              Danh Mục Sản Phẩm Nổi Bật
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-2 max-w-xl">
              Được tuyển chọn theo 5 dòng sản phẩm thủ công đặc trưng, phù hợp làm quà tặng ý nghĩa và bài trí góc sống thanh lịch.
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
              className="group relative overflow-hidden rounded-2xl bg-white border border-cream-200 shadow-sm hover:shadow-xl hover:border-nepred-600/40 transition-all duration-300 flex flex-col"
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
                    {category.itemCount} sản phẩm
                  </span>
                </div>
              </div>
              <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
                <h3 className="font-serif font-bold text-xs sm:text-sm text-nepbrown-800 group-hover:text-nepred-600 transition-colors line-clamp-1">
                  {category.name}
                </h3>
                <p className="text-[11px] text-neutral-500 line-clamp-2 mt-1 leading-relaxed">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-nepred-600 mb-1">
              <Flame className="w-3.5 h-3.5 fill-nepred-600" /> Tinh hoa chọn lọc
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-black text-nepbrown-800">
              Sản Phẩm Thủ Công Tiêu Biểu
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-2 max-w-xl">
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

      {/* 4. CULTURAL STORY & ARTISAN SECTION (ARCH SHAPED AS IN WIREFRAME) */}
      <section className="bg-cream-100/70 border-y border-cream-200 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-nepgreen-100 text-nepgreen-800 text-xs font-semibold">
                <Award className="w-3.5 h-3.5 text-nepgreen-700" />
                <span>Hồn cốt di sản & Bàn tay tài hoa</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-4xl font-black text-nepbrown-800 leading-snug">
                Mỗi món đồ thủ công là một câu chuyện cần được kể
              </h2>

              <div className="space-y-4 text-sm text-neutral-600 leading-relaxed">
                <p>
                  Giữa nhịp sống số hối hả, Nếp Việt ra đời từ trăn trở của những người trẻ: Làm sao để các làng nghề gốm sứ Bát Tràng, mây tre Phú Vinh, tranh dân gian Đông Hồ hay lụa tơ tằm Vạn Phúc không chỉ dừng lại ở ký ức xưa cũ, mà trở thành một phần thân thuộc trong cuộc sống hiện đại?
                </p>
                <p>
                  Chúng tôi trực tiếp làm việc cùng các xưởng thủ công gia đình, trân trọng từng đường kim, nét vẽ, giọt men hoả biến. Mỗi đơn hàng của bạn không chỉ mang về một món đồ tinh tế, mà còn góp phần gìn giữ ngọn lửa nghề cho thế hệ sau.
                </p>
              </div>

              {/* Craft village quick chips */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                {CRAFT_VILLAGES.slice(0, 3).map((v) => (
                  <div key={v.id} className="p-3 bg-white rounded-xl border border-cream-200">
                    <p className="font-serif font-bold text-xs text-nepbrown-800">{v.name}</p>
                    <p className="text-[11px] text-neutral-500 mt-0.5">{v.location}</p>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  href="/van-hoa"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-nepgreen-800 hover:bg-nepgreen-900 text-white font-semibold text-xs shadow-md transition-all"
                >
                  <span>Khám phá các làng nghề Việt Nam</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. STUDENT & YOUTH CALLOUT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-nepbrown-800 to-nepbrown-700 text-white p-8 sm:p-12 shadow-xl border border-nepbrown-600 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="px-3 py-1 bg-nepred-600 text-white text-[11px] font-bold rounded-full uppercase tracking-wider inline-block">
              Ưu đãi bạn trẻ & Sinh viên
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-black text-cream-50">
              Nhận ngay giảm 10% cho đơn hàng đầu tiên
            </h3>
            <p className="text-xs sm:text-sm text-cream-200 leading-relaxed">
              Nhập mã <span className="font-mono font-bold text-amber-300 bg-nepbrown-900/80 px-2 py-0.5 rounded">NEPVIET10</span> tại bước thanh toán để chung tay lan tỏa vẻ đẹp thủ công truyền thống.
            </p>
          </div>
          <Link
            href="/san-pham"
            className="px-8 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-nepbrown-900 font-bold text-xs sm:text-sm shadow-lg whitespace-nowrap transition-transform hover:scale-105 active:scale-95"
          >
            Mua sắm ngay bây giờ
          </Link>
        </div>
      </section>
    </div>
  );
}
