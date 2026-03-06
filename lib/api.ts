const API_URL = 'https://steelblue-seal-184760.hostingersite.com/graphql';

async function fetchAPI(query: string, { variables }: { variables?: any } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  const res = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 10 },
  });
  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }
  return json.data;
}

export async function getAllPosts(first = 20) {
  const data = await fetchAPI(
    `
    query AllPosts($first: Int!) {
      posts(first: $first, where: { orderby: { field: DATE, order: DESC } }) {
        nodes {
          title
          excerpt
          slug
          date
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          categories {
            nodes {
              name
              slug
            }
          }
          author {
            node {
              name
              avatar {
                url
              }
            }
          }
        }
      }
    }
  `,
    { variables: { first } }
  );

  // ✅ 수정 1: 슬러그 디코딩 (한글 슬러그 정규화)
  const posts = data?.posts?.nodes;
  if (posts) {
    return posts.map((post: any) => ({
      ...post,
      slug: decodeURIComponent(post.slug),
    }));
  }
  return posts;
}

export async function getPostBySlug(slug: string) {
  // ✅ 수정 2: 받은 슬러그도 디코딩 후 API 요청
  const decodedSlug = decodeURIComponent(slug);

  const data = await fetchAPI(
    `
    query PostBySlug($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        title
        excerpt
        content
        slug
        date
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
        author {
          node {
            name
            avatar {
              url
            }
          }
        }
      }
    }
  `,
    { variables: { id: decodedSlug, idType: 'SLUG' } }
  );
  return data?.post;
}

export async function getPostsByCategory(categoryName: string, first = 20) {
  const data = await fetchAPI(
    `
    query PostsByCategory($categoryName: String!, $first: Int!) {
      posts(first: $first, where: { categoryName: $categoryName, orderby: { field: DATE, order: DESC } }) {
        nodes {
          title
          excerpt
          slug
          date
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          categories {
            nodes {
              name
              slug
            }
          }
          author {
            node {
              name
              avatar {
                url
              }
            }
          }
        }
      }
    }
  `,
    { variables: { categoryName, first } }
  );
  return data?.posts?.nodes;
}

export async function getAllCategories() {
  const data = await fetchAPI(
    `
    query AllCategories {
      categories {
        nodes {
          name
          slug
          count
        }
      }
    }
    `
  );
  return data?.categories?.nodes;
}
