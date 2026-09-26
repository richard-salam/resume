const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

/**
 * Formats an ISO-ish month string.
 *   "2023-04"    -> "Apr 2023"
 *   "2023"       -> "2023"
 *   "present"    -> "Present"
 */
export function formatMonth(value: string): string {
  if (!value) return '';
  if (value.toLowerCase() === 'present') return 'Present';

  const [year, month] = value.split('-');
  if (!month) return year;
  const index = Number(month) - 1;
  if (Number.isNaN(index) || index < 0 || index > 11) return year;

  return `${MONTHS[index]} ${year}`;
}

/** "Apr 2023 — Present" */
export function formatRange(start: string, end: string): string {
  return `${formatMonth(start)} — ${formatMonth(end)}`;
}

/**
 * Rough duration between two month strings, e.g. "3 yrs 2 mos".
 * Returns an empty string when the range is unusable.
 */
export function duration(start: string, end: string): string {
  const parse = (v: string): number | null => {
    if (!v || v.toLowerCase() === 'present') return null;
    const [y, m = '1'] = v.split('-');
    const year = Number(y);
    const month = Number(m);
    if (Number.isNaN(year) || Number.isNaN(month)) return null;
    return year * 12 + (month - 1);
  };

  const from = parse(start);
  if (from === null) return '';

  const to = parse(end) ?? (new Date().getFullYear() * 12 + new Date().getMonth());
  const months = Math.max(0, to - from);
  if (months === 0) return '';

  const years = Math.floor(months / 12);
  const rem = months % 12;

  if (years === 0) return `${rem} mo${rem === 1 ? '' : 's'}`;
  if (rem === 0) return `${years} yr${years === 1 ? '' : 's'}`;
  return `${years} yr${years === 1 ? '' : 's'} ${rem} mo${rem === 1 ? '' : 's'}`;
}

/** "26 Sep 2026" — used on blog posts, where the day matters. */
export function formatDate(date: Date): string {
  return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}
