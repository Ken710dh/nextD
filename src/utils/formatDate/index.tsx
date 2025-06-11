/**
 * Formats a date string in the format "dd/mm/yyyy, HH:MM".
 *
 * If the input date string is invalid, it returns "Invalid date".
 *
 * @param {string} dateString The date string to format.
 * @returns {string} A string representing the formatted date.
 */
export function formatDateSimple(dateString: string): string {
  const parsedDate = new Date(dateString);
  if (isNaN(parsedDate.getTime())) return 'Invalid date';

  const day = String(parsedDate.getDate()).padStart(2, '0');
  const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
  const year = parsedDate.getFullYear();

  const hour = String(parsedDate.getHours()).padStart(2, '0');
  const minute = String(parsedDate.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year}, ${hour}:${minute}`;
}

export function hasValidFilter(filter: string): boolean {
   return !!filter && Object.keys(filter).length > 0;
}