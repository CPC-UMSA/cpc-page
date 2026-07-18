import {
  EntityMembersResponseDto,
  EntityState,
  Judge,
  UpsertProblemDto,
  UserOrganizationBasicInfoResponseDto,
} from './commons';

export type KeyFileType = 'input' | 'output';

export interface UpsertProblemUIDto extends Omit<UpsertProblemDto, 'members'> {
  judgeKey: Judge | string,
  judgeIsExternal: boolean,
  members: EntityMembersResponseDto,
  owner: UserOrganizationBasicInfoResponseDto,
  state: EntityState,
}

export enum PrintMode {
  AS_PROBLEM_SET = 'asProblemSet'
}
