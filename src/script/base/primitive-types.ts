import CaveBoyError from '@/script/base/error/CaveBoyError';
import { isInteger } from 'lodash';

/**
 * A number with no significant fractional value that is within the safe range
 * for correct representation and comparison of integers (-9,007,199,254,740,991
 * through 9,007,199,254,740,991).
 */
export type SafeInteger = number;

/**
 * A non-negative integer than can be expressed with three or fewer binary
 * digits. This includes all integers from 0 to 7, inclusive.
 */
export type Uint3 = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

/**
 * A non-negative integer than can be expressed with four or fewer binary digits.
 * This includes all integers from 0 to 15, inclusive.
 */
// prettier-ignore
export type Uint4 =
  0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;

/**
 * A non-negative integer than can be expressed with five or fewer binary digits.
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
 * A non-negative integer than can be expressed with nine or fewer binary digits.
 * This includes all integers from 0 to 511, inclusive.
 */
export type Uint9 = number;

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
export type CSColorString = Lowercase<string>;

/**
 * A string expression of a 16-color palette as encoded by CS.
 * Consists of 48 base-32 digits. Must be lowercase.
 */
export type CSSubpaletteString = string;

/**
 * A 64-character string expression of a minitile layer image as encoded by
 * CS. Consists of 64 hexadecimal digits. Must be lowercase.
 */
export type CSMinitileLayerString = string;

/**
 * A string expression of a two-layer minitile image as encoded by CS.
 * Consists of two strings of 64 hexadecimal digits each separated by a
 * carriage return ('\r'), a new line ('\n'), or both ('\r\n'). Must be
 * lowercase.
 */
export type CSMinitileString = string;

/**
 * A string expression containing the Minitile number, Subpalette number,
 * flip state, and surface flags for a single cell of a 4 x 4 arrangement.
 * Encoded by CS as a string of six hexadecimal digits. Must be lowercase.
 *
 * In binary, the data is encoded as follows: `VH?P PPTT TTTT TTTT SSSS SSSS`
 * - `V` = Vertical flip (1 for flipped, 0 for unflipped)
 * - `H` = Horizontal flip (1 for flipped, 0 for unflipped)
 * - `?` = Unused
 * - `P` = Minitile Pallete number + 2
 * - `T` = Minitile number (value must not exceed 511, despite using 10 bits)
 * - `S` = The eight surface flags, which include collision data
 */
export type CSArrangementCellString = string;

/**
 * A string expression of a set of six sixteen-color Subpalettes as
 * encoded by CS. Consists of 288 base-32 digits. Must be lowercase.
 */
export type CSPaletteString = string;

/**
 * A string expression of a set of sixteen six-digit ArrangementCells as
 * encoded by CS. Consists of 96 hexadecimal digits. Must be lowercase.
 */
export type CSArrangementString = string;

/**
 * A multi-line string expression of one to eight CSPaletteStrings
 * prefixed with their GraphicSet number and their Palette number
 * within the list. Lines consist of 290 base-32 digits each. Must be lowercase.
 */
export type CSGraphicSetString = string;

/**
 * A name of one of the types defined by CaveBoy.
 */
export type TypeName =
  | 'SafeInteger'
  | 'Uint3'
  | 'Uint4'
  | 'Uint5'
  | 'Uint8'
  | 'Uint9'
  | 'HexadecimalColorString'
  | 'CSColorString'
  | 'CSSubpaletteString'
  | 'CSMinitileLayerString'
  | 'CSMinitileString'
  | 'CSArrangementCellString'
  | 'CSPaletteString'
  | 'CSArrangementString'
  | 'CSGraphicSetString';

/**
 * A CaveBoy-defined primitive type with the name T.
 */
// prettier-ignore
export type Type<T extends TypeName> =
   T extends 'SafeInteger' ? SafeInteger
 : T extends 'Uint3' ? Uint3
 : T extends 'Uint4' ? Uint4
 : T extends 'Uint5' ? Uint5
 : T extends 'Uint8' ? Uint8
 : T extends 'Uint9' ? Uint9
 : T extends 'HexadecimaColorString' ? HexadecimalColorString
 : T extends 'CSColorString' ? CSColorString
 : T extends 'CSSubpaletteString' ? CSSubpaletteString
 : T extends 'CSMinitileLayerString' ? CSMinitileLayerString
 : T extends 'CSMinitileString' ? CSMinitileString
 : T extends 'CSArrangementCellString' ? CSArrangementCellString
 : T extends 'CSPaletteString' ? CSPaletteString
 : T extends 'CSArrangementString' ? CSArrangementString
 : T extends 'CSGraphicSetString' ? CSGraphicSetString
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
    case 'SafeInteger':
      return Number.isSafeInteger(value);
    case 'Uint3':
      return isValidNumber(value, 0, 7);
    case 'Uint4':
      return isValidNumber(value, 0, 15);
    case 'Uint5':
      return isValidNumber(value, 0, 31);
    case 'Uint8':
      return isValidNumber(value, 0, 255);
    case 'Uint9':
      return isValidNumber(value, 0, 511);
    case 'HexadecimalColorString':
      return (
        typeof value === 'string' &&
        /^#(?:[0-9a-f]{6}|[0-9a-f]{3})$/i.test(value)
      );
    case 'CSColorString':
      return typeof value === 'string' && /^[0-9a-v]{3}$/.test(value);
    case 'CSSubpaletteString':
      return typeof value === 'string' && /^[0-9a-v]{48}$/.test(value);
    case 'CSMinitileLayerString':
      return typeof value === 'string' && /^[0-9a-f]{64}$/.test(value);
    case 'CSMinitileString':
      return (
        typeof value === 'string' &&
        /^[0-9a-f]{64}(?:\n|\r\n|\r)[0-9a-f]{64}$/.test(value)
      );
    case 'CSArrangementCellString':
      return typeof value === 'string' && /^[0-9a-f]{6}$/.test(value);
    case 'CSPaletteString':
      return typeof value === 'string' && /^[0-9a-v]{288}$/.test(value);
    case 'CSArrangementString':
      return typeof value === 'string' && /^[0-9a-f]{96}$/.test(value);
    case 'CSGraphicSetString':
      return (
        typeof value === 'string' &&
        /^[0-9a-v]0[0-9a-v]{288}(?:(?:\n|\r\n|\r)[0-9a-v][1-7][0-9a-v]{288}){0,7}$/.test(
          value
        )
      );
    default:
      throw new CaveBoyError(`Type constraints for '${type}' are not defined.`);
  }
}

/**
 * Return true if the provided value is a number that meets the specified
 * constraints.
 * @param value - The value to check.
 * @param validRangeLow - The lowest possible value for which to return true.
 * Optional. No lower bound is enforced if omitted.
 * @param validRangeHigh - The highest possible value for which to return true.
 * Optional. No upper bound is enforced if omitted.
 * @param mustBeInteger - Whethe to require that the value be an integer in
 * order to return true.
 * @returns true if the provided value is a number that meets the specified
 * constraints. Otherwise false.
 */
export function isValidNumber(
  value: any,
  validRangeLow?: number,
  validRangeHigh?: number,
  mustBeInteger: boolean = true
) {
  return (
    typeof value === 'number' &&
    !isNaN(value) &&
    (validRangeLow === undefined || value >= validRangeLow) &&
    (validRangeHigh === undefined || value <= validRangeHigh) &&
    (!mustBeInteger || Number.isInteger(value))
  );
}
