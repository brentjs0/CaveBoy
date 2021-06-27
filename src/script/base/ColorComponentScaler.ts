import { getCurrentCaveBoyConfiguration } from '@/script/base/CaveBoyConfiguration';
import CaveBoyError from '@/script/base/error/CaveBoyError';
import { Uint5, Uint8, isType } from '@/script/base/primitive-types';

/**
 * A set of lookup arrays for converting between five-bit Super Famicom
 * red/green/blue color component values and eight-bit color component values.
 */
export interface ColorComponentScaler {
  /**
   * An array of eight-bit red/green/blue color component values by the five-bit
   * Super Famicom color component values they represent.
   */
  eightBitValuesByFiveBitValue: Uint8[];

  /**
   * An array of five-bit Super Famicom red/green/blue color component values
   * by the eight-bit color component values they represent.
   */
  fiveBitValuesByEightBitValue: Uint5[];
}

/**
 * A set of lookup arrays for converting between five-bit Super Famicom
 * red/green/blue color component values and eight-bit color component values
 * by multiplying or dividing by eight. The maximum eight-bit value is 248
 * out of 255. This is the method used by JHack/EB Project Editor.
 */
export const factorOfEightScaler: ColorComponentScaler = {
  // prettier-ignore
  fiveBitValuesByEightBitValue: [
    0, 0, 0, 0, 0, 0, 0, 0, 
    1, 1, 1, 1, 1, 1, 1, 1, 
    2, 2, 2, 2, 2, 2, 2, 2, 
    3, 3, 3, 3, 3, 3, 3, 3, 
    4, 4, 4, 4, 4, 4, 4, 4, 
    5, 5, 5, 5, 5, 5, 5, 5, 
    6, 6, 6, 6, 6, 6, 6, 6, 
    7, 7, 7, 7, 7, 7, 7, 7, 
    8, 8, 8, 8, 8, 8, 8, 8, 
    9, 9, 9, 9, 9, 9, 9, 9, 
    10, 10, 10, 10, 10, 10, 10, 10, 
    11, 11, 11, 11, 11, 11, 11, 11, 
    12, 12, 12, 12, 12, 12, 12, 12, 
    13, 13, 13, 13, 13, 13, 13, 13, 
    14, 14, 14, 14, 14, 14, 14, 14, 
    15, 15, 15, 15, 15, 15, 15, 15, 
    16, 16, 16, 16, 16, 16, 16, 16, 
    17, 17, 17, 17, 17, 17, 17, 17, 
    18, 18, 18, 18, 18, 18, 18, 18, 
    19, 19, 19, 19, 19, 19, 19, 19, 
    20, 20, 20, 20, 20, 20, 20, 20, 
    21, 21, 21, 21, 21, 21, 21, 21, 
    22, 22, 22, 22, 22, 22, 22, 22, 
    23, 23, 23, 23, 23, 23, 23, 23, 
    24, 24, 24, 24, 24, 24, 24, 24, 
    25, 25, 25, 25, 25, 25, 25, 25, 
    26, 26, 26, 26, 26, 26, 26, 26, 
    27, 27, 27, 27, 27, 27, 27, 27, 
    28, 28, 28, 28, 28, 28, 28, 28, 
    29, 29, 29, 29, 29, 29, 29, 29, 
    30, 30, 30, 30, 30, 30, 30, 30, 
    31, 31, 31, 31, 31, 31, 31, 31, 
  ],
  // prettier-ignore
  eightBitValuesByFiveBitValue: [
    0, 
    8, 
    16, 
    24, 
    32, 
    40, 
    48, 
    56, 
    64, 
    72, 
    80, 
    88, 
    96, 
    104, 
    112, 
    120, 
    128, 
    136, 
    144, 
    152, 
    160, 
    168, 
    176, 
    184, 
    192, 
    200, 
    208, 
    216, 
    224, 
    232, 
    240, 
    248, 
  ]
};

/**
 * A set of lookup arrays for converting between five-bit Super Famicom
 * red/green/blue color component values and eight-bit web color component
 * values by applying the CRT gamma ramp invented by Overload for the
 * emulator Kindred. Five-bit values between 9 and 16 are compressed so
 * that eight-bit values at both extremes (0 and 255) can exist.
 */
export const kindredGammaRampScaler: ColorComponentScaler = {
  // prettier-ignore
  fiveBitValuesByEightBitValue: [
    0, 
    1, 1, 
    2, 2, 
    3, 3, 3, 3, 
    4, 4, 4, 4, 
    5, 5, 5, 5, 5, 5, 
    6, 6, 6, 6, 6, 6, 
    7, 7, 7, 7, 7, 7, 7, 7, 
    8, 8, 8, 8, 8, 8, 8, 8, 
    9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 
    10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 
    11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 
    12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 
    13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 
    14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 
    15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 
    16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 
    17, 17, 17, 17, 17, 17, 17, 17, 
    18, 18, 18, 18, 18, 18, 18, 18, 
    19, 19, 19, 19, 19, 19, 19, 19, 
    20, 20, 20, 20, 20, 20, 20, 20, 
    21, 21, 21, 21, 21, 21, 21, 21, 
    22, 22, 22, 22, 22, 22, 22, 22, 
    23, 23, 23, 23, 23, 23, 23, 23, 
    24, 24, 24, 24, 24, 24, 24, 24, 
    25, 25, 25, 25, 25, 25, 25, 25, 
    26, 26, 26, 26, 26, 26, 26, 26, 
    27, 27, 27, 27, 27, 27, 27, 27, 
    28, 28, 28, 28, 28, 28, 28, 28, 
    29, 29, 29, 29, 29, 29, 29, 29, 
    30, 30, 30, 30, 30, 30, 30, 
    31, 31, 31, 31, 
  ],
  // prettier-ignore
  eightBitValuesByFiveBitValue: [
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
  ]
};

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
