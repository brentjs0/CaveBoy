import CaveBoyError from '@/script/base/error/CaveBoyError';

/**
 * A name of one of the types defined by CaveBoy.
 */
export type TypeName =
  | 'Uint4'
  | 'Uint5'
  | 'Uint8'
  | 'HexadecimalColorString'
  | 'CoilSnakeColorString'
  | 'CoilSnakeMinitilePaletteString'
  | 'CoilSnakeMinitileLayerString'
  | 'CoilSnakeMinitileString'
  | 'CoilSnakeArrangementCellString';

/**
 * A non-negative integer than can be expressed with
 * four or fewer binary digits.
 * This includes all integers from 0 to 15, inclusive.
 */
// prettier-ignore
export type Uint4 =
  0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;

/**
 * A non-negative integer than can be expressed with
 * five or fewer binary digits.
 * This includes all integers from 0 to 31, inclusive.
 */
// prettier-ignore
export type Uint5 =
   0 |  1 |  2 |  3 |  4 |  5 |  6 |  7 |  8 |  9 | 10 | 11 | 12 | 13 | 14 | 15 |
  16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31;

/**
 * A non-negative integer than can be expressed with eight or fewer binary digits.
 * This includes all integers from 0 to 255, inclusive.
 */
export type Uint8 = number;

/**
 * A seven- or four-character string color expression in the format
 * '#xxx' or '#xxxxxx', where 'x' is a hexadecimal digit. Can be uppercase,
 * lowercase, or mixed case.
 */
export type HexadecimalColorString = string;

/**
 * A three-character string color expression in the format 'xxx', where
 * 'x' is a base-32 digit. Must be lowercase.
 */
export type CoilSnakeColorString = Lowercase<string>;

/**
 * A string expression of a 16-color palette as encoded by CoilSnake.
 * Consists of 48 base-32 digits. Must be lowercase.
 */
export type CoilSnakeMinitilePaletteString = string;

/**
 * A 64-character string expression of a minitile layer image as encoded by
 * CoilSnake. Consists of 64 hexadecimal digits. Must be lowercase.
 */
export type CoilSnakeMinitileLayerString = string;

/**
 * A string expression of a two-layer minitile image as encoded by CoilSnake.
 * Consists of two strings of 64 hexadecimal digits each separated by a
 * carriage return ('\r'), a new line ('\n'), or both ('\r\n'). Must be
 * lowercase.
 */
export type CoilSnakeMinitileString = string;

/**
 * A string expression containing the minitile number, palette number,
 * horizontal flip, vertical flip, and surface flags for a single cell in a
 * 4 x 4 arrangement as encoded by CoilSnake.
 */
export type CoilSnakeArrangementCellString = string;

/**
 * A CaveBoy-defined type with the name T.
 */
// prettier-ignore
export type Type<T extends TypeName> =
    T extends 'Uint4' ? Uint4
  : T extends 'Uint5' ? Uint5
  : T extends 'Uint8' ? Uint8
  : T extends 'HexadecimaColorString' ? HexadecimalColorString
  : T extends 'CoilSnakeColorString' ? CoilSnakeColorString
  : T extends 'CoilSnakeMinitilePaletteString' ? CoilSnakeMinitilePaletteString
  : T extends 'CoilSnakeMinitileLayerString' ? CoilSnakeMinitileLayerString
  : T extends 'CoilSnakeMinitileString' ? CoilSnakeMinitileString
  : T extends 'CoilSnakeArrangementCellString' ? CoilSnakeArrangementCellString
  : never;

/**
 * Return true if the provided value meets the constraints to be considered the
 * specified type.
 * @param value - A value that might be of the specified type.
 * @param type - The name of the type for which to check the provided value.
 * @returns True if the provided value meets the constraints to be considered
 * the specified type. Otherwise, false.
 */
export function isType<T extends TypeName>(
  value: any,
  type: T
): value is Type<T> {
  switch (type) {
    case 'Uint4':
      return (
        typeof value === 'number' &&
        Number.isInteger(value) &&
        value >= 0 &&
        value <= 15
      );
    case 'Uint5':
      return (
        typeof value === 'number' &&
        Number.isInteger(value) &&
        value >= 0 &&
        value <= 31
      );
    case 'Uint8':
      return (
        typeof value === 'number' &&
        Number.isInteger(value) &&
        value >= 0 &&
        value <= 255
      );
    case 'HexadecimalColorString':
      return (
        typeof value === 'string' &&
        /^#(?:[0-9a-f]{6}|[0-9a-f]{3})$/i.test(value)
      );
    case 'CoilSnakeColorString':
      return typeof value === 'string' && /^[0-9a-v]{3}$/.test(value);
    case 'CoilSnakeMinitilePaletteString':
      return typeof value === 'string' && /^[0-9a-v]{48}$/.test(value);
    case 'CoilSnakeMinitileLayerString':
      return typeof value === 'string' && /^[0-9a-f]{64}$/.test(value);
    case 'CoilSnakeMinitileString':
      return (
        typeof value === 'string' &&
        /^[0-9a-f]{64}(?:\n|\r\n|\r)[0-9a-f]{64}$/.test(value)
      );
    case 'CoilSnakeArrangementCellString':
      return typeof value === 'string' && /^[0-9a-f]{6}$/.test(value);
    default:
      throw new CaveBoyError(`Type constraints for '${type}' are not defined.`);
  }
}
