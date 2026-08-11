import { type MetaFunction } from '@remix-run/node';
import { useState } from 'react';
import { Division1InscripcionModal, PhotoGallery } from '~/components';

export const meta: MetaFunction = () => [{ title: 'Division 1' }];

export async function loader() {
  return null;
}

// Photos live under the historical `division-2` asset path — kept as-is (same gallery, same files).
const DIVISION_1_PHOTOS = Array.from({ length: 11 }, (_, i) => `/division-2/photos/div2-${String(i + 1).padStart(2, '0')}.jpeg`);

export default function Division1() {
  const [showInscripcion, setShowInscripcion] = useState(false);

  return (
    <div className="division1-page">
      <div className="division1-hero">
        <h1 className="division1-hero-title cr-we">Competencia División 1</h1>
        <p className="division1-hero-sub">Representa a la UMSA en la Competencia Boliviana de Programación</p>
      </div>

      <div className="division1-content">
        <section className="division1-section">
          <h2 className="division1-section-title">¿Qué es la Competencia División 1?</h2>
          <p className="division1-text">
            La Competencia División 1 es el torneo clasificatorio interno del Club de Programación Competitiva UMSA. Su objetivo es identificar y
            seleccionar a los equipos que representarán a la Universidad Mayor de San Andrés (UMSA) en la Competencia Boliviana de Programación.
          </p>
          <p className="division1-text">
            Está dirigida exclusivamente a estudiantes de la UMSA, y pueden participar tanto competidores nuevos como antiguos, brindando a los
            primeros la oportunidad de iniciarse en el mundo de la programación competitiva, y a los segundos un espacio para seguir puliendo sus
            habilidades.
          </p>
          <p className="division1-text">
            <strong>Modalidad:</strong> se compite en equipos de 3 integrantes (obligatorio), quienes deberán resolver un conjunto de problemas
            algorítmicos dentro de un tiempo determinado. La clasificación sigue las reglas estándar de la programación competitiva: se prioriza el
            número de problemas resueltos y, en caso de empate, el tiempo total de resolución.
          </p>
          <p className="division1-text">
            <strong>Clasificación a la Competencia Boliviana de Programación:</strong> avanzarán los cuatro mejores equipos, más el mejor equipo
            conformado por chicas (un total de 5 equipos). Estos representarán al Club de Programación Competitiva UMSA y a la universidad, dando así
            el primer paso hacia las competencias nacionales e internacionales de la ICPC.
          </p>
        </section>

        <section className="division1-section">
          <h2 className="division1-section-title">Fotos de ediciones pasadas</h2>
          <PhotoGallery photos={DIVISION_1_PHOTOS} />
        </section>

        <section className="division1-section">
          <h2 className="division1-section-title">Detalles</h2>
          <div className="three-col">
            <div className="info-card">
              <div className="info-card-icon">📅</div>
              <h3 className="info-card-title">Fecha</h3>
              <p className="info-card-text">15 de agosto</p>
            </div>
            <div className="info-card">
              <div className="info-card-icon">📍</div>
              <h3 className="info-card-title">Lugar</h3>
              <p className="info-card-text">Carrera de Informática</p>
            </div>
            <div className="info-card">
              <div className="info-card-icon">🕐</div>
              <h3 className="info-card-title">Hora</h3>
              <p className="info-card-text">08:00 - 14:00</p>
            </div>
          </div>
        </section>

        <section className="division1-section division1-cta">
          <button type="button" className="d1-cta-btn" onClick={() => setShowInscripcion(true)}>
            Inscríbete
          </button>
        </section>
      </div>

      <Division1InscripcionModal isOpen={showInscripcion} onClose={() => setShowInscripcion(false)} />
    </div>
  );
}
