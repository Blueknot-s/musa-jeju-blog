export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const res = await fetch(
      'https://steelblue-seal-184760.hostingersite.com/wp-json/wp/v2/posts?per_page=1&_embed',
      { cache: 'no-store' }
    );
    const data = await res.json();
    return Response.json({ 
      status: res.status,
      ok: res.ok,
      postCount: Array.isArray(data) ? data.length : 0,
      firstPost: data[0]?.title?.rendered || 'none',
      error: Array.isArray(data) ? null : data
    });
  } catch (error) {
    return Response.json({ error: String(error) }, { status: 500 });
  }
}
```

5. **Commit changes**

---

### 2. 배포 완료 후 접속
```
https://musajeju.blue-knot.com/api/test
