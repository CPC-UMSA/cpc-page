import { createContext } from '~/helpers';
import { useState } from '~/hooks';
import { FlagsType, PropsWithChildren, SetFlagsType } from '~/types';

export const UserContext = createContext<{ flags: FlagsType, setFlags: SetFlagsType }>({
  flags: {
    isHelpOpen: false,
    isHelpFocused: false,
  }, setFlags: () => null,
});

export const _setFlags: { current: SetFlagsType } = { current: () => null };

export const UserProvider = ({ children }: PropsWithChildren<{}>) => {
  
  const [ flags, setFlags ] = useState<FlagsType>({ isHelpOpen: false, isHelpFocused: false });
  _setFlags.current = setFlags;
  
  return (
    <UserContext.Provider value={{ flags, setFlags }}>
      {children}
    </UserContext.Provider>
  );
};
