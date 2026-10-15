import { Link } from '@remix-run/react';
import { type ActivityId, type CalendarDay, type Occurrence, relativeWhen, shortWhen, upcomingOccurrences } from '~/helpers/activitySchedule';

type Access = 'open' | 'qualified';

const INFO: Record<ActivityId, { icon: string; title: string; access: Access; audience: string; to: string }> = {
  presentacion: { icon: '🎤', title: 'Presentación de grupos de estudio', access: 'open', audience: 'Para todos', to: '/nuestras-actividades' },
  talleres: { icon: '💻', title: 'Talleres de programación', access: 'open', audience: 'Para todos', to: '/nuestras-actividades' },
  concurso: { icon: '🏆', title: 'Concurso de Programación', access: 'open', audience: 'Solo estudiantes de Informática', to: '/nuestras-actividades' },
  div2: { icon: '🎯', title: 'Clasificatorio División 2', access: 'open', audience: 'Estudiantes UMSA nuevos en ICPC', to: '/division-2' },
  div1: { icon: '🏁', title: 'Clasificatorio División 1', access: 'open', audience: 'Equipos de estudiantes UMSA', to: '/division-1' },
  boliviana: { icon: '🇧🇴', title: 'Competencia Boliviana', access: 'qualified', audience: 'Clasificados en División 1 y 2', to: '/nuestras-actividades' },
  latino: { icon: '🌎', title: 'Competencia Latinoamericana', access: 'qualified', audience: 'Clasificados en la Boliviana', to: '/nuestras-actividades' },
};

const titleOf = (occurrence: Occurrence) =>
  occurrence.semester ? `${INFO[occurrence.id].title} ${occurrence.semester}/${occurrence.start.year}` : INFO[occurrence.id].title;

export function UpcomingActivities({ today }: { today: CalendarDay }) {
  const items = upcomingOccurrences(today).slice(0, 6);

  return (
    <section className="hm-upcoming" aria-labelledby="hm-upcoming-title">
      <div className="hm-upcoming-head">
        <div>
          <p className="hm-eyebrow">Agenda del club</p>
          <h2 id="hm-upcoming-title" className="hm-upcoming-title">
            Próximas actividades
          </h2>
        </div>
        <ul className="hm-upcoming-legend">
          <li>
            <span className="hm-access hm-access-open">Abierto</span> te puedes inscribir
          </li>
          <li>
            <span className="hm-access hm-access-qualified">Por clasificación</span> solo equipos clasificados
          </li>
        </ul>
      </div>

      <ol className="hm-upcoming-track">
        {items.map((item, index) => {
          const info = INFO[item.id];
          const date = shortWhen(item);
          const to = item.signupUrl ?? info.to;
          const external = to.startsWith('http');
          const content = (
            <>
              <span className="hm-upcoming-when">
                <strong>{date.top}</strong>
                <span>{date.bottom}</span>
              </span>
              <span className="hm-upcoming-body">
                <span className="hm-upcoming-relative">
                  {index === 0 && <span className="hm-upcoming-next">Lo siguiente</span>}
                  {relativeWhen(item, today)}
                </span>
                <span className="hm-upcoming-name">
                  <span aria-hidden="true">{info.icon}</span> {titleOf(item)}
                </span>
                <span className={`hm-access hm-access-${info.access}`}>{info.access === 'open' ? 'Abierto' : 'Por clasificación'}</span>
                <span className="hm-upcoming-audience">{info.audience}</span>
                {external && <span className="hm-upcoming-cta">Inscribirse ↗</span>}
              </span>
            </>
          );
          return (
            <li key={item.key} className={`hm-upcoming-item hm-upcoming-${info.access}${index === 0 ? ' hm-upcoming-first' : ''}`}>
              {external ? (
                <a className="hm-upcoming-card" href={to} target="_blank" rel="noopener noreferrer">
                  {content}
                </a>
              ) : (
                <Link className="hm-upcoming-card" to={to}>
                  {content}
                </Link>
              )}
            </li>
          );
        })}
      </ol>

      <Link className="hm-link" to="/nuestras-actividades">
        Ver todas las actividades →
      </Link>
    </section>
  );
}
