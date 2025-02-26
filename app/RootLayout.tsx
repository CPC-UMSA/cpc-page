import { Link, useLocation, useParams } from '@remix-run/react';
import { Analytics } from '@vercel/analytics/react';
import { createInstance, i18n } from 'i18next';
import { Children, PropsWithChildren } from 'react';
import { SWRConfig } from 'swr';
import {
  ErrorBoundary,
  JukiProviders,
  JukiSocketAlert,
  NavigationBar,
  NewVersionAvailableTrigger,
  SubmissionModal,
  T,
  UserPreviewModal,
} from '~/components';
import { ClientOnly } from '~/components/ClientOnly';
import { jukiApiSocketManager, jukiAppRoutes, jukiGlobalStore } from '~/config';
import { JUKI_APP_COMPANY_KEY, NODE_ENV, ROUTES } from '~/config/constants';
import { useEffect, useJukiUI, useJukiUser, useState } from '~/hooks';
import { useRouter } from '~/hooks/useRouter';
import { useSearchParams } from '~/hooks/useSearchParams';
import initTranslations from '~/i18n/i18n';
import { UserProvider } from '~/store';
import { FC, Language, LastPathKey, LinkCmpProps } from '~/types';

const i18nInstance = createInstance() as i18n;

void initTranslations(i18nInstance);

const SponsoredByTag = () => {
  
  const { company: { key } } = useJukiUser();
  const { components: { Link } } = useJukiUI();
  
  if (key === JUKI_APP_COMPANY_KEY) {
    return null;
  }
  
  return (
    <div className="sponsored-by">
      <T>sponsored by</T>&nbsp;
      <Link href="https://juki.app" target="_blank" rel="noreferrer">Juki.app</Link>
    </div>
  );
};

export const RootLayout = ({ children }: PropsWithChildren) => {
  
  const [ _, setLanguage ] = useState<Language | undefined>();
  
  useEffect(() => {
    jukiApiSocketManager.setApiSettings(window.ENV.JUKI_SERVICE_V1_URL, window.ENV.JUKI_SERVICE_V2_URL, window.ENV.JUKI_TOKEN_NAME);
    jukiApiSocketManager.setSocketSettings(window.ENV.JUKI_SOCKET_BASE_URL);
    void jukiGlobalStore.setI18n(i18nInstance);
    
    const handleLanguageChange = (lng: Language) => setLanguage(lng);
    
    i18nInstance.on('languageChanged', handleLanguageChange);
    return () => {
      i18nInstance.off('languageChanged', handleLanguageChange);
    };
    
  }, []);
  
  console.log('RootLayout');
  
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
          [LastPathKey.SECTION_CONTEST]: {
            pathname: jukiAppRoutes.JUDGE().contests.list(),
            searchParams: new URLSearchParams(),
          },
          [LastPathKey.CONTESTS]: {
            pathname: jukiAppRoutes.JUDGE().contests.list(),
            searchParams: new URLSearchParams(),
          },
          [LastPathKey.SECTION_PROBLEM]: {
            pathname: jukiAppRoutes.JUDGE().problems.list(),
            searchParams: new URLSearchParams(),
          },
          [LastPathKey.PROBLEMS]: {
            pathname: jukiAppRoutes.JUDGE().problems.list(),
            searchParams: new URLSearchParams(),
          },
          [LastPathKey.BOARDS]: {
            pathname: ROUTES.BOARDS.PAGE(),
            searchParams: new URLSearchParams(),
          },
          [LastPathKey.SECTION_HELP]: { pathname: `/help`, searchParams: new URLSearchParams() },
        }}
      >
        <UserProvider>
          <NewVersionAvailableTrigger apiVersionUrl="/api/version" />
          <NavigationBar>
            <Analytics key="analytics" />
            {Children.toArray(children)}
            <UserPreviewModal key="user-preview-modal" />
            <SubmissionModal key="submission-modal" />
          </NavigationBar>
          <JukiSocketAlert />
          <SponsoredByTag />
        </UserProvider>
      </JukiProviders>
    </SWRConfig>
  );
  
  return (
    <ClientOnly>
      {NODE_ENV === 'development' ? app : <ErrorBoundary reload={refresh}>{app}</ErrorBoundary>}
    </ClientOnly>
  );
};
