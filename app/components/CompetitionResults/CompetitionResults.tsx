import './styles.css';

interface User {
  _id: string;
  name: string;
}

interface Team {
  place: number;
  team_name: string;
  problems_solved: number | null;
  total_time: number | null;
  participants: string[];
  coach: string | null;
}

interface CompetitionData {
  name: string;
  year: number;
  location: string;
  judge: string;
  scoreboard: Team[];
}

export const CompetitionResults = ({ competition, users }: { competition: CompetitionData, users: User[] }) => {
  
  const getUserName = (id: string | null) => {
    if (!id) return 'No asignado';
    const user = users.find((user) => user._id === id);
    return user ? user.name : 'Desconocido';
  };
  
  return (
    <div className="competition-container">
      <div className="competition-card">
        <h1 className="competition-title">
          {competition.name} {competition.year}
        </h1>
        <p className="competition-info">
          📍 {competition.location} | 🏆 Juez: {competition.judge}
        </p>
        
        <div className="scoreboard">
          <h2 className="scoreboard-title">🏆 Clasificación de Equipos</h2>
          <div className="scoreboard-list">
            {competition.scoreboard.map((team, index) => (
              <div key={index} className={`team-row ${index === 0 ? 'best-team' : ''}`}>
                <div>
                  <p className="team-name">
                    {team.place}. {team.team_name}
                  </p>
                  <p className="team-stats">
                    🧩 {team.problems_solved} problemas | ⏱ {team.total_time} min
                  </p>
                  <p className="team-extra">
                    <strong>👨‍💻 Integrantes:</strong> {team.participants.map(getUserName).join(', ')}
                  </p>
                  <p className="team-extra">
                    <strong>🏅 Coach:</strong> {getUserName(team.coach)}
                  </p>
                </div>
                {index === 0 && <span className="best-tag">🥇 Mejor equipo</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
