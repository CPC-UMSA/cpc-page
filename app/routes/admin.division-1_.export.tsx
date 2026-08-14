import { type LoaderFunctionArgs } from '@remix-run/node';
import { isAdminAuthenticated } from '~/helpers/adminAuth.server';
import { buildDivision1RegistrationsCsv } from '~/helpers/division1Admin';
import { fetchDivision1Registrations, getRequestOrigin } from '~/helpers/division1Admin.server';

// A resource route (no default export) so the CSV is sent as-is — a route with a UI
// component would render its HTML document instead of returning this Response.
export async function loader({ request }: LoaderFunctionArgs) {
  if (!(await isAdminAuthenticated(request))) {
    return new Response('No autorizado.', { status: 401 });
  }

  const registrations = await fetchDivision1Registrations();
  const filename = `inscripciones-division-1-${new Date().toISOString().slice(0, 10)}.csv`;

  return new Response(buildDivision1RegistrationsCsv(registrations, getRequestOrigin(request)), {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  });
}
