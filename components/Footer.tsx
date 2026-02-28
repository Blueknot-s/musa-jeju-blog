import Link from 'next/link';
import { Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-[#1A1A1A] py-16 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <div className="flex flex-col items-center leading-none group">
            <span className="font-serif text-2xl font-bold text-white group-hover:text-[#FF6B35] transition-colors">musa Jeju</span>
            <span className="text-xs text-[#FF6B35] tracking-[0.2em] mt-2 font-medium">무사마씸 제주</span>
          </div>
          
          <p className="text-sm text-gray-400 max-w-md leading-relaxed">
            제주의 아름다운 풍경, 맛있는 음식, 그리고 소소한 일상을 기록합니다.<br/>
            제주의 숨겨진 보석 같은 장소들을 함께 찾아가요.
          </p>

          <div className="flex items-center gap-6 pt-2">
            <Link href="#" className="text-gray-400 hover:text-[#FF6B35] transition-colors">
              <span className="sr-only">Instagram</span>
              <Instagram className="h-6 w-6" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-[#FF6B35] transition-colors">
              <span className="sr-only">YouTube</span>
              <Youtube className="h-6 w-6" />
            </Link>
          </div>

          <div className="text-xs text-gray-600 mt-8 pt-8 border-t border-gray-800 w-full max-w-xs">
            &copy; {new Date().getFullYear()} musa Jeju. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
