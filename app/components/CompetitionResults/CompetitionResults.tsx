import './styles.css';
import type { Competition } from '~/types';

export const CompetitionResults = ({ competition }: { competition: Competition }) => {
  return (
    <div className="cr-container">
      <div className="cr-card">
        <div className="cr-header">
          <h1 className="cr-title">
            {competition.name} {competition.year}
          </h1>
          <div className="cr-meta">
            <span className="cr-meta-item">
              <span className="cr-meta-icon">📍</span>
              {competition.location}
            </span>
            <span className="cr-meta-divider" />
            <span className="cr-meta-item">
              <span className="cr-meta-icon">⚖️</span>
              Judge: {competition.judge}
            </span>
          </div>
        </div>

        <div className="cr-scoreboard">
          <div className="cr-table-header">
            <span className="cr-col-rank">#</span>
            <span className="cr-col-team">Team</span>
            <span className="cr-col-stat">Problems</span>
            <span className="cr-col-stat">Time</span>
          </div>

          {competition.scoreboard.map((team, index) => (
            <div key={index} className={`cr-row cr-rank-${Math.min(index + 1, 4)}`}>
              <div className="cr-col-rank">
                <span className="cr-place">{team.place}</span>
              </div>
              <div className="cr-col-team">
                <p className="cr-team-name">{team.team_name}</p>
                <p className="cr-team-members">{team.participants.join(' · ')}</p>
                {team.coach && <p className="cr-team-coach">Coach: {team.coach}</p>}
              </div>
              <div className="cr-col-stat">
                <span className="cr-stat-value">{team.problems_solved ?? '—'}</span>
                <span className="cr-stat-label">solved</span>
              </div>
              <div className="cr-col-stat">
                <span className="cr-stat-value">{team.total_time ?? '—'}</span>
                {team.total_time !== null && <span className="cr-stat-label">min</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};