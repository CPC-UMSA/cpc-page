import { type MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import { BLOG_POSTS, formatBlogDate } from '~/data/blog';

export const meta: MetaFunction = () => [
  { title: 'Blog · Club de Programación Competitiva UMSA' },
  { name: 'description', content: 'Noticias, crónicas de competencias y novedades del Club de Programación Competitiva UMSA.' },
];

export async function loader() {
  return null;
}

export default function BlogIndex() {
  return (
    <div className="blog-page">
      <div className="blog-hero">
        <h1 className="blog-hero-title cr-we">Blog</h1>
        <p className="blog-hero-sub">Crónicas, resultados y novedades del CPC UMSA</p>
      </div>

      <div className="blog-content">
        {BLOG_POSTS.length === 0 ? (
          <p className="blog-empty">Pronto publicaremos nuestro primer artículo.</p>
        ) : (
          <div className="blog-grid">
            {BLOG_POSTS.map((post) => (
              <Link key={post.slug} to={`/blog/${post.slug}`} className="blog-card">
                <div className="blog-card-cover">
                  <img src={post.cover} alt="" loading="lazy" />
                </div>
                <div className="blog-card-body">
                  <div className="blog-tags">
                    {post.tags.map((tag) => (
                      <span key={tag} className="blog-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="blog-card-title">{post.title}</h2>
                  <p className="blog-card-summary">{post.summary}</p>
                  <p className="blog-meta">
                    <time dateTime={post.date}>{formatBlogDate(post.date)}</time> · {post.author}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
