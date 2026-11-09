import type { ComponentType } from 'react';

export type BlogPost = {
  /** Parte final de la URL: /blog/<slug>. Única y sin espacios. */
  slug: string;
  title: string;
  /** Fecha de publicación en formato ISO (AAAA-MM-DD). Ordena el listado. */
  date: string;
  author: string;
  /** Resumen corto para la tarjeta del listado y la descripción SEO. */
  summary: string;
  /** Imagen de portada (ruta pública). */
  cover: string;
  tags: string[];
  /** Cuerpo del artículo en JSX; usa las clases `blog-*` para mantener el estilo. */
  Content: ComponentType;
};
