import { Competition } from '~/types';

const competition: Competition = {
  competition_id: '2024-4-latino',
  name: 'Latinoamericano',
  year: 2024,
  location: 'LA PAZ - Universidad Mayor de San Andrés',
  judge: 'BOCA',
  total_problems: null, // No se especifica en el texto proporcionado
  scoreboard: [
    {
      place: 14,
      team_name: 'Maquinolas',
      problems_solved: 4,
      total_time: 203,
      participants: ['Daner Zein Tonconi Mendoza', 'Marco Andrés Cusicanqui León', 'Fabricio Javier Cabrera Gordillo'],
      coach: 'Oscar Gauss Carvajal Yucra',
    },
    {
      place: 48,
      team_name: 'Por internet te digo que te gano',
      problems_solved: 4,
      total_time: 531,
      participants: ['Hagi Argani Mamani', 'Miguel Angel Quispe Mamani', 'Luis David Ajhuacho Tarquino'],
      coach: null,
    },
    {
      place: 56,
      team_name: 'Los Manco-ders',
      problems_solved: 4,
      total_time: 678,
      participants: ['Romer Flores Condori', 'Freddy Sebastian Catunta Uturunco', 'Roger Abimael Mallcu Alanez'],
      coach: null,
    },
    {
      place: 71,
      team_name: 'Corre en local, seguro es el juez',
      problems_solved: 3,
      total_time: 391,
      participants: ['Gustavo Pillco Lipa', 'Erland Mauricio Ballon Tambo', 'Marco Antonio Castillo Uscamayta'],
      coach: 'Edson Eddy Lecoña Zarate',
    },
    {
      place: 134,
      team_name: 'Icpapus',
      problems_solved: 1,
      total_time: 18,
      participants: ['Dilan Juan Cortez Mansilla', 'Yasir Waldo Caballero Basagoitia', 'Alina Erika Ramirez Castro'],
      coach: null,
    },
  ],
  resources: [
    {
      url: 'https://icpc.global/regionals/finder/SouthAmerica-South-2025/standings',
      name: 'Scoreboard',
    },
  ],
};

export default competition;
