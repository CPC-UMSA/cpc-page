import { Competition } from '~/types';

const competition: Competition = {
  competition_id: '2021-3-nacional',
  name: 'Nacional',
  year: 2021,
  location: 'VIRTUAL',
  judge: 'BOCA',
  total_problems: null,
  scoreboard: [
    {
      place: 2,
      team_name: 'Spider-verse confirmado?',
      problems_solved: 6,
      total_time: 631,
      participants: ['Marcelo Nelson De La Quintana Illanes', 'Rodrigo Ticona Coronel', 'Grover Osvaldo Rodriguez Apaza'],
      coach: 'Oscar Gauss Carvajal Yucra',
    },
    {
      place: 8,
      team_name: 'Los Maquinolas',
      problems_solved: 5,
      total_time: 1081,
      participants: ['Marco Andrés Cusicanqui León', 'Yhorel Yhared Alvarez Alvarez', 'Fabricio Javier Cabrera Gordillo'],
      coach: 'Oscar Gauss Carvajal Yucra',
    },
    {
      place: 9,
      team_name: 'Coon and friends',
      problems_solved: 4,
      total_time: 238,
      participants: ['Sergio Alejandro Paucara Saca', 'Luis David Ajhuacho Tarquino', 'Miguel Angel Quispe Mamani'],
      coach: 'Alexis Jaime Vargas Quelca',
    },
    {
      place: 11,
      team_name: 'print("KAR.GAA")',
      problems_solved: 4,
      total_time: 377,
      participants: ['Andres Miguel Rojas Murga', 'Kaylen Sanchez Ticona', 'Alex Dariem Choque Paquiri'],
      coach: 'Oscar Gauss Carvajal Yucra',
    },
  ],
  resources: [
    {
      url: 'https://icpc.global/regionals/finder/Bolivia-Preliminary-2022/standings',
      name: 'Scoreboard',
    },
  ],
};

export default competition;
