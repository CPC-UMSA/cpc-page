export type ContestResult = {
  solved: number;
  penalty: number;
  /** Puesto en la clasificación general del concurso (todas las sedes). */
  rank?: number;
};

export const DIVISIONS = ['División 1', 'División 2'] as const;
export type Division = (typeof DIVISIONS)[number];

export type Team = {
  division: Division;
  name: string;
  coach: string;
  members: string[];
  latinoQualified: boolean;
  /** Distinción obtenida en la Latino (p. ej. clasificación al Campeonato Latinoamericano). */
  latinoAward?: string;
  results: {
    nacional1: ContestResult | null;
    nacional2: ContestResult | null;
    latino: ContestResult | null;
  };
};

export const LATINO_2026_PHOTOS = [
  'photo_2026-11-09 07.42.05.jpeg',
  'photo_2026-11-09 07.42.09.jpeg',
  'photo_2026-11-09 07.42.11.jpeg',
  'photo_2026-11-09 07.42.13.jpeg',
  'photo_2026-11-09 07.42.14.jpeg',
  'photo_2026-11-09 07.42.16.jpeg',
  'photo_2026-11-09 07.42.18.jpeg',
  'photo_2026-11-09 07.42.19.jpeg',
  'photo_2026-11-09 07.42.37.jpeg',
  'photo_2026-11-09 07.42.42.jpeg',
].map((file) => encodeURI(`/photos/Latino 2026/${file}`));

export const TEAMS_2026: Team[] = [
  {
    division: 'División 2',
    name: 'La niña que quiso jugar futbol',
    coach: 'Kevin Arturo Navia P.',
    members: ['Beizaga Marquez Ricardo Andres', 'Chura Rondo Alan Fabricio', 'Navia Paiva Pablo Arturo'],
    latinoQualified: true,
    results: {
      nacional1: { solved: 3, penalty: 405 },
      nacional2: { solved: 1, penalty: 199 },
      latino: { solved: 1, penalty: 218, rank: 415 },
    },
  },
  {
    division: 'División 2',
    name: 'DIV5: Las Wawas del LuchXDD',
    coach: 'Luis David Ajhuacho T.',
    members: ['Laruta Espinal Hernan', 'Marca Patti Sebastian Jhoel', 'Saravia Chipana Osvaldo Joaquin'],
    latinoQualified: true,
    results: {
      nacional1: { solved: 3, penalty: 288 },
      nacional2: { solved: 1, penalty: 47 },
      latino: { solved: 3, penalty: 234, rank: 264 },
    },
  },
  {
    division: 'División 1',
    name: 'candi_ositos club de fans',
    coach: 'Luis David Ajhuacho T.',
    members: ['Condori Mamani Eliseo Eliezer', 'Coronel Hurtado Andres Jorge', 'Flores Condori Romer'],
    latinoQualified: true,
    results: {
      nacional1: { solved: 7, penalty: 864 },
      nacional2: { solved: 3, penalty: 553 },
      latino: { solved: 6, penalty: 711, rank: 97 },
    },
  },
  {
    division: 'División 1',
    name: 'Los Maquinolas: The Last Dance',
    coach: 'Oscar Gauss Carvajal Y.',
    members: ['Cabrera Gordillo Fabricio Javier', 'Cusicanqui León Marco Andrés', 'Tonconi Mendoza Daner Zein'],
    latinoQualified: true,
    latinoAward:
      'Clasificado al Campeonato Latinoamericano ICPC 2027 — Monterrey, México, 13–17 de julio de 2027 (training camp: 7–17 de julio) · organizers’ choice',
    results: {
      nacional1: { solved: 9, penalty: 960 },
      nacional2: { solved: 5, penalty: 669 },
      latino: { solved: 7, penalty: 597, rank: 59 },
    },
  },
  {
    division: 'División 1',
    name: 'Los Sabrossos 🐻',
    coach: 'Rodrigo Joaquin Salguero M.',
    members: ['Caballero Basagoitia Yasir Waldo', 'Cortez Mansilla Dilan Juan', 'Rojas Cerda Luis Alejandro'],
    latinoQualified: true,
    results: {
      nacional1: { solved: 6, penalty: 791 },
      nacional2: { solved: 3, penalty: 259 },
      latino: { solved: 6, penalty: 578, rank: 83 },
    },
  },
  {
    division: 'División 1',
    name: 'Cpbabies',
    coach: 'Miguel Angel Quispe M.',
    members: ['Chipana Paye Jhoel Alexander', 'Flores Rada Mauricio Álvaro', 'Macías Trujillo Milton Camilo'],
    latinoQualified: true,
    results: {
      nacional1: { solved: 4, penalty: 515 },
      nacional2: { solved: 1, penalty: 50 },
      latino: { solved: 4, penalty: 464, rank: 204 },
    },
  },
  {
    division: 'División 1',
    name: 'Runtime Terror',
    coach: 'Rossie Jashiel Gutierrez S.',
    members: ['Cano Quispe Lisbeth Nicole', 'Callisaya Lanes Shelly Anahi', 'Salgado Llusco Nataly Ingrid'],
    latinoQualified: false,
    results: { nacional1: { solved: 1, penalty: 15 }, nacional2: { solved: 0, penalty: 0 }, latino: null },
  },
];

// Orden ICPC: más problemas resueltos primero y, a igualdad, menor penalización.
export function compareResults(a: ContestResult | null, b: ContestResult | null) {
  if (!a || !b) return (b ? 1 : 0) - (a ? 1 : 0);
  return b.solved - a.solved || a.penalty - b.penalty;
}

// La Latino manda; los Nacionales desempatan (y ordenan a quienes no clasificaron).
export function compareTeams(a: Team, b: Team) {
  return (
    compareResults(a.results.latino, b.results.latino) ||
    compareResults(a.results.nacional1, b.results.nacional1) ||
    compareResults(a.results.nacional2, b.results.nacional2)
  );
}

/** Equipos que compitieron en la Latino 2026, ordenados por su resultado. */
export const LATINO_2026_STANDINGS = TEAMS_2026.filter((team) => team.results.latino).sort(compareTeams);
