export const dynamic = 'force-dynamic';
import { getPostBySlug } from '@/lib/api';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import he from 'he';
import type { Metadata } from 'next';
import { translateCategory } from '@/lib/utils';
import AdSense from '@/components/AdSense';

// ✅ 추가: 본문 첫 번째 이미지 추출 함수
function getFirstImage(content?: string): string | null {
  if (!content) return null;
  const match = content.match(/<img[^>]+src=["']([^"']+)["']/);
  return match ? match[1] : null;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const slug = decodeURIComponent(params.slug);
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: he.decode(post.title),
    description: he.decode(post.excerpt.replace(/<[^>]*>?/gm, '')).slice(0, 160),
  };
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const slug = decodeURIComponent(params.slug);
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // ✅ 수정: 3단계 우선순위
  const imageUrl =
    post.featuredImage?.node?.sourceUrl ||
    getFirstImage(post.content) ||
    'https://images.unsplash.com/photo-1548115184-bc6544d06a58?q=80&w=1200&auto=format&fit=crop';

  return (
    <article className="container mx-auto px-4 py-12 md:px-6 lg:py-16 max-w-4xl">
      <header className="mb-10 text-center">
        <div className="mb-4 flex items-center justify-center gap-2 text-sm text-gray-500">
          {post.categories?.nodes[0] && (
            <span className="font-medium text-black">
              {translateCategory(post.categories.nodes[0].name)}
            </span>
          )}
          <span>•</span>
          <time dateTime={post.date}>
            {format(new Date(post.date), 'yyyy년 M월 d일', { locale: ko })}
          </time>
        </div>
        <h1 className="mb-6 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl font-serif">
          {he.decode(post.title)}
        </h1>
        <div className="flex items-center justify-center gap-3">
          {post.author?.node?.avatar?.url && (
            <Image
              src={post.author.node.avatar.url}
              alt={post.author.node.name}
              width={40}
              height={40}
              className="rounded-full"
            />
          )}
          <div className="text-left">
            <p className="text-sm font-medium text-gray-900">{post.author?.node?.name}</p>
          </div>
        </div>
      </header>

      <div className="relative mb-12 aspect-video w-full overflow-hidden rounded-2xl bg-gray-100 shadow-sm">
        <Image
          src={imageUrl}
          alt={post.featuredImage?.node?.altText || post.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* AdSense Top */}
      <div className="mb-8 text-center">
        <AdSense type="inarticle" />
      </div>

      <div 
        className="prose prose-lg prose-gray mx-auto max-w-none prose-headings:font-serif prose-a:text-black prose-img:rounded-xl"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* AdSense Bottom */}
      <div className="mt-12">
        <AdSense type="bottom" />
      </div>
    </article>
  );
}
