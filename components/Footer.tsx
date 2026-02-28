import { Instagram, Youtube, Globe } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-jeju-dark py-16 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <div className="flex flex-col items-center leading-none group">
            <span className="font-serif text-2xl font-bold text-white group-hover:text-jeju-orange transition-colors">musa Jeju</span>
            <span className="text-xs text-gray-400 tracking-widest mt-2 group-hover:text-jeju-orange transition-colors">무사마씸 제주</span>
          </div>
          <p className="text-sm text-gray-400 max-w-md leading-relaxed">
            제주의 아름다운 풍경, 맛있는 음식, 그리고 소소한 일상을 기록합니다.<br/>
            <span className="text-jeju-orange font-medium">제주의 숨겨진 보석</span> 같은 이야기를 만나보세요.
          </p>
          
          <div className="flex items-center gap-6 mt-4">
            <Link href="#" className="text-gray-400 hover:text-jeju-orange hover:scale-110 transition-all">
              <Instagram className="w-6 h-6" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="#" className="text-gray-400 hover:text-jeju-orange hover:scale-110 transition-all">
              <Youtube className="w-6 h-6" />
              <span className="sr-only">YouTube</span>
            </Link>
            <Link href="#" className="text-gray-400 hover:text-jeju-orange hover:scale-110 transition-all">
              <Globe className="w-6 h-6" />
              <span className="sr-only">Blog</span>
            </Link>
          </div>

          <div className="text-xs text-gray-500 mt-8 border-t border-gray-800 pt-8 w-full max-w-xs">
            &copy; {new Date().getFullYear()} musa Jeju. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
