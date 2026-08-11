import { type ActionFunctionArgs, json, unstable_createMemoryUploadHandler, unstable_parseMultipartFormData } from '@remix-run/node';
import { getPrisma } from '~/helpers/db.server';
import { MAX_MATRICULA_PDF_SIZE_BYTES, type MatriculaFieldKey, validateDivision1Registration } from '~/helpers/division1';
import { savePdfFile } from '~/helpers/storage.server';

const MATRICULA_FIELDS: MatriculaFieldKey[] = ['participante1Matricula', 'participante2Matricula', 'participante3Matricula', 'reservaMatricula'];

function getUploadedFile(formData: FormData, field: MatriculaFieldKey): File | null {
  const value = formData.get(field);
  return value instanceof File && value.size > 0 && value.name ? value : null;
}

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== 'POST') {
    return json({ success: false, message: 'Método no permitido.' }, { status: 405 });
  }

  let formData: FormData;
  try {
    const uploadHandler = unstable_createMemoryUploadHandler({ maxPartSize: MAX_MATRICULA_PDF_SIZE_BYTES });
    formData = await unstable_parseMultipartFormData(request, uploadHandler);
  } catch (error) {
    const message =
      error instanceof Error && error.name === 'MaxPartSizeExceededError'
        ? 'Alguno de los archivos de matrícula supera el tamaño máximo permitido (10MB).'
        : 'No se pudo procesar el formulario.';
    return json({ success: false, message }, { status: 400 });
  }

  const input = {
    nombreEquipo: String(formData.get('nombreEquipo') || ''),
    participante1Nombre: String(formData.get('participante1Nombre') || ''),
    participante2Nombre: String(formData.get('participante2Nombre') || ''),
    participante3Nombre: String(formData.get('participante3Nombre') || ''),
    reservaNombre: String(formData.get('reservaNombre') || ''),
    celularRepresentante: String(formData.get('celularRepresentante') || ''),
    correoRepresentante: String(formData.get('correoRepresentante') || ''),
    telegramRepresentante: String(formData.get('telegramRepresentante') || ''),
    comentario: String(formData.get('comentario') || ''),
  };

  const files = Object.fromEntries(MATRICULA_FIELDS.map((field) => [field, getUploadedFile(formData, field)])) as Record<MatriculaFieldKey, File | null>;

  const errors = validateDivision1Registration(
    input,
    Object.fromEntries(
      MATRICULA_FIELDS.map((field) => [field, files[field] ? { name: files[field]!.name, size: files[field]!.size, type: files[field]!.type } : null]),
    ),
  );

  if (Object.keys(errors).length > 0) {
    return json({ success: false, message: 'Revisa los datos del formulario.', fieldErrors: errors }, { status: 400 });
  }

  try {
    const [participante1MatriculaPdfUrl, participante2MatriculaPdfUrl, participante3MatriculaPdfUrl, reservaMatriculaPdfUrl] = await Promise.all(
      MATRICULA_FIELDS.map((field) => (files[field] ? savePdfFile(files[field]!, 'matriculas') : Promise.resolve(null))),
    );

    await getPrisma().division1Registration.create({
      data: {
        nombreEquipo: input.nombreEquipo.trim(),
        participante1Nombre: input.participante1Nombre.trim(),
        participante1MatriculaPdfUrl,
        participante2Nombre: input.participante2Nombre.trim(),
        participante2MatriculaPdfUrl,
        participante3Nombre: input.participante3Nombre.trim(),
        participante3MatriculaPdfUrl,
        reservaNombre: input.reservaNombre.trim() || null,
        reservaMatriculaPdfUrl,
        celularRepresentante: input.celularRepresentante.trim(),
        correoRepresentante: input.correoRepresentante.trim(),
        telegramRepresentante: input.telegramRepresentante.trim(),
        comentario: input.comentario.trim() || null,
      },
    });

    return json({ success: true, message: '¡Estás inscrito! Queda atento a tu correo y Telegram.' });
  } catch (error) {
    console.error('division-1 inscripcion error', error);
    return json({ success: false, message: 'Ocurrió un error al guardar tu inscripción. Intenta nuevamente.' }, { status: 500 });
  }
}
