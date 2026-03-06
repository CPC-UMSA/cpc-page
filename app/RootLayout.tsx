import { EMPTY_COMPANY, EMPTY_USER } from '@juki-team/base-ui/constants';
import { Link, useLocation, useParams } from '@remix-run/react';
import { Analytics } from '@vercel/analytics/react';
import { createInstance, i18n } from 'i18next';
import { Children, PropsWithChildren } from 'react';
import { SWRConfig } from 'swr';
import { ErrorBoundary, JukiI18nInitializer, JukiProviders, NavigationBar, NewVersionAvailable, StylesLazy, T, UserStoreProvider } from '~/components';
import { ClientOnly } from '~/components/ClientOnly';
import { JUKI_APP_COMPANY_KEY, NODE_ENV, ROUTES } from '~/config/constants';
import { useUIStore, useUserStore } from '~/hooks';
import { useRouter } from '~/hooks/useRouter';
import { useSearchParams } from '~/hooks/useSearchParams';
import initTranslations from '~/i18n/i18n';
import { FC, InitUserState, LastPathKey, LinkCmpProps } from '~/types';

const i18nInstance = createInstance() as i18n;

void initTranslations(i18nInstance);

const SponsoredByTag = () => {
  const companyKey = useUserStore((store) => store.company.key);
  const {
    components: { Link },
  } = useUIStore();

  if (companyKey === JUKI_APP_COMPANY_KEY) {
    return null;
  }

  return (
    <div className="sponsored-by">
      <T>sponsored by</T>&nbsp;
      <Link href="https://juki.app" target="_blank" rel="noreferrer">
        Juki.app
      </Link>
    </div>
  );
};

const EMPTY_INITIAL_USER = {
  user: EMPTY_USER,
  company: EMPTY_COMPANY,
  isLoading: false,
};

export const RootLayout = ({ children, initialUser = EMPTY_INITIAL_USER }: PropsWithChildren<{ initialUser: InitUserState | undefined }>) => {
  const { isLoadingRoute, push, replace, refresh } = useRouter();
  const routeParams = useParams();
  const location = useLocation();
  const pathname = location.pathname;
  const { searchParams, setSearchParams, deleteSearchParams, appendSearchParams } = useSearchParams();

  const app = (
    <SWRConfig
      value={{
        revalidateIfStale: true, // when back to pages
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        errorRetryCount: 8,
        errorRetryInterval: 100,
        // shouldRetryOnError: (error) => {
        //   console.log('shouldRetryOnError', { error });
        //   return !error.message.includes('401');
        // },
        // onSuccess: (...props) => {
        //   console.log('onSuccess', props);
        // },
        // onError: (err, key) => {
        //   console.log('onError', { err, key });
        //   // Usar datos en caché si existe un error
        //   // const cachedData = SWRConfig.default.provider().get(key);
        //   // if (cachedData) mutate(key, cachedData, false);
        // },
      }}
    >
      <JukiProviders
        multiCompanies={false}
        onSeeMyProfile={() => {}}
        components={{ Link: Link as unknown as FC<LinkCmpProps> }}
        router={{
          searchParams,
          setSearchParams,
          deleteSearchParams,
          appendSearchParams,
          pathname,
          routeParams,
          pushRoute: push,
          replaceRoute: replace,
          reloadRoute: refresh,
          isLoadingRoute,
        }}
        initialLastPath={{
          [LastPathKey.CONTESTS]: ROUTES.CONTESTS.PAGE(),
          [LastPathKey.BOARDS]: ROUTES.BOARDS.PAGE(),
          [LastPathKey.SECTION_HELP]: '/help',
          [LastPathKey.JUDGES]: '/judges',
        }}
      >
        <NavigationBar>
          <Analytics key="analytics" />
          {Children.toArray(children)}
        </NavigationBar>
        <NewVersionAvailable apiVersionUrl="/api/version" />
        <SponsoredByTag />
      </JukiProviders>
    </SWRConfig>
  );

  return (
    <ClientOnly>
      <JukiI18nInitializer />
      <StylesLazy />
      <UserStoreProvider initialUser={initialUser}>
        {NODE_ENV === 'development' ? app : <ErrorBoundary reload={refresh}>{app}</ErrorBoundary>}
      </UserStoreProvider>
    </ClientOnly>
  );
};
