import { Competition } from '~/types';

const competition: Competition = {
  competition_id: '2019-1-div2-local',
  name: 'Segunda División',
  year: 2019,
  location: 'Universidad Mayor de San Andrés',
  judge: 'BOCA_LOCAL',
  mode: 'INDIVIDUAL',
  total_problems: 7,
  slots: 6,
  scoreboard: [
    {
      place: 1,
      team_name: 'Miguel Angel Quispe Mamani',
      problems_solved: 4,
      total_time: 488,
      participants: ['Miguel Angel Quispe Mamani'],
      coach: null,
    },
    {
      place: 2,
      team_name: 'Sergio Alejandro Paucara Saca',
      problems_solved: 3,
      total_time: 618,
      participants: ['Sergio Alejandro Paucara Saca'],
      coach: null,
    },
    {
      place: 3,
      team_name: 'Alex Dariem Choque Paquiri',
      problems_solved: 2,
      total_time: 286,
      participants: ['Alex Dariem Choque Paquiri'],
      coach: null,
    },
    {
      place: 4,
      team_name: 'Luis David Ajhuacho Tarquino',
      problems_solved: 2,
      total_time: 304,
      participants: ['Luis David Ajhuacho Tarquino'],
      coach: null,
    },
    {
      place: 5,
      team_name: 'Luis Gustavo Mamani Apaza',
      problems_solved: 2,
      total_time: 347,
      participants: ['Luis Gustavo Mamani Apaza'],
      coach: null,
    },
    {
      place: 6,
      team_name: 'Grover Osvaldo Rodriguez Apaza',
      problems_solved: 2,
      total_time: 381,
      participants: ['Grover Osvaldo Rodriguez Apaza'],
      coach: null,
    },
  ],
  resources: [],
};

export default competition;
