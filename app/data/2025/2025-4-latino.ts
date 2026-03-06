import { Competition } from '~/types';

const competition: Competition = {
  competition_id: '2025-4-latino',
  name: 'Latinoamericano',
  year: 2025,
  location: 'Santa Cruz de la Sierra - Universidad del Valle',
  judge: 'BOCA',
  total_problems: 13,
  scoreboard: [
    {
      place: 25,
      team_name: 'Duck Duck Gauss',
      problems_solved: 4,
      total_time: 468,
      participants: ['Daner Zein Tonconi Mendoza', 'Marco Andrés Cusicanqui León', 'Fabricio Javier Cabrera Gordillo'],
      coach: 'Oscar Gauss Carvajal Yucra',
    },
    {
      place: 52,
      team_name: 'Los Marco-ders ft. Pancho',
      problems_solved: 2,
      total_time: 16,
      participants: ['Romer Flores Condori', 'Freddy Sebastian Catunta Uturunco', 'Francisco Gustavo Troche Venegas'],
      coach: 'Marco Antonio Castillo Uscamayta',
    },
    {
      place: 54,
      team_name: 'Los Sabrossos',
      problems_solved: 2,
      total_time: 23,
      participants: ['Dilan Juan Cortez Mansilla', 'Luis Alejandro Rojas Cerda', 'Yasir Waldo Caballero Basagoitia'],
      coach: 'Miguel Angel Quispe Mamani',
    },
    {
      place: 104,
      team_name: '==true',
      problems_solved: 2,
      total_time: 61,
      participants: ['Eliseo Eliezer Condori Mamani', 'Nestor Apaza Cruz', 'Fidel Aguilar'],
      coach: 'Luis David Ajhuacho Tarquino',
    },
    {
      place: 107,
      team_name: 'Greedylicious',
      problems_solved: 2,
      total_time: 64,
      participants: ['Mauricio Alvaro Flores Rada', 'Kelvin Bohn Davisson Vargas Garcia', 'Milton Macias'],
      coach: null,
    },
  ],
  resources: [
    {
      url: 'https://icpc.global/regionals/finder/SouthAmerica-South-2026/standings',
      name: 'Scoreboard',
    },
  ],
};

export default competition;
