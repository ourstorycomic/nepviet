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
  HelpCircle,
  ShieldCheck,
  Truck,
  Sparkles,
  MessageSquare,
  Gift,
  ChevronDown,
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    topic: 'tu-van-qua-tang',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert('Vui lòng nhập họ tên và số điện thoại liên hệ.');
      return;
    }
    setIsSubmitted(true);
  };

  const FAQS = [
    {
      q: 'Chính sách đóng gói chống vỡ đối với sản phẩm gốm sứ & mây tre?',
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
      q: 'Doanh nghiệp hoặc trường học muốn đặt quà tặng số lượng lớn thì liên hệ ở đâu?',
      a: 'Chúng tôi có chính sách chiết khấu ưu đãi từ 15% - 25% cho các đơn hàng quà tặng lưu niệm, hội nghị hoặc sự kiện văn hóa. Quý đối tác vui lòng gửi yêu cầu qua form bên dưới hoặc gọi hotline 1900 6868.',
    },
  ];

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Breadcrumbs & Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-nepred-50 text-nepred-700 text-xs font-bold border border-nepred-200">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Hỗ Trợ Khách Hàng & Liên Hệ Làng Nghề</span>
          </div>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-stone-900">
            Chúng Tôi Luôn Sẵn Sàng Lắng Nghe Bạn
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Dù bạn cần tư vấn chọn quà lưu niệm, thắc mắc về quy trình chế tác hay yêu cầu gói quà theo phong cách riêng, đội ngũ Nếp Việt và các nghệ nhân luôn đồng hành 24/7.
          </p>
        </div>

        {/* Contact Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-3xl border border-cream-200 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-nepred-50 text-nepred-600 flex items-center justify-center flex-shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-sm text-stone-900">Hotline & Zalo CSKH</h3>
              <p className="text-xs text-nepred-600 font-bold mt-1">1900 6868 • 0981 234 567</p>
              <p className="text-[11px] text-stone-500 mt-0.5">Túc trực 08:00 - 21:30 hàng ngày</p>
            </div>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-cream-200 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-nepgreen-50 text-nepgreen-700 flex items-center justify-center flex-shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-sm text-stone-900">Hòm Thư Điện Tử</h3>
              <p className="text-xs text-stone-800 font-mono font-bold mt-1">lienhe@nepviet.vn</p>
              <p className="text-[11px] text-stone-500 mt-0.5">Phản hồi yêu cầu trong vòng 2 giờ</p>
            </div>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-cream-200 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-sm text-stone-900">Không Gian Trưng Bày</h3>
              <p className="text-xs text-stone-800 font-medium mt-1">Số 122 Hoàng Quốc Việt, Cầu Giấy, Hà Nội</p>
              <p className="text-[11px] text-stone-500 mt-0.5">Xưởng chế tác: Bát Tràng & Phú Vinh</p>
            </div>
          </div>
        </div>

        {/* Main Content: Contact Form Left + FAQ Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Form (Left 6 Cols) */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-cream-200 shadow-sm space-y-6">
            <div>
              <h2 className="font-serif font-bold text-xl text-stone-900 flex items-center gap-2">
                <Gift className="w-5 h-5 text-nepred-600" />
                <span>Gửi Yêu Cầu Tư Vấn & Đặt Hàng Riêng</span>
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Điền thông tin bên dưới, nghệ nhân và đội ngũ tư vấn sẽ liên hệ lại với bạn ngay.
              </p>
            </div>

            {isSubmitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3 animate-fadeIn">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="font-serif font-bold text-lg text-stone-900">
                  Gửi Yêu Cầu Thành Công!
                </h3>
                <p className="text-xs text-stone-600 max-w-sm mx-auto leading-relaxed">
                  Cảm ơn bạn đã quan tâm đến sản phẩm Nếp Việt. Đội ngũ chăm sóc khách hàng sẽ liên hệ qua số điện thoại <strong>{formData.phone}</strong> trong ít phút.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', phone: '', email: '', topic: 'tu-van-qua-tang', message: '' });
                  }}
                  className="px-5 py-2 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 transition-colors"
                >
                  Gửi yêu cầu khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-stone-700">Họ và tên của bạn <span className="text-nepred-600">*</span></label>
                    <input
                      type="text"
                      required
                      placeholder="Ví dụ: Nguyễn Phương Linh"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-cream-300 bg-cream-50/60 focus:bg-white focus:outline-none focus:border-nepred-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-stone-700">Số điện thoại <span className="text-nepred-600">*</span></label>
                    <input
                      type="tel"
                      required
                      placeholder="0981 234 567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-cream-300 bg-cream-50/60 focus:bg-white focus:outline-none focus:border-nepred-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-stone-700">Email nhận thông tin</label>
                    <input
                      type="email"
                      placeholder="email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-cream-300 bg-cream-50/60 focus:bg-white focus:outline-none focus:border-nepred-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-stone-700">Nội dung bạn quan tâm</label>
                    <select
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-cream-300 bg-cream-50/60 focus:bg-white focus:outline-none focus:border-nepred-600 cursor-pointer"
                    >
                      <option value="tu-van-qua-tang">Tư vấn chọn quà tặng văn hóa</option>
                      <option value="dat-hang-theo-yeu-cau">Đặt chế tác đồ thủ công theo yêu cầu</option>
                      <option value="goi-qua-viet-thiep">Yêu cầu gói quà & thiệp tay thư pháp</option>
                      <option value="hop-tac-lang-nghe">Hợp tác nghệ nhân & xưởng làng nghề</option>
                      <option value="khac">Yêu cầu hỗ trợ khác</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-700">Lời nhắn / Yêu cầu chi tiết</label>
                  <textarea
                    rows={4}
                    placeholder="Mô tả cụ thể về sản phẩm bạn quan tâm, số lượng, ngân sách dự kiến hoặc thời gian cần nhận..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-cream-300 bg-cream-50/60 focus:bg-white focus:outline-none focus:border-nepred-600 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-2xl bg-nepred-600 hover:bg-nepred-700 text-white font-bold text-xs shadow-lg shadow-nepred-600/25 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Gửi Yêu Cầu Đến Nghệ Nhân Nếp Việt</span>
                </button>
              </form>
            )}
          </div>

          {/* FAQ Accordion (Right 6 Cols) */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-cream-200 shadow-sm space-y-6">
            <div>
              <h2 className="font-serif font-bold text-xl text-stone-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-nepgreen-700" />
                <span>Câu Hỏi Thường Gặp (FAQ)</span>
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Giải đáp nhanh các thắc mắc phổ biến về sản phẩm thủ công, vận chuyển và đổi trả.
              </p>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-cream-200 overflow-hidden transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-4 text-left flex items-center justify-between gap-3 bg-cream-50/40 hover:bg-cream-100/60 transition-colors"
                    >
                      <span className="font-serif font-bold text-xs text-stone-900 leading-snug">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-stone-400 flex-shrink-0 transition-transform ${
                          isOpen ? 'rotate-180 text-nepred-600' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="p-4 bg-white text-xs text-stone-600 leading-relaxed border-t border-cream-200/60">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Cultural commitment banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-nepgreen-900 to-nepgreen-800 text-white flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-emerald-400 flex-shrink-0" />
              <div className="text-[11px] leading-relaxed">
                <span className="font-bold text-white block">Cam Kết Di Sản & Bản Quyền Nghệ Nhân</span>
                Tất cả sản phẩm đều được lấy trực tiếp tại xưởng gia đình, có tem truy xuất OCOP kiểm định nguồn gốc.
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
