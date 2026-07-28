import { getPrisma } from '~/helpers/db.server';
import type { RegistrationRow } from '~/helpers/division2Admin';

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

export async function fetchRegistrations(): Promise<RegistrationRow[]> {
  const rows = await getPrisma().division2Registration.findMany({ orderBy: { createdAt: 'desc' } });

  return rows.map((row) => ({
    id: row.id,
    createdAt: dateFormatter.format(row.createdAt),
    nombreCompleto: row.nombreCompleto,
    nickname: row.nickname,
    correo: row.correo,
    celular: row.celular,
    telegramUsuario: row.telegramUsuario,
    tallaPolera: row.tallaPolera,
    comentario: row.comentario,
    matriculaPdfUrl: row.matriculaPdfUrl,
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
