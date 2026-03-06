import { Competition } from '~/types';

const competition: Competition = {
  competition_id: '2022-1-div2-local',
  name: 'Segunda División',
  year: 2022,
  location: 'Universidad Mayor de San Andrés',
  judge: 'BOCA_LOCAL',
  mode: 'INDIVIDUAL',
  total_problems: 8,
  slots: 3,
  scoreboard: [
    {
      place: 1,
      team_name: 'Daner Zein Tonconi Mendoza',
      problems_solved: 6,
      total_time: 759,
      participants: ['Daner Zein Tonconi Mendoza'],
      coach: null,
    },
    {
      place: 2,
      team_name: 'Jorge Luis Chuquimia Parra',
      problems_solved: 3,
      total_time: 620,
      participants: ['Jorge Luis Chuquimia Parra'],
      coach: null,
    },
    {
      place: 3,
      team_name: 'Joel Luis Jemio Martinez',
      problems_solved: 2,
      total_time: 316,
      participants: ['Joel Luis Jemio Martinez'],
      coach: null,
    },
    {
      place: 4,
      team_name: 'Giann Kalef Ledezma Ramos',
      problems_solved: 2,
      total_time: 334,
      participants: ['Giann Kalef Ledezma Ramos'],
      coach: null,
    },
  ],
  resources: [],
};

export default competition;
