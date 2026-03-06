import { Competition } from '~/types';

const competition: Competition = {
  competition_id: '2020-4-latino',
  name: 'Latinoamericano',
  year: 2020,
  location: 'LA PAZ - Universidad Mayor de San Andrés',
  judge: 'BOCA',
  total_problems: null,
  scoreboard: [
    {
      place: 14,
      team_name: 'Elfita no te baias :v',
      problems_solved: 6,
      total_time: 679,
      participants: ['Carlos Mijael Tola Apaza', 'Alexis Jaime Vargas Quelca', 'Kevin Arturo Navia Paiva'],
      coach: 'Addis Rengel Sempértegui',
    },
    {
      place: 45,
      team_name: 'Breed',
      problems_solved: 2,
      total_time: 233,
      participants: ['Oscar Antonio Rondo Rodriguez', 'Alex Dariem Choque Paquiri', 'Alfredo Alejandro Alvarez Acuña'],
      coach: 'Miguel Angel Quispe Mamani',
    },
    {
      place: 46,
      team_name: 'MBC',
      problems_solved: 2,
      total_time: 235,
      participants: ['Sebastian Mauricio Mitre Huayta', 'Sarai Blanco Salgado', 'Diego Alejandro Cuevas Mamani'],
      coach: 'Sergio Alejandro Paucara Saca',
    },
    {
      place: 68,
      team_name: '2sublimes&&1Atom',
      problems_solved: 1,
      total_time: 190,
      participants: ['Andres Miguel Rojas Murga', 'Rodrigo Ticona Coronel', 'Kaylen Sanchez Ticona'],
      coach: 'Herbert Wilmer Quispe Churqui',
    },
  ],
  resources: [
    {
      url: 'https://icpc.global/regionals/finder/SouthAmerica-South-2021/standings',
      name: 'Scoreboard',
    },
  ],
};

export default competition;
