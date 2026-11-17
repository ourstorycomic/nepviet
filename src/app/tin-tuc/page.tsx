'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  Tag,
  BookOpen,
  MapPin,
  Users,
  Compass,
} from 'lucide-react';

const ARTICLES = [
  {
    id: 'hoi-cho-gom-bat-trang-2026',
    title: 'Hội Chợ Triển Lãm Gốm Sứ Bát Tràng 2026: Đánh Thức Dòng Men Hoả Biến',
    category: 'Sự kiện làng nghề',
    date: '15/11/2026',
    readTime: '4 phút đọc',
    image: '/showcase/gom-su-bat-trang.png',
    summary: 'Không gian quy tụ hơn 50 nghệ nhân kỳ cựu và các nhà thiết kế trẻ nhằm hồi sinh những dáng gốm men lam, men rạn cổ trong đời sống đương đại.',
    author: 'Nghệ nhân Phạm Văn Tuấn',
  },
  {
    id: 'tuan-le-lua-to-tam-van-phuc',
    title: 'Tuần Lễ Văn Hóa Lụa Vạn Phúc: Nâng Niêu Sợi Tơ Hồn Dân Tộc',
    category: 'Văn hóa di sản',
    date: '10/11/2026',
    readTime: '5 phút đọc',
    image: '/showcase/lua-to-tam-van-phuc.jpg',
    summary: 'Khám phá kỹ thuật dệt lụa tơ tằm cổ truyền bền đẹp mát lành, nơi từng thoi dệt lách cách giữ trọn tinh túy ngàn năm của đất Hà Đông.',
    author: 'Nếp Việt Cẩm Nang',
  },
  {
    id: 'workshop-trai-nghiem-may-tre',
    title: 'Workshop Trải Nghiệm Chuốt Nan Tre Phú Vinh Cùng Đôi Tay Bạn Trẻ',
    category: 'Hoạt động trải nghiệm',
    date: '05/11/2026',
    readTime: '3 phút đọc',
    image: '/showcase/may-tre-dan-phu-vinh.webp',
    summary: 'Buổi học làm khay trà nan tre và lồng đèn thủ công thu hút đông đảo sinh viên các trường đại học tại Hà Nội đến học nghề và trải nghiệm.',
    author: 'CLB Di Sản Trẻ',
  },
  {
    id: 'hoi-sinh-tranh-dong-ho',
    title: 'Đám Cưới Chuột & Khát Vọng Thổi Hồn Hiện Đại Vào Tranh Đông Hồ',
    category: 'Nghệ nhân & Làng nghề',
    date: '28/10/2026',
    readTime: '6 phút đọc',
    image: '/showcase/tranh-dan-gian-dong-ho.jpg',
    summary: 'Bản khắc gỗ thị, giấy điệp quét vỏ sò óng ánh và màu sắc tự nhiên từ cây cỏ: Hành trình bảo tồn di sản ký ức dân gian bên bờ sông Đuống.',
    author: 'Nghệ nhân Nguyễn Đăng Chế',
  },
  {
    id: 'goi-y-qua-tang-sinh-vien',
    title: 'Gợi Ý 5 Món Quà Thủ Công Độc Bản Vừa Túi Tiền Sinh Viên (100k - 250k)',
    category: 'Cẩm nang quà tặng',
    date: '20/10/2026',
    readTime: '4 phút đọc',
    image: '/showcase/banner-moc-mac-may-tre.jpg',
    summary: 'Từ cốc sứ vẽ tay sen thanh nhã, túi tote họa tiết trống đồng đến hộp bánh cốm Hàng Than: Món quà tinh tế mang trọn hương vị xưa cho người thương.',
    author: 'Ban Biên Tập Nếp Việt',
  },
  {
    id: 'tinh-hoa-am-thuc-tra-co-truyen',
    title: 'Nghệ Thuật Ướp Trà Sen Bách Diệp Tây Hồ: Giữ Hương Mùa Hạ Giữa Mùa Đông',
    category: 'Ẩm thực truyền thống',
    date: '12/10/2026',
    readTime: '5 phút đọc',
    image: '/showcase/am-thuc-tra-co-truyen.jpg',
    summary: 'Từng búp sen trăm cánh hái lúc sớm mai còn đọng sương, ướp cùng trà shan tuyết cổ thụ tạo nên thức uống tao nhã của người Tràng An.',
    author: 'Nghệ nhân Trà Hà Nội',
  },
];

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'Tất cả bài viết' },
    { id: 'Sự kiện làng nghề', name: 'Sự kiện làng nghề' },
    { id: 'Văn hóa di sản', name: 'Văn hóa di sản' },
    { id: 'Hoạt động trải nghiệm', name: 'Workshop trải nghiệm' },
    { id: 'Cẩm nang quà tặng', name: 'Cẩm nang quà tặng' },
  ];

  const filteredArticles = activeCategory === 'all'
    ? ARTICLES
    : ARTICLES.filter(a => a.category === activeCategory);

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-nepred-50 text-nepred-700 text-xs font-bold border border-nepred-200">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Tạp Chí & Dòng Chảy Văn Hóa Nếp Việt</span>
          </div>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-stone-900">
            Tin Tức, Sự Kiện & Câu Chuyện Làng Nghề
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Nơi lưu giữ những ký ức sống động về bàn tay tài hoa của nghệ nhân, lịch trình workshop thủ công và cẩm nang lựa chọn quà tặng di sản ý nghĩa.
          </p>
        </div>

        {/* Category filter tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeCategory === cat.id
                  ? 'bg-nepred-600 text-white shadow-md shadow-nepred-600/20'
                  : 'bg-white text-stone-700 border border-cream-200 hover:bg-cream-100/60'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Featured Big Card (Article 0) */}
        {filteredArticles.length > 0 && (
          <div className="bg-white rounded-3xl overflow-hidden border border-cream-200 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
            <div className="lg:col-span-7 relative h-72 sm:h-96 w-full">
              <Image
                src={filteredArticles[0].image}
                alt={filteredArticles[0].title}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-nepred-600 text-white text-xs font-bold shadow-md">
                  Tiêu điểm sự kiện
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-10 space-y-4">
              <div className="flex items-center gap-3 text-xs text-stone-500">
                <span className="font-semibold text-nepgreen-800">{filteredArticles[0].category}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {filteredArticles[0].date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {filteredArticles[0].readTime}
                </span>
              </div>

              <h2 className="font-serif font-bold text-xl sm:text-2xl text-stone-900 leading-snug">
                {filteredArticles[0].title}
              </h2>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {filteredArticles[0].summary}
              </p>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-stone-500 italic">Bởi: {filteredArticles[0].author}</span>
                <Link
                  href="/van-hoa"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-nepred-600 hover:text-nepred-700"
                >
                  <span>Đọc câu chuyện</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* 2-Column Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.slice(1).map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-3xl overflow-hidden border border-cream-200 shadow-sm hover:shadow-md transition-all flex flex-col group"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-stone-900/80 backdrop-blur-xs text-white text-[10px] font-bold">
                  {article.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-stone-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{article.date}</span>
                    <span>•</span>
                    <Clock className="w-3.5 h-3.5" />
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="font-serif font-bold text-base text-stone-900 group-hover:text-nepred-600 transition-colors leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-cream-100 flex items-center justify-between">
                  <span className="text-[11px] text-stone-400">{article.author}</span>
                  <Link
                    href="/van-hoa"
                    className="inline-flex items-center gap-1 text-xs font-bold text-nepred-600 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Xem tiếp</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Culture Workshop Invitation Card */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-nepgreen-900 via-stone-900 to-nepgreen-950 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-nepgreen-800 text-nepgold-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Đăng Ký Tham Gia Workshop Cuối Tuần</span>
            </span>
            <h3 className="font-serif font-bold text-2xl text-white">
              Cùng Nghệ Nhân Thổi Hồn Đất Sét & Nan Tre
            </h3>
            <p className="text-xs text-cream-200/90 leading-relaxed">
              Các lớp học làm đồ thủ công dân gian dành riêng cho sinh viên và bạn trẻ yêu văn hóa. Miễn phí nguyên vật liệu và được mang thành phẩm về nhà.
            </p>
          </div>

          <Link
            href="/lien-he"
            className="px-6 py-3.5 rounded-xl bg-nepred-600 hover:bg-nepred-700 text-white font-bold text-xs shadow-lg transition-all text-center flex-shrink-0"
          >
            Đăng ký giữ chỗ ngay
          </Link>
        </div>

      </div>
    </div>
  );
}
