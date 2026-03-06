import { MenuViewMode } from '@juki-team/commons';
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
    company: { key: companyKey },
  } = useUserStore((store) => store.user);
  console.log('>>', { pathname });
  const isContestsPage = ('/' + pathname).includes('//icpc-results');
  const isHallFamePage = ('/' + pathname).includes('//hall-of-fame');
  const isJudgesPage = ('/' + pathname).includes('//judges');
  const isPhotosPage = ('/' + pathname).includes('//photos');
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
  ];

  return (
    <MainMenu
      menuViewMode={MenuViewMode.HORIZONTAL}
      onSeeMyProfile={() => pushRoute(jukiAppRoutes.JUDGE().profiles.view({ nickname, companyKey }))}
      menu={menu}
      profileSelected={pathname.includes('/profile/')}
      onBack={
        pathname !== backPah
          ? () => {
              pushRoute(backPah);
            }
          : undefined
      }
      topImageUrl="https://images.juki.pub/assets/umsa/logo.jpg"
    >
      {children}
    </MainMenu>
  );
};
