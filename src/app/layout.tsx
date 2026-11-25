import type { Metadata } from 'next';
import { Be_Vietnam_Pro, Playfair_Display, Lora } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Toast } from '@/components/Toast';

// 1. Playfair Display: Font tiêu đề mang phong thái nghệ thuật sơn mài hoàng gia, tương đồng Fine Art Gallery
const playfairDisplay = Playfair_Display({
  subsets: ['vietnamese', 'latin'],
  variable: '--font-headline',
  display: 'swap',
  weight: ['600', '700', '800', '900'],
});

// 2. Be Vietnam Pro: Font chữ chuyên dụng, chuẩn mực và tối ưu bậc nhất cho dấu tiếng Việt
const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['vietnamese', 'latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

// 3. Lora: Font trích dẫn và điểm nhấn nghệ thuật mềm mại, giàu cảm xúc
const lora = Lora({
  subsets: ['vietnamese', 'latin'],
  variable: '--font-accent',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://nepviet.vercel.app'),
  title: 'Nếp Việt – Tinh hoa quà tặng & thủ công truyền thống',
  description: 'Nền tảng thương mại điện tử di sản giới thiệu và cung cấp các sản phẩm thủ công mỹ nghệ, quà tặng văn hóa và ẩm thực truyền thống Việt Nam tuyển chọn.',
  keywords: 'Nếp Việt, đồ thủ công mỹ nghệ, quà tặng văn hóa Việt, ẩm thực truyền thống, di sản Việt Nam',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${beVietnamPro.variable} ${playfairDisplay.variable} ${lora.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col bg-[#14100E] text-[#EDE4D8] font-sans antialiased selection:bg-[#B83A24] selection:text-white">
        <AuthProvider>
          <CartProvider>
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            <Toast />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
