export enum QueryParam {
  SUBMISSION_VIEW = 'sv',
  // tables
  MY_STATUS_TABLE = 'mst',
  STATUS_TABLE = 'sst',
  ALL_SUBMISSIONS_TABLE = 'ast',
  PROFILE_SUBMISSIONS_TABLE = 'pst',
  ALL_USERS_TABLE = 'aut',
  ECS_DEFINITIONS_TASK_TABLE = 'edt',
  ECS_TASKS_TABLE = 'ett',
  LOGGED_USERS_TABLE = 'lut',
  CONTEST_PROBLEMS_TABLE = 'cpt',
  // contests
  ALL_CONTESTS_TABLE = 'act',
  ENDLESS_CONTESTS_TABLE = 'ect',
  LIVE_CONTESTS_TABLE = 'lct',
  UPCOMING_CONTESTS_TABLE = 'uct',
  PAST_CONTESTS_TABLE = 'pct',
  //
  SCOREBOARD_TABLE = 'sdt',
  PROBLEMS_TABLE = 'pmt',
  RANKING_TABLE = 'rgt',
  // courses
  COURSES_TABLE = 'cst',
  // problems
  JUDGE = 'judge',
  PRINT_MODE = 'print-mode',
  // adming
  COMPANY = 'company',
}

export enum ContestsTab {
  ALL = 'all',
  ENDLESS = 'endless',
  LIVE = 'live',
  UPCOMING = 'upcoming',
  PAST = 'past',
}
