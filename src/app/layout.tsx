import type { Metadata } from 'next';
import { Lora, Be_Vietnam_Pro } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Toast } from '@/components/Toast';

const lora = Lora({
  subsets: ['vietnamese', 'latin'],
  variable: '--font-serif',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const beVietnam = Be_Vietnam_Pro({
  subsets: ['vietnamese', 'latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://nepviet.vercel.app'),
  title: 'Nếp Việt – Tinh hoa quà tặng & thủ công truyền thống',
  description: 'Nền tảng thương mại điện tử di sản giới thiệu và cung cấp các sản phẩm thủ công mỹ nghệ, quà tặng văn hóa và ẩm thực truyền thống Việt Nam tuyển chọn.',
  keywords: 'Nếp Việt, gốm Bát Tràng, mây tre Phú Vinh, lụa Vạn Phúc, tranh Đông Hồ, đồ handmade thủ công, quà tặng văn hóa Việt',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${lora.variable} ${beVietnam.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 font-sans antialiased selection:bg-nepred-600 selection:text-white">
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
