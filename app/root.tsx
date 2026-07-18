import { EMPTY_ORGANIZATION, EMPTY_USER } from '@juki-team/base-ui/constants';
import { json, LinksFunction, LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import './global.scss';
import { Links, Meta, Outlet, Scripts, ScrollRestoration, useRouteLoaderData } from '@remix-run/react';
import { ReactNode } from 'react';
import { RootLayout } from '~/RootLayout';
import type { InitUserState } from '~/types';
import '@juki-team/base-ui/styles.scss';

export const meta: MetaFunction = () => [
  { title: 'Club de Programación Competitiva · UMSA' },
  {
    name: 'description',
    content:
      'Comunidad de programación competitiva de la Universidad Mayor de San Andrés (UMSA). Participamos en ICPC, la Competencia Boliviana de Programación y otras competencias nacionales e internacionales.',
  },
  { name: 'keywords', content: 'programación competitiva, ICPC, UMSA, algoritmos, Bolivia, HACKER, Codeforces, Kattis' },
  { name: 'author', content: 'Club de Programación Competitiva UMSA' },
  { property: 'og:type', content: 'website' },
  { property: 'og:site_name', content: 'CPC UMSA' },
  { property: 'og:title', content: 'Club de Programación Competitiva · UMSA' },
  {
    property: 'og:description',
    content: 'Comunidad de programación competitiva de la UMSA. Aprende algoritmos, resuelve problemas y representa a Bolivia en competencias internacionales.',
  },
  { property: 'og:image', content: '/logo_cpc.ico' },
  { name: 'twitter:card', content: 'summary' },
  { name: 'twitter:title', content: 'Club de Programación Competitiva · UMSA' },
  {
    name: 'twitter:description',
    content: 'Comunidad de programación competitiva de la UMSA. Participa en ICPC y competencias nacionales.',
  },
  { name: 'twitter:image', content: '/logo_cpc.ico' },
];

export const links: LinksFunction = () => [
  { rel: 'icon', href: '/logo_cpc.ico', type: 'image/x-icon' },
  { rel: 'shortcut icon', href: '/logo_cpc.ico', type: 'image/x-icon' },
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const baseUrl = process.env.PUBLIC_JUKI_SERVICE_V2_URL || '';
  const cookie = request.headers.get('cookie') || '';
  const host = request.headers.get('host') || '';
  const protocol = request.headers.get('x-forwarded-proto') ?? 'https';
  const origin = `${protocol}://${host}`;

  let initialUser = { user: EMPTY_USER, organization: EMPTY_ORGANIZATION, isLoading: false };

  if (baseUrl) {
    try {
      const response = await fetch(`${baseUrl}/auth/ping`, {
        headers: { cookie, origin, referer: `${origin}/` },
      });
      const session = await response.json();
      if (session?.success) {
        initialUser = { user: session.content.user, organization: session.content.organization, isLoading: false };
      }
    } catch {
      // fallback to empty user
    }
  }

  return json({
    initialUser,
  });
}

export function Layout({ children }: { children: ReactNode }) {
  const data = useRouteLoaderData<typeof loader>('root');
  // the loader always sets organization, but Remix's Jsonify widens it to optional
  const initialUser: InitUserState | undefined = data?.initialUser
    ? { ...data.initialUser, organization: data.initialUser.organization ?? EMPTY_ORGANIZATION }
    : undefined;

  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
        <Meta />
        <Links />
      </head>
      <body className="jk-custom-theme">
        <ScrollRestoration />
        <Scripts />
        <RootLayout initialUser={initialUser}>{children}</RootLayout>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
