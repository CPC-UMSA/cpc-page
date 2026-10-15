import { type MetaFunction } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { useEffect, useRef } from 'react';
import {
  type ActivityId,
  type CalendarDay,
  activeCancellation,
  dayNumber,
  daysUntil,
  formatWhen,
  isOngoing,
  MONTH_SHORT,
  nextOccurrence,
  occurrencesOf,
  relativeWhen,
  todayInBolivia,
} from '~/helpers/activitySchedule';

export const meta: MetaFunction = () => [{ title: 'Nuestras actividades' }];

export async function loader() {
  return { today: todayInBolivia() };
}

type Accent = 'blue' | 'red' | 'yellow';

type Activity = {
  id: ActivityId;
  icon: string;
  title: string;
  // Cuándo se repite, en palabras; la fecha de la próxima edición se calcula aparte.
  rule: string;
  accent: Accent;
  description: string;
  note?: { label: string; text: string };
  links?: { to: string; label: string }[];
};

const ICPC_BOLIVIA_URL = 'https://icpcbolivia.org/';

const CAREER_ACTIVITIES: Activity[] = [
  {
    id: 'presentacion',
    icon: '🎤',
    title: 'Presentación de grupos de estudio',
    rule: 'Cada semestre, en marzo y septiembre · Auditorio de Informática',
    accent: 'blue',
    description: 'Al inicio de cada semestre, los grupos de estudio presentan su trabajo en el auditorio de la Carrera de Informática.',
  },
  {
    id: 'talleres',
    icon: '💻',
    title: 'Talleres de programación competitiva',
    rule: 'Marzo – junio y septiembre – diciembre · una vez por semana',
    accent: 'yellow',
    description:
      'Clases prácticas de algoritmos y estructuras de datos, dictadas una vez por semana en las instalaciones de la Carrera de Informática, para quienes quieren iniciarse o mejorar en la programación competitiva. Empiezan junto con la presentación de grupos de estudio y duran 4 meses.',
  },
  {
    id: 'concurso',
    icon: '🏆',
    title: 'Concurso de Programación',
    rule: 'Cada octubre · semana de aniversario de la Carrera',
    accent: 'red',
    description:
      'Concurso que organizamos durante la semana de aniversario de la Carrera de Informática, exclusivo para estudiantes de la Carrera y pensado para gente nueva: los miembros del club no participan. Se compite por premios que se anuncian en cada edición.',
    note: { label: 'Importante', text: 'No forma parte del proceso de selección de equipos para ICPC Bolivia.' },
  },
  {
    id: 'div2',
    icon: '🎯',
    title: 'Concurso Clasificatorio División 2',
    rule: 'Cada año, aprox. entre julio y agosto',
    accent: 'yellow',
    description:
      'Competencia individual para estudiantes de la UMSA que nunca participaron en una competencia oficial de la ICPC. Los tres mejores forman un equipo oficial que representa al club en la Competencia Boliviana de Programación.',
    links: [{ to: '/division-2', label: 'Ver División 2' }],
  },
  {
    id: 'div1',
    icon: '🏁',
    title: 'Concurso Clasificatorio División 1',
    rule: 'Cada año, aprox. entre julio y agosto',
    accent: 'blue',
    description:
      'Competencia por equipos de 3 integrantes, abierta a estudiantes nuevos y antiguos de la UMSA. Clasifican los cuatro mejores equipos y el mejor equipo conformado por chicas a la Competencia Boliviana de Programación.',
    links: [{ to: '/division-1', label: 'Ver División 1' }],
  },
];

