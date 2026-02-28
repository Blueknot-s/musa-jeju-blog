import { getAllPosts } from '@/lib/api';
import PostCard from '@/components/PostCard';
import Image from 'next/image';
import Link from 'next/link';
import AdSense from '@/components/AdSense';
import React from 'react';

export default async function Home() {
  const posts = await getAllPosts(12);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] w-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1535295972055-1c762f4483e5?q=80&w=2000&auto=format&fit=crop"
          alt="Jeju Landscape"
          fill
          className="object-cover brightness-[0.85]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="mb-4 text-5xl md:text-7xl font-bold font-serif tracking-tight drop-shadow-lg">
            무사마씸 제주
          </h1>
          <p className="mb-8 text-lg md:text-2xl font-light max-w-2xl drop-shadow-md">
            제주의 숨겨진 보석 같은 장소와 이야기를 기록합니다
          </p>
          <Link 
            href="/category/travel"
            className="px-8 py-3 bg-jeju-orange text-white font-bold rounded-full hover:bg-orange-600 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1 transform duration-300"
          >
            제주 탐험하기
          </Link>
        </div>
      </section>

      {/* Top AdSense */}
      <div className="container mx-auto px-4 mt-8">
        <AdSense type="top" />
      </div>

      <div className="container mx-auto px-4 py-16 md:px-6 lg:py-24">
        <section className="mb-16">
          <div className="flex flex-col mb-12">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-1.5 h-10 bg-jeju-orange rounded-full"></div>
              <h2 className="text-3xl md:text-4xl font-bold text-jeju-dark font-serif">
                혼저옵서예 제주
              </h2>
            </div>
            <p className="text-sm text-gray-500 pl-6 font-medium">
              제주어로 '어서오세요' - 제주의 모든 이야기를 담았습니다
            </p>
          </div>

          {posts && posts.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post: any, index: number) => (
                <React.Fragment key={post.slug}>
                  <PostCard post={post} />
                  {/* AdSense after 3rd card (index 2) */}
                  {index === 2 && (
                    <div className="col-span-full">
                      <AdSense type="infeed" />
                    </div>
                  )}
                  {/* AdSense after 6th card (index 5) */}
                  {index === 5 && (
                    <div className="col-span-full">
                      <AdSense type="infeed" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-2xl">
              <p className="text-gray-500">게시글을 불러오는 중이거나 게시글이 없습니다.</p>
            </div>
          )}
        </section>

        {/* Multiplex AdSense at the end of list */}
        <div className="mt-16">
          <AdSense type="multiplex" />
        </div>
      </div>
    </div>
  );
}
