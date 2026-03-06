import { Competition } from '~/types';

const competition: Competition = {
  competition_id: '2017-3-nacional',
  name: 'Nacional',
  year: 2017,
  location: 'La Paz - EMI',
  judge: 'BOCA',
  total_problems: null,
  scoreboard: [
    {
      place: 1,
      team_name: 'Spooky Coders',
      problems_solved: 8,
      total_time: 901,
      participants: ['Oscar Gauss Carvajal Yucra', 'Carlos Fernando Torrez Alanoca', 'Rodrigo Javier Castillo Gúzman'],
      coach: 'Carlos Adrian Fernandez Mondacca',
    },
    {
      place: 2,
      team_name: 'NAHASAPEEMAPETILAN-TASTIC!',
      problems_solved: 7,
      total_time: 706,
      participants: ['Gabriel Adrian Mazuelos Rabaza', 'Branimir Fernando Espinoza Argollo', 'Maxi Jediael Vino Sumi'],
      coach: 'Jose Carlos Laura Ramirez',
    },
    {
      place: 4,
      team_name: 'PRAK',
      problems_solved: 5,
      total_time: 539,
      participants: ['Alexis Jaime Vargas Quelca', 'Kevin Arturo Navia Paiva', 'Juan Jose Miranda Mendoza'],
      coach: 'Rolando Troche Venegas',
    },
    {
      place: 9,
      team_name: 'ALFATeam',
      problems_solved: 4,
      total_time: 459,
      participants: ['Alan Davi Ortiz Vargas', 'Fabiola Vanessa Aliaga Salvatierra', 'Leonardo Julio Rios Aliaga'],
      coach: 'Jhonatan Ismael Castro Rocabado',
    },
    {
      place: 10,
      team_name: 'Master Minds',
      problems_solved: 4,
      total_time: 627,
      participants: ['Marcelo Nelson De La Quintana Illanes', 'Misael Quispe Condori', 'Emanuel Villalobos'],
      coach: 'Miriam Jacqueline Pinto Arcani',
    },
    {
      place: 12,
      team_name: 'NoTeVayasAddis',
      problems_solved: 3,
      total_time: 104,
      participants: ['Rafael Villca Poggian', 'Carlos Mijael Tola Apaza', 'Diego Adrian Charca Flores'],
      coach: 'Addis Rengel Sempertegui',
    },
    {
      place: 17,
      team_name: 'afk',
      problems_solved: 3,
      total_time: 208,
      participants: ['Juan Pablo Hilara Machaca', 'Herbert Wilmer Quispe Churqui', 'Alfredo Alejandro Alvarez Acuña'],
      coach: 'Addis Rengel Sempertegui',
    },
  ],
  resources: [],
};

export default competition;