const ICPC_ACTIVITIES: Activity[] = [
  {
    id: 'boliviana',
    icon: '🇧🇴',
    title: 'Competencia Boliviana de Programación',
    rule: 'Cada año, usualmente en septiembre',
    accent: 'red',
    description:
      'Las universidades de todo el país compiten el mismo día. Cada departamento tiene su propia sede, así que nuestros equipos compiten en La Paz.',
    links: [{ to: ICPC_BOLIVIA_URL, label: 'ICPC Bolivia' }],
  },
  {
    id: 'latino',
    icon: '🌎',
    title: 'Competencia Latinoamericana',
    rule: 'Cada año, el primer sábado de noviembre',
    accent: 'blue',
    description: 'La fase latinoamericana de la ICPC. En Bolivia se realiza en una única sede a nivel nacional, donde se reúnen los mejores equipos del país.',
    links: [
      { to: '/equipos-2026', label: 'Ver Equipos 2026' },
      { to: ICPC_BOLIVIA_URL, label: 'ICPC Bolivia' },
    ],
  },
];

const ACCENTS = Object.fromEntries([...CAREER_ACTIVITIES, ...ICPC_ACTIVITIES].map((activity) => [activity.id, activity])) as Record<
  ActivityId,
  Activity
>;

const MONTH_LABELS = MONTH_SHORT.map((label) => label[0].toUpperCase() + label.slice(1));

const capitalize = (text: string) => text[0].toUpperCase() + text.slice(1);

// Ordena las actividades por su próxima edición: la que acaba de pasar se va al final.
const byNextOccurrence = (activities: Activity[], today: CalendarDay) =>
  activities
    .map((activity) => ({ activity, next: nextOccurrence(activity.id, today) }))
    .sort((a, b) => dayNumber(a.next.start) - dayNumber(b.next.start));

// Anima las tarjetas al entrar en pantalla. Sin JS (o con movimiento reducido) todo queda visible.
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>('.act-reveal'));
    root.classList.add('act-reveal-ready');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('act-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
  return ref;
}

// Los próximos 12 meses, empezando por el actual, con las actividades de cada mes.
function YearStrip({ today }: { today: CalendarDay }) {
  const occurrences = [today.year, today.year + 1].flatMap(occurrencesOf);
  return (
    <div className="act-year act-reveal">
      {Array.from({ length: 12 }, (_, i) => {
        const month = ((today.month - 1 + i) % 12) + 1;
        const year = today.year + Math.floor((today.month - 1 + i) / 12);
        const key = year * 100 + month;
        const events = occurrences.filter(
          (occurrence) => occurrence.start.year * 100 + occurrence.start.month <= key && key <= occurrence.end.year * 100 + occurrence.end.month,
        );
        return (
          <div key={key} className={`act-year-month${i === 0 ? ' act-year-today' : ''}`}>
            <span className="act-year-label">{MONTH_LABELS[month - 1]}</span>
            {(i === 0 || month === 1) && <span className="act-year-year">{year}</span>}
            <div className="act-year-dots">
              {events.map((event) => (
                <span key={event.key} className={`act-dot act-bg-${ACCENTS[event.id].accent}`} title={ACCENTS[event.id].title} />
              ))}
            </div>
            {i === 0 && <span className="act-year-now">Hoy</span>}
          </div>
        );
      })}
    </div>
  );
}

function LatinoCountdown({ today }: { today: CalendarDay }) {
  const latino = nextOccurrence('latino', today);
  const days = daysUntil(latino.start, today);

  return (
    <div className="act-countdown act-reveal">
      <div>
        <span className="act-countdown-kicker">Próxima Competencia Latinoamericana</span>
        <strong className="act-countdown-date">{formatWhen(latino)}</strong>
        {latino.venue && <span className="act-countdown-venue">📍 {latino.venue}</span>}
      </div>
      <div className="act-countdown-days">
        {days === 0 ? (
          <strong>¡Hoy!</strong>
        ) : (
          <>
            <strong>{days}</strong>
            <span>{days === 1 ? 'día' : 'días'}</span>
          </>
        )}
      </div>
    </div>
  );
}

