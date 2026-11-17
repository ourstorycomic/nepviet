import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Sparkles, Target, Compass, ArrowRight, ShieldCheck } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10 sm:py-16 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Story Intro */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-nepred-50 text-nepred-700 border border-nepred-100 text-xs font-semibold">
            <Heart className="w-3.5 h-3.5 fill-nepred-600 text-nepred-600" />
            <span>Câu chuyện thương hiệu Nếp Việt</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-black text-nepbrown-800 leading-tight">
            Kết Nối Giới Trẻ Với Tinh Hoa Di Sản
          </h1>
          <p className="text-xs sm:text-base text-neutral-600 leading-relaxed">
            Nếp Việt khởi nguồn từ đề tài học phần Ứng dụng Thiết kế Web tại Học viện Công nghệ Bưu chính Viễn thông (PTIT), được ấp ủ bởi những sinh viên trẻ yêu tha thiết giá trị văn hóa và các làng nghề thủ công dân tộc.
          </p>
        </div>

        {/* Vision & Mission Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-cream-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-nepred-600 text-white flex items-center justify-center font-bold shadow-md">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-nepbrown-800">
              Sứ Mệnh Của Chúng Tôi
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Trở thành cầu nối tin cậy giữa các nghệ nhân làng nghề truyền thống và người tiêu dùng trẻ. Chúng tôi không chỉ bán sản phẩm, mà trao gửi câu chuyện văn hóa, sự tỉ mỉ và niềm tự hào dân tộc trong từng món đồ thủ công mỹ nghệ.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-cream-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-nepgreen-700 text-white flex items-center justify-center font-bold shadow-md">
              <Compass className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-nepbrown-800">
              Tầm Nhìn Dài Hạn
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Xây dựng Nếp Việt thành nền tảng thương mại điện tử di sản hàng đầu dành cho học sinh, sinh viên và người trẻ, nơi các bạn có thể tìm thấy những món quà tặng ý nghĩa, đồ trang trí tinh tế và phong vị ẩm thực truyền thống với mức giá phù hợp.
            </p>
          </div>
        </div>

        {/* 3 Core Values */}
        <div className="bg-cream-100/70 rounded-3xl p-8 sm:p-12 border border-cream-200 space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-nepred-600">
              Giá trị cốt lõi
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-nepbrown-800">
              3 Trụ Cột Định Hình Nếp Việt
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-cream-200 space-y-3">
              <span className="font-serif font-black text-nepred-600 text-2xl">01</span>
              <h3 className="font-serif font-bold text-base text-nepbrown-800">Tính Bản Địa & Chân Thực</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Minh bạch 100% về nguồn gốc xuất xứ, làng nghề và vật liệu. Tôn vinh danh tính các nghệ nhân và xưởng chế tác thủ công.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-cream-200 space-y-3">
              <span className="font-serif font-black text-nepgreen-700 text-2xl">02</span>
              <h3 className="font-serif font-bold text-base text-nepbrown-800">Thẩm Mỹ Trẻ Trung</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Ứng dụng ngôn ngữ thiết kế UI/UX hiện đại, kết hợp nét mộc mạc cổ truyền với phong cách bài trí tối giản, tiện dụng.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-cream-200 space-y-3">
              <span className="font-serif font-black text-nepgold-600 text-2xl">03</span>
              <h3 className="font-serif font-bold text-base text-nepbrown-800">Trải Nghiệm An Tâm</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Quy trình bọc hàng chống va đập tiêu chuẩn cao, thanh toán COD linh hoạt, đồng kiểm tra hàng khi nhận và hỗ trợ đổi trả 7 ngày.
              </p>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center pt-4">
          <Link
            href="/san-pham"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-nepred-600 hover:bg-nepred-700 text-white rounded-xl font-bold text-xs sm:text-sm shadow-lg transition-all"
          >
            <span>Khám phá các sản phẩm thủ công ngay</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
