import { Competition } from '~/types';

const competition: Competition = {
  competition_id: '2018-4-latino',
  name: 'Latinoamericano',
  year: 2018,
  location: 'POTOSI',
  judge: 'BOCA',
  total_problems: null,
  scoreboard: [
    {
      place: 20,
      team_name: 'RAK',
      problems_solved: 6,
      total_time: 704,
      participants: ['Rodrigo Javier Castillo Gúzman', 'Alexis Jaime Vargas Quelca', 'Kevin Arturo Navia Paiva'],
      coach: 'Fabio Laura Yavi',
    },
    {
      place: 27,
      team_name: 'Elfita no te baias',
      problems_solved: 5,
      total_time: 708,
      participants: ['Addis Rengel Sempértegui', 'Carlos Mijael Tola Apaza', 'Gabriel Adrian Mazuelos Rabaza'],
      coach: 'Branimir Fernando Espinoza Argollo',
    },
    {
      place: 51,
      team_name: 'SuperMegaRondolomicEpsilon',
      problems_solved: 3,
      total_time: 454,
      participants: ['Rolando Troche Venegas', 'Edson Eddy Lecoña Zarate', 'Oscar Antonio Rondo Rodriguez'],
      coach: 'Diego Adrian Charca Flores',
    },
    {
      place: 74,
      team_name: 'GG con el inglés',
      problems_solved: 2,
      total_time: 122,
      participants: ['Marcelo Nelson De La Quintana Illanes', 'Herbert Wilmer Quispe Churqui', 'Alfredo Alejandro Alvarez Acuña'],
      coach: 'Oscar Gauss Carvajal Yucra',
    },
  ],
  resources: [],
};

export default competition;
