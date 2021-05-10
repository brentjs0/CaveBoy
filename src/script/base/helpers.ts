/**
 * Generate string segments of the provided string with the specified length. Segments are consecutive and do not overlap.
 * When the provided string is not divisible without a remainder, a trailing segment shorter than the specified length is generated.
 * @param str - The string to divide.
 * @param segmentLength - The length of the string segments to be generated.
 */
export function* segmentString(
  str: string,
  segmentLength: number
): Generator<string> {
  if (segmentLength < 1) {
    throw new Error('Parameter segmentLength must be greater than 0.');
  }

  let i;
  for (i = 0; i + segmentLength <= str.length; i += segmentLength) {
    yield str.substr(i, segmentLength);
  }

  if (str.length % segmentLength !== 0) {
    yield str.substr(i);
  }
}
