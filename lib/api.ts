const API_URL = 'https://steelblue-seal-184760.hostingersite.com/graphql';

async function fetchAPI(query: string, { variables }: { variables?: any } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  const res = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 }, // Revalidate every 60 seconds
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
  return data?.posts?.nodes;
}

export async function getPostBySlug(slug: string) {
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
    { variables: { id: slug, idType: 'SLUG' } }
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
