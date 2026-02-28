import type { Metadata } from "next";
import { Inter, Playfair_Display, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const notoSansKr = Noto_Sans_KR({ subsets: ["latin"], weight: ["100", "300", "400", "500", "700", "900"], variable: "--font-noto-sans-kr" });

export const metadata: Metadata = {
  title: {
    template: "%s | musa Jeju",
    default: "musa Jeju | 무사마씸 제주",
  },
  description: "제주의 아름다운 풍경, 맛있는 음식, 그리고 소소한 일상을 기록하는 블로그입니다.",
  keywords: ["제주", "제주도", "제주여행", "제주맛집", "제주카페", "제주일상"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${inter.variable} ${playfair.variable} ${notoSansKr.variable}`}>
      <body className="flex min-h-screen flex-col font-sans antialiased bg-white text-gray-900">
        <Script
          id="adsbygoogle-init"
          strategy="afterInteractive"
          crossOrigin="anonymous"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1665608758033551"
        />
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
