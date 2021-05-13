import { getCurrentCaveBoyConfiguration } from '@/script/base/CaveBoyConfiguration';
import CaveBoyError from '@/script/base/error/CaveBoyError';
import { Uint5, Uint8, isType } from '@/script/base/primitive-types';

/**
 * A set of methods for converting between five-bit Super Famicom red/green/blue
 * color component values and eight-bit color component values.
 */
export interface ColorComponentScaler {
  /**
   * Convert a five-bit Super Famicom red/green/blue color component value to an
   * eight-bit color component value.
   * @param uint5Component - A number representing a five-bit Super Famicom
   * red/green/blue color component value.
   * @returns A number representing uint5 as an eight-bit color component value.
   */
  convertFiveBitToEightBit(uint5Component: Uint5): Uint8;

  /**
   * Convert an eight-bit red/green/blue color component value to a five-bit
   * Super Famicom color component value.
   * @param uint8Component - A number representing an eight-bit red/green/blue
   * color component value.
   * @returns A number representing uint8 as a five-bit Super Famicom color
   * component value.
   */
  convertEightBitToFiveBit(uint8Component: Uint8): Uint5;

  /**
   * Convert an eight-bit red/green/blue color component with 256 possible
   * values to the eight-bit number that would represent its five-bit value
   * for this scaler. For example, 255 (0b11111111) might be converted to
   * 248 (0b11111000).
   * @param rawUint8Component - The eight-bit red/green/blue color component
   * value to normalize.
   * @returns The eight-bit number that would represent rawUint8Component's
   * five-bit value for this scaler.
   */
  normalizeEightBit(rawUint8Component: Uint8): Uint8;
}

/**
 * A set of methods for converting between five-bit Super Famicom
 * red/green/blue color component values and eight-bit color component values
 * by multiplying or dividing by eight. The maximum eight-bit value is 248
 * out of 255. This is the method used by JHack/EB Project Editor.
 */
export const factorOfEightScaler: ColorComponentScaler = {
  convertFiveBitToEightBit(uint5Component: Uint5): Uint8 {
    const num = uint5Component << 3;

    if (isType(num, 'Uint8')) {
      return num;
    }

    throw new CaveBoyError(
      `Uint5 component '${uint5Component}' could not be converted to a Uint8.`
    );
  },
  convertEightBitToFiveBit(uint8Component: Uint8): Uint5 {
    if (isType(uint8Component, 'Uint8')) {
      const num = uint8Component >>> 3;
      if (isType(num, 'Uint5')) {
        return num;
      }
    }

    throw new CaveBoyError(
      `Uint8 component '${uint8Component}' could not be converted to a Uint5.`
    );
  },
  normalizeEightBit(rawUint8Component: Uint8): Uint8 {
    if (isType(rawUint8Component, 'Uint8')) {
      const num = (rawUint8Component >>> 3) << 3;

      if (isType(num, 'Uint8')) {
        return num;
      }
    }

    throw new CaveBoyError(
      `Uint8 component '${rawUint8Component}' could not be normalized.`
    );
  },
} as const;

const kindredGammaRamp: Uint8[] = [
  0x00, //  0 ->   0
  0x01, //  1 ->   1 (+1)
  0x03, //  2 ->   3 (+2)
  0x06, //  3 ->   6 (+3)
  0x0a, //  4 ->  10 (+4)
  0x0f, //  5 ->  15 (+5)
  0x15, //  6 ->  21 (+6)
  0x1c, //  7 ->  28 (+7)
  0x24, //  8 ->  36 (+8)
  0x2d, //  9 ->  45 (+9)
  0x37, // 10 ->  55 (+10)
  0x42, // 11 ->  66 (+11)
  0x4e, // 12 ->  78 (+12)
  0x5b, // 13 ->  91 (+13)
  0x69, // 14 -> 105 (+14)
  0x78, // 15 -> 120 (+15)
  0x88, // 16 -> 136 (+16)
  0x90, // 17 -> 144 (+8)
  0x98, // 18 -> 152 (+8)
  0xa0, // 19 -> 160 (+8)
  0xa8, // 20 -> 168 (+8)
  0xb0, // 21 -> 176 (+8)
  0xb8, // 22 -> 184 (+8)
  0xc0, // 23 -> 192 (+8)
  0xc8, // 24 -> 200 (+8)
  0xd0, // 25 -> 208 (+8)
  0xd8, // 26 -> 216 (+8)
  0xe0, // 27 -> 224 (+8)
  0xe8, // 28 -> 232 (+8)
  0xf0, // 29 -> 240 (+8)
  0xf8, // 30 -> 248 (+8)
  0xff, // 31 -> 255 (+7)
];

