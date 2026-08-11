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
import type { RegistrationRow } from '~/helpers/division2Admin';
import { fetchRegistrations } from '~/helpers/division2Admin.server';

export const meta: MetaFunction = () => [{ title: 'Admin · Inscripciones División 2' }, { name: 'robots', content: 'noindex, nofollow' }];

const ADMIN_DIVISION_2_PATH = '/admin/division-2';
const ADMIN_DIVISION_2_EXPORT_PATH = '/admin/division-2/export';

type LoaderData = {
  authenticated: boolean;
  configured: boolean;
  registrations: RegistrationRow[];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const configured = isAdminPasscodeConfigured();
  const authenticated = await isAdminAuthenticated(request);

  if (!authenticated) {
    return json({ authenticated: false, configured, registrations: [] as RegistrationRow[] });
  }

  return json({ authenticated: true, configured, registrations: await fetchRegistrations() });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  if (String(formData.get('intent')) === 'logout') {
    return redirect(ADMIN_DIVISION_2_PATH, { headers: { 'Set-Cookie': await destroyAdminSessionCookie() } });
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
  return redirect(ADMIN_DIVISION_2_PATH, { headers: { 'Set-Cookie': await createAdminSessionCookie() } });
}

export default function AdminDivision2() {
  const { authenticated, configured, registrations } = useLoaderData<LoaderData>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();

  const [openComment, setOpenComment] = useState<RegistrationRow | null>(null);

  const isSubmitting = navigation.state !== 'idle';

  if (!authenticated) {
    return (
      <div className="admin-page admin-gate">
        <Form method="post" className="d2-form admin-gate-card">
          <h1 className="d2-form-title">Panel · Inscripciones División 2</h1>
          {configured ? (
            <>
              <div className="d2-field">
                <label className="d2-label" htmlFor="admin-passcode">
                  Passcode
                </label>
                <input id="admin-passcode" className="d2-input" name="passcode" type="password" autoComplete="current-password" />
              </div>
              {actionData?.error && <span className="d2-error">{actionData.error}</span>}
              <button type="submit" className="d2-submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Verificando…' : 'Entrar'}
              </button>
            </>
          ) : (
            <p className="d2-submit-error">Falta configurar la variable de entorno ADMIN_PASSCODE en el servidor.</p>
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
            <h1 className="admin-title">Inscripciones · División 2</h1>
            <p className="admin-count">
              {registrations.length} {registrations.length === 1 ? 'inscripción' : 'inscripciones'}
            </p>
          </div>
          <div className="admin-header-actions">
            {registrations.length > 0 && (
              <a className="admin-export-btn" href={ADMIN_DIVISION_2_EXPORT_PATH} download>
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
                  <th>Nombre completo</th>
                  <th>Nickname</th>
                  <th>Correo</th>
                  <th>Celular</th>
                  <th>Telegram</th>
                  <th>Talla</th>
                  <th>Matrícula</th>
                  <th>Comentario</th>
                </tr>
              </thead>
              <tbody>
                {registrations.map((registration, index) => (
                  <tr key={registration.id}>
                    <td className="admin-cell-index">{registrations.length - index}</td>
                    <td className="admin-cell-nowrap">{registration.createdAt}</td>
                    <td>{registration.nombreCompleto}</td>
                    <td>{registration.nickname}</td>
                    <td>
                      <a className="admin-link" href={`mailto:${registration.correo}`}>
                        {registration.correo}
                      </a>
                    </td>
                    <td className="admin-cell-nowrap">{registration.celular}</td>
                    <td>{registration.telegramUsuario}</td>
                    <td>{registration.tallaPolera}</td>
                    <td>
                      {registration.matriculaPdfUrl ? (
                        <a className="admin-pdf-link" href={registration.matriculaPdfUrl} target="_blank" rel="noreferrer">
                          Ver PDF ↗
                        </a>
                      ) : (
                        <span className="admin-dash">—</span>
                      )}
                    </td>
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

      <Modal isOpen={openComment !== null} onClose={() => setOpenComment(null)} closeIcon closeOnClickOverlay closeOnKeyEscape className="d2-modal-card">
        <div className="d2-modal">
          <h2 className="d2-form-title">Comentario</h2>
          <p className="admin-modal-author">
            {openComment?.nombreCompleto} · {openComment?.nickname}
          </p>
          <p className="admin-modal-comment">{openComment?.comentario}</p>
        </div>
      </Modal>
    </div>
  );
}
