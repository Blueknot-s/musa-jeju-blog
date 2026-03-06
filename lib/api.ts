const WP_API = 'https://steelblue-seal-184760.hostingersite.com/wp-json/wp/v2';

interface WPPost {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  date: string;
  _embedded?: {
    'wp:featuredmedia'?: { source_url: string; alt_text: string }[];
    'wp:term'?: { id: number; name: string; slug: string }[][];
    author?: { name: string; avatar_urls?: { [key: string]: string } }[];
  };
}

function formatPost(post: WPPost) {
  const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
  const categories = post._embedded?.['wp:term']?.[0] || [];
  const author = post._embedded?.['author']?.[0];
  const avatarUrl = author?.avatar_urls
    ? Object.values(author.avatar_urls).pop()
    : undefined;

  return {
    slug: decodeURIComponent(post.slug),
    title: post.title.rendered,
    excerpt: post.excerpt.rendered,
    content: post.content.rendered,
    date: post.date,
    featuredImage: featuredMedia
      ? { node: { sourceUrl: featuredMedia.source_url, altText: featuredMedia.alt_text } }
      : null,
    categories: {
      nodes: categories.map((cat: any) => ({ name: cat.name, slug: cat.slug })),
    },
    author: author
      ? { node: { name: author.name, avatar: { url: avatarUrl || '' } } }
      : null,
  };
}

export async function getAllPosts(first = 20) {
  try {
    const res = await fetch(
      `${WP_API}/posts?per_page=${first}&orderby=date&order=desc&_embed`,
      { next: { revalidate: 10 } }
    );
    if (!res.ok) return [];
    const posts: WPPost[] = await res.json();
    return posts.map(formatPost);
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string) {
  try {
    const decodedSlug = decodeURIComponent(slug);
    const res = await fetch(
      `${WP_API}/posts?slug=${encodeURIComponent(decodedSlug)}&_embed`,
      { next: { revalidate: 10 } }
    );
    if (!res.ok) return null;
    const posts: WPPost[] = await res.json();
    if (!posts.length) return null;
    return formatPost(posts[0]);
  } catch (error) {
    console.error('Failed to fetch post:', error);
    return null;
  }
}

export async function getPostsByCategory(categoryName: string, first = 20) {
  try {
    const catRes = await fetch(
      `${WP_API}/categories?slug=${encodeURIComponent(categoryName)}&per_page=1`,
      { next: { revalidate: 60 } }
    );
    if (!catRes.ok) return [];
    const cats = await catRes.json();
    if (!cats.length) return [];

    const categoryId = cats[0].id;
    const res = await fetch(
      `${WP_API}/posts?categories=${categoryId}&per_page=${first}&orderby=date&order=desc&_embed`,
      { next: { revalidate: 10 } }
    );
    if (!res.ok) return [];
    const posts: WPPost[] = await res.json();
    return posts.map(formatPost);
  } catch (error) {
    console.error('Failed to fetch posts by category:', error);
    return [];
  }
}

export async function getAllCategories() {
  try {
    const res = await fetch(
      `${WP_API}/categories?per_page=100&hide_empty=true`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return [];
    const cats = await res.json();
    return cats.map((cat: { name: string; slug: string; count: number }) => ({
      name: cat.name,
      slug: cat.slug,
      count: cat.count,
    }));
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return [];
  }
}
