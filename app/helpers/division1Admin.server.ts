import { getPrisma } from '~/helpers/db.server';
import type { Division1RegistrationRow } from '~/helpers/division1Admin';

// Formatting on the server pins the timezone to Bolivia for everyone and keeps the
// server and client markup identical, which a locale-dependent client format wouldn't.
const dateFormatter = new Intl.DateTimeFormat('es-BO', {
  timeZone: 'America/La_Paz',
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

export async function fetchDivision1Registrations(): Promise<Division1RegistrationRow[]> {
  const rows = await getPrisma().division1Registration.findMany({ orderBy: { createdAt: 'desc' } });

  return rows.map((row) => ({
    id: row.id,
    createdAt: dateFormatter.format(row.createdAt),
    nombreEquipo: row.nombreEquipo,
    participante1Nombre: row.participante1Nombre,
    participante1MatriculaPdfUrl: row.participante1MatriculaPdfUrl,
    participante2Nombre: row.participante2Nombre,
    participante2MatriculaPdfUrl: row.participante2MatriculaPdfUrl,
    participante3Nombre: row.participante3Nombre,
    participante3MatriculaPdfUrl: row.participante3MatriculaPdfUrl,
    reservaNombre: row.reservaNombre,
    reservaMatriculaPdfUrl: row.reservaMatriculaPdfUrl,
    celularRepresentante: row.celularRepresentante,
    correoRepresentante: row.correoRepresentante,
    telegramRepresentante: row.telegramRepresentante,
    comentario: row.comentario,
  }));
}

// Behind Caddy the inbound request URL is plain http, so the forwarded header is what
// reconstructs the public origin the browser actually used. Falling back to the
// request's own protocol keeps local dev on http instead of an unreachable https URL.
export function getRequestOrigin(request: Request): string {
  const url = new URL(request.url);
  const host = request.headers.get('host') || url.host;
  const protocol = request.headers.get('x-forwarded-proto') || url.protocol.replace(':', '');
  return `${protocol}://${host}`;
}
