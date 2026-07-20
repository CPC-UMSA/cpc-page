import { type MetaFunction } from '@remix-run/node';
import { useState } from 'react';
import { Division2InscripcionModal, PhotoGallery } from '~/components';

export const meta: MetaFunction = () => [{ title: 'Division 2' }];

export async function loader() {
  return null;
}

const DIVISION_2_PHOTOS = Array.from({ length: 11 }, (_, i) => `/division-2/photos/div2-${String(i + 1).padStart(2, '0')}.jpeg`);

const DIVISION_2_PDFS = [
  { label: 'Problemas · 2022', href: '/division-2/pdfs/DIV2-2022.pdf' },
  { label: 'Problemas · 2023', href: '/division-2/pdfs/DIV2-2023.pdf' },
  { label: 'Problemas · 2025', href: '/division-2/pdfs/DIV2-2025.pdf' },
];

export default function Division2() {
  const [showInscripcion, setShowInscripcion] = useState(false);

  return (
    <div className="division2-page">
      <div className="division2-hero">
        <h1 className="division2-hero-title cr-we">Competencia División 2</h1>
        <p className="division2-hero-sub">Tu primer paso en la programación competitiva</p>
      </div>

      <div className="division2-content">
        <section className="division2-section">
          <h2 className="division2-section-title">¿Qué es la Competencia División 2?</h2>
          <p className="division2-text">
            La Competencia División 2 es el torneo clasificatorio interno organizado por el Club de Programación Competitiva UMSA para identificar y
            seleccionar a nuevos talentos que representarán a la Universidad Mayor de San Andrés (UMSA) en la Competencia Boliviana de Programación.
          </p>
          <p className="division2-text">
            Esta competencia está dirigida exclusivamente a estudiantes de la UMSA que nunca hayan participado en una competencia oficial de la ICPC,
            brindándoles la oportunidad de dar sus primeros pasos en el mundo de la programación competitiva.
          </p>
          <p className="division2-text">
            La modalidad de participación es individual, donde cada concursante resolverá un conjunto de problemas algorítmicos durante un tiempo
            determinado. La clasificación se realizará siguiendo las reglas estándar de la programación competitiva, considerando principalmente el
            número de problemas resueltos y, en caso de empate, el tiempo total de resolución.
          </p>
          <p className="division2-text">
            Los tres mejores competidores obtendrán el derecho de conformar un equipo oficial que representará al Club de Programación Competitiva UMSA
            y a la universidad en la Competencia Boliviana de Programación, iniciando así su camino hacia las competiciones nacionales e internacionales
            de la ICPC.
          </p>
        </section>

        <section className="division2-section">
          <h2 className="division2-section-title">Fotos de ediciones pasadas</h2>
          <PhotoGallery photos={DIVISION_2_PHOTOS} />
        </section>

        <section className="division2-section">
          <h2 className="division2-section-title">Problemas de ediciones pasadas</h2>
          <div className="division2-pdf-grid">
            {DIVISION_2_PDFS.map((pdf) => (
              <a key={pdf.href} className="division2-pdf-card" href={pdf.href} target="_blank" rel="noreferrer" download>
                <span className="division2-pdf-icon">📄</span>
                <span className="division2-pdf-label">{pdf.label}</span>
              </a>
            ))}
          </div>
        </section>

        <section className="division2-section">
          <h2 className="division2-section-title">Detalles</h2>
          <div className="three-col">
            <div className="info-card">
              <div className="info-card-icon">📅</div>
              <h3 className="info-card-title">Fecha</h3>
              <p className="info-card-text">1 de agosto</p>
            </div>
            <div className="info-card">
              <div className="info-card-icon">📍</div>
              <h3 className="info-card-title">Lugar</h3>
              <p className="info-card-text">Carrera de Informática</p>
            </div>
            <div className="info-card">
              <div className="info-card-icon">🕐</div>
              <h3 className="info-card-title">Hora</h3>
              <p className="info-card-text">09:00 - 14:00</p>
            </div>
          </div>
        </section>

        <section className="division2-section division2-cta">
          <button type="button" className="d2-cta-btn" onClick={() => setShowInscripcion(true)}>
            Inscríbete
          </button>
        </section>
      </div>

      <Division2InscripcionModal isOpen={showInscripcion} onClose={() => setShowInscripcion(false)} />
    </div>
  );
}
