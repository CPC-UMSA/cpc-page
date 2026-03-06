import { EMPTY_COMPANY, EMPTY_USER } from '@juki-team/base-ui/constants';
import { json, LinksFunction, LoaderFunctionArgs } from '@remix-run/node';
import './global.scss';
import { Links, Meta, Outlet, Scripts, ScrollRestoration, useRouteLoaderData } from '@remix-run/react';
import { ReactNode } from 'react';
import { RootLayout } from '~/RootLayout';
import '@juki-team/base-ui/styles.scss';

export const links: LinksFunction = () => [
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

  let initialUser = { user: EMPTY_USER, company: EMPTY_COMPANY, isLoading: false };

  if (baseUrl) {
    try {
      const response = await fetch(`${baseUrl}/auth/ping`, {
        headers: { cookie, origin, referer: `${origin}/` },
      });
      const session = await response.json();
      if (session?.success) {
        initialUser = { user: session.content.user, company: session.content.company, isLoading: false };
      }
    } catch {
      // fallback to empty user
    }
  }

  return json({
    ENV: {
      NEXT_PUBLIC_JUKI_SERVICE_V2_URL: process.env.PUBLIC_JUKI_SERVICE_V2_URL || '',
      NEXT_PUBLIC_JUKI_TOKEN_NAME: process.env.PUBLIC_JUKI_TOKEN_NAME || '',
    },
    initialUser,
  });
}

export function Layout({ children }: { children: ReactNode }) {
  const data = useRouteLoaderData<typeof loader>('root');

  return (
    <html lang="en">
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
        window.ENV = ${JSON.stringify(data?.ENV ?? {})};
        window.process = { env: ${JSON.stringify(data?.ENV ?? {})} };
        `,
          }}
        />
        <ScrollRestoration />
        <Scripts />
        <RootLayout initialUser={data?.initialUser}>{children}</RootLayout>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
