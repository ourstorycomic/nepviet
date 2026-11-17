import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CRAFT_VILLAGES } from '@/data/products';
import { Sparkles, MapPin, History, Compass, ArrowRight, Award } from 'lucide-react';

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
    <div className="bg-[#FAF8F5] min-h-screen py-10 sm:py-16 space-y-16 sm:space-y-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Hero Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-nepgreen-50 text-nepgreen-800 border border-nepgreen-200 text-xs font-semibold">
            <Compass className="w-3.5 h-3.5 text-nepgreen-700" />
            <span>Hành trình tìm về nguồn cội thủ công Việt Nam</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-black text-nepbrown-800 leading-tight">
            Văn Hóa & Các Làng Nghề Trăm Năm Tuổi
          </h1>
          <p className="text-xs sm:text-base text-neutral-600 leading-relaxed">
            Việt Nam có hàng ngàn làng nghề thủ công truyền thống, nơi lưu giữ tinh hoa trí tuệ và tâm hồn dân tộc qua bao thăng trầm thời gian. Nếp Việt trân trọng đồng hành cùng các nghệ nhân bảo tồn và lan tỏa những giá trị vô giá ấy.
          </p>
        </div>

        {/* Craft Villages Grid */}
        <div className="space-y-12">
          <div className="text-center md:text-left">
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-nepbrown-800">
              Các Làng Nghề Nổi Bật Tại Nếp Việt
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Những cái nôi di sản thủ công được Nếp Việt chọn lọc trực tiếp
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CRAFT_VILLAGES.map((village) => (
              <div
                key={village.id}
                className="bg-white rounded-3xl overflow-hidden border border-cream-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-cream-100">
                  <Image
                    src={village.image}
                    alt={village.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-nepred-600 text-white text-[11px] font-bold rounded-full shadow">
                      {village.history}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-xs text-nepgreen-700 font-semibold">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{village.location}</span>
                    </div>
                    <h3 className="font-serif font-bold text-lg text-nepbrown-800">
                      {village.name}
                    </h3>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      {village.highlight}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-cream-100">
                    <Link
                      href={`/san-pham`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-nepred-600 hover:text-nepred-700"
                    >
                      <span>Xem sản phẩm từ làng nghề</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process Flow */}
        <div className="bg-cream-100/70 rounded-3xl p-8 sm:p-14 border border-cream-200 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-nepred-600">
              Quy trình chế tác
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-nepbrown-800">
              Từ Đất, Tre, Tơ Đến Tác Phẩm Nghệ Thuật
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600">
              Để tạo nên một sản phẩm thủ công hoàn chỉnh, mỗi người nghệ nhân phải trải qua hàng chục công đoạn đòi hỏi sự kiên nhẫn và bàn tay khéo léo.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((st) => (
              <div key={st.step} className="bg-white p-6 rounded-2xl border border-cream-200 shadow-sm space-y-3">
                <span className="font-serif text-3xl font-black text-nepred-600 block">
                  {st.step}
                </span>
                <h3 className="font-serif font-bold text-sm text-nepbrown-800">
                  {st.title}
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
