import { type MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => [
  { title: 'Directiva · Club de Programación Competitiva UMSA' },
  { name: 'description', content: 'Directiva del Club de Programación Competitiva UMSA: gestión 2026, gestiones anteriores y fundador del club.' },
];

type Role = 'Presidente' | 'Vicepresidente' | 'Vocal';

type Member = { role: Role; name: string; initials: string };

type Board = { year: number; members: Member[] };

const ROLE_ICONS: Record<Role, string> = {
  Presidente: '★',
  Vicepresidente: '◆',
  Vocal: '●',
};

// Datos tomados del informe técnico presentado a la Dirección de Carrera (mayo 2026).
const CURRENT_BOARD: Board = {
  year: 2026,
  members: [
    { role: 'Presidente', name: 'Miguel Angel Quispe Mamani', initials: 'MQ' },
    { role: 'Vicepresidente', name: 'Francisco Gustavo Troche Venegas', initials: 'FT' },
    { role: 'Vocal', name: 'Dilan Juan Cortez Mansilla', initials: 'DC' },
  ],
};

const PAST_BOARDS: Board[] = [
  {
    year: 2025,
    members: [
      { role: 'Presidente', name: 'Miguel Angel Quispe Mamani', initials: 'MQ' },
      { role: 'Vicepresidente', name: 'Rolando Troche Venegas', initials: 'RT' },
      { role: 'Vocal', name: 'Dilan Juan Cortez Mansilla', initials: 'DC' },
    ],
  },
  {
    year: 2024,
    members: [
      { role: 'Presidente', name: 'Jonatan Churata Apaza', initials: 'JC' },
      { role: 'Vicepresidente', name: 'Miguel Angel Quispe Mamani', initials: 'MQ' },
      { role: 'Vocal', name: 'Luis David Ajhuacho Tarquino', initials: 'LA' },
    ],
  },
  {
    year: 2023,
    members: [
      { role: 'Presidente', name: 'Jonatan Churata Apaza', initials: 'JC' },
      { role: 'Vicepresidente', name: 'Miguel Angel Quispe Mamani', initials: 'MQ' },
      { role: 'Vocal', name: 'Luis David Ajhuacho Tarquino', initials: 'LA' },
    ],
  },
  {
    year: 2022,
    members: [
      { role: 'Presidente', name: 'Oscar Antonio Rondo Rodriguez', initials: 'OR' },
      { role: 'Vicepresidente', name: 'Sergio Alejandro Paucara Saca', initials: 'SP' },
      { role: 'Vocal', name: 'Grover Osvaldo Rodriguez Apaza', initials: 'GR' },
    ],
  },
  {
    year: 2021,
    members: [
      { role: 'Presidente', name: 'Edson Lecona Zarate', initials: 'EL' },
      { role: 'Vicepresidente', name: 'Sergio Alejandro Paucara Saca', initials: 'SP' },
      { role: 'Vocal', name: 'Rolando Troche Venegas', initials: 'RT' },
    ],
  },
];

const roleClass = (role: Role) => `dir-role-${role.toLowerCase()}`;

export default function Directiva() {
  return (
    <div className="dir-page">
      <div className="dir-hero">
        <h1 className="dir-hero-title cr-we">Directiva</h1>
        <p className="dir-hero-sub">Quienes lideran el Club de Programación Competitiva UMSA</p>
      </div>

      <div className="dir-content">
        {/* Fundador */}
        <section className="dir-founder">
          <div className="dir-founder-avatar" aria-hidden="true">
            JT
          </div>
          <div className="dir-founder-body">
            <div className="dir-founder-badges">
              <span className="dir-badge dir-badge-gold">Fundador · 2012</span>
              <span className="dir-badge">Asesor docente</span>
            </div>
            <h2 className="dir-founder-name cr-we">M.Sc. Jorge Humberto Terán Pomier</h2>
            <p className="dir-founder-text">
              Docente de la Carrera de Informática y fundador del club, que nació en 2012 como el Capítulo Estudiantil ACM ICPC UMSA. Brinda apoyo y
              orientación en las actividades de formación, entrenamiento y representación institucional del club, y fue parte de la creación del{' '}
              <a href="https://jv.umsa.bo/" target="_blank" rel="noopener noreferrer">
                Juez Virtual UMSA
              </a>
              , la plataforma que hasta hoy usamos para concursos y prácticas.
            </p>
          </div>
        </section>

        {/* Gestión actual */}
        <section>
          <div className="dir-section-head">
            <p className="dir-eyebrow">Gestión actual</p>
            <h2 className="dir-section-title">Directiva {CURRENT_BOARD.year}</h2>
          </div>
          <div className="dir-current">
            {CURRENT_BOARD.members.map((member) => (
              <article key={member.role} className={`dir-card ${roleClass(member.role)}`}>
                <div className="dir-card-avatar" aria-hidden="true">
                  {member.initials}
                </div>
                <span className="dir-card-role">
                  <span aria-hidden="true">{ROLE_ICONS[member.role]}</span> {member.role}
                </span>
                <h3 className="dir-card-name">{member.name}</h3>
                <p className="dir-card-text">Gestión {CURRENT_BOARD.year}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Gestiones anteriores */}
        <section>
          <div className="dir-section-head">
            <p className="dir-eyebrow">Historia</p>
            <h2 className="dir-section-title">Gestiones anteriores</h2>
          </div>
          <ol className="dir-timeline">
            {PAST_BOARDS.map((board) => (
              <li key={board.year} className="dir-timeline-item">
                <span className="dir-timeline-year">{board.year}</span>
                <ul className="dir-timeline-members">
                  {board.members.map((member) => (
                    <li key={member.role} className={roleClass(member.role)}>
                      <span className="dir-mini-avatar" aria-hidden="true">
                        {member.initials}
                      </span>
                      <span>
                        <span className="dir-timeline-role">{member.role}</span>
                        <span className="dir-timeline-name">{member.name}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}
