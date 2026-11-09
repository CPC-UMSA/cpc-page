import { type MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import { PhotoGallery } from '~/components';
import { compareTeams, type ContestResult, DIVISIONS, LATINO_2026_PHOTOS, type Team, TEAMS_2026 } from '~/data/2026/equipos-2026';

export const meta: MetaFunction = () => [{ title: 'Equipos 2026' }];

export async function loader() {
  return null;
}

const NACIONAL_PHOTOS = [
  '/photos/Nacional/20260815_143638.jpg',
  '/photos/Nacional/20260815_143718.jpg',
  '/photos/Nacional/20260815_143758.jpg',
  '/photos/Nacional/20260829_190137.jpg',
  '/photos/Nacional/20260829_190253.jpg',
  '/photos/Nacional/IMG_20260815_182913_974.jpg',
  '/photos/Nacional/IMG_20260815_182914_268.jpg',
  '/photos/Nacional/IMG_20260815_182914_353.jpg',
  '/photos/Nacional/IMG_20260815_182914_360.jpg',
];

const TEAMS_BY_DIVISION = DIVISIONS.map((division) => ({
  division,
  teams: TEAMS_2026.filter((team) => team.division === division).sort(compareTeams),
})).filter(({ teams }) => teams.length > 0);

function ResultTile({ label, result, pendingText = 'Por definir' }: { label: string; result: ContestResult | null; pendingText?: string }) {
  return (
    <div className="equipos-result">
      <span className="equipos-result-label">{label}</span>
      {result ? (
        <>
          <strong className="equipos-result-value">
            {result.solved} {result.solved === 1 ? 'problema' : 'problemas'}
          </strong>
          <span className="equipos-result-penalty">Penalización: {result.penalty}</span>
          {result.rank !== undefined && <span className="equipos-result-penalty">Puesto general: {result.rank}</span>}
        </>
      ) : (
        <strong className="equipos-result-value equipos-result-pending">{pendingText}</strong>
      )}
    </div>
  );
}

function TeamCard({ team }: { team: Team }) {
  return (
    <article className={`equipos-card${team.latinoAward ? ' equipos-card-award' : ''}`}>
      <span className={`equipos-status ${team.latinoQualified ? 'equipos-status-qualified' : 'equipos-status-out'}`}>
        <span className="equipos-status-dot" aria-hidden="true" />
        {team.latinoQualified ? 'Compitió en la Latino' : 'No clasificó a la Latino'}
      </span>
      <h3 className="equipos-card-name">{team.name}</h3>
      {team.latinoAward && (
        <p className="equipos-award">
          <span aria-hidden="true">🏅</span> {team.latinoAward}
        </p>
      )}
      <p className="equipos-card-coach">
        <span>Coach:</span> {team.coach}
      </p>
      <ol className="equipos-card-members">
        {team.members.map((member) => (
          <li key={member}>{member}</li>
        ))}
      </ol>
      <div className="equipos-results">
        <ResultTile label="Nacional 1" result={team.results.nacional1} />
        <ResultTile label="Nacional 2" result={team.results.nacional2} />
        <ResultTile label="Latino" result={team.results.latino} pendingText={team.latinoQualified ? 'Por definir' : 'No clasificó'} />
      </div>
    </article>
  );
}

export default function Equipos2026() {
  return (
    <div className="equipos-page">
      <div className="equipos-hero">
        <h1 className="equipos-hero-title cr-we">Equipos 2026</h1>
        <p className="equipos-hero-sub">Los {TEAMS_2026.length} equipos que representan al CPC UMSA en la temporada ICPC 2026</p>
      </div>

      <div className="equipos-content">
        <p className="equipos-note">
          🏁 La <strong>Latino</strong> se disputó el <strong>7 de noviembre</strong> en Sucre, Chuquisaca. El puesto general corresponde a la clasificación
          de todas las sedes. Lee la crónica completa en <Link to="/blog/latino-2026-sucre">nuestro blog</Link> o más información en{' '}
          <a href="https://icpcbolivia.org/" target="_blank" rel="noopener noreferrer">
            ICPC Bolivia
          </a>
          .
        </p>

        {TEAMS_BY_DIVISION.map(({ division, teams }) => (
          <section key={division}>
            <h2 className="equipos-section-title">
              {division}
              <span className="equipos-section-count">
                {teams.length} {teams.length === 1 ? 'equipo' : 'equipos'}
              </span>
            </h2>
            <div className="equipos-grid">
              {teams.map((team) => (
                <TeamCard key={team.name} team={team} />
              ))}
            </div>
          </section>
        ))}

        <section>
          <h2 className="equipos-section-title">Fotos de la Latino</h2>
          <PhotoGallery photos={LATINO_2026_PHOTOS} />
        </section>

        <section>
          <h2 className="equipos-section-title">Fotos del Nacional</h2>
          <PhotoGallery photos={NACIONAL_PHOTOS} />
        </section>
      </div>
    </div>
  );
}
