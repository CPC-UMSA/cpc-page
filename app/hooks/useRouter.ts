import { useNavigate, useNavigation } from '@remix-run/react';
import { useCallback } from 'react';

export const useRouter = () => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  
  const push = useCallback(async (url: string) => {
      navigate(url);
  }, [ navigate ]);
  
  const replace = useCallback(async (url: string) => {
      navigate(url, { replace: true });
  }, [ navigate ]);
  
  const refresh = useCallback(async () => {
    navigate('.', { replace: true });
  }, [ navigate ]);
  
  return { push, replace, refresh, isLoadingRoute: navigation.state === 'loading' };
};
