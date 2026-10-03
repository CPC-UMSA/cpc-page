import { type MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import { useEffect, useRef, useState } from 'react';

export const meta: MetaFunction = () => [{ title: 'Nuestras actividades' }];

export async function loader() {
  return null;
}

type Accent = 'blue' | 'red' | 'yellow';

type SemesterActivity = {
  icon: string;
  title: string;
  frequency: string;
  accent: Accent;
  description: string;
  note?: { label: string; text: string };
};

type AnnualActivity = {
  icon: string;
  title: string;
  when: string;
  // Meses (1-12) en los que suele realizarse; sirven para marcar el calendario y calcular el estado.
  months: number[];
  accent: Accent;
  description: string;
  link?: { to: string; label: string };
};

const SEMESTER_ACTIVITIES: SemesterActivity[] = [
  {
    icon: '🎤',
    title: 'Presentación de grupos de estudio',
    frequency: 'Auditorio de Informática',
    accent: 'blue',
    description:
      'Los grupos de estudio presentan su trabajo en el auditorio de la Carrera de Informática. Las fechas las define cada grupo de estudio.',
  },
  {
    icon: '💻',
    title: 'Talleres de programación competitiva',
    frequency: 'Una vez por semana',
    accent: 'yellow',
    description:
      'Clases prácticas de algoritmos y estructuras de datos, dictadas en las instalaciones de la Carrera de Informática, para quienes quieren iniciarse o mejorar en la programación competitiva.',
    note: {
      label: 'II/2026',
      text: 'Los talleres de este semestre fueron cancelados, porque nuestros equipos se encuentran en entrenamientos intensivos para la Competencia Latinoamericana 2026.',
    },
  },
];

const ANNUAL_ACTIVITIES: AnnualActivity[] = [
  {
    icon: '🎯',
    title: 'Concurso Clasificatorio División 2',
    when: 'Aprox. julio – agosto',
    months: [7, 8],
    accent: 'yellow',
    description:
      'Competencia individual para estudiantes de la UMSA que nunca participaron en una competencia oficial de la ICPC. Los tres mejores forman un equipo oficial que representa al club en la Competencia Boliviana de Programación.',
    link: { to: '/division-2', label: 'Ver División 2' },
  },
  {
    icon: '🏁',
    title: 'Concurso Clasificatorio División 1',
    when: 'Aprox. julio – agosto',
    months: [7, 8],
    accent: 'blue',
    description:
      'Competencia por equipos de 3 integrantes, abierta a estudiantes nuevos y antiguos de la UMSA. Clasifican los cuatro mejores equipos y el mejor equipo conformado por chicas a la Competencia Boliviana de Programación.',
    link: { to: '/division-1', label: 'Ver División 1' },
  },
  {
    icon: '🇧🇴',
    title: 'Competencia Boliviana de Programación',
    when: 'Usualmente en septiembre',
    months: [9],
    accent: 'red',
    description:
      'Las universidades de todo el país compiten el mismo día. Cada departamento tiene su propia sede, así que nuestros equipos compiten en La Paz.',
  },
  {
    icon: '🌎',
    title: 'Competencia Latinoamericana',
    when: 'Primer sábado de noviembre',
    months: [11],
    accent: 'blue',
    description:
      'La fase latinoamericana de la ICPC. En Bolivia se realiza en una única sede a nivel nacional, donde se reúnen los mejores equipos del país.',
    link: { to: '/equipos-2026', label: 'Ver Equipos 2026' },
  },
];

const MONTHS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

const LATINO_VENUES: Record<number, string> = { 2026: 'Sucre, Chuquisaca' };

function firstSaturdayOfNovember(year: number) {
  const date = new Date(year, 10, 1);
  date.setDate(1 + ((6 - date.getDay() + 7) % 7));
  return date;
}

function nextLatino(today: Date) {
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const thisYear = firstSaturdayOfNovember(today.getFullYear());
  return thisYear >= startOfToday ? thisYear : firstSaturdayOfNovember(today.getFullYear() + 1);
}

function activityStatus(months: number[], today: Date) {
  const month = today.getMonth() + 1;
  if (months.includes(month)) return { label: 'En curso', className: 'act-status-live' };
  if (month < months[0]) return { label: 'Próximamente', className: 'act-status-next' };
  return { label: 'Realizado este año', className: 'act-status-done' };
}

// Las fechas dependen del reloj del visitante, así que se calculan recién en el cliente para no
// romper la hidratación del HTML generado en el servidor.
function useToday() {
  const [today, setToday] = useState<Date | null>(null);
  useEffect(() => setToday(new Date()), []);
  return today;
}

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

function YearStrip({ today }: { today: Date | null }) {
  const currentMonth = today ? today.getMonth() + 1 : null;
  return (
    <div className="act-year act-reveal">
      {MONTHS.map((label, i) => {
        const month = i + 1;
        const events = ANNUAL_ACTIVITIES.filter((activity) => activity.months.includes(month));
        return (
          <div key={label} className={`act-year-month${currentMonth === month ? ' act-year-today' : ''}`}>
            <span className="act-year-label">{label}</span>
            <div className="act-year-dots">
              {events.map((event) => (
                <span key={event.title} className={`act-dot act-bg-${event.accent}`} title={event.title} />
              ))}
            </div>
            {currentMonth === month && <span className="act-year-now">Hoy</span>}
          </div>
        );
      })}
    </div>
  );
}

function LatinoCountdown({ today }: { today: Date | null }) {
  const date = today ? nextLatino(today) : firstSaturdayOfNovember(2026);
  const days = today ? Math.round((date.getTime() - new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime()) / 86400000) : null;
  const venue = LATINO_VENUES[date.getFullYear()];
  const formatted = date.toLocaleDateString('es-BO', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="act-countdown act-reveal">
      <div>
        <span className="act-countdown-kicker">Próxima Competencia Latinoamericana</span>
        <strong className="act-countdown-date">{formatted}</strong>
        {venue && <span className="act-countdown-venue">📍 {venue}</span>}
      </div>
      {days !== null && (
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
      )}
    </div>
  );
}

export default function NuestrasActividades() {
  const today = useToday();
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
        <p className="act-hero-sub">Lo que hacemos cada semestre y cada año en el Club de Programación Competitiva UMSA</p>
        <div className="act-hero-stripe" aria-hidden="true">
          <span className="act-bg-blue" />
          <span className="act-bg-red" />
          <span className="act-bg-yellow" />
        </div>
      </div>

      <div className="act-content">
        <section>
          <h2 className="act-section-title">
            <span className="act-section-tag act-bg-blue">Cada semestre</span>
          </h2>
          <div className="act-semester-grid">
            {SEMESTER_ACTIVITIES.map((activity) => (
              <article key={activity.title} className={`act-card act-accent-${activity.accent} act-reveal`}>
                <div className="act-card-icon">{activity.icon}</div>
                <span className="act-card-when">{activity.frequency}</span>
                <h3 className="act-card-title">{activity.title}</h3>
                <p className="act-card-text">{activity.description}</p>
                {activity.note && (
                  <div className="act-card-note">
                    <strong>{activity.note.label}:</strong> {activity.note.text}
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>

        <section>
          <h2 className="act-section-title">
            <span className="act-section-tag act-bg-red">Cada año</span>
          </h2>
          <YearStrip today={today} />

          <ol className="act-timeline">
            {ANNUAL_ACTIVITIES.map((activity) => {
              const status = today ? activityStatus(activity.months, today) : null;
              return (
                <li key={activity.title} className={`act-timeline-item act-accent-${activity.accent} act-reveal`}>
                  <span className={`act-timeline-node act-bg-${activity.accent}`}>{activity.icon}</span>
                  <article className="act-card">
                    <div className="act-card-head">
                      <span className="act-card-when">{activity.when}</span>
                      {status && <span className={`act-status ${status.className}`}>{status.label}</span>}
                    </div>
                    <h3 className="act-card-title">{activity.title}</h3>
                    <p className="act-card-text">{activity.description}</p>
                    {activity.link && (
                      <Link className="act-card-link" to={activity.link.to}>
                        {activity.link.label} →
                      </Link>
                    )}
                  </article>
                </li>
              );
            })}
          </ol>

          <LatinoCountdown today={today} />
        </section>
      </div>
    </div>
  );
}
