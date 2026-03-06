import { Competition } from '~/types';

const competition: Competition = {
  competition_id: '2025-3-nacional',
  name: 'Nacional',
  year: 2025,
  location: 'EMI, La Paz',
  judge: 'BOCA',
  total_problems: null, // No se especifica el total en la tabla proporcionada
  scoreboard: [
    {
      place: 4,
      team_name: 'Los Marco-ders ft. Pancho',
      problems_solved: 4,
      total_time: 203,
      participants: ['Romer Flores Condori', 'Freddy Sebastian Catunta Uturunco', 'Francisco Gustavo Troche Venegas'],
      coach: 'Marco Antonio Castillo Uscamayta',
    },
    {
      place: 5,
      team_name: 'Duck Duck Gauss',
      problems_solved: 4,
      total_time: 227,
      participants: ['Daner Zein Tonconi Mendoza', 'Marco Andrés Cusicanqui León', 'Fabricio Javier Cabrera Gordillo'],
      coach: 'Oscar Gauss Carvajal Yucra',
    },
    {
      place: 14,
      team_name: 'Los Sabrossos',
      problems_solved: 4,
      total_time: 463,
      participants: ['Dilan Juan Cortez Mansilla', 'Luis Alejandro Rojas Cerda', 'Yasir Waldo Caballero Basagoitia'],
      coach: 'Miguel Angel Quispe Mamani',
    },
    {
      place: 24,
      team_name: 'Greedylicious',
      problems_solved: 3,
      total_time: 126,
      participants: ['Mauricio Alvaro Flores Rada', 'Kelvin Bohn Davisson Vargas Garcia', 'Milton Macias'],
      coach: null,
    },
    {
      place: 27,
      team_name: '==true',
      problems_solved: 3,
      total_time: 138,
      participants: ['Eliseo Eliezer Condori Mamani', 'Nestor Apaza Cruz', 'Fidel Aguilar'],
      coach: 'Luis David Ajhuacho Tarquino',
    },
    {
      place: 33,
      team_name: 'Litle boats = barquitos',
      problems_solved: 3,
      total_time: 159,
      participants: ['Andres Miguel Rojas Murga', 'Brayan Quispe', 'Jorge Andres Coronel Hurtado'],
      coach: null,
    },
  ],
  resources: [
    {
      url: 'https://scorelatam.naquadah.com.br/subbr-2025/#',
      name: 'Scoreboard',
    },
  ],
};

export default competition;
