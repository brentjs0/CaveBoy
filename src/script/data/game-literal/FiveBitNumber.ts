/**
 * A non-negative integer than can be expressed with
 * five or fewer binary digits.
 * This includes all integers from 0 to 31, inclusive.
 */
export type FiveBitNumber =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31;

/**
 * Return true if value is a non-negative integer than can be
 * expressed with five or fewer binary digits.
 * @param value - A value that might be a FiveBitNumber.
 * @returns True if value is a non-negative integer than can be
 * expressed with five or fewer binary digits. Otherwise, false.
 */
export function isFiveBitNumber(value: any): value is FiveBitNumber {
  if (
    typeof value === 'number' &&
    Number.isInteger(value) &&
    value >= 0 &&
    value <= 31
  ) {
    return true;
  }

  return false;
}
