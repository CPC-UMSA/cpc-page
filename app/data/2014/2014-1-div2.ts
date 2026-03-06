import { Competition } from '~/types';

const competition: Competition = {
  competition_id: '2014-1-div2-local',
  name: 'Segunda División',
  year: 2014,
  location: 'Universidad Mayor de San Andrés',
  judge: 'BOCA_LOCAL',
  mode: 'INDIVIDUAL',
  total_problems: null,
  slots: 3,
  scoreboard: [
    {
      place: 1,
      team_name: 'Diego Adrian Charca Flores',
      problems_solved: 2,
      total_time: null,
      participants: ['Diego Adrian Charca Flores'],
      coach: null,
    },
    {
      place: 2,
      team_name: 'Rolando Troche Venegas',
      problems_solved: 2,
      total_time: null,
      participants: ['Rolando Troche Venegas'],
      coach: null,
    },
    {
      place: 3,
      team_name: 'Brayan Huber Gonzales Velasquez',
      problems_solved: 1,
      total_time: null,
      participants: ['Brayan Huber Gonzales Velasquez'],
      coach: null,
    },
  ],
  resources: [],
};

export default competition;
