import { Competition } from '~/types';

const competition: Competition = {
  competition_id: '2023-1-div2-local',
  name: 'Segunda División',
  year: 2023,
  location: 'Universidad Mayor de San Andrés',
  judge: 'BOCA_LOCAL',
  mode: 'INDIVIDUAL',
  total_problems: 8,
  slots: 3,
  scoreboard: [
    {
      place: 1,
      team_name: 'Hagi Argani Mamani',
      problems_solved: 2,
      total_time: 121,
      participants: ['Hagi Argani Mamani'],
      coach: null,
    },
    {
      place: 2,
      team_name: 'Rossie Jashiel Gutierrez Sardinas',
      problems_solved: 2,
      total_time: 210,
      participants: ['Rossie Jashiel Gutierrez Sardinas'],
      coach: null,
    },
    {
      place: 3,
      team_name: 'Erland Mauricio Ballon Tambo',
      problems_solved: 2,
      total_time: 350,
      participants: ['Erland Mauricio Ballon Tambo'],
      coach: null,
    },
  ],
  resources: [],
};

export default competition;
