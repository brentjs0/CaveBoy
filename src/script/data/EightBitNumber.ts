/**
 * A non-negative integer than can be expressed with eight or fewer binary digits.
 * This includes all integers from 0 to 255, inclusive.
 */
export type EightBitNumber = number;

/**
 * Return true if value is a non-negative integer than can be expressed with eight or fewer binary digits.
 * @param num - A value that might be an EightBitNumber.
 * @returns True if value is a non-negative integer than can be expressed with eight or fewer binary digits. Otherwise, false.
 */
export function isEightBitNumber(value: any): value is EightBitNumber {
  if (
    typeof value === 'number' &&
    Number.isInteger(value) &&
    value >= 0 &&
    value <= 255
  ) {
    return true;
  }

  return false;
}
