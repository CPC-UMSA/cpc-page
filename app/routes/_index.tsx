// Remix convention: loader is required for index routes to avoid being treated as a resource route
export async function loader() {
  return null;
}

export default function Index() {
  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <h1 className="hero-title">Explora el mundo de los algoritmos y la programación competitiva</h1>
        <p className="hero-quote">
          &ldquo;El trabajo duro vence al talento cuando el talento no trabaja duro&rdquo;
          <cite>— Tim Notke</cite>
        </p>
      </section>

      <hr className="divider" />

      {/* Quiénes / Qué / Dónde */}
      <section className="section">
        <div className="three-col">
          <div className="info-card">
            <div className="info-card-icon">👥</div>
            <p className="info-card-title">¿Quiénes somos?</p>
            <p className="info-card-text">
              Somos un grupo apasionado por la resolución de problemas algorítmicos y una comunidad de aprendizaje autodidacta donde ofrecemos ayuda mutua.
            </p>
          </div>
          <div className="info-card">
            <div className="info-card-icon">💻</div>
            <p className="info-card-title">¿Qué hacemos?</p>
            <p className="info-card-text">
              Resolvemos problemas algorítmicos aplicando lógica y diferentes lenguajes de programación. Participamos en competencias a lo largo del año y
              entrenamos constantemente para representar de la mejor manera a la UMSA.
            </p>
          </div>
          <div className="info-card">
            <div className="info-card-icon">🏆</div>
            <p className="info-card-title">¿Dónde competimos?</p>
            <p className="info-card-text">
              Competimos en la Competencia Boliviana de Programación (HACKER) y en el Concurso Latinoamericano de Programación (ICPC), entre otras competencias
              nacionales e internacionales.
            </p>
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* Ventajas */}
      <section className="section">
        <p className="section-title">Por qué unirte</p>
        <h2 className="section-heading">Algunas ventajas</h2>
        <div className="advantages-grid">
          <div className="advantage-card">
            <div className="advantage-icon">📚</div>
            <p className="advantage-title">Aprendizaje autodidacta</p>
            <p className="advantage-text">Cada miembro desarrolla la capacidad de investigar y aprender por su cuenta.</p>
          </div>
          <div className="advantage-card">
            <div className="advantage-icon">🎯</div>
            <p className="advantage-title">Entrevistas de trabajo</p>
            <p className="advantage-text">Mayor preparación para entrevistas técnicas de programación.</p>
          </div>
          <div className="advantage-card">
            <div className="advantage-icon">🚀</div>
            <p className="advantage-title">Oportunidades</p>
            <p className="advantage-text">Desarrollo de habilidades altamente valoradas en el mercado laboral.</p>
          </div>
          <div className="advantage-card">
            <div className="advantage-icon">🎓</div>
            <p className="advantage-title">Académico</p>
            <p className="advantage-text">Mejor desempeño en materias como INF-111, INF-121 e INF-131.</p>
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* Cómo ser parte */}
      <section className="section">
        <div className="cta-section">
          <div>
            <p className="section-title">Únete</p>
            <h2 className="section-heading">¿Cómo ser parte de nosotros?</h2>
            <p className="cta-text">
              La competencia interna DIV-2 se realizará a finales del semestre I-2026, la cual es exclusivamente para personas nuevas. Los ganadores pasan a
              formar parte del club y ganan su cupo para representar a la UMSA en la Competencia Boliviana de Programación, que tendrá lugar entre julio y
              agosto del presente año.
            </p>
          </div>
          <div className="cta-telegram">
            <a className="telegram-badge" href="https://t.me/ClubProgCompUMSA" target="_blank" rel="noreferrer">
              <span>✈️</span>
              Únete al grupo
              <br />
              de Telegram
            </a>
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* Juez online */}
      <section className="section">
        <div className="judge-box">
          <div className="judge-box-icon">⚙️</div>
          <div>
            <p className="judge-box-title">¿Qué es un juez online?</p>
            <p className="judge-box-text">
              Un juez en línea es una plataforma donde los usuarios envían su código para resolver problemas de programación, y el sistema lo ejecuta
              automáticamente para comprobar si la solución produce las respuestas correctas y que la solución sea eficiente.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
