import { Competition } from '~/types';

const competition: Competition = {
  competition_id: '2023-4-latino',
  name: 'Latinoamericano',
  year: 2023,
  location: 'LA PAZ - Universidad Mayor de San Andrés',
  judge: 'BOCA',
  total_problems: null, // No se especifica en la tabla
  scoreboard: [
    {
      place: 9,
      team_name: 'Los Maquinolas',
      problems_solved: 6,
      total_time: 747,
      participants: ['Daner Zein Tonconi Mendoza', 'Marco Andrés Cusicanqui León', 'Fabricio Javier Cabrera Gordillo'],
      coach: 'Oscar Gauss Carvajal Yucra',
    },
    {
      place: 28,
      team_name: '!winners',
      problems_solved: 4,
      total_time: 558,
      participants: ['Grover Osvaldo Rodriguez Apaza', 'Rodrigo Ticona Coronel', 'Marco Antonio Castillo Uscamayta'],
      coach: 'Edson Eddy Lecoña Zarate',
    },
    {
      place: 52,
      team_name: 'LuCkyForces',
      problems_solved: 2,
      total_time: 174,
      participants: ['Miguel Angel Quispe Mamani', 'Alex Dariem Choque Paquiri', 'Luis David Ajhuacho Tarquino'],
      coach: 'Alexis Jaime Vargas Quelca',
    },
    {
      place: 64,
      team_name: 'foREacH',
      problems_solved: 2,
      total_time: 377,
      participants: ['Hagi Argani Mamani', 'Erland Mauricio Ballon Tambo', 'Rossie Jashiel Gutierrez Sardinas'],
      coach: 'Sergio Alejandro Paucara Saca',
    },
    {
      place: 104,
      team_name: 'NexusTeam',
      problems_solved: 1,
      total_time: 128,
      participants: ['Lorgio Emilio Chura Carrillo', 'Gustavo Pillco Lipa', 'Jesus Macedo Mamani'],
      coach: 'Oscar Gauss Carvajal Yucra',
    },
    {
      place: 122,
      team_name: 'Sorry Andres :(',
      problems_solved: 0,
      total_time: 0,
      participants: ['Diego Alejandro Cuevas Mamani', 'Sergio Alejandro Paucara Saca', 'Kaylen Sanchez Ticona'],
      coach: 'Juan Jonatan Churata Apaza',
    },
  ],
  resources: [
    {
      url: 'https://icpc.global/regionals/finder/SouthAmerica-South-2024',
      name: 'Scoreboard',
    },
  ],
};

export default competition;
