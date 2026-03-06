import { Competition } from '~/types';

const competition: Competition = {
  competition_id: '2013-4-latino',
  name: 'Latinoamericano',
  year: 2013,
  location: 'Santa Cruz de la Sierra',
  judge: 'BOCA',
  total_problems: null,
  scoreboard: [
    {
      place: 35,
      team_name: 'Vampire Programmers',
      problems_solved: 2,
      total_time: 297,
      participants: ['Mauricio Alarcon Canedo', 'Jose Manuel Loza Troche', 'Jose Carlos Laura Ramirez'],
      coach: 'Gabriel Rea',
    },
    {
      place: 54,
      team_name: 'Skipycoders',
      problems_solved: 1,
      total_time: 60,
      participants: ['Oscar Gauss Carvajal Yucra', 'Carlos Fernando Torrez Alanoca', 'Rodrigo Javier Castillo Gúzman'],
      coach: 'Jhonatan Ismael Castro Rocabado',
    },
    {
      place: 66,
      team_name: 'StamosTanLentos',
      problems_solved: 1,
      total_time: 88,
      participants: ['Gabriel Adrian Mazuelos Rabaza', 'Samuel Rene Loza', 'Branimir Fernando Espinoza Argollo'],
      coach: 'Victor Hugo Canaviri Lopez',
    },
    {
      place: 68,
      team_name: 'Todo a Fuerza Bruta',
      problems_solved: 1,
      total_time: 91,
      participants: ['Paul Landaeta Flores', 'Elmer Shamir Zapata Alanoca', 'Gustavo Miguel Barrios Tarifa'],
      coach: 'Jhonny Felipez',
    },
    {
      place: 111,
      team_name: 'Kerberos',
      problems_solved: 1,
      total_time: 253,
      participants: ['Mauricio Mijail De La Quintana Illanes', 'Roger Franz Choquehuanca Vilca', 'Jose Gonzalo Espejo Cuba'],
      coach: 'Jose Luis Quelca Calle',
    },
    {
      place: 123,
      team_name: 'programersING *',
      problems_solved: 0,
      total_time: 0,
      participants: ['Anahi Viviana Castillo Condori', 'Felix Kristhian Mendoza Nogales', 'Marco Antonio Inquillo Torrez'],
      coach: 'Virginia Zota Uño',
    },
  ],
  resources: [],
};

export default competition;
