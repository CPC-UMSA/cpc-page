// Calendario de las actividades del club: reglas de cuándo se repite cada una, más las excepciones
// (fechas exactas confirmadas, cancelaciones, sedes). La portada y /nuestras-actividades calculan
// todo a partir de aquí, así que cuando una actividad pasa, se muestra sola su siguiente edición.

// Una fecha de calendario sin hora ni zona horaria, para que el servidor y el navegador calculen lo mismo.
export type CalendarDay = { year: number; month: number; day: number };

export type ActivityId = 'presentacion' | 'talleres' | 'concurso' | 'div2' | 'div1' | 'boliviana' | 'latino';

export type Occurrence = {
  id: ActivityId;
  key: string;
  start: CalendarDay;
  end: CalendarDay;
  // true cuando solo conocemos el mes (o meses) y no el día exacto
  approximate: boolean;
  // Semestre (I/II) para las actividades semestrales
  semester?: string;
  signupUrl?: string;
  venue?: string;
};

// Fechas exactas confirmadas del Concurso de Programación; los demás años solo se sabe que es en octubre.
const CONTEST_EDITIONS: Record<number, { day: number; signupUrl?: string }> = {
  2026: { day: 16, signupUrl: 'https://forms.gle/qTvf2PCfuug4WoD27' },
};

// Sedes confirmadas de la Competencia Latinoamericana.
const LATINO_VENUES: Record<number, string> = { 2026: 'Sucre, Chuquisaca' };

// Ediciones que no se realizan, con el motivo que se muestra en la página.
export const CANCELLATIONS: Record<string, string> = {
  'talleres-2026-II':
    'Los talleres de este semestre fueron cancelados, porque nuestros equipos se encuentran en entrenamientos intensivos para la Competencia Latinoamericana 2026.',
};

const MONTH_NAMES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
export const MONTH_SHORT = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const WEEKDAYS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

export const dayNumber = ({ year, month, day }: CalendarDay) => year * 10000 + month * 100 + day;

const lastDayOfMonth = (year: number, month: number) => new Date(year, month, 0).getDate();

const monthRange = (year: number, from: number, to: number) => ({
  start: { year, month: from, day: 1 },
  end: { year, month: to, day: lastDayOfMonth(year, to) },
  approximate: true,
});

const exactDay = (year: number, month: number, day: number) => ({
  start: { year, month, day },
  end: { year, month, day },
  approximate: false,
});

function firstSaturdayOfNovember(year: number) {
  const weekday = new Date(year, 10, 1).getDay();
  return 1 + ((6 - weekday + 7) % 7);
}

// Todas las ediciones de un año, incluidas las canceladas.
function allOccurrencesOf(year: number): Occurrence[] {
  const list: Occurrence[] = [];

  for (const [month, semester] of [
    [3, 'I'],
    [9, 'II'],
  ] as const) {
    list.push({ id: 'presentacion', key: `presentacion-${year}-${semester}`, semester, ...monthRange(year, month, month) });
    list.push({ id: 'talleres', key: `talleres-${year}-${semester}`, semester, ...monthRange(year, month, month + 3) });
  }

  const contest = CONTEST_EDITIONS[year];
  list.push(
    { id: 'div2', key: `div2-${year}`, ...monthRange(year, 7, 8) },
    { id: 'div1', key: `div1-${year}`, ...monthRange(year, 7, 8) },
    { id: 'boliviana', key: `boliviana-${year}`, ...monthRange(year, 9, 9) },
    {
      id: 'concurso',
      key: `concurso-${year}`,
      signupUrl: contest?.signupUrl,
      ...(contest ? exactDay(year, 10, contest.day) : monthRange(year, 10, 10)),
    },
    { id: 'latino', key: `latino-${year}`, venue: LATINO_VENUES[year], ...exactDay(year, 11, firstSaturdayOfNovember(year)) },
  );

  return list;
}

export function occurrencesOf(year: number) {
  return allOccurrencesOf(year).filter((occurrence) => !CANCELLATIONS[occurrence.key]);
}

const byStart = (a: Occurrence, b: Occurrence) => dayNumber(a.start) - dayNumber(b.start);

// Ediciones que todavía no terminaron, de la más cercana a la más lejana.
export function upcomingOccurrences(today: CalendarDay) {
  const now = dayNumber(today);
  return [today.year, today.year + 1, today.year + 2]
    .flatMap(occurrencesOf)
    .filter((occurrence) => dayNumber(occurrence.end) >= now)
    .sort(byStart);
}

export function nextOccurrence(id: ActivityId, today: CalendarDay) {
  return upcomingOccurrences(today).find((occurrence) => occurrence.id === id)!;
}

// Una edición cancelada que está en curso o por venir (para avisarlo en la página).
export function activeCancellation(id: ActivityId, today: CalendarDay) {
  const now = dayNumber(today);
  const occurrence = [today.year, today.year + 1]
    .flatMap(allOccurrencesOf)
    .find((o) => o.id === id && CANCELLATIONS[o.key] && dayNumber(o.end) >= now);
  return occurrence && { occurrence, reason: CANCELLATIONS[occurrence.key] };
}

export function isOngoing({ start, end }: Occurrence, today: CalendarDay) {
  const now = dayNumber(today);
  return dayNumber(start) <= now && now <= dayNumber(end);
}

// "viernes 16 de octubre de 2026", "marzo de 2027" o "marzo – junio de 2027"
export function formatWhen({ start, end, approximate }: Occurrence) {
  if (!approximate) {
    const weekday = WEEKDAYS[new Date(start.year, start.month - 1, start.day).getDay()];
    return `${weekday} ${start.day} de ${MONTH_NAMES[start.month - 1]} de ${start.year}`;
  }
  const months = start.month === end.month ? MONTH_NAMES[start.month - 1] : `${MONTH_NAMES[start.month - 1]} – ${MONTH_NAMES[end.month - 1]}`;
  return `${months} de ${start.year}`;
}

// Fecha corta en dos líneas: "16" / "oct 2026" o "mar–jun" / "2027"
export function shortWhen({ start, end, approximate }: Occurrence) {
  if (!approximate) return { top: String(start.day), bottom: `${MONTH_SHORT[start.month - 1]} ${start.year}` };
  const months = start.month === end.month ? MONTH_SHORT[start.month - 1] : `${MONTH_SHORT[start.month - 1]}–${MONTH_SHORT[end.month - 1]}`;
  return { top: months, bottom: String(start.year) };
}

export function daysUntil(day: CalendarDay, today: CalendarDay) {
  return Math.round((Date.UTC(day.year, day.month - 1, day.day) - Date.UTC(today.year, today.month - 1, today.day)) / 86400000);
}

// "En curso", "¡Es hoy!", "Mañana", "En 3 días", "El próximo mes", "En 5 meses"
export function relativeWhen(occurrence: Occurrence, today: CalendarDay) {
  const { start, approximate } = occurrence;
  if (isOngoing(occurrence, today)) return approximate ? 'En curso' : '¡Es hoy!';
  if (approximate) {
    const months = (start.year - today.year) * 12 + start.month - today.month;
    return months === 1 ? 'El próximo mes' : `En ${months} meses`;
  }
  const days = daysUntil(start, today);
  return days === 1 ? 'Mañana' : `En ${days} días`;
}

// La fecha de hoy en Bolivia. Se calcula en el servidor (loader) para que el HTML y la hidratación coincidan.
export function todayInBolivia(): CalendarDay {
  const [year, month, day] = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/La_Paz' }).format(new Date()).split('-').map(Number);
  return { year, month, day };
}
