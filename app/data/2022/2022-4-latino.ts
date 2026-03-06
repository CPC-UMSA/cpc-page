import { Competition } from '~/types';

const competition: Competition = {
  competition_id: '2022-4-latino',
  name: 'Latinoamericano',
  year: 2022,
  location: 'LA PAZ - Universidad Mayor de San Andrés',
  judge: 'BOCA',
  total_problems: null,
  scoreboard: [
    {
      place: 13,
      team_name: 'Los Maquinolas',
      problems_solved: 4,
      total_time: 320,
      participants: ['Daner Zein Tonconi Mendoza', 'Marco Andrés Cusicanqui León', 'Fabricio Javier Cabrera Gordillo'],
      coach: 'Oscar Gauss Carvajal Yucra',
    },
    {
      place: 27,
      team_name: 'RMF 4.San_Andres()',
      problems_solved: 3,
      total_time: 762,
      participants: ['Grover Osvaldo Rodriguez Apaza', 'Rodrigo Ticona Coronel', 'Marco Antonio Castillo Uscamayta'],
      coach: 'Oscar Gauss Carvajal Yucra',
    },
    {
      place: 33,
      team_name: 'Sergio no te comas esa hamburguesa',
      problems_solved: 2,
      total_time: 221,
      participants: ['Luis David Ajhuacho Tarquino', 'Miguel Angel Quispe Mamani', 'Sergio Alejandro Paucara Saca'],
      coach: 'Alexis Jaime Vargas Quelca',
    },
    {
      place: 35,
      team_name: 'MBC 2.0',
      problems_solved: 2,
      total_time: 231,
      participants: ['Diego Alejandro Cuevas Mamani', 'Sebastian Mauricio Mitre Huayta', 'Alex Dariem Choque Paquiri'],
      coach: 'Yhorel Yhared Alvarez Alvarez',
    },
    {
      place: 88,
      team_name: 'Alpha Code',
      problems_solved: 1,
      total_time: 82,
      participants: ['Kaylen Sanchez Ticona', 'Jorge Luis Chuquimia Parra', 'Joel Luis Jemio Martinez'],
      coach: 'Oscar Gauss Carvajal Yucra',
    },
  ],
  resources: [
    {
      url: 'https://icpc.global/regionals/finder/SouthAmerica-South-2023/standings',
      name: 'Scoreboard',
    },
  ],
};

export default competition;
