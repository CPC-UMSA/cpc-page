import { Competition } from '~/types';

const competition: Competition = {
  competition_id: '2024-3-nacional',
  name: 'Nacional',
  year: 2024,
  location: 'VIRTUAL',
  judge: 'BOCA',
  total_problems: null,
  scoreboard: [
    {
      place: 3,
      team_name: "Súbelo!!! Se compila en el juez :v'",
      problems_solved: 7,
      total_time: 918,
      participants: ['Gustavo Pillco Lipa', 'Erland Mauricio Ballon Tambo', 'Marco Antonio Castillo Uscamayta'],
      coach: 'Edson Eddy Lecoña Zarate',
    },
    {
      place: 5,
      team_name: 'Maquinolas',
      problems_solved: 5,
      total_time: 164,
      participants: ['Daner Zein Tonconi Mendoza', 'Marco Andrés Cusicanqui León', 'Fabricio Javier Cabrera Gordillo'],
      coach: 'Oscar Gauss Carvajal Yucra',
    },
    {
      place: 9,
      team_name: 'Por internet te digo que te gano',
      problems_solved: 4,
      total_time: 112,
      participants: ['Hagi Argani Mamani', 'Miguel Angel Quispe Mamani', 'Luis David Ajhuacho Tarquino'],
      coach: null,
    },
    {
      place: 12,
      team_name: 'Los Manco-ders',
      problems_solved: 4,
      total_time: 216,
      participants: ['Romer Flores Condori', 'Freddy Sebastian Catunta Uturunco', 'Roger Abimael Mallcu Alanez'],
      coach: null,
    },
    {
      place: 95,
      team_name: 'Icpapus',
      problems_solved: 3,
      total_time: 401,
      participants: ['Dilan Juan Cortez Mansilla', 'Yasir Waldo Caballero Basagoitia', 'Alina Erika Ramirez Castro'],
      coach: null,
    },
  ],
  resources: [
    {
      url: 'https://icpc.global/regionals/finder/Bolivia-Preliminary-2025/standings',
      name: 'Scoreboard',
    },
  ],
};

export default competition;
