import { EntityState } from '~/types';
import {
  ContestDataResponseDTO,
  EntityCompanySummaryListResponseDTO,
  EntityMembersResponseDTO,
  ProblemJudgeSummaryListResponseDTO,
  UpsertContestProblemDTO,
} from './commons';
import { UpsertContestDTO } from './index';

export type UpsertContestProblemDTOUI = UpsertContestProblemDTO & {
  name: string,
  judge: ProblemJudgeSummaryListResponseDTO,
  tags: string[],
  company: EntityCompanySummaryListResponseDTO,
};

export interface UpsertContestDTOUI extends Omit<UpsertContestDTO, 'members'> {
  owner: ContestDataResponseDTO['owner'],
  members: EntityMembersResponseDTO,
  problems: { [key: string]: UpsertContestProblemDTOUI },
  state: EntityState,
}

export enum ContestTemplate {
  CLASSIC = 'CLASSIC',
  ENDLESS = 'ENDLESS',
  GLOBAL = 'GLOBAL',
  CUSTOM = 'CUSTOM',
}
