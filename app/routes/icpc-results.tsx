import { useState } from 'react';
import { type LoaderFunctionArgs, type MetaFunction } from '@remix-run/node';
import { Link, useLoaderData, useNavigate } from '@remix-run/react';
import { CompetitionResults } from '~/components';
import type { Competition } from '~/types';

export const meta: MetaFunction = () => [{ title: 'ICPC Results' }];

const modules = import.meta.glob('../data/**/*.ts') as Record<string, () => Promise<{ default: Competition }>>;

function getAvailableYears(): number[] {
  const years = new Set<number>();
  for (const filePath of Object.keys(modules)) {
    const match = filePath.match(/\/(\d{4})\//);
    if (match) years.add(Number(match[1]));
  }
  return [...years].sort((a, b) => b - a);
}

type Appearance = {
  year: number;
  competition_name: string;
  team_name: string;
  role: 'participant' | 'coach';
  place: number;
};

type ParticipantSummary = {
  name: string;
  appearances: Appearance[];
  as_participant: number;
  as_coach: number;
};

const SKIP_NAMES = new Set(['Guest', 'VIRTUAL', 'INDIVIDUAL', 'INDIVIDUAL_AND_TEAMS', 'TEAMS', 'Scoreboard']);

function buildParticipants(competitions: Competition[]): ParticipantSummary[] {
  const map = new Map<string, ParticipantSummary>();

  const getEntry = (name: string) => {
    if (!map.has(name)) map.set(name, { name, appearances: [], as_participant: 0, as_coach: 0 });
    return map.get(name)!;
  };

  for (const comp of competitions) {
    for (const entry of comp.scoreboard) {
      for (const name of entry.participants) {
        if (!name || SKIP_NAMES.has(name)) continue;
        const p = getEntry(name);
        p.appearances.push({ year: comp.year, competition_name: comp.name, team_name: entry.team_name, role: 'participant', place: entry.place });
        p.as_participant++;
      }
      if (entry.coach && !SKIP_NAMES.has(entry.coach)) {
        const p = getEntry(entry.coach);
        p.appearances.push({ year: comp.year, competition_name: comp.name, team_name: entry.team_name, role: 'coach', place: entry.place });
        p.as_coach++;
      }
    }
  }

  return [...map.values()].sort((a, b) => b.as_participant + b.as_coach - (a.as_participant + a.as_coach));
}

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const view = url.searchParams.get('view') || 'competitions';
  const years = getAvailableYears();
  const selectedYear = Number(url.searchParams.get('year')) || years[0];

  if (view === 'participants') {
    const allEntries = Object.entries(modules).sort(([a], [b]) => a.localeCompare(b));
    const allCompetitions = await Promise.all(allEntries.map(([, load]) => load().then((m) => m.default)));
    return { view, years, selectedYear, competitions: [], participants: buildParticipants(allCompetitions) };
  }

  const yearEntries = Object.entries(modules)
    .filter(([p]) => p.includes(`/${selectedYear}/`))
    .sort(([a], [b]) => a.localeCompare(b));

  const competitions = await Promise.all(yearEntries.map(([, load]) => load().then((m) => m.default)));
  return { view, years, selectedYear, competitions, participants: [] };
}

function ParticipantsView({ participants }: { participants: ParticipantSummary[] }) {
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = search.trim()
    ? participants.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    : participants;

  return (
    <div className="participants-view">
      <div className="participants-search-bar">
        <input
          className="participants-search"
          type="text"
          placeholder="Buscar participante..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className="participants-count">{filtered.length} personas</span>
      </div>

      <div className="participants-table-wrap">
        <table className="participants-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Concursos</th>
              <th>Coach</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, i) => {
              const isOpen = expanded === p.name;
              return (
                <>
                  <tr key={p.name} className={`participant-row${isOpen ? ' open' : ''}`} onClick={() => setExpanded(isOpen ? null : p.name)}>
                    <td className="pt-rank">{i + 1}</td>
                    <td className="pt-name">{p.name}</td>
                    <td className="pt-num">{p.as_participant}</td>
                    <td className="pt-num">{p.as_coach > 0 ? p.as_coach : '—'}</td>
                    <td className="pt-num pt-total">{p.as_participant + p.as_coach}</td>
                    <td className="pt-chevron">{isOpen ? '▲' : '▼'}</td>
                  </tr>
                  {isOpen && (
                    <tr key={`${p.name}-detail`} className="participant-detail-row">
                      <td colSpan={6}>
                        <div className="participant-detail">
                          {p.appearances
                            .slice()
                            .sort((a, b) => a.year - b.year || a.competition_name.localeCompare(b.competition_name))
                            .map((ap, j) => (
                              <div key={j} className={`ap-item ap-${ap.role}`}>
                                <span className="ap-year">{ap.year}</span>
                                <span className="ap-competition">{ap.competition_name}</span>
                                <span className="ap-team">{ap.team_name}</span>
                                <span className={`ap-role ap-role-${ap.role}`}>{ap.role === 'coach' ? 'Coach' : 'Participante'}</span>
                                <span className="ap-place">#{ap.place}</span>
                              </div>
                            ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function IcpcResults() {
  const { view, years, selectedYear, competitions, participants } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  return (
    <div style={{ overflow: 'auto', height: '100%' }}>
      <div className="icpc-toolbar">
        <div className="view-toggle">
          <Link to="?" className={`view-btn${view === 'competitions' ? ' active' : ''}`}>
            Por competencia
          </Link>
          <Link to="?view=participants" className={`view-btn${view === 'participants' ? ' active' : ''}`}>
            Por participante
          </Link>
        </div>

        {view === 'competitions' && (
          <>
            <div className="year-selector">
              {years.map((year) => (
                <Link key={year} to={`?year=${year}`} className={`year-btn${year === selectedYear ? ' active' : ''}`}>
                  {year}
                </Link>
              ))}
            </div>
            <div className="year-selector-mobile">
              <select className="year-select" value={selectedYear} onChange={(e) => navigate(`?year=${e.target.value}`)}>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}
      </div>

      {view === 'participants' ? (
        <ParticipantsView participants={participants} />
      ) : (
        competitions.map((competition, i) => <CompetitionResults key={i} competition={competition} />)
      )}
    </div>
  );
}