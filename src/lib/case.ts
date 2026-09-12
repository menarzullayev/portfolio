/**
 * Ma'lumotlar bazasi (snake_case) va ilova kodi (camelCase) o'rtasidagi moslashtirish.
 * Supabase jadvallari snake_case ishlatadi, TypeScript esa camelCase.
 */

const toCamelKey = (key: string) => key.replace(/_([a-z0-9])/g, (_, c: string) => c.toUpperCase());
const toSnakeKey = (key: string) => key.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`);

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/** Obyekt kalitlarini camelCase ga o'giradi (chuqur) */
export function toCamel<T = Record<string, unknown>>(input: unknown): T {
  if (Array.isArray(input)) return input.map((item) => toCamel(item)) as unknown as T;
  if (!isPlainObject(input)) return input as T;

  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(input)) {
    // jsonb ichidagi kalitlarga tegmaymiz — faqat ustun nomlarini o'zgartiramiz
    result[toCamelKey(key)] = Array.isArray(value) ? value.map((v) => (isPlainObject(v) ? { ...v } : v)) : value;
  }
  return result as T;
}

/** Obyekt kalitlarini snake_case ga o'giradi (chuqur emas — faqat ustunlar) */
export function toSnake<T = Record<string, unknown>>(input: unknown): T {
  if (Array.isArray(input)) return input.map((item) => toSnake(item)) as unknown as T;
  if (!isPlainObject(input)) return input as T;

  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(input)) {
    result[toSnakeKey(key)] = value;
  }
  return result as T;
}

/** Ma'lumotlar bazasidan kelgan qatorlarni ilova formatiga o'girish */
export function rowsToApp<T>(rows: unknown): T[] {
  if (!Array.isArray(rows)) return [];
  return rows.map((row) => toCamel(row)) as T[];
}
