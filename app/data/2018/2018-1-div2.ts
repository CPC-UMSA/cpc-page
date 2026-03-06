import { Competition } from '~/types';

const competition: Competition = {
  competition_id: '2018-1-div2-local',
  name: 'Segunda División',
  year: 2018,
  location: 'Universidad Mayor de San Andrés',
  judge: 'BOCA_LOCAL',
  mode: 'INDIVIDUAL',
  total_problems: 7,
  slots: 3,
  scoreboard: [
    {
      place: 1,
      team_name: 'Royer Cesar Alanis Flores',
      problems_solved: 4,
      total_time: 586,
      participants: ['Royer Cesar Alanis Flores'],
      coach: null,
    },
    {
      place: 2,
      team_name: 'Dotnara Isabel Condori Condori',
      problems_solved: 4,
      total_time: 591,
      participants: ['Dotnara Isabel Condori Condori'],
      coach: null,
    },
    {
      place: 3,
      team_name: 'Marco Antonio Castillo Uscamayta',
      problems_solved: 3,
      total_time: 410,
      participants: ['Marco Antonio Castillo Uscamayta'],
      coach: null,
    },
  ],
  resources: [],
};

export default competition;
