import { getPostBySlug } from '@/lib/api';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import he from 'he';
import type { Metadata } from 'next';
import { translateCategory } from '@/lib/utils';
import AdSense from '@/components/AdSense';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: he.decode(post.title),
    description: he.decode(post.excerpt.replace(/<[^>]*>?/gm, '')).slice(0, 160),
  };
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const imageUrl = post.featuredImage?.node?.sourceUrl || 'https://images.unsplash.com/photo-1548115184-bc6544d06a58?q=80&w=1200&auto=format&fit=crop';

  // Split content for in-article ad
  // Simple split by paragraphs. Insert ad after ~50% of paragraphs.
  const content = post.content;
  const paragraphs = content.split('</p>');
  const middleIndex = Math.floor(paragraphs.length / 2);
  
  const contentPart1 = paragraphs.slice(0, middleIndex).join('</p>') + (paragraphs.length > 0 ? '</p>' : '');
  const contentPart2 = paragraphs.slice(middleIndex).join('</p>');

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
        <h1 className="mb-6 text-3xl font-bold leading-tight text-jeju-dark sm:text-4xl md:text-5xl font-serif">
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

      {/* Top AdSense */}
      <AdSense type="top" className="mb-8" />

      <div className="relative mb-12 aspect-video w-full overflow-hidden rounded-2xl bg-gray-100 shadow-sm">
        <Image
          src={imageUrl}
          alt={post.featuredImage?.node?.altText || post.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="prose prose-lg prose-gray mx-auto max-w-none prose-headings:font-serif prose-a:text-black prose-img:rounded-xl">
        <div dangerouslySetInnerHTML={{ __html: contentPart1 }} />
        
        {/* In-Article AdSense */}
        <AdSense type="inarticle" className="my-8" />
        
        <div dangerouslySetInnerHTML={{ __html: contentPart2 }} />
      </div>

      {/* Bottom AdSense */}
      <AdSense type="bottom" className="mt-12" />

      {/* Multiplex AdSense at page bottom */}
      <div className="mt-16 border-t border-gray-100 pt-12">
        <h3 className="text-2xl font-bold font-serif mb-6 text-center">더 볼만한 이야기</h3>
        <AdSense type="multiplex" />
      </div>
    </article>
  );
}
