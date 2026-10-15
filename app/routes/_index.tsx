import { MetaFunction } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { UpcomingActivities } from '~/components/UpcomingActivities';
import { todayInBolivia } from '~/helpers/activitySchedule';

export const meta: MetaFunction = () => [
  { title: 'Inicio · Club de Programación Competitiva UMSA' },
  {
    name: 'description',
    content:
      'Explora el mundo de los algoritmos y la programación competitiva. Únete al club de la UMSA y participa en ICPC, la Competencia Boliviana de Programación y más.',
  },
  { property: 'og:title', content: 'Inicio · Club de Programación Competitiva UMSA' },
  {
    property: 'og:description',
    content: 'Únete al club de programación competitiva de la UMSA. Competimos en ICPC y la Competencia Boliviana de Programación.',
  },
  { property: 'og:image', content: '/home/hero.jpg' },
];

export async function loader() {
  return { today: todayInBolivia() };
}

const TELEGRAM_URL = 'https://t.me/ClubProgCompUMSA';
const ICPC_BOLIVIA_URL = 'https://icpcbolivia.org/';

const STATS = [
  { value: '2012', label: 'Compitiendo en ICPC desde' },
  { value: '7', label: 'Equipos en la temporada 2026' },
  { value: '6', label: 'Clasificados a la Latino 2026' },
];

const ADVANTAGES = [
  { icon: '📚', title: 'Aprendizaje autodidacta', text: 'Cada miembro desarrolla la capacidad de investigar y aprender por su cuenta.' },
  { icon: '🎯', title: 'Entrevistas de trabajo', text: 'Mayor preparación para entrevistas técnicas de programación.' },
  { icon: '🚀', title: 'Oportunidades', text: 'Desarrollo de habilidades altamente valoradas en el mercado laboral.' },
  { icon: '🎓', title: 'Académico', text: 'Mejor desempeño en materias como INF-111, INF-121 e INF-131.' },
];

const MOMENTS = [
  { src: '/home/momento-nacional.jpg', alt: 'Premiación de equipos del club en el Nacional 2026' },
  { src: '/home/momento-concurso.jpg', alt: 'Laboratorio lleno de competidores durante un concurso del club' },
  { src: '/home/momento-poleras.jpg', alt: 'Ganadores mostrando las poleras de ICPC' },
  { src: '/home/momento-entreno.jpg', alt: 'Estudiantes resolviendo problemas en el laboratorio' },
  { src: '/home/momento-ganadores.jpg', alt: 'Ganadores de la División 2 frente al tablero de resultados' },
];

const EXPLORE = [
  { to: '/equipos-2026', icon: '🏆', title: 'Equipos 2026', text: 'Conoce a los equipos que representan a la UMSA esta temporada y sus resultados.' },
  { to: '/nuestras-actividades', icon: '📅', title: 'Actividades', text: 'Talleres, concursos clasificatorios y el calendario de competencias del año.' },
  { to: '/icpc-results', icon: '📊', title: 'Resultados ICPC', text: 'Tableros de las competencias pasadas: División 1, División 2, Nacional y Latino.' },
  { to: '/judges', icon: '⚙️', title: 'Jueces online', text: 'Qué es un juez online y las plataformas que usamos: Codeforces, Kattis, AtCoder y más.' },
];

