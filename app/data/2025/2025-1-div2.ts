import { Competition } from '~/types';

const competition: Competition = {
  competition_id: '2025-1-div2',
  name: 'Segunda División',
  year: 2025,
  location: 'Universidad Mayor de San Andrés',
  judge: 'BOCA_LOCAL',
  mode: 'INDIVIDUAL',
  total_problems: 7,
  slots: 6,
  scoreboard: [
    {
      place: 1,
      team_name: 'Kelvin Bohn Davisson Vargas Garcia',
      problems_solved: 4,
      total_time: null, // No se proporcionó tiempo en la tabla
      participants: ['Kelvin Bohn Davisson Vargas Garcia'],
      coach: null,
    },
    {
      place: 2,
      team_name: 'Nestor Apaza Cruz',
      problems_solved: 3,
      total_time: null,
      participants: ['Nestor Apaza Cruz'],
      coach: null,
    },
    {
      place: 3,
      team_name: 'Eliseo Eliezer Condori Mamani',
      problems_solved: 3,
      total_time: null,
      participants: ['Eliseo Eliezer Condori Mamani'],
      coach: null,
    },
    {
      place: 4,
      team_name: 'Mauricio Alvaro Flores Rada',
      problems_solved: 3,
      total_time: null,
      participants: ['Mauricio Alvaro Flores Rada'],
      coach: null,
    },
    {
      place: 5,
      team_name: 'Fidel Aguilar',
      problems_solved: 3,
      total_time: null,
      participants: ['Fidel Aguilar'],
      coach: null,
    },
    {
      place: 6,
      team_name: 'Milton Macias',
      problems_solved: 2,
      total_time: null,
      participants: ['Milton Macias'],
      coach: null,
    },
  ],
  resources: [],
};

export default competition;
