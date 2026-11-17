import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Toast } from '@/components/Toast';

export const metadata: Metadata = {
  title: 'Nếp Việt – Tinh hoa quà tặng & thủ công truyền thống',
  description: 'Nền tảng thương mại điện tử giới thiệu và cung cấp các sản phẩm thủ công mỹ nghệ, quà tặng văn hóa và ẩm thực truyền thống Việt Nam cho giới trẻ.',
  keywords: 'Nếp Việt, gốm Bát Tràng, mây tre Phú Vinh, lụa Vạn Phúc, tranh Đông Hồ, đồ handmade thủ công, quà tặng văn hóa Việt',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-800 antialiased selection:bg-nepred-600 selection:text-white">
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
