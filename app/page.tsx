import { getAllPosts } from '@/lib/api';
import PostCard from '@/components/PostCard';
import AdSense from '@/components/AdSense';
import Image from 'next/image';
import Link from 'next/link';

const CATEGORIES = [
  { name: '맛집·카페', slug: 'restaurants-cafes', image: 'https://raw.githubusercontent.com/Blueknot-s/musa-jeju-blog/main/category-food.webp' },
  { name: '여행·관광지', slug: 'travel', image: 'https://raw.githubusercontent.com/Blueknot-s/musa-jeju-blog/main/category-travel.webp' },
  { name: '숙소·호텔', slug: 'accommodation', image: 'https://raw.githubusercontent.com/Blueknot-s/musa-jeju-blog/main/category-hotel.webp' },
  { name: '생활·일상', slug: 'daily-life', image: 'https://raw.githubusercontent.com/Blueknot-s/musa-jeju-blog/main/category-life.webp' },
  { name: '제주뉴스', slug: 'jeju-news', image: 'https://raw.githubusercontent.com/Blueknot-s/musa-jeju-blog/main/category-news.webp' },
];

export default async function Home() {
  const posts = await getAllPosts(12);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-[500px] w-full"
        style={{
          backgroundImage: "url('https://raw.githubusercontent.com/Blueknot-s/musa-jeju-blog/main/hero.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="mb-4 text-5xl md:text-6xl font-bold font-serif tracking-tight drop-shadow-lg">
            무사마씸 제주
          </h1>
          <p className="mb-8 text-lg md:text-xl font-medium max-w-2xl drop-shadow-md">
            제주의 숨겨진 보석 같은 장소와 이야기를 기록합니다
          </p>
          <Link
            href="/category/travel"
            className="rounded-full bg-[#FF6B35] px-8 py-3 text-base font-bold text-white transition-transform hover:scale-105 hover:bg-[#e55a2b] shadow-lg"
          >
            제주 탐험하기
          </Link>
        </div>
      </section>

      {/* AdSense Below Hero */}
      <div className="container mx-auto px-4 min-h-0">
        <AdSense type="top" />
      </div>

      {/* Categories */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="group relative h-40 overflow-hidden rounded-xl shadow-md transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <img
                src={category.image}
                alt={category.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-white drop-shadow-md group-hover:scale-110 transition-transform">
                  {category.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-2">
            <div className="h-8 w-1.5 bg-[#FF6B35] rounded-full" />
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-serif">
              혼저옵서예 제주
            </h2>
          </div>
          <p className="ml-5 text-gray-500">
            제주어로 &apos;어서오세요&apos; - 제주의 모든 이야기를 담았습니다
          </p>
        </section>

        {posts && posts.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: any, index: number) => (
              <>
                <PostCard key={post.slug} post={post} />
                {(index + 1) % 3 === 0 && index !== posts.length - 1 && (
                  <div className="col-span-full py-8">
                    <AdSense type="infeed" />
                  </div>
                )}
              </>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500">게시글을 불러오는 중이거나 게시글이 없습니다.</p>
          </div>
        )}
      </div>

      {/* AdSense Page Bottom */}
      <div className="container mx-auto px-4 py-8">
        <AdSense type="multiplex" />
      </div>
    </div>
  );
}
