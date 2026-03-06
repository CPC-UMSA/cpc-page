import { Competition } from '~/types';

const competition: Competition = {
  competition_id: '2023-2-div1-local',
  name: 'Primera División',
  year: 2023,
  location: 'Universidad Mayor de San Andrés',
  judge: 'BOCA_LOCAL',
  mode: 'INDIVIDUAL',
  total_problems: 5,
  slots: 9,
  scoreboard: [], // La tabla enviada no contenía filas con datos de participantes
  resources: [],
};

export default competition;
