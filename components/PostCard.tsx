import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import he from 'he';
import { translateCategory } from '@/lib/utils';

interface PostProps {
  post: {
    title: string;
    excerpt: string;
    slug: string;
    date: string;
    featuredImage?: {
      node: {
        sourceUrl: string;
        altText: string;
      };
    };
    categories?: {
      nodes: {
        name: string;
        slug: string;
      }[];
    };
    author?: {
      node: {
        name: string;
        avatar: {
          url: string;
        };
      };
    };
  };
}

export default function PostCard({ post }: PostProps) {
  const category = post.categories?.nodes[0];
  const imageUrl = post.featuredImage?.node?.sourceUrl || 'https://images.unsplash.com/photo-1548115184-bc6544d06a58?q=80&w=800&auto=format&fit=crop';

  return (
    <Link href={`/${post.slug}`} className="group flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
        <Image
          src={imageUrl}
          alt={post.featuredImage?.node?.altText || post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {category && (
          <span className="absolute left-4 top-4 rounded-full bg-jeju-orange px-3 py-1 text-xs font-bold text-white shadow-md backdrop-blur-sm">
            {translateCategory(category.name)}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center gap-2 text-xs text-gray-500 font-medium">
          <time dateTime={post.date}>
            {format(new Date(post.date), 'yyyy년 M월 d일', { locale: ko })}
          </time>
        </div>
        <h3 className="mb-2 text-lg font-bold leading-tight text-jeju-dark group-hover:text-jeju-orange transition-colors line-clamp-2">
          {he.decode(post.title)}
        </h3>
        <div 
          className="mb-4 text-sm text-gray-600 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: post.excerpt }}
        />
        <div className="mt-auto flex items-center gap-2">
          {post.author?.node?.avatar?.url && (
            <Image
              src={post.author.node.avatar.url}
              alt={post.author.node.name}
              width={24}
              height={24}
              className="rounded-full"
            />
          )}
          <span className="text-xs font-medium text-gray-500">
            {post.author?.node?.name || 'Editor'}
          </span>
        </div>
      </div>
    </Link>
  );
}
