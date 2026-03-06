import { Competition } from '~/types';

const competition: Competition = {
  competition_id: '2025-2.5-repechaje', // ID descriptivo para repechaje
  name: 'Repechaje',
  year: 2025,
  location: 'RPC',
  judge: 'BOCA',
  mode: 'INDIVIDUAL',
  total_problems: 5,
  slots: 9,
  scoreboard: [
    {
      place: 1,
      team_name: 'Fabricio Javier Cabrera Gordillo',
      problems_solved: null, // No se especifica cantidad exacta en el texto
      total_time: null,
      participants: ['Fabricio Javier Cabrera Gordillo'],
      coach: null,
    },
    {
      place: 2,
      team_name: 'Francisco Gustavo Troche Venegas',
      problems_solved: null,
      total_time: null,
      participants: ['Francisco Gustavo Troche Venegas'],
      coach: null,
    },
    {
      place: 3,
      team_name: 'Brayan Quispe',
      problems_solved: null,
      total_time: null,
      participants: ['Brayan Quispe'],
      coach: null,
    },
  ],
  resources: [
    {
      url: '', // Espacio para el link de resultados de la RPC si estuviera disponible
      name: 'Scoreboard',
    },
  ],
};

export default competition;
