export { ErrorCode, Judge, Language, MenuViewMode, Status, EntityState } from '@juki-team/commons/enums';

export type { TextLanguage } from '@juki-team/commons/types';

export type {
  UserProfileResponseDto,
  UpsertProblemDto,
  EntityMembersResponseDto,
  UserOrganizationBasicInfoResponseDto,
} from '@juki-team/commons/dto';

export type {
  ButtonLoaderOnClickType,
  SetLoaderStatusOnClickType,
  DeleteSearchParamsType,
  SetSearchParamsType,
  LinkCmpProps,
  ImageCmpProps,
  AppendSearchParamsType,
  PlacementType,
  TabsType,
  TabType,
  TwoContentLayoutProps,
  TwoContentSectionProps,
  MenuType,
  DataViewerHeadersType,
  FilterSelectOfflineType,
  CropImageType,
  FilterTextOfflineType,
  SetLoaderStatusType,
  CodeEditorExpandPositionType,
  GetRecordKeyType,
  JkTableHeaderFilterType,
  FilterSelectOnlineType,
  OnRecordClickType,
  DataViewerRequesterGetUrlType,
  GetRecordStyleType,
  UserCodeEditorProps,
  UpsertComponentEntityProps,
  InitUserState,
} from '@juki-team/base-ui/types';
export { ProfileTab } from '@juki-team/base-ui/enums';

export enum LastPathKey {
  CONTESTS = 'CONTESTS',
  SECTION_HELP = 'SECTION_HELP',
  BOARDS = 'BOARDS',
  JUDGES = 'JUDGES',
}

export type { PropsWithChildren, ReactNode, FC } from 'react';
export type { KeyedMutator } from 'swr';
