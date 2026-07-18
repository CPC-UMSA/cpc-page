import {
  DocumentMembersResponseDTO,
  EntityState,
  Judge,
  UpsertProblemDTO,
  UserOrganizationBasicInfoResponseDTO,
} from './commons';

export type KeyFileType = 'input' | 'output';

export interface UpsertProblemUIDTO extends Omit<UpsertProblemDTO, 'members'> {
  judgeKey: Judge | string,
  judgeIsExternal: boolean,
  members: DocumentMembersResponseDTO,
  owner: UserOrganizationBasicInfoResponseDTO,
  state: EntityState,
}

export enum PrintMode {
  AS_PROBLEM_SET = 'asProblemSet'
}
