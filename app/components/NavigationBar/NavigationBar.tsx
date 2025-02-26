import { MenuViewMode } from '@juki-team/commons';
import { Link } from '@remix-run/react';
import { PropsWithChildren } from 'react';
import { AssignmentIcon, MainMenu, T, TrophyIcon } from '~/components';
import { jukiAppRoutes } from '~/config';
import { useJukiRouter, useJukiUser } from '~/hooks';
import { MenuType, ProfileSetting } from '~/types';

export const NavigationBar = ({ children }: PropsWithChildren) => {
  
  const { pathname, pushRoute } = useJukiRouter();
  const {
    user: {
      nickname,
      settings: { [ProfileSetting.THEME]: userTheme },
    },
    company: { key },
  } = useJukiUser();
  const isContestsPage = ('/' + pathname).includes('//contest');
  const isProblemsPage = ('/' + pathname).includes('//problem');
  const backPah = isContestsPage ? jukiAppRoutes.JUDGE().contests.list()
    : isProblemsPage
      ? jukiAppRoutes.JUDGE().problems.list()
      : '/';
  
  const menu: MenuType[] = [
    {
      label: <T className="tt-se">hall of fame</T>,
      icon: <TrophyIcon />,
      selected: isContestsPage,
      menuItemWrapper: ({ children }) => (
        <Link to="/hall-of-fame">
          {children}
        </Link>
      ),
    },
    {
      label: <T className="tt-se">contests</T>,
      icon: <AssignmentIcon />,
      selected: isProblemsPage,
      menuItemWrapper: ({ children }) => (
        <Link to="/contests">
          {children}
        </Link>
      ),
    },
  ];
  
  return (
    <MainMenu
      menuViewMode={MenuViewMode.HORIZONTAL}
      onSeeMyProfile={() => pushRoute(jukiAppRoutes.JUDGE().profiles.view({ nickname }))}
      menu={menu}
      profileSelected={pathname.includes('/profile/')}
      onBack={pathname !== backPah ? () => {
        pushRoute(backPah);
      } : undefined}
      topImageUrl="https://scontent.flpb2-2.fna.fbcdn.net/v/t39.30808-1/305407690_537253288204759_1185566799384740876_n.jpg?stp=c0.0.1626.1626a_dst-jpg_s480x480_tt6&_nc_cat=103&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=ChPF4DOE-wgQ7kNvgFnQg2W&_nc_oc=AdiAI1INiBSzrQ9X24rD-MiVYb07IPbLQjqHp9rLBpeSjdwX-kyQ9e9clptyrLjFX9Q&_nc_zt=24&_nc_ht=scontent.flpb2-2.fna&_nc_gid=AvE36KfGlqItrLPDaZj3egD&oh=00_AYA7omnf26uC_MsTdj4y9tDaxeI1kGPPHciMHKWRi7zyiw&oe=67B6B7EB"
    >
      {children}
    </MainMenu>
  );
};