/**
 * A set of methods for converting between five-bit Super Famicom red/green/blue
 * color component values and eight-bit web color component values by applying
 * the CRT gamma ramp invented by Overload for the emulator Kindred. Five-bit
 * values between 9 and 16 are compressed so that eight-bit values at both
 * extremes (0 and 255) can exist.
 */
export const kindredGammaRampScaler: ColorComponentScaler = {
  convertFiveBitToEightBit(uint5Component: Uint5): Uint8 {
    if (isType(uint5Component, 'Uint5')) {
      const num = kindredGammaRamp[uint5Component];

      if (isType(num, 'Uint8')) {
        return num;
      }
    }

    throw new CaveBoyError(
      `Uint5 component '${uint5Component}' could not be converted to a Uint8.`
    );
  },
  convertEightBitToFiveBit(uint8Component: Uint8): Uint5 {
    if (isType(uint8Component, 'Uint8')) {
      // Just start with index 0 (value 0).
      let indexofClosestValueSoFar = 0;

      // uint8Component is positive, so |uint8Component - 0| is uint8Component.
      let smallestDifferenceSoFar = uint8Component;

      for (
        let i = 1;
        smallestDifferenceSoFar > 0 && i < kindredGammaRamp.length;
        ++i
      ) {
        let currentDifference = Math.abs(uint8Component - kindredGammaRamp[i]);

        if (currentDifference < smallestDifferenceSoFar) {
          indexofClosestValueSoFar = i;
          smallestDifferenceSoFar = currentDifference;
        }
      }

      if (isType(indexofClosestValueSoFar, 'Uint5')) {
        return indexofClosestValueSoFar;
      }
    }

    throw new CaveBoyError(
      `Uint8 component '${uint8Component}' could not be converted to a Uint5.`
    );
  },
  normalizeEightBit(rawUint8Component: Uint8): Uint8 {
    if (isType(rawUint8Component, 'Uint8')) {
      const num =
        kindredGammaRamp[this.convertEightBitToFiveBit(rawUint8Component)];

      if (isType(num, 'Uint8')) {
        return num;
      }
    }

    throw new CaveBoyError(
      `Uint8 component '${rawUint8Component}' could not be normalized.`
    );
  },
} as const;

/**
 * A list of all CaveBoy ColorComponentScalers by name.
 */
const colorComponentScalers = {
  factorOfEight: factorOfEightScaler,
  kindredGammaRamp: kindredGammaRampScaler,
};

/**
 * A name of one of the ColorComponentScalers implemented by CaveBoy.
 */
export type ColorComponentScalerName = keyof typeof colorComponentScalers;

/**
 * Return the ColorComponentScaler with the provided name, or the default
 * if no name is provided.
 * @param colorComponentScalerName - The name of the ColorComponentScaler
 * to retrieve.
 * @returns The ColorComponentScaler with the provided name, or the default
 * if no name is provided.
 */
export function getColorComponentScaler(
  colorComponentScalerName: ColorComponentScalerName | undefined = undefined
): ColorComponentScaler {
  colorComponentScalerName =
    colorComponentScalerName === undefined
      ? getCurrentCaveBoyConfiguration().colorComponentScalerName
      : colorComponentScalerName;

  return colorComponentScalers[colorComponentScalerName];
}
