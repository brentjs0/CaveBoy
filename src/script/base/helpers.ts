import CaveBoyError from '@/script/base/error/CaveBoyError';

/**
 * Split the provided string into substrings of the specified length and
 * return them as a generator. Substrings are consecutive and do not
 * overlap. When the provided string is not divisible without a remainder,
 * a trailing substring shorter than the specified length is generated.
 * @param str - The string to divide.
 * @param segmentLength - The length of the substrings to be
 * generated.
 * @returns A generator of substrings of the specified length.
 */
export function* segmentString(
  str: string,
  segmentLength: number
): Generator<string> {
  if (segmentLength < 1) {
    throw new CaveBoyError('Parameter segmentLength must be greater than 0.');
  }

  let i;
  for (i = 0; i + segmentLength <= str.length; i += segmentLength) {
    yield str.substr(i, segmentLength);
  }

  if (str.length % segmentLength !== 0) {
    yield str.substr(i);
  }
}

/**
 * Split the provided string into substrings at every index where the
 * provided condition returns true, and return them as a generator.
 * @param str - The string to divide.
 * @param condition - A function that returns true for character indexes
 * where the string should be split. Must accept a number parameter for
 * the character index being tested, and may optionally accept a second
 * parameter for the string being split.
 * @returns A generator of substrings of the provided string.
 */
export function* splitStringWhere(
  str: string,
  condition:
    | ((charIndex: number) => boolean)
    | ((charIndex: number, str: string) => boolean)
): Generator<string> {
  let segmentStart = 0;
  for (let i = 0; i < str.length; ++i) {
    if (condition(i, str)) {
      yield str.substring(segmentStart, i);
      segmentStart = i;
    }
  }
  yield str.substring(segmentStart);
}

/**
 * Return true if the bit at the provided place for the provided number is 1.
 * Otherwise, return false.
 * @param number - An integer containing the bit value to be checked.
 * @param place - The zero-based bit position to check, counting from the
 * rightmost bit.
 * @returns True if the bit at the provided place for the provided number is
 * 1. Otherwise, false.
 */
export function getBitValue(number: number, place: number): boolean {
  if (!Number.isInteger(number)) {
    throw new CaveBoyError('Parameter number must be an integer.');
  }
  if (!Number.isInteger(place) || place < 0 || place > 30) {
    throw new CaveBoyError('Parameter place must be an integer from 0 to 30.');
  }

  return (number & Math.pow(2, place)) > 0;
}
