import { type LoaderFunctionArgs, type MetaFunction } from '@remix-run/node';
import { Link, useParams } from '@remix-run/react';
import { formatBlogDate, getBlogPost } from '~/data/blog';

export async function loader({ params }: LoaderFunctionArgs) {
  if (!getBlogPost(params.slug ?? '')) {
    throw new Response('Artículo no encontrado', { status: 404 });
  }
  return null;
}

export const meta: MetaFunction = ({ params }) => {
  const post = getBlogPost(params.slug ?? '');
  if (!post) return [{ title: 'Artículo no encontrado · Blog CPC UMSA' }];
  return [
    { title: `${post.title} · Blog CPC UMSA` },
    { name: 'description', content: post.summary },
    { property: 'og:title', content: post.title },
    { property: 'og:description', content: post.summary },
    { property: 'og:image', content: post.cover },
  ];
};

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = getBlogPost(slug ?? '');
  if (!post) return null;
  const { Content } = post;

  return (
    <article className="blog-page">
      <header className="blog-post-hero" style={{ backgroundImage: `url("${post.cover}")` }}>
        <div className="blog-post-hero-inner">
          <Link to="/blog" className="blog-back">
            ← Volver al blog
          </Link>
          <div className="blog-tags">
            {post.tags.map((tag) => (
              <span key={tag} className="blog-tag blog-tag-light">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="blog-post-title cr-we">{post.title}</h1>
          <p className="blog-meta blog-meta-light">
            <time dateTime={post.date}>{formatBlogDate(post.date)}</time> · {post.author}
          </p>
        </div>
      </header>

      <div className="blog-post-body">
        <Content />
      </div>
    </article>
  );
}

export function ErrorBoundary() {
  return (
    <div className="blog-page">
      <div className="blog-content blog-empty">
        <p>No encontramos ese artículo.</p>
        <Link to="/blog">← Ver todos los artículos</Link>
      </div>
    </div>
  );
}
