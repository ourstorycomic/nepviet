'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ShieldCheck,
  Truck,
  Sparkles,
  MessageSquare,
  Gift,
  ChevronDown,
} from 'lucide-react';
import { GoldWavyLine, TraditionalFlourish } from '@/components/GoldWavyLine';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    topic: 'tu-van-qua-tang',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setFormError('Vui lòng nhập họ tên và số điện thoại liên hệ.');
      return;
    }
    setFormError(null);
    setIsSubmitted(true);
  };

  const FAQS = [
    {
      q: 'Chính sách đóng gói chống vỡ đối với sản phẩm thủ công mỹ nghệ?',
      a: 'Tất cả các sản phẩm gốm sứ men lam Bát Tràng và mây tre Phú Vinh đều được đóng gói theo quy chuẩn bảo vệ 4 lớp: Lớp màng xốp chống sốc, bọt khí đa chiều, hộp carton 5 lớp gia cường và tem niêm phong "Hàng Dễ Vỡ". Nếu phát hiện nứt vỡ do vận chuyển, Nếp Việt cam kết đổi mới 1:1 hoàn toàn miễn phí.',
    },
    {
      q: 'Đơn hàng từ bao nhiêu sẽ được miễn phí vận chuyển (Freeship)?',
      a: 'Nếp Việt áp dụng chính sách miễn phí vận chuyển tiêu chuẩn toàn quốc cho tất cả các đơn hàng có giá trị từ 300.000 VNĐ. Với đơn hàng dưới 300.000 VNĐ, phí giao hàng đồng giá 25.000 VNĐ.',
    },
    {
      q: 'Quy trình thanh toán chuyển khoản qua VietQR 24/7 như thế nào?',
      a: 'Tại bước thanh toán, hệ thống sẽ tạo tự động một mã VietQR chứa đúng số tiền và cú pháp đơn hàng của bạn. Bạn chỉ cần mở app của bất kỳ ngân hàng nào (MB Bank, Vietcombank, Techcombank, TPBank...), chọn Quét QR là toàn bộ thông tin sẽ tự động điền mà không cần nhập tay.',
    },
    {
      q: 'Nếp Việt có hỗ trợ gói quà theo yêu cầu và viết thiệp tay không?',
      a: 'Có! Khi đặt hàng, bạn có thể ghi chú yêu cầu bọc giấy kraft mộc truyền thống, thắt dây đay kèm thiệp thư pháp viết tay để gửi tặng bạn bè, người thân hoặc thầy cô giáo.',
    },
    {
      q: 'Doanh nghiệp hoặc tổ chức muốn đặt quà tặng số lượng lớn thì liên hệ ở đâu?',
      a: 'Chúng tôi có chính sách chiết khấu ưu đãi từ 15% - 25% cho các đơn hàng quà tặng lưu niệm, hội nghị hoặc sự kiện văn hóa. Quý đối tác vui lòng gửi yêu cầu qua form bên dưới hoặc gọi hotline 1900 6868.',
    },
  ];

  return (
    <div className="bg-[#14100E] text-[#EDE4D8] min-h-screen">
      {/* Hero Header with Traditional Embossed Red Lacquer */}
      <section className="relative pt-16 pb-16 overflow-hidden bg-[#3D0A10] border-b border-[#52121A]">
        <div
          className="absolute inset-0 pointer-events-none opacity-90 bg-cover bg-center"
          style={{ backgroundImage: `url('/patterns/background-hoa-van.webp')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#24080B]/50 via-transparent to-[#14100E] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3D1016] border border-[#C5A880]/30 text-[#E8C59A] text-xs font-bold font-headline uppercase tracking-widest">
            <MessageSquare className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Hỗ Trợ Khách Hàng & Liên Hệ Làng Nghề</span>
          </span>

          <h1 className="font-headline font-black text-3xl sm:text-5xl text-[#FAF6F0] leading-[1.65] tracking-[0.02em] text-gold-luminous">
            Chúng Tôi Luôn Sẵn Sàng Lắng Nghe Bạn
          </h1>

          <TraditionalFlourish />

          <p className="text-xs sm:text-base text-[#EDE4D8]/85 max-w-2xl mx-auto leading-relaxed font-subtext">
            Dù bạn cần tư vấn chọn quà lưu niệm, thắc mắc về quy trình chế tác hay yêu cầu gói quà theo phong cách riêng, đội ngũ Nếp Việt và các nghệ nhân luôn đồng hành 24/7.
          </p>
        </div>
      </section>

      {/* Elegant Gold Wavy Divider */}
      <div className="relative -mt-[1px]">
        <GoldWavyLine />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        
        {/* Contact Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-[#1C1614] rounded-3xl border border-[#362924] shadow-lg flex items-start gap-4 hover:border-[#C5A880]/50 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-[#24080B] text-[#C5A880] border border-[#C5A880]/30 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-headline font-bold text-sm text-[#FAF6F0]">Hotline & Zalo CSKH</h3>
              <p className="text-xs text-[#C5A880] font-bold mt-1">1900 6868 • 0981 234 567</p>
              <p className="text-[11px] text-[#EDE4D8]/60 mt-0.5">Túc trực 08:00 - 21:30 hàng ngày</p>
            </div>
          </div>

          <div className="p-6 bg-[#1C1614] rounded-3xl border border-[#362924] shadow-lg flex items-start gap-4 hover:border-[#C5A880]/50 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-[#1C281F] text-[#4ADE80] border border-[#22C55E]/30 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-headline font-bold text-sm text-[#FAF6F0]">Hòm Thư Điện Tử</h3>
              <p className="text-xs text-[#E8C59A] font-mono font-bold mt-1">lienhe@nepviet.vn</p>
              <p className="text-[11px] text-[#EDE4D8]/60 mt-0.5">Phản hồi yêu cầu trong vòng 2 giờ</p>
            </div>
          </div>

          <div className="p-6 bg-[#1C1614] rounded-3xl border border-[#362924] shadow-lg flex items-start gap-4 hover:border-[#C5A880]/50 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-[#241D1A] text-[#E8C59A] border border-[#C5A880]/30 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-headline font-bold text-sm text-[#FAF6F0]">Không Gian Trưng Bày</h3>
              <p className="text-xs text-[#EDE4D8] font-medium mt-1">Số 122 Hoàng Quốc Việt, Cầu Giấy, Hà Nội</p>
              <p className="text-[11px] text-[#EDE4D8]/60 mt-0.5">Xưởng chế tác: Bát Tràng & Phú Vinh</p>
            </div>
          </div>
        </div>

        {/* Main Content: Contact Form Left + FAQ Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Form (Left 6 Cols) */}
          <div className="lg:col-span-6 bg-[#1C1614] rounded-3xl p-6 sm:p-8 border border-[#362924] shadow-xl space-y-6">
            <div>
              <h2 className="font-headline font-bold text-xl text-[#FAF6F0] flex items-center gap-2">
                <Gift className="w-5 h-5 text-[#C5A880]" />
                <span>Gửi Yêu Cầu Tư Vấn & Đặt Hàng Riêng</span>
              </h2>
              <p className="text-xs text-[#EDE4D8]/70 mt-1 font-subtext">
                Điền thông tin bên dưới, nghệ nhân và đội ngũ tư vấn sẽ liên hệ lại với bạn ngay.
              </p>
            </div>

            {isSubmitted ? (
              <div className="p-8 rounded-2xl bg-[#1C281F] border border-[#22C55E]/40 text-center space-y-3 animate-fadeIn">
                <div className="w-12 h-12 rounded-full bg-[#163D24] text-[#4ADE80] mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="font-headline font-bold text-lg text-[#FAF6F0]">
                  Gửi Yêu Cầu Thành Công!
                </h3>
                <p className="text-xs text-[#EDE4D8]/80 max-w-sm mx-auto leading-relaxed font-subtext">
                  Cảm ơn bạn đã quan tâm đến sản phẩm Nếp Việt. Đội ngũ chăm sóc khách hàng sẽ liên hệ qua số điện thoại <strong>{formData.phone}</strong> trong ít phút.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', phone: '', email: '', topic: 'tu-van-qua-tang', message: '' });
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#8B1E2B] to-[#A32434] text-[#FAF6F0] text-xs font-bold hover:scale-[1.02] transition-transform"
                >
                  Gửi yêu cầu khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                {formError && (
                  <div className="p-3 rounded-xl bg-[#3D1016] border border-[#8B1E2B] text-[#FCA5A5] text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 text-[#EF4444]" />
                    <span>{formError}</span>
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#EDE4D8]">Họ và tên của bạn <span className="text-[#C5A880]">*</span></label>
                    <input
                      type="text"
                      required
                      placeholder="Ví dụ: Nguyễn Phương Linh"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-3 rounded-xl border border-[#362924] bg-[#14100E] text-[#FAF6F0] placeholder-[#EDE4D8]/40 focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-[#EDE4D8]">Số điện thoại <span className="text-[#C5A880]">*</span></label>
                    <input
                      type="tel"
                      required
                      placeholder="0981 234 567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-3 rounded-xl border border-[#362924] bg-[#14100E] text-[#FAF6F0] placeholder-[#EDE4D8]/40 focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#EDE4D8]">Email nhận thông tin</label>
                    <input
                      type="email"
                      placeholder="email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-3 rounded-xl border border-[#362924] bg-[#14100E] text-[#FAF6F0] placeholder-[#EDE4D8]/40 focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-[#EDE4D8]">Nội dung bạn quan tâm</label>
                    <select
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      className="w-full p-3 rounded-xl border border-[#362924] bg-[#14100E] text-[#FAF6F0] focus:outline-none focus:border-[#C5A880] cursor-pointer"
                    >
                      <option value="tu-van-qua-tang" className="bg-[#1C1614] text-[#FAF6F0]">Tư vấn chọn quà tặng văn hóa</option>
                      <option value="dat-hang-theo-yeu-cau" className="bg-[#1C1614] text-[#FAF6F0]">Đặt chế tác đồ thủ công theo yêu cầu</option>
                      <option value="goi-qua-viet-thiep" className="bg-[#1C1614] text-[#FAF6F0]">Yêu cầu gói quà & thiệp tay thư pháp</option>
                      <option value="hop-tac-lang-nghe" className="bg-[#1C1614] text-[#FAF6F0]">Hợp tác nghệ nhân & xưởng làng nghề</option>
                      <option value="khac" className="bg-[#1C1614] text-[#FAF6F0]">Yêu cầu hỗ trợ khác</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-[#EDE4D8]">Lời nhắn / Yêu cầu chi tiết</label>
                  <textarea
                    rows={4}
                    placeholder="Mô tả cụ thể về sản phẩm bạn quan tâm, số lượng, ngân sách dự kiến hoặc thời gian cần nhận..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3 rounded-xl border border-[#362924] bg-[#14100E] text-[#FAF6F0] placeholder-[#EDE4D8]/40 focus:outline-none focus:border-[#C5A880] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#8B1E2B] to-[#A32434] hover:from-[#A32434] hover:to-[#B82B3E] text-[#FAF6F0] font-headline font-bold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 border border-[#C5A880]/30 hover:scale-[1.01]"
                >
                  <Send className="w-4 h-4 text-[#C5A880]" />
                  <span>Gửi Yêu Cầu Đến Nghệ Nhân Nếp Việt</span>
                </button>
              </form>
            )}
          </div>

          {/* FAQ Accordion (Right 6 Cols) */}
          <div className="lg:col-span-6 bg-[#1C1614] rounded-3xl p-6 sm:p-8 border border-[#362924] shadow-xl space-y-6">
            <div>
              <h2 className="font-headline font-bold text-xl text-[#FAF6F0] flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#C5A880]" />
                <span>Câu Hỏi Thường Gặp (FAQ)</span>
              </h2>
              <p className="text-xs text-[#EDE4D8]/70 mt-1 font-subtext">
                Giải đáp nhanh các thắc mắc phổ biến về sản phẩm thủ công, vận chuyển và đổi trả.
              </p>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-[#362924] overflow-hidden transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-4 text-left flex items-center justify-between gap-3 bg-[#14100E] hover:bg-[#241D1A] transition-colors"
                    >
                      <span className="font-headline font-bold text-xs text-[#FAF6F0] leading-snug">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#C5A880] flex-shrink-0 transition-transform ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="p-4 bg-[#1C1614] text-xs text-[#EDE4D8]/85 leading-relaxed border-t border-[#362924] font-subtext">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Cultural commitment banner with traditional embossed pattern */}
            <div className="relative p-5 rounded-2xl bg-[#24080B] border border-[#521B22] text-[#FAF6F0] flex items-center gap-4 overflow-hidden shadow-md">
              <div
                className="absolute inset-0 pointer-events-none opacity-20 mix-blend-luminosity bg-cover bg-center"
                style={{ backgroundImage: `url('/patterns/background-hoa-van.webp')` }}
              />
              <ShieldCheck className="w-9 h-9 text-[#C5A880] flex-shrink-0 relative z-10" />
              <div className="text-xs leading-relaxed relative z-10">
                <span className="font-headline font-bold text-[#FAF6F0] block text-sm">Cam Kết Di Sản & Bản Quyền Nghệ Nhân</span>
                <span className="text-[#EDE4D8]/80 font-subtext">Tất cả sản phẩm đều được lấy trực tiếp tại xưởng gia đình, có tem truy xuất OCOP kiểm định nguồn gốc.</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
