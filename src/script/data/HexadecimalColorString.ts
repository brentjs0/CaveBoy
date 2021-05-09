/**
 * A seven- or four-character string color expression in the format '#xxx' or '#xxxxxx',
 * where 'x' is a hexadecimal digit. Can be uppercase, lowercase, or mixed case.
 */
export type HexadecimalColorString = string;

const requiredFormat = /^#([0-9a-f]{6}|[0-9a-f]{3})$/i;

/**
 * Return true if value meets the required type and format for a HexadecimalColorString ('#xxx' or '#xxxxxx').
 * @param value - A value that might be a HexadecimalColorString.
 * @returns True if value meets the required type and format for a HexadecimalColorString. Otherwise, false.
 */
export function isHexadecimalColorString(
  value: any
): value is HexadecimalColorString {
  if (typeof value === 'string') {
    return requiredFormat.test(value);
  }

  return false;
}