function CardLinks({ links }: { links: { to: string; label: string }[] }) {
  return (
    <div className="act-card-links">
      {links.map((link) =>
        link.to.startsWith('http') ? (
          <a key={link.to} className="act-card-link" href={link.to} target="_blank" rel="noopener noreferrer">
            {link.label} ↗
          </a>
        ) : (
          <Link key={link.to} className="act-card-link" to={link.to}>
            {link.label} →
          </Link>
        ),
      )}
    </div>
  );
}

function ActivityTimeline({ activities, today }: { activities: Activity[]; today: CalendarDay }) {
  return (
    <ol className="act-timeline">
      {byNextOccurrence(activities, today).map(({ activity, next }) => {
        const ongoing = isOngoing(next, today);
        const cancellation = activeCancellation(activity.id, today);
        const links = [...(next.signupUrl ? [{ to: next.signupUrl, label: 'Inscribirse' }] : []), ...(activity.links ?? [])];
        return (
          <li key={activity.id} className={`act-timeline-item act-accent-${activity.accent} act-reveal`}>
            <span className={`act-timeline-node act-bg-${activity.accent}`}>{activity.icon}</span>
            <article className="act-card">
              <div className="act-card-head">
                <span className="act-card-when">
                  {ongoing ? 'Ahora' : 'Próxima'}: {formatWhen(next)}
                </span>
                <span className={`act-status ${ongoing ? 'act-status-live' : 'act-status-next'}`}>{relativeWhen(next, today)}</span>
              </div>
              <h3 className="act-card-title">{activity.title}</h3>
              <p className="act-card-rule">{capitalize(activity.rule)}</p>
              <p className="act-card-text">{activity.description}</p>
              {cancellation && (
                <div className="act-card-note">
                  <strong>
                    {cancellation.occurrence.semester}/{cancellation.occurrence.start.year}:
                  </strong>{' '}
                  {cancellation.reason} Vuelven en {formatWhen(next)}.
                </div>
              )}
              {activity.note && (
                <div className="act-card-note">
                  <strong>{activity.note.label}:</strong> {activity.note.text}
                </div>
              )}
              {links.length > 0 && <CardLinks links={links} />}
            </article>
          </li>
        );
      })}
    </ol>
  );
}

export default function NuestrasActividades() {
  const { today } = useLoaderData<typeof loader>();
  const revealRef = useReveal();

  return (
    <div className="act-page" ref={revealRef}>
      <div className="act-hero">
        <div className="act-hero-cubes" aria-hidden="true">
          {Array.from({ length: 9 }, (_, i) => (
            <span key={i} className={`act-cube act-cube-${i} act-bg-${(['blue', 'red', 'yellow'] as const)[i % 3]}`} />
          ))}
        </div>
        <h1 className="act-hero-title cr-we">Nuestras actividades</h1>
        <p className="act-hero-sub">Lo que hacemos en la Carrera de Informática y junto a ICPC Bolivia en el Club de Programación Competitiva UMSA</p>
        <div className="act-hero-stripe" aria-hidden="true">
          <span className="act-bg-blue" />
          <span className="act-bg-red" />
          <span className="act-bg-yellow" />
        </div>
      </div>

      <div className="act-content">
        <YearStrip today={today} />

        <section>
          <h2 className="act-section-title">
            <span className="act-section-tag act-bg-blue">En la Carrera de Informática</span>
          </h2>
          <p className="act-section-sub">Abiertas para estudiantes. Ordenadas por fecha: la más cercana primero.</p>
          <ActivityTimeline activities={CAREER_ACTIVITIES} today={today} />
        </section>

        <section>
          <h2 className="act-section-title">
            <span className="act-section-tag act-bg-red">Con ICPC Bolivia</span>
          </h2>
          <p className="act-section-sub">Participan los equipos clasificados en la División 1 y la División 2.</p>
          <ActivityTimeline activities={ICPC_ACTIVITIES} today={today} />

          <LatinoCountdown today={today} />
        </section>
      </div>
    </div>
  );
}
