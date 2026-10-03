import { type MetaFunction } from '@remix-run/node';
import { PhotoGallery } from '~/components';

export const meta: MetaFunction = () => [{ title: 'Equipos 2026' }];

export async function loader() {
  return null;
}

type ContestResult = { solved: number; penalty: number };

type Team = {
  division: Division;
  name: string;
  coach: string;
  members: string[];
  results: {
    nacional1: ContestResult | null;
    nacional2: ContestResult | null;
    latino: ContestResult | null;
  };
};

const DIVISIONS = ['División 1', 'División 1 Girls', 'División 2'] as const;
type Division = (typeof DIVISIONS)[number];

const TEAM_PHOTOS = [
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

const TEAMS: Team[] = [
  {
    division: 'División 2',
    name: 'La niña que quiso jugar futbol',
    coach: 'Kevin Arturo Navia P.',
    members: ['Beizaga Marquez Ricardo Andres', 'Chura Rondo Alan Fabricio', 'Navia Paiva Pablo Arturo'],
    results: { nacional1: { solved: 3, penalty: 405 }, nacional2: { solved: 1, penalty: 199 }, latino: null },
  },
  {
    division: 'División 2',
    name: 'DIV5: Las Wawas del LuchXDD',
    coach: 'Luis David Ajhuacho T.',
    members: ['Laruta Espinal Hernan', 'Marca Patti Sebastian Jhoel', 'Saravia Chipana Osvaldo Joaquin'],
    results: { nacional1: { solved: 3, penalty: 288 }, nacional2: { solved: 1, penalty: 47 }, latino: null },
  },
  {
    division: 'División 1',
    name: 'candi_ositos club de fans',
    coach: 'Luis David Ajhuacho T.',
    members: ['Condori Mamani Eliseo Eliezer', 'Coronel Hurtado Andres Jorge', 'Flores Condori Romer'],
    results: { nacional1: { solved: 7, penalty: 864 }, nacional2: { solved: 3, penalty: 553 }, latino: null },
  },
  {
    division: 'División 1',
    name: 'Los Maquinolas: The Last Dance',
    coach: 'Oscar Gauss Carvajal Y.',
    members: ['Cabrera Gordillo Fabricio Javier', 'Cusicanqui León Marco Andrés', 'Tonconi Mendoza Daner Zein'],
    results: { nacional1: { solved: 9, penalty: 960 }, nacional2: { solved: 5, penalty: 669 }, latino: null },
  },
  {
    division: 'División 1',
    name: 'Los Sabrossos 🐻',
    coach: 'Rodrigo Joaquin Salguero M.',
    members: ['Caballero Basagoitia Yasir Waldo', 'Cortez Mansilla Dilan Juan', 'Rojas Cerda Luis Alejandro'],
    results: { nacional1: { solved: 6, penalty: 791 }, nacional2: { solved: 3, penalty: 259 }, latino: null },
  },
  {
    division: 'División 1',
    name: 'Cpbabies',
    coach: 'Miguel Angel Quispe M.',
    members: ['Chipana Paye Jhoel Alexander', 'Flores Rada Mauricio Álvaro', 'Macías Trujillo Milton Camilo'],
    results: { nacional1: { solved: 4, penalty: 515 }, nacional2: { solved: 1, penalty: 50 }, latino: null },
  },
  {
    division: 'División 1 Girls',
    name: 'Runtime Terror',
    coach: 'Rossie Jashiel Gutierrez S.',
    members: ['Cano Quispe Lisbeth Nicole', 'Callisaya Lanes Shelly Anahi', 'Salgado Llusco Nataly Ingrid'],
    results: { nacional1: { solved: 1, penalty: 15 }, nacional2: { solved: 0, penalty: 0 }, latino: null },
  },
];

// Orden ICPC: más problemas resueltos primero y, a igualdad, menor penalización.
// El Nacional 2 desempata cuando el Nacional 1 queda igual.
function compareResults(a: ContestResult | null, b: ContestResult | null) {
  if (!a || !b) return (b ? 1 : 0) - (a ? 1 : 0);
  return b.solved - a.solved || a.penalty - b.penalty;
}

function compareTeams(a: Team, b: Team) {
  return compareResults(a.results.nacional1, b.results.nacional1) || compareResults(a.results.nacional2, b.results.nacional2);
}

const TEAMS_BY_DIVISION = DIVISIONS.map((division) => ({
  division,
  teams: TEAMS.filter((team) => team.division === division).sort(compareTeams),
})).filter(({ teams }) => teams.length > 0);

function ResultTile({ label, result }: { label: string; result: ContestResult | null }) {
  return (
    <div className="equipos-result">
      <span className="equipos-result-label">{label}</span>
      {result ? (
        <>
          <strong className="equipos-result-value">
            {result.solved} {result.solved === 1 ? 'problema' : 'problemas'}
          </strong>
          <span className="equipos-result-penalty">Penalización: {result.penalty}</span>
        </>
      ) : (
        <strong className="equipos-result-value equipos-result-pending">Por definir</strong>
      )}
    </div>
  );
}

function TeamCard({ team }: { team: Team }) {
  return (
    <article className="equipos-card">
      <h3 className="equipos-card-name">{team.name}</h3>
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
        <ResultTile label="Latino" result={team.results.latino} />
      </div>
    </article>
  );
}

export default function Equipos2026() {
  return (
    <div className="equipos-page">
      <div className="equipos-hero">
        <h1 className="equipos-hero-title cr-we">Equipos 2026</h1>
        <p className="equipos-hero-sub">Los {TEAMS.length} equipos que representan al CPC UMSA en la temporada ICPC 2026</p>
      </div>

      <div className="equipos-content">
        <p className="equipos-note">
          📍 Los resultados de la <strong>Latino</strong> se definirán el <strong>7 de noviembre</strong> en Sucre, Chuquisaca.
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
          <h2 className="equipos-section-title">Fotos del Nacional</h2>
          <PhotoGallery photos={TEAM_PHOTOS} />
        </section>
      </div>
    </div>
  );
}
