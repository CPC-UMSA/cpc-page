export type Division1RegistrationRow = {
  id: string;
  createdAt: string;
  nombreEquipo: string;
  participante1Nombre: string;
  participante1MatriculaPdfUrl: string | null;
  participante2Nombre: string;
  participante2MatriculaPdfUrl: string | null;
  participante3Nombre: string;
  participante3MatriculaPdfUrl: string | null;
  reservaNombre: string | null;
  reservaMatriculaPdfUrl: string | null;
  celularRepresentante: string;
  correoRepresentante: string;
  telegramRepresentante: string;
  comentario: string | null;
};

const CSV_HEADER = [
  '#',
  'Fecha',
  'Equipo',
  'Participante 1',
  'Matrícula 1 (PDF)',
  'Participante 2',
  'Matrícula 2 (PDF)',
  'Participante 3',
  'Matrícula 3 (PDF)',
  'Reserva',
  'Matrícula reserva (PDF)',
  'Celular representante',
  'Correo representante',
  'Telegram representante',
  'Comentario',
];

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
export function buildDivision1RegistrationsCsv(registrations: Division1RegistrationRow[], origin: string): string {
  const lines = [CSV_HEADER.map(csvCell).join(',')];

  const pdfUrl = (path: string | null) => (path ? `${origin}${path}` : '');

  registrations.forEach((registration, index) => {
    lines.push(
      [
        String(registrations.length - index),
        registration.createdAt,
        registration.nombreEquipo,
        registration.participante1Nombre,
        pdfUrl(registration.participante1MatriculaPdfUrl),
        registration.participante2Nombre,
        pdfUrl(registration.participante2MatriculaPdfUrl),
        registration.participante3Nombre,
        pdfUrl(registration.participante3MatriculaPdfUrl),
        registration.reservaNombre,
        pdfUrl(registration.reservaMatriculaPdfUrl),
        registration.celularRepresentante,
        registration.correoRepresentante,
        registration.telegramRepresentante,
        registration.comentario,
      ]
        .map(csvCell)
        .join(','),
    );
  });

  // The BOM is what makes Excel read the file as UTF-8 instead of mangling accents.
  return `\uFEFF${lines.join('\r\n')}`;
}
