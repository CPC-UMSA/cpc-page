import { Competition } from '~/types';

const competition: Competition = {
  competition_id: '2021-4-latino',
  name: 'Latinoamericano',
  year: 2021,
  location: 'LA PAZ - Universidad Mayor de San Andrés',
  judge: 'BOCA',
  total_problems: null,
  scoreboard: [
    {
      place: 33,
      team_name: 'Los Maquinolas',
      problems_solved: 2,
      total_time: 180,
      participants: ['Yhorel Yhared Alvarez Alvarez', 'Marco Andrés Cusicanqui León', 'Fabricio Javier Cabrera Gordillo'],
      coach: 'Oscar Gauss Carvajal Yucra',
    },
    {
      place: 36,
      team_name: 'Spider-verse confirmado!!!',
      problems_solved: 2,
      total_time: 263,
      participants: ['Marcelo Nelson De La Quintana Illanes', 'Rodrigo Ticona Coronel', 'Grover Osvaldo Rodriguez Apaza'],
      coach: 'Oscar Gauss Carvajal Yucra',
    },
    {
      place: 37,
      team_name: 'Coon and friends',
      problems_solved: 2,
      total_time: 373,
      participants: ['Luis David Ajhuacho Tarquino', 'Sergio Alejandro Paucara Saca', 'Miguel Angel Quispe Mamani'],
      coach: 'Alexis Jaime Vargas Quelca',
    },
    {
      place: 38,
      team_name: 'print("KAR.GAA")',
      problems_solved: 2,
      total_time: 432,
      participants: ['Andres Miguel Rojas Murga', 'Kaylen Sanchez Ticona', 'Alex Dariem Choque Paquiri'],
      coach: 'Oscar Gauss Carvajal Yucra',
    },
  ],
  resources: [
    {
      url: 'https://icpc.global/regionals/finder/SouthAmerica-South-2022/standings',
      name: 'Scoreboard',
    },
  ],
};

export default competition;
