import type { TallaPolera as PrismaTallaPolera } from '@prisma/client';
import { type ActionFunctionArgs, json, unstable_createMemoryUploadHandler, unstable_parseMultipartFormData } from '@remix-run/node';
import { getPrisma } from '~/helpers/db.server';
import { validateDivision2Registration } from '~/helpers/division2';
import { savePdfFile } from '~/helpers/storage.server';

const MAX_PDF_SIZE = 5 * 1024 * 1024;

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== 'POST') {
    return json({ success: false, message: 'Método no permitido.' }, { status: 405 });
  }

  let formData: FormData;
  try {
    const uploadHandler = unstable_createMemoryUploadHandler({ maxPartSize: MAX_PDF_SIZE });
    formData = await unstable_parseMultipartFormData(request, uploadHandler);
  } catch (error) {
    const message =
      error instanceof Error && error.name === 'MaxPartSizeExceededError'
        ? 'El archivo de matrícula supera el tamaño máximo permitido (5MB).'
        : 'No se pudo procesar el formulario.';
    return json({ success: false, message }, { status: 400 });
  }

  const input = {
    nombreCompleto: String(formData.get('nombreCompleto') || ''),
    nickname: String(formData.get('nickname') || ''),
    celular: String(formData.get('celular') || ''),
    correo: String(formData.get('correo') || ''),
    telegramUsuario: String(formData.get('telegramUsuario') || ''),
    tallaPolera: String(formData.get('tallaPolera') || ''),
  };

  const matriculaField = formData.get('matriculaPdf');
  const matriculaFile = matriculaField instanceof File && matriculaField.size > 0 && matriculaField.name ? matriculaField : null;

  const errors = validateDivision2Registration(input, matriculaFile?.name ?? null);
  if (matriculaFile && matriculaFile.type && matriculaFile.type !== 'application/pdf') {
    errors.matriculaPdf = 'La matrícula debe ser un archivo PDF.';
  }

  if (Object.keys(errors).length > 0) {
    return json({ success: false, message: 'Revisa los datos del formulario.', fieldErrors: errors }, { status: 400 });
  }

  try {
    const matriculaPdfUrl = matriculaFile ? await savePdfFile(matriculaFile, 'matriculas') : null;

    await getPrisma().division2Registration.create({
      data: {
        nombreCompleto: input.nombreCompleto.trim(),
        nickname: input.nickname.trim(),
        celular: input.celular.trim(),
        correo: input.correo.trim(),
        telegramUsuario: input.telegramUsuario.trim(),
        tallaPolera: input.tallaPolera as PrismaTallaPolera,
        matriculaPdfUrl,
      },
    });

    return json({ success: true, message: '¡Estás inscrito! Queda atento a tu correo y Telegram.' });
  } catch (error) {
    console.error('division-2 inscripcion error', error);
    return json({ success: false, message: 'Ocurrió un error al guardar tu inscripción. Intenta nuevamente.' }, { status: 500 });
  }
}
