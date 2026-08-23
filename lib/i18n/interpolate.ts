/**
 * Tiny `{name}`-style interpolation for dictionary strings.
 *
 * Deliberately separate from dictionaries.ts: that module is `server-only`
 * (it loads every dictionary), while interpolation is pure string work that
 * client components need too.
 */
export function interpolate(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? `{${key}}`);
}
