export type RegistrationRow = {
  id: string;
  createdAt: string;
  nombreCompleto: string;
  nickname: string;
  correo: string;
  celular: string;
  telegramUsuario: string;
  tallaPolera: string;
  comentario: string | null;
  matriculaPdfUrl: string | null;
};

const CSV_HEADER = ['#', 'Fecha', 'Nombre completo', 'Nickname', 'Correo', 'Celular', 'Telegram', 'Talla', 'Matrícula (PDF)', 'Comentario'];

// Spreadsheets read a leading =, + or - as the start of a formula, and these values
// come from a public form, so they're prefixed with a quote to stay inert. A leading
// @ only counts when it's a call like @SUM(...) — every Telegram handle starts with
// one, and quoting all of them would mangle the whole column.
function csvCell(value: string | null): string {
  const text = (value ?? '').replace(/"/g, '""');
  const looksLikeFormula = /^[=+\-\t\r]/.test(text) || (text.startsWith('@') && text.includes('('));
  return `"${looksLikeFormula ? `'${text}` : text}"`;
}

// `origin` turns the stored relative PDF paths into links that still work from a
// spreadsheet opened outside the app.
export function buildRegistrationsCsv(registrations: RegistrationRow[], origin: string): string {
  const lines = [CSV_HEADER.map(csvCell).join(',')];

  registrations.forEach((registration, index) => {
    lines.push(
      [
        String(registrations.length - index),
        registration.createdAt,
        registration.nombreCompleto,
        registration.nickname,
        registration.correo,
        registration.celular,
        registration.telegramUsuario,
        registration.tallaPolera,
        registration.matriculaPdfUrl ? `${origin}${registration.matriculaPdfUrl}` : '',
        registration.comentario,
      ]
        .map(csvCell)
        .join(','),
    );
  });

  // The BOM is what makes Excel read the file as UTF-8 instead of mangling accents.
  return `\uFEFF${lines.join('\r\n')}`;
}
