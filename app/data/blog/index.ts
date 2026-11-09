import { latino2026Sucre } from './posts/latino-2026-sucre';
import type { BlogPost } from './types';

export type { BlogPost } from './types';

/**
 * Para publicar un nuevo artículo:
 *   1. Crea `app/data/blog/posts/<slug>.tsx` exportando un `BlogPost` (usa latino-2026-sucre.tsx como plantilla).
 *   2. Agrégalo a la lista de abajo. El orden no importa: se ordenan por fecha, del más reciente al más antiguo.
 */
const POSTS: BlogPost[] = [latino2026Sucre];

export const BLOG_POSTS = [...POSTS].sort((a, b) => b.date.localeCompare(a.date));

export const getBlogPost = (slug: string) => BLOG_POSTS.find((post) => post.slug === slug) ?? null;

export const formatBlogDate = (date: string) =>
  new Date(`${date}T12:00:00`).toLocaleDateString('es-BO', { day: 'numeric', month: 'long', year: 'numeric' });
