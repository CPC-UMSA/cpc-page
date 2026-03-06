type JudgeType = 'BOCA' | 'BOCA_LOCAL' | 'VIRTUAL_JUDGE';

type CompetitionMode = 'INDIVIDUAL' | 'TEAMS';

interface ScoreboardEntry {
  place: number;
  team_name: string; // In INDIVIDUAL mode, can be empty or the student's name
  problems_solved: number | null;
  total_time: number | null;
  participants: string[]; // Student IDs (reference to DB or names)
  coach?: string | null; // Optional, usually null in Div2
}

export interface Competition {
  competition_id: string; // e.g. "2025-4-latino"
  name: string; // e.g. "Latinoamericano"
  year: number;
  location: string;
  judge: JudgeType;
  mode?: CompetitionMode; // Optional for backwards compatibility with historical records
  total_problems: number | null;
  slots?: number | null; // Mostly used in Second Division
  scoreboard: ScoreboardEntry[];
  resources: { url: string; name: string }[];
}