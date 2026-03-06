import { Competition } from '~/types';

const competition: Competition = {
  competition_id: '2023-3-nacional-preliminar',
  name: 'Nacional Preliminar',
  year: 2023,
  location: 'VIRTUAL',
  judge: 'BOCA',
  total_problems: null, // No se especifica en la tabla
  scoreboard: [
    {
      place: 1,
      team_name: '!winners',
      problems_solved: 8,
      total_time: 1269,
      participants: ['Grover Osvaldo Rodriguez Apaza', 'Rodrigo Ticona Coronel', 'Marco Antonio Castillo Uscamayta'],
      coach: 'Edson Eddy Lecoña Zarate',
    },
    {
      place: 2,
      team_name: 'Los Maquinolas',
      problems_solved: 7,
      total_time: 539,
      participants: ['Daner Zein Tonconi Mendoza', 'Marco Andrés Cusicanqui León', 'Fabricio Javier Cabrera Gordillo'],
      coach: 'Oscar Gauss Carvajal Yucra',
    },
    {
      place: 6,
      team_name: 'LuCkyForces',
      problems_solved: 5,
      total_time: 565,
      participants: ['Miguel Angel Quispe Mamani', 'Alex Dariem Choque Paquiri', 'Luis David Ajhuacho Tarquino'],
      coach: 'Alexis Jaime Vargas Quelca',
    },
    {
      place: 20,
      team_name: 'foREacH',
      problems_solved: 3,
      total_time: 321,
      participants: ['Hagi Argani Mamani', 'Erland Mauricio Ballon Tambo', 'Rossie Jashiel Gutierrez Sardinas'],
      coach: 'Sergio Alejandro Paucara Saca',
    },
    {
      place: 21,
      team_name: 'Sorry Andres :(',
      problems_solved: 3,
      total_time: 361,
      participants: ['Diego Alejandro Cuevas Mamani', 'Sergio Alejandro Paucara Saca', 'Kaylen Sanchez Ticona'],
      coach: 'Juan Jonatan Churata Apaza',
    },
    {
      place: 63,
      team_name: 'NexusTeam',
      problems_solved: 2,
      total_time: 278,
      participants: ['Lorgio Emilio Chura Carrillo', 'Gustavo Pillco Lipa', 'Jesus Macedo Mamani'],
      coach: 'Oscar Gauss Carvajal Yucra',
    },
  ],
  resources: [
    {
      url: 'https://icpc.global/regionals/finder/Bolivia-Preliminary-2024/standings',
      name: 'Scoreboard',
    },
  ],
};

export default competition;