export default function Index() {
  const { today } = useLoaderData<typeof loader>();

  return (
    <div className="home">
      {/* Portada */}
      <section className="hm-hero">
        <div className="hm-hero-inner">
          <div className="hm-hero-copy">
            <span className="hm-kicker">Club de Programación Competitiva · UMSA</span>
            <h1 className="hm-hero-title cr-we">
              Explora el mundo de los <span className="hm-hero-highlight">algoritmos</span> y la programación competitiva
            </h1>
            <p className="hm-hero-text">
              Entrenamos juntos, resolvemos problemas y representamos a la UMSA en la Competencia Boliviana de Programación y en la Competencia
              Latinoamericana de la ICPC.
            </p>
            <div className="hm-actions">
              <a className="hm-btn hm-btn-primary" href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer">
                Únete en Telegram
              </a>
              <Link className="hm-btn hm-btn-ghost" to="/nuestras-actividades">
                Nuestras actividades →
              </Link>
            </div>
            <dl className="hm-stats">
              {STATS.map((stat) => (
                <div key={stat.label} className="hm-stat">
                  <dt>{stat.label}</dt>
                  <dd>{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <figure className="hm-hero-photo">
            <img src="/home/hero.jpg" alt="Equipos del club en la Competencia Boliviana de Programación 2026" fetchPriority="high" />
            <figcaption>📍 Nacional 2026 · Univalle, La Paz</figcaption>
          </figure>
        </div>
      </section>

      {/* Próximas actividades */}
      <div className="hm-upcoming-wrap">
        <UpcomingActivities today={today} />
      </div>

      {/* Quiénes somos */}
      <section className="hm-section">
        <div className="hm-about">
          <div className="hm-about-photos">
            <img className="hm-about-main" src="/home/club-escaleras.jpg" alt="Miembros del club reunidos en las gradas" loading="lazy" />
            <img className="hm-about-small" src="/home/club-codigo.jpg" alt="Estudiante programando durante un concurso" loading="lazy" />
          </div>
          <div>
            <p className="hm-eyebrow">Sobre nosotros</p>
            <h2 className="hm-heading">Una comunidad que aprende resolviendo problemas</h2>
            <ul className="hm-about-list">
              <li>
                <span className="hm-about-icon">👥</span>
                <div>
                  <strong>¿Quiénes somos?</strong>
                  <p>
                    Un grupo apasionado por la resolución de problemas algorítmicos y una comunidad de aprendizaje autodidacta donde ofrecemos ayuda mutua.
                  </p>
                </div>
              </li>
              <li>
                <span className="hm-about-icon">💻</span>
                <div>
                  <strong>¿Qué hacemos?</strong>
                  <p>
                    Resolvemos problemas aplicando lógica y diferentes lenguajes de programación, y entrenamos constantemente para representar de la mejor
                    manera a la UMSA.
                  </p>
                </div>
              </li>
              <li>
                <span className="hm-about-icon">🏆</span>
                <div>
                  <strong>¿Dónde competimos?</strong>
                  <p>
                    En la Competencia Boliviana de Programación (HACKER) y en la Competencia Latinoamericana de Programación (
                    <a href={ICPC_BOLIVIA_URL} target="_blank" rel="noopener noreferrer">
                      ICPC Bolivia
                    </a>
                    ), entre otras competencias nacionales e internacionales.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Ventajas */}
      <section className="hm-band">
        <div className="hm-section">
          <p className="hm-eyebrow hm-center">Por qué unirte</p>
          <h2 className="hm-heading hm-center">Lo que ganas al ser parte del club</h2>
          <div className="hm-advantages">
            {ADVANTAGES.map((advantage) => (
              <article key={advantage.title} className="hm-advantage">
                <span className="hm-advantage-icon">{advantage.icon}</span>
                <h3>{advantage.title}</h3>
                <p>{advantage.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Frase */}
      <section className="hm-quote">
        <blockquote>
          <p>&ldquo;El trabajo duro vence al talento cuando el talento no trabaja duro&rdquo;</p>
          <cite>— Tim Notke</cite>
        </blockquote>
      </section>

      {/* Momentos */}
      <section className="hm-section">
        <div className="hm-row-head">
          <div>
            <p className="hm-eyebrow">Galería</p>
            <h2 className="hm-heading">Momentos del club</h2>
          </div>
          <Link className="hm-link" to="/photos">
            Ver todas las fotos →
          </Link>
        </div>
        <div className="hm-moments">
          {MOMENTS.map((moment) => (
            <img key={moment.src} src={moment.src} alt={moment.alt} loading="lazy" />
          ))}
        </div>
      </section>

      {/* Únete */}
      <section className="hm-section hm-section-tight">
        <div className="hm-join">
          <div className="hm-join-copy">
            <p className="hm-eyebrow hm-eyebrow-light">Únete</p>
            <h2 className="hm-heading cr-we">¿Cómo ser parte de nosotros?</h2>
            <p>
              Cada año, aproximadamente entre julio y agosto, organizamos el <strong>Concurso Clasificatorio División 2</strong>, exclusivo para personas
              nuevas. Los mejores pasan a formar parte del club y ganan su cupo para representar a la UMSA en la Competencia Boliviana de Programación.
            </p>
            <div className="hm-actions">
              <a className="hm-btn hm-btn-primary" href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer">
                Únete al grupo de Telegram
              </a>
              <Link className="hm-btn hm-btn-ghost" to="/division-2">
                Ver División 2 →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Explora */}
      <section className="hm-section">
        <p className="hm-eyebrow">Explora</p>
        <h2 className="hm-heading">Más sobre el club</h2>
        <div className="hm-explore">
          {EXPLORE.map((item) => (
            <Link key={item.to} className="hm-explore-card" to={item.to}>
              <span className="hm-explore-icon">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <span className="hm-explore-cta">Ver más →</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
