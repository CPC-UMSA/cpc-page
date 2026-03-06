import { Competition } from '~/types';

const competition: Competition = {
  competition_id: '2019-3-nacional',
  name: 'Nacional',
  year: 2019,
  location: 'LA PAZ - Universidad Mayor de San Andrés',
  judge: 'BOCA',
  total_problems: null,
  scoreboard: [
    {
      place: 15,
      team_name: 'Elfita no te baias',
      problems_solved: 5,
      total_time: 700,
      participants: ['Kevin Arturo Navia Paiva', 'Alexis Jaime Vargas Quelca', 'Carlos Mijael Tola Apaza'],
      coach: 'Rolando Troche Venegas',
    },
    {
      place: 31,
      team_name: 'NPCs',
      problems_solved: 3,
      total_time: 238,
      participants: ['Edson Eddy Lecoña Zarate', 'Oscar Antonio Rondo Rodriguez', 'Maxi Jediael Vino Sumi'],
      coach: 'Rodrigo Javier Castillo Guzmán',
    },
    {
      place: 50,
      team_name: 'Mi coach no cree en nosotros',
      problems_solved: 2,
      total_time: 240,
      participants: ['Marcelo Nelson De La Quintana Illanes', 'Andres Gomez', 'Marco Antonio Castillo Uscamayta'],
      coach: 'Oscar Gauss Carvajal Yucra',
    },
    {
      place: 64,
      team_name: 'Grami',
      problems_solved: 1,
      total_time: 26,
      participants: ['Alex Dariem Choque Paquiri', 'Grover Osvaldo Rodriguez Apaza', 'Miguel Angel Quispe Mamani'],
      coach: 'Oscar Gauss Carvajal Yucra',
    },
    {
      place: 78,
      team_name: 'Hallelujah',
      problems_solved: 1,
      total_time: 54,
      participants: ['Sergio Alejandro Paucara Saca', 'Luis David Ajhuacho Tarquino', 'Luis Gustavo Mamani Apaza'],
      coach: 'Juan Jose Miranda Mendoza',
    },
  ],
  resources: [],
};

export default competition;
