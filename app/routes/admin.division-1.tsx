import { Modal } from '@juki-team/base-ui';
import { type ActionFunctionArgs, json, type LoaderFunctionArgs, type MetaFunction, redirect } from '@remix-run/node';
import { Form, useActionData, useLoaderData, useNavigation } from '@remix-run/react';
import { useState } from 'react';
import {
  clearFailedAttempts,
  createAdminSessionCookie,
  destroyAdminSessionCookie,
  getClientKey,
  isAdminAuthenticated,
  isAdminPasscodeConfigured,
  isRateLimited,
  registerFailedAttempt,
  verifyAdminPasscode,
} from '~/helpers/adminAuth.server';
import type { Division1RegistrationRow } from '~/helpers/division1Admin';
import { fetchDivision1Registrations } from '~/helpers/division1Admin.server';

export const meta: MetaFunction = () => [{ title: 'Admin · Inscripciones División 1' }, { name: 'robots', content: 'noindex, nofollow' }];

const ADMIN_DIVISION_1_PATH = '/admin/division-1';
const ADMIN_DIVISION_1_EXPORT_PATH = '/admin/division-1/export';

type LoaderData = {
  authenticated: boolean;
  configured: boolean;
  registrations: Division1RegistrationRow[];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const configured = isAdminPasscodeConfigured();
  const authenticated = await isAdminAuthenticated(request);

  if (!authenticated) {
    return json({ authenticated: false, configured, registrations: [] as Division1RegistrationRow[] });
  }

  return json({ authenticated: true, configured, registrations: await fetchDivision1Registrations() });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  if (String(formData.get('intent')) === 'logout') {
    return redirect(ADMIN_DIVISION_1_PATH, { headers: { 'Set-Cookie': await destroyAdminSessionCookie() } });
  }

  const clientKey = getClientKey(request);
  if (isRateLimited(clientKey)) {
    return json({ error: 'Demasiados intentos fallidos. Espera unos minutos e inténtalo de nuevo.' }, { status: 429 });
  }

  const result = verifyAdminPasscode(String(formData.get('passcode') || ''));

  if (result === 'not-configured') {
    return json({ error: 'El passcode de administración no está configurado en el servidor.' }, { status: 503 });
  }

  if (result === 'invalid') {
    registerFailedAttempt(clientKey);
    return json({ error: 'Passcode incorrecto.' }, { status: 401 });
  }

  clearFailedAttempts(clientKey);
  return redirect(ADMIN_DIVISION_1_PATH, { headers: { 'Set-Cookie': await createAdminSessionCookie() } });
}

function ParticipantCell({ nombre, matriculaPdfUrl }: { nombre: string | null; matriculaPdfUrl: string | null }) {
  if (!nombre) {
    return <span className="admin-dash">—</span>;
  }

  return (
    <div className="admin-participant">
      <span>{nombre}</span>
      {matriculaPdfUrl && (
        <a className="admin-participant-pdf" href={matriculaPdfUrl} target="_blank" rel="noreferrer">
          Ver matrícula ↗
        </a>
      )}
    </div>
  );
}

export default function AdminDivision1() {
  const { authenticated, configured, registrations } = useLoaderData<LoaderData>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();

  const [openComment, setOpenComment] = useState<Division1RegistrationRow | null>(null);

  const isSubmitting = navigation.state !== 'idle';

  if (!authenticated) {
    return (
      <div className="admin-page admin-gate">
        <Form method="post" className="d1-form admin-gate-card">
          <h1 className="d1-form-title">Panel · Inscripciones División 1</h1>
          {configured ? (
            <>
              <div className="d1-field">
                <label className="d1-label" htmlFor="admin-passcode">
                  Passcode
                </label>
                <input id="admin-passcode" className="d1-input" name="passcode" type="password" autoComplete="current-password" />
              </div>
              {actionData?.error && <span className="d1-error">{actionData.error}</span>}
              <button type="submit" className="d1-submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Verificando…' : 'Entrar'}
              </button>
            </>
          ) : (
            <p className="d1-submit-error">Falta configurar la variable de entorno ADMIN_PASSCODE en el servidor.</p>
          )}
        </Form>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-content">
        <header className="admin-header">
          <div>
            <h1 className="admin-title">Inscripciones · División 1</h1>
            <p className="admin-count">
              {registrations.length} {registrations.length === 1 ? 'inscripción' : 'inscripciones'}
            </p>
          </div>
          <div className="admin-header-actions">
            {registrations.length > 0 && (
              <a className="admin-export-btn" href={ADMIN_DIVISION_1_EXPORT_PATH} download>
                Descargar CSV
              </a>
            )}
            <Form method="post">
              <input type="hidden" name="intent" value="logout" />
              <button type="submit" className="admin-logout-btn">
                Salir
              </button>
            </Form>
          </div>
        </header>

        {registrations.length === 0 ? (
          <p className="admin-empty-state">Todavía no hay inscripciones registradas.</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Fecha</th>
                  <th>Equipo</th>
                  <th>Participante 1</th>
                  <th>Participante 2</th>
                  <th>Participante 3</th>
                  <th>Reserva</th>
                  <th>Celular</th>
                  <th>Correo</th>
                  <th>Telegram</th>
                  <th>Comentario</th>
                </tr>
              </thead>
              <tbody>
                {registrations.map((registration, index) => (
                  <tr key={registration.id}>
                    <td className="admin-cell-index">{registrations.length - index}</td>
                    <td className="admin-cell-nowrap">{registration.createdAt}</td>
                    <td>{registration.nombreEquipo}</td>
                    <td>
                      <ParticipantCell nombre={registration.participante1Nombre} matriculaPdfUrl={registration.participante1MatriculaPdfUrl} />
                    </td>
                    <td>
                      <ParticipantCell nombre={registration.participante2Nombre} matriculaPdfUrl={registration.participante2MatriculaPdfUrl} />
                    </td>
                    <td>
                      <ParticipantCell nombre={registration.participante3Nombre} matriculaPdfUrl={registration.participante3MatriculaPdfUrl} />
                    </td>
                    <td>
                      <ParticipantCell nombre={registration.reservaNombre} matriculaPdfUrl={registration.reservaMatriculaPdfUrl} />
                    </td>
                    <td className="admin-cell-nowrap">{registration.celularRepresentante}</td>
                    <td>
                      <a className="admin-link" href={`mailto:${registration.correoRepresentante}`}>
                        {registration.correoRepresentante}
                      </a>
                    </td>
                    <td>{registration.telegramRepresentante}</td>
                    <td className="admin-cell-comment">
                      {registration.comentario ? (
                        <div className="admin-comment">
                          <span className="admin-comment-preview">{registration.comentario}</span>
                          <button type="button" className="admin-comment-btn" onClick={() => setOpenComment(registration)}>
                            Ver
                          </button>
                        </div>
                      ) : (
                        <span className="admin-dash">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal isOpen={openComment !== null} onClose={() => setOpenComment(null)} closeIcon closeOnClickOverlay closeOnKeyEscape className="d1-modal-card">
        <div className="d1-modal">
          <h2 className="d1-form-title">Comentario</h2>
          <p className="admin-modal-author">{openComment?.nombreEquipo}</p>
          <p className="admin-modal-comment">{openComment?.comentario}</p>
        </div>
      </Modal>
    </div>
  );
}
