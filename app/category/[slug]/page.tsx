import { getPostsByCategory } from '@/lib/api';
import PostCard from '@/components/PostCard';
import AdSense from '@/components/AdSense';
import { notFound } from 'next/navigation';
import { translateCategory } from '@/lib/utils';

// Map URL slugs to WordPress Category Names (or Slugs)
// Since the API uses categoryName (Name) or categoryName (Slug)? 
// The API query uses `where: { categoryName: $categoryName }`. 
// In WPGraphQL, `categoryName` usually refers to the slug. Let's assume slug.
// If it refers to Name, we need a mapper. 
// Let's assume the URL slug matches the WP Category Slug.

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const posts = await getPostsByCategory(params.slug, 20);

  if (!posts) {
    // If no posts found, it might be an invalid category or just empty.
    // For now, show empty state instead of 404 to avoid breaking if category exists but has no posts.
    // But if fetch returns null, it might be error.
  }

  const title = translateCategory(params.slug);

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
      <section className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl font-serif capitalize">
          {title}
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          {title} 관련 글 목록입니다.
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
          <p className="text-gray-500">게시글이 없습니다.</p>
        </div>
      )}

      {/* AdSense Page Bottom */}
      <div className="mt-12">
        <AdSense type="multiplex" />
      </div>
    </div>
  );
}
