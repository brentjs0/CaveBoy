/**
 * A string expression of a 16-color palette as encoded by CoilSnake.
 * Consists of 48 base-32 digits. Must be lowercase.
 */
export type CoilSnakeMinitilePaletteString = string;

const requiredFormat: RegExp = /^([0-9a-v]{48})$/;

/**
 * Return true if value meets the required type and format for a CoilSnakeMinitilePaletteString.
 * @param value - A value that might be a CoilSnakeMinitilePaletteString.
 * @returns True if value meets the required type and format for a CoilSnakeMinitilePaletteString. Otherwise, false.
 */
export function isCoilSnakeMinitilePaletteString(
  value: CoilSnakeMinitilePaletteString | any
): value is CoilSnakeMinitilePaletteString {
  if (typeof value === 'string') {
    return requiredFormat.test(value);
  }

  return false;
}
