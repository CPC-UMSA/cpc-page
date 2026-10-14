import { MenuViewMode } from '@juki-team/commons/enums';
import { Link } from '@remix-run/react';
import { PropsWithChildren, ReactNode } from 'react';
import { AssignmentIcon, HorizontalMenu, LoginUser, MainMenu, T, usePageStore } from '~/components';
import { SiteFooter } from '~/components/SiteFooter';
import { jukiAppRoutes } from '~/config';
import { ROUTES } from '~/config/constants';
import { useRouterStore, useUserStore } from '~/hooks';
import { MenuType } from '~/types';

type NavItem = { to: string; label: string; icon: ReactNode };

const NAV_ITEMS: NavItem[] = [
  { to: '/icpc-results', label: 'ICPC Results', icon: <AssignmentIcon /> },
  { to: '/judges', label: 'judges', icon: <span style={{ fontSize: 18 }}>⚙️</span> },
  { to: '/photos', label: 'photos', icon: <span style={{ fontSize: 18 }}>📷</span> },
  { to: '/equipos-2026', label: 'Equipos 2026', icon: <span style={{ fontSize: 18 }}>🏆</span> },
  { to: '/nuestras-actividades', label: 'Actividades', icon: <span style={{ fontSize: 18 }}>📅</span> },
  { to: '/directiva', label: 'Directiva', icon: <span style={{ fontSize: 18 }}>👥</span> },
];

const isRouteSelected = (pathname: string, to: string) => ('/' + pathname).includes('/' + to);

const MobileNavDrawer = ({ pathname, onClose }: { pathname: string; onClose: () => void }) => (
  <nav className="mobile-nav">
    <div className="mobile-nav-head">
      <Link to="/" onClick={onClose} aria-label="Inicio">
        <img src="/logoICPC2x1.png" alt="Club de Programación Competitiva UMSA" width={92} height={46} />
      </Link>
    </div>
    <ul className="mobile-nav-list">
      {[{ to: '/', label: 'Inicio', icon: <span style={{ fontSize: 18 }}>🏠</span> }, ...NAV_ITEMS].map((item) => {
        const selected = item.to === '/' ? pathname === '/' || pathname === '' : isRouteSelected(pathname, item.to);
        return (
          <li key={item.to}>
            <Link to={item.to} onClick={onClose} className={`mobile-nav-link${selected ? ' selected' : ''}`} aria-current={selected ? 'page' : undefined}>
              <span className="mobile-nav-icon">{item.icon}</span>
              <T className="tt-se">{item.label}</T>
            </Link>
          </li>
        );
      })}
    </ul>
  </nav>
);

export const NavigationBar = ({ children }: PropsWithChildren) => {
  const { pathname, pushRoute } = useRouterStore();
  const isSmallScreen = usePageStore((store) => store.viewPort.isSmallScreen);
  const {
    nickname,
    organization: { key: organizationKey },
  } = useUserStore((store) => store.user);
  const isContestsPage = ('/' + pathname).includes('//icpc-results');
  const isHallFamePage = ('/' + pathname).includes('//hall-of-fame');
  const backPah = isContestsPage ? ROUTES.CONTESTS.PAGE() : isHallFamePage ? jukiAppRoutes.JUDGE().problems.list() : '/';
  const onSeeMyProfile = () => pushRoute(jukiAppRoutes.JUDGE().profiles.view({ nickname, organizationKey }));
  const profileSelected = pathname.includes('/profile/');

  const menu: MenuType[] = NAV_ITEMS.map((item) => ({
    label: <T className="tt-se">{item.label}</T>,
    icon: item.icon,
    selected: isRouteSelected(pathname, item.to),
    menuItemWrapper: ({ children }) => <Link to={item.to}>{children}</Link>,
  }));

  const content = (
    <div className="site-scroll">
      <div className="site-content">{children}</div>
      <SiteFooter />
    </div>
  );

  // En móvil, el menú de la librería muestra todas las secciones en una barra inferior apretada;
  // en su lugar usamos un botón hamburguesa que abre un panel lateral.
  if (isSmallScreen) {
    return (
      <HorizontalMenu
        className="site-mobile-menu"
        menu={[]}
        drawerMenuMobile={({ onClose }) => <MobileNavDrawer pathname={pathname} onClose={onClose} />}
        centerMobile={{
          children: (
            <Link to="/" className="jk-row" aria-label="Inicio">
              <img src="/logoICPC2x1.png" alt="Club de Programación Competitiva UMSA" width={72} height={36} />
            </Link>
          ),
        }}
        rightMobile={{
          children: <LoginUser isHorizontal popoverPlacement="bottom-end" onSeeMyProfile={onSeeMyProfile} profileSelected={profileSelected} />,
        }}
      >
        {content}
      </HorizontalMenu>
    );
  }

  return (
    <MainMenu
      menuViewMode={MenuViewMode.HORIZONTAL}
      onSeeMyProfile={onSeeMyProfile}
      menu={menu}
      profileSelected={profileSelected}
      onBack={
        pathname !== backPah
          ? () => {
              pushRoute(backPah);
            }
          : undefined
      }
      topImageUrl="/logoICPC2x1.png"
    >
      {content}
    </MainMenu>
  );
};
