import { json, LinksFunction } from '@remix-run/node';
import './global.scss';
import { Links, Meta, Outlet, Scripts, ScrollRestoration, useRouteLoaderData } from '@remix-run/react';
import { ReactNode } from 'react';
import { RootLayout } from '~/RootLayout';

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

export async function loader() {
  return json({
    ENV: {
      JUKI_SERVICE_V1_URL: process.env.PUBLIC_JUKI_SERVICE_V1_URL || '',
      JUKI_SERVICE_V2_URL: process.env.PUBLIC_JUKI_SERVICE_V2_URL || '',
      JUKI_SOCKET_BASE_URL: process.env.PUBLIC_JUKI_SOCKET_BASE_URL || '',
      JUKI_TOKEN_NAME: process.env.PUBLIC_JUKI_TOKEN_NAME || '',
    },
  });
}

export function Layout({ children }: { children: ReactNode }) {
  
  const data = useRouteLoaderData<typeof loader>('root');
  console.log({ data });
  return (
    <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
        rel="stylesheet"
      />
      <Meta />
      <Links />
    </head>
    <body className="jk-custom-theme">
    <script
      dangerouslySetInnerHTML={{
        __html: `window.ENV = ${JSON.stringify(data?.ENV ?? {})}`,
      }}
    />
    <RootLayout>
      {children}
    </RootLayout>
    <ScrollRestoration />
    <Scripts />
    </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
