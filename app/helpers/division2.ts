export const TALLA_POLERA_OPTIONS = ['S', 'M', 'L', 'XL', 'XXL'] as const;
export type TallaPolera = (typeof TALLA_POLERA_OPTIONS)[number];

export type Division2RegistrationInput = {
  nombreCompleto: string;
  nickname: string;
  celular: string;
  correo: string;
  telegramUsuario: string;
  tallaPolera: string;
  // Optional — used e.g. by OBI/OFBI/IOI participants to note that in lieu of a matrícula.
  comentario: string;
};

export type Division2RegistrationErrors = Partial<Record<keyof Division2RegistrationInput | 'matriculaPdf', string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CELULAR_REGEX = /^\d{8}$/;

export const MAX_MATRICULA_PDF_SIZE_BYTES = 10 * 1024 * 1024;

export type MatriculaFileInfo = { name: string; size: number; type?: string };

// Shared between the client (inline field errors) and the resource route
// (never trust the client) — keep this file free of server-only imports.
export function validateDivision2Registration(
  input: Division2RegistrationInput,
  matriculaFile?: MatriculaFileInfo | null,
): Division2RegistrationErrors {
  const errors: Division2RegistrationErrors = {};

  if (!input.nombreCompleto.trim()) {
    errors.nombreCompleto = 'El nombre completo es obligatorio.';
  }

  if (!input.nickname.trim()) {
    errors.nickname = 'El nickname es obligatorio.';
  }

  if (!input.celular.trim()) {
    errors.celular = 'El número de celular es obligatorio.';
  } else if (!CELULAR_REGEX.test(input.celular.trim())) {
    errors.celular = 'El número de celular debe tener exactamente 8 dígitos.';
  }

  if (!input.correo.trim()) {
    errors.correo = 'El correo es obligatorio.';
  } else if (!EMAIL_REGEX.test(input.correo.trim())) {
    errors.correo = 'Ingresa un correo válido.';
  }

  if (!input.telegramUsuario.trim()) {
    errors.telegramUsuario = 'El usuario de Telegram es obligatorio.';
  }

  if (!TALLA_POLERA_OPTIONS.includes(input.tallaPolera as TallaPolera)) {
    errors.tallaPolera = 'Selecciona una talla de polera válida.';
  }

  if (matriculaFile) {
    const looksLikePdf = matriculaFile.name.toLowerCase().endsWith('.pdf') && (!matriculaFile.type || matriculaFile.type === 'application/pdf');
    if (!looksLikePdf) {
      errors.matriculaPdf = 'La matrícula debe ser un archivo PDF. No se aceptan otros tipos de archivo.';
    } else if (matriculaFile.size > MAX_MATRICULA_PDF_SIZE_BYTES) {
      errors.matriculaPdf = 'El archivo de matrícula no debe superar los 10MB.';
    }
  }

  return errors;
}

export type Division2InscripcionResponse =
  | { success: true; message: string }
  | { success: false; message: string; fieldErrors?: Division2RegistrationErrors };
