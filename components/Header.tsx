'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import { useState } from 'react';

const NAV_ITEMS = [
  { label: '홈', href: '/' },
  { label: '맛집·카페', href: '/category/restaurants-cafes' },
  { label: '여행·관광지', href: '/category/travel' },
  { label: '숙소·호텔', href: '/category/accommodation' },
  { label: '생활·일상', href: '/category/daily-life' },
  { label: '제주뉴스', href: '/category/jeju-news' },
  { label: '소개', href: '/about' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex flex-col items-start leading-none group relative">
          <span className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-jeju-dark group-hover:text-jeju-orange transition-colors">
            musa Jeju
          </span>
          <span className="text-xs font-medium text-gray-500 tracking-widest group-hover:text-jeju-orange transition-colors mt-1">
            무사마씸 제주
          </span>
          <span className="absolute -bottom-2 left-0 w-8 h-1 bg-jeju-orange rounded-full group-hover:w-full transition-all duration-300"></span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-bold text-gray-600 hover:text-jeju-orange transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-md"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <nav className="flex flex-col p-4 space-y-3">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-gray-600 hover:text-black py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
