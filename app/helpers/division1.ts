export type Division1RegistrationInput = {
  nombreEquipo: string;
  participante1Nombre: string;
  participante2Nombre: string;
  participante3Nombre: string;
  reservaNombre: string;
  celularRepresentante: string;
  correoRepresentante: string;
  telegramRepresentante: string;
  comentario: string;
};

export type MatriculaFieldKey = 'participante1Matricula' | 'participante2Matricula' | 'participante3Matricula' | 'reservaMatricula';

export type Division1RegistrationErrors = Partial<Record<keyof Division1RegistrationInput | MatriculaFieldKey, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CELULAR_REGEX = /^\d{8}$/;

export const MAX_MATRICULA_PDF_SIZE_BYTES = 10 * 1024 * 1024;

export type MatriculaFileInfo = { name: string; size: number; type?: string };

export type Division1MatriculaFiles = Partial<Record<MatriculaFieldKey, MatriculaFileInfo | null>>;

const MATRICULA_FIELDS: MatriculaFieldKey[] = ['participante1Matricula', 'participante2Matricula', 'participante3Matricula', 'reservaMatricula'];

// Shared between the client (inline field errors) and the resource route
// (never trust the client) — keep this file free of server-only imports.
export function validateDivision1Registration(input: Division1RegistrationInput, matriculaFiles: Division1MatriculaFiles = {}): Division1RegistrationErrors {
  const errors: Division1RegistrationErrors = {};

  if (!input.nombreEquipo.trim()) {
    errors.nombreEquipo = 'El nombre del equipo es obligatorio.';
  }

  if (!input.participante1Nombre.trim()) {
    errors.participante1Nombre = 'El nombre del participante 1 es obligatorio.';
  }

  if (!input.participante2Nombre.trim()) {
    errors.participante2Nombre = 'El nombre del participante 2 es obligatorio.';
  }

  if (!input.participante3Nombre.trim()) {
    errors.participante3Nombre = 'El nombre del participante 3 es obligatorio.';
  }

  if (!input.celularRepresentante.trim()) {
    errors.celularRepresentante = 'El número de celular del representante es obligatorio.';
  } else if (!CELULAR_REGEX.test(input.celularRepresentante.trim())) {
    errors.celularRepresentante = 'El número de celular debe tener exactamente 8 dígitos.';
  }

  if (!input.correoRepresentante.trim()) {
    errors.correoRepresentante = 'El correo del representante es obligatorio.';
  } else if (!EMAIL_REGEX.test(input.correoRepresentante.trim())) {
    errors.correoRepresentante = 'Ingresa un correo válido.';
  }

  if (!input.telegramRepresentante.trim()) {
    errors.telegramRepresentante = 'El usuario de Telegram del representante es obligatorio.';
  }

  for (const fieldKey of MATRICULA_FIELDS) {
    const file = matriculaFiles[fieldKey];
    if (!file) continue;

    const looksLikePdf = file.name.toLowerCase().endsWith('.pdf') && (!file.type || file.type === 'application/pdf');
    if (!looksLikePdf) {
      errors[fieldKey] = 'La matrícula debe ser un archivo PDF. No se aceptan otros tipos de archivo.';
    } else if (file.size > MAX_MATRICULA_PDF_SIZE_BYTES) {
      errors[fieldKey] = 'El archivo de matrícula no debe superar los 10MB.';
    }
  }

  return errors;
}

export type Division1InscripcionResponse =
  | { success: true; message: string }
  | { success: false; message: string; fieldErrors?: Division1RegistrationErrors };
