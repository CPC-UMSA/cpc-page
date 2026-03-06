import { Competition } from '~/types';

const competition: Competition = {
  competition_id: '2022-2-div1-local',
  name: 'Primera División',
  year: 2022,
  location: 'Universidad Mayor de San Andrés',
  judge: 'BOCA_LOCAL',
  mode: 'TEAMS',
  total_problems: 8,
  slots: 4,
  scoreboard: [
    {
      place: 1,
      team_name: 'Los maquinola',
      problems_solved: 8,
      total_time: 671,
      participants: ['Daner Zein Tonconi Mendoza', 'Marco Andrés Cusicanqui León', 'Fabricio Javier Cabrera Gordillo'],
      coach: null,
    },
    {
      place: 2,
      team_name: 'RMF4.San_Andres()',
      problems_solved: 8,
      total_time: 852,
      participants: ['Grover Osvaldo Rodriguez Apaza', 'Rodrigo Ticona Coronel', 'Marco Antonio Castillo Uscamayta'],
      coach: null,
    },
    {
      place: 3,
      team_name: '¿Que es DP?',
      problems_solved: 7,
      total_time: 569,
      participants: ['Carlos Mijael Tola Apaza', 'Rolando Troche Venegas'],
      coach: null,
    },
    {
      place: 4,
      team_name: 'Sergio no te comas esa hamburguesa',
      problems_solved: 4,
      total_time: 284,
      participants: ['Luis David Ajhuacho Tarquino', 'Miguel Angel Quispe Mamani', 'Sergio Alejandro Paucara Saca'],
      coach: null,
    },
    {
      place: 5,
      team_name: 'MBC',
      problems_solved: 4,
      total_time: 468,
      participants: ['Diego Alejandro Cuevas Mamani', 'Sebastian Mauricio Mitre Huayta', 'Alex Dariem Choque Paquiri'],
      coach: null,
    },
  ],
  resources: [],
};

export default competition;
