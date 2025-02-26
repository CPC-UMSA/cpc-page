import { Dispatch, SetStateAction } from 'react';

export type FlagsType = { isHelpOpen: boolean, isHelpFocused: boolean };

export type SetFlagsType = Dispatch<SetStateAction<FlagsType>>;
