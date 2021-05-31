import CaveBoyError from '@/script/base/error/CaveBoyError';

/**
 * Generate string segments of the provided string with the specified
 * length. Segments are consecutive and do not overlap. When the
 * provided string is not divisible without a remainder, a trailing
 * segment shorter than the specified length is generated.
 * @param str - The string to divide.
 * @param segmentLength - The length of the string segments to be
 * generated.
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
 * Return true if the bit at the provided place for the provided number is 1. Otherwise, return false.
 * @param number - An integer containing the bit value to be checked.
 * @param place - The zero-based bit position to check, counting from the rightmost bit.
 * @returns True if the bit at the provided place for the provided number is 1. Otherwise, false.
 */
export function getBitValue(number: number, place: number): boolean {
  if (!Number.isInteger(number)) {
    throw new CaveBoyError('Parameter number must be an integer.');
  }
  if (!Number.isInteger(place) || place < 0 || place > 30) {
    throw new CaveBoyError('Parameter number must be an integer from 0 to 30.');
  }

  return (number & Math.pow(2, place)) > 0;
}
