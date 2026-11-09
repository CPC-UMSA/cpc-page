import { Link } from '@remix-run/react';
import { PhotoGallery } from '~/components';
import { LATINO_2026_PHOTOS, LATINO_2026_STANDINGS } from '~/data/2026/equipos-2026';
import type { BlogPost } from '../types';

const [registrationPhoto, ...contestPhotos] = [LATINO_2026_PHOTOS[8], ...LATINO_2026_PHOTOS.filter((_, i) => i !== 8)];

function Content() {
  return (
    <>
      <p className="blog-lead">
        El sábado 7 de noviembre, seis equipos del Club de Programación Competitiva UMSA viajaron a Sucre para disputar la fase Latinoamericana del ICPC
        2026. Fue una jornada intensa de globos de colores y mucho código, que cerró con una gran noticia: <strong>Los Maquinolas: The Last
        Dance</strong> clasificó al Campeonato Latinoamericano ICPC 2027 en Monterrey, México.
      </p>

      <h2>La previa: acreditación en Sucre</h2>
      <p>
        La mañana empezó con la acreditación por delegaciones, con mesas para cada departamento. Tras recoger sus credenciales, los equipos pasaron a
        los laboratorios, donde cada máquina estaba lista para el concurso.
      </p>
      <figure className="blog-figure">
        <img src={registrationPhoto} alt="Mesas de acreditación por departamento antes del concurso" loading="lazy" />
        <figcaption>Acreditación de las delegaciones antes de empezar.</figcaption>
      </figure>

      <h2>El concurso</h2>
      <p>
        El set tuvo 13 problemas (de la A a la M). Cada problema resuelto suma un globo del color correspondiente, y a lo largo de la tarde los laboratorios
        se fueron llenando de ellos. Entre todos, nuestros equipos resolvieron siete problemas distintos del set: B, C, D, F, G, J y L.
      </p>
      <p>
        <strong>Los Maquinolas</strong> marcaron el ritmo con 7 problemas y 597 de penalización, terminando en el puesto 59 de la clasificación general. Muy
        cerca quedaron <strong>Los Sabrossos 🐻</strong> y <strong>candi_ositos club de fans</strong>, ambos con 6 problemas. En División 2,{' '}
        <strong>DIV5: Las Wawas del LuchXDD</strong> sumó 3 problemas.
      </p>

      <h2>Resultados de la UMSA</h2>
      <div className="blog-table-wrap">
        <table className="blog-table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Equipo</th>
              <th scope="col">Resueltos</th>
              <th scope="col">Penalización</th>
              <th scope="col">Puesto general</th>
            </tr>
          </thead>
          <tbody>
            {LATINO_2026_STANDINGS.map((team, index) => (
              <tr key={team.name}>
                <td>{index + 1}</td>
                <td>
                  {team.name}
                  {team.latinoAward && <span className="blog-tag blog-tag-gold">Clasificado a Monterrey 2027</span>}
                </td>
                <td>{team.results.latino?.solved}</td>
                <td>{team.results.latino?.penalty}</td>
                <td>{team.results.latino?.rank}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Rumbo a Monterrey 2027</h2>
      <p>
        <strong>Los Maquinolas: The Last Dance</strong> (Fabricio Javier Cabrera Gordillo, Marco Andrés Cusicanqui León y Daner Zein Tonconi Mendoza, con
        Oscar Gauss Carvajal como coach) obtuvo su clasificación al <strong>2027 ICPC Latin America Championship</strong>, que se realizará en Monterrey, México,
        del 13 al 17 de julio de 2027, con un training camp del 7 al 17 de julio. ¡Felicidades, equipo!
      </p>

      <h2>Gracias</h2>
      <p>
        A todos los competidores y coaches por los meses de entrenamiento, a la organización de la sede en Sucre y a cada persona que apoyó al club esta
        temporada. Puedes ver el detalle de cada equipo en <Link to="/equipos-2026">Equipos 2026</Link>.
      </p>

      <h2>Galería</h2>
      <PhotoGallery photos={contestPhotos} />
    </>
  );
}

export const latino2026Sucre: BlogPost = {
  slug: 'latino-2026-sucre',
  title: 'Latino ICPC 2026 en Sucre: seis equipos UMSA y un boleto a Monterrey',
  date: '2026-11-09',
  author: 'CPC UMSA',
  summary:
    'Crónica de la fase Latinoamericana del ICPC 2026 en Sucre: los resultados de nuestros seis equipos y la clasificación de Los Maquinolas al Campeonato Latinoamericano 2027.',
  cover: LATINO_2026_PHOTOS[6],
  tags: ['ICPC', 'Latino 2026', 'Resultados'],
  Content,
};
