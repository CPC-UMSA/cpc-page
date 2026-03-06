export async function loader() {
  return null;
}

const JUDGES = [
  {
    name: 'Codeforces',
    url: 'https://codeforces.com',
    logo: 'CF',
    color: '#1a8cff',
    tags: ['Entrenamiento', 'Concursos', 'ICPC'],
    description:
      'La plataforma más popular para programación competitiva. Organiza concursos frecuentes (Div. 1, 2, 3 y 4) con problemas al estilo ICPC. Tiene un sistema de rating (ELO) que refleja tu nivel. Es la plataforma principal que usamos para entrenar.',
    highlights: [
      'Concursos 2–3 veces por semana',
      'Problemas clasificados por dificultad (800–3500)',
      'Editorials detallados',
      'Gym con problemas de regionales ICPC',
    ],
  },
  {
    name: 'Kattis',
    url: 'https://open.kattis.com',
    logo: 'K',
    color: '#f7a800',
    tags: ['ICPC', 'Regional', 'Mundial'],
    description:
      'Juez oficial de varias regionales del ICPC. Los problemas tienen el mismo formato que en las competencias reales. Es ideal para simular condiciones de concurso. Muchos problemas de regionales latinoamericanas pasadas están disponibles.',
    highlights: ['Formato exacto del ICPC', 'Problemas de regionales reales', 'Usado en la Latinoamericana ICPC', 'Juez justo y rápido'],
  },
  {
    name: 'BOCA',
    url: 'https://icpc.usp.br/boca/',
    logo: 'B',
    color: '#e63946',
    tags: ['Bolivia', 'CBP', 'Latinoamericana'],
    description:
      'Sistema de juez usado en las competencias oficiales de Bolivia: la Competencia Boliviana de Programación (HACKER) y el Concurso Latinoamericano ICPC. Es el juez que más importa conocer para representar a la UMSA. Se corre localmente durante las competencias.',
    highlights: ['Juez oficial de la CBP (HACKER)', 'Juez del Latinoamericano ICPC', 'Interfaz minimalista', 'Instalación local para simular competencias'],
  },
  {
    name: 'AtCoder',
    url: 'https://atcoder.jp',
    logo: 'AC',
    color: '#00aaaa',
    tags: ['Entrenamiento', 'Calidad', 'Avanzado'],
    description:
      'Plataforma japonesa reconocida por la altísima calidad de sus problemas. Sus concursos (ABC, ARC, AGC) van desde principiante hasta experto. Los problemas de AtCoder son excelentes para entender técnicas avanzadas como segment trees, DP en árboles, etc.',
    highlights: [
      'ABC (beginner) ideal para iniciar',
      'Problemas matemáticamente rigurosos',
      'Sistema de rating confiable',
      'Gran archivo de problemas clásicos',
    ],
  },
  {
    name: 'SPOJ',
    url: 'https://www.spoj.com',
    logo: 'SP',
    color: '#6a0dad',
    tags: ['Clásicos', 'Archivo'],
    description:
      'Uno de los jueces más antiguos y con el mayor archivo de problemas clásicos de programación competitiva. Muchos problemas de estructuras de datos, grafos y algoritmos fundamentales están aquí. Buen recurso para profundizar en temas específicos.',
    highlights: ['Miles de problemas clásicos', 'Categorías por tema y algoritmo', 'Soporte para muchos lenguajes', 'Comunidad histórica del CP'],
  },
  {
    name: 'Vjudge',
    url: 'https://vjudge.net',
    logo: 'VJ',
    color: '#2ecc71',
    tags: ['Agregador', 'Hojas', 'Entrenamiento'],
    description:
      'Juez virtual que agrega problemas de Codeforces, AtCoder, SPOJ, UVa y muchos otros en una sola plataforma. Muy usado para crear hojas de entrenamiento con problemas de distintos jueces. El club lo usa para organizar sesiones de práctica por temas.',
    highlights: [
      'Problemas de +10 jueces en un solo lugar',
      'Creación de contests y hojas de práctica',
      'Estadísticas de equipo',
      'Ideal para entrenamientos grupales',
    ],
  },
];

export default function Judges() {
  return (
    <div className="judges-page">
      <div className="judges-hero">
        <h1 className="judges-hero-title cr-we">Jueces Online</h1>
        <p className="judges-hero-sub">Plataformas que usamos para entrenar y competir</p>
      </div>

      <div className="judges-content">
        <div className="judges-explainer">
          <div className="judges-explainer-icon">⚙️</div>
          <div>
            <h2 className="judges-explainer-title">¿Qué es un juez online?</h2>
            <p className="judges-explainer-text">
              Un juez en línea es una plataforma donde envías tu código para resolver un problema de programación. El sistema lo compila, lo ejecuta con casos
              de prueba secretos y verifica automáticamente si tu solución produce las respuestas correctas y dentro del tiempo y memoria permitidos. Si tu
              código pasa todos los casos, obtienes un <strong>Accepted (AC)</strong>. Es la herramienta fundamental del entrenamiento en programación
              competitiva.
            </p>
          </div>
        </div>

        <div className="judges-why">
          <h2 className="judges-section-title">¿Por qué usarlos?</h2>
          <div className="judges-why-grid">
            <div className="judges-why-item">
              <span className="judges-why-icon">🧠</span>
              <strong>Desarrollar pensamiento algorítmico</strong>
              <p>Cada problema te obliga a pensar en eficiencia, estructuras de datos y algoritmos correctos.</p>
            </div>
            <div className="judges-why-item">
              <span className="judges-why-icon">⚡</span>
              <strong>Feedback inmediato</strong>
              <p>Sabes al instante si tu solución es correcta, incorrecta, demasiado lenta o tiene errores de memoria.</p>
            </div>
            <div className="judges-why-item">
              <span className="judges-why-icon">📈</span>
              <strong>Progreso medible</strong>
              <p>Los sistemas de rating como el de Codeforces te permiten ver tu evolución y compararte globalmente.</p>
            </div>
            <div className="judges-why-item">
              <span className="judges-why-icon">🏆</span>
              <strong>Preparación para competencias</strong>
              <p>Los problemas tienen el mismo formato que el ICPC y la CBP, preparándote directamente para competir.</p>
            </div>
          </div>
        </div>

        <h2 className="judges-section-title">Plataformas que usamos</h2>
        <div className="judges-grid">
          {JUDGES.map((judge) => (
            <a key={judge.name} href={judge.url} target="_blank" rel="noreferrer" className="judge-card">
              <div className="judge-card-header">
                <div className="judge-logo" style={{ background: judge.color }}>
                  {judge.logo}
                </div>
                <div>
                  <h3 className="judge-name">{judge.name}</h3>
                  <div className="judge-tags">
                    {judge.tags.map((tag) => (
                      <span key={tag} className="judge-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="judge-description">{judge.description}</p>
              <ul className="judge-highlights">
                {judge.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
              <span className="judge-link">Ir a {judge.name} →</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
