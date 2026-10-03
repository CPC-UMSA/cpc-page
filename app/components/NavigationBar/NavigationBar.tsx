import { MenuViewMode } from '@juki-team/commons/enums';
import { Link } from '@remix-run/react';
import { PropsWithChildren } from 'react';
import { AssignmentIcon, MainMenu, T } from '~/components';
import { jukiAppRoutes } from '~/config';
import { ROUTES } from '~/config/constants';
import { useRouterStore, useUserStore } from '~/hooks';
import { MenuType } from '~/types';

export const NavigationBar = ({ children }: PropsWithChildren) => {
  const { pathname, pushRoute } = useRouterStore();
  const {
    nickname,
    organization: { key: organizationKey },
  } = useUserStore((store) => store.user);
  const isContestsPage = ('/' + pathname).includes('//icpc-results');
  const isHallFamePage = ('/' + pathname).includes('//hall-of-fame');
  const isJudgesPage = ('/' + pathname).includes('//judges');
  const isPhotosPage = ('/' + pathname).includes('//photos');
  const isDivision1Page = ('/' + pathname).includes('//division-1');
  const isDivision2Page = ('/' + pathname).includes('//division-2');
  const isEquipos2026Page = ('/' + pathname).includes('//equipos-2026');
  const isActividadesPage = ('/' + pathname).includes('//nuestras-actividades');
  const backPah = isContestsPage ? ROUTES.CONTESTS.PAGE() : isHallFamePage ? jukiAppRoutes.JUDGE().problems.list() : '/';

  const menu: MenuType[] = [
    // {
    //   label: <T className="tt-se">hall of fame</T>,
    //   icon: <TrophyIcon />,
    //   selected: isHallFamePage,
    //   menuItemWrapper: ({ children }) => <Link to="/hall-of-fame">{children}</Link>,
    // },
    {
      label: <T className="tt-se">ICPC Results</T>,
      icon: <AssignmentIcon />,
      selected: isContestsPage,
      menuItemWrapper: ({ children }) => <Link to="/icpc-results">{children}</Link>,
    },
    {
      label: <T className="tt-se">judges</T>,
      icon: <span style={{ fontSize: 18 }}>⚙️</span>,
      selected: isJudgesPage,
      menuItemWrapper: ({ children }) => <Link to="/judges">{children}</Link>,
    },
    {
      label: <T className="tt-se">photos</T>,
      icon: <span style={{ fontSize: 18 }}>📷</span>,
      selected: isPhotosPage,
      menuItemWrapper: ({ children }) => <Link to="/photos">{children}</Link>,
    },
    {
      label: <T className="tt-se">Division 1</T>,
      icon: <span style={{ fontSize: 18 }}>🏁</span>,
      selected: isDivision1Page,
      menuItemWrapper: ({ children }) => <Link to="/division-1">{children}</Link>,
    },
    {
      label: <T className="tt-se">Division 2</T>,
      icon: <span style={{ fontSize: 18 }}>🎯</span>,
      selected: isDivision2Page,
      menuItemWrapper: ({ children }) => <Link to="/division-2">{children}</Link>,
    },
    {
      label: <T className="tt-se">Equipos 2026</T>,
      icon: <span style={{ fontSize: 18 }}>🏆</span>,
      selected: isEquipos2026Page,
      menuItemWrapper: ({ children }) => <Link to="/equipos-2026">{children}</Link>,
    },
    {
      label: <T className="tt-se">Actividades</T>,
      icon: <span style={{ fontSize: 18 }}>📅</span>,
      selected: isActividadesPage,
      menuItemWrapper: ({ children }) => <Link to="/nuestras-actividades">{children}</Link>,
    },
  ];

  return (
    <MainMenu
      menuViewMode={MenuViewMode.HORIZONTAL}
      onSeeMyProfile={() => pushRoute(jukiAppRoutes.JUDGE().profiles.view({ nickname, organizationKey }))}
      menu={menu}
      profileSelected={pathname.includes('/profile/')}
      onBack={
        pathname !== backPah
          ? () => {
              pushRoute(backPah);
            }
          : undefined
      }
      topImageUrl="/logoICPC2x1.png"
    >
      {children}
    </MainMenu>
  );
};
