import { Competition } from '~/types';

const competition: Competition = {
  competition_id: '2022-3-nacional',
  name: 'Nacional',
  year: 2022,
  location: '', // No especificado en el texto
  judge: 'BOCA',
  total_problems: null,
  scoreboard: [
    {
      place: 2,
      team_name: 'Los Maquinolas',
      problems_solved: 6,
      total_time: 573,
      participants: ['Daner Zein Tonconi Mendoza', 'Marco Andrés Cusicanqui León', 'Fabricio Javier Cabrera Gordillo'],
      coach: 'Oscar Gauss Carvajal Yucra',
    },
    {
      place: 5,
      team_name: 'RMF 4.San_Andres()',
      problems_solved: 6,
      total_time: 918,
      participants: ['Grover Osvaldo Rodriguez Apaza', 'Rodrigo Ticona Coronel', 'Marco Antonio Castillo Uscamayta'],
      coach: 'Oscar Gauss Carvajal Yucra',
    },
    {
      place: 10,
      team_name: 'Sergio no te comas esa hamburguesa',
      problems_solved: 5,
      total_time: 795,
      participants: ['Luis David Ajhuacho Tarquino', 'Miguel Angel Quispe Mamani', 'Sergio Alejandro Paucara Saca'],
      coach: 'Alexis Jaime Vargas Quelca',
    },
    {
      place: 12,
      team_name: 'MBC 2.0',
      problems_solved: 4,
      total_time: 461,
      participants: ['Diego Alejandro Cuevas Mamani', 'Sebastian Mauricio Mitre Huayta', 'Alex Dariem Choque Paquiri'],
      coach: 'Yhorel Yhared Alvarez Alvarez',
    },
    {
      place: 15,
      team_name: 'Alpha Code',
      problems_solved: 3,
      total_time: 183,
      participants: ['Giann Kalef Ledezma Ramos', 'Joel Luis Jemio Martinez', 'Joel Luis Jemio Martinez'],
      coach: 'Oscar Gauss Carvajal Yucra',
    },
  ],
  resources: [
    {
      url: 'https://icpc.global/regionals/finder/Bolivia-Preliminary-2023/standings',
      name: 'Scoreboard',
    },
  ],
};

export default competition;
