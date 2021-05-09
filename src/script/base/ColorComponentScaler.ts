import CaveBoyConfiguration from '@/script/base/CaveBoyConfiguration';
import CaveBoyError from '@/script/base/error/CaveBoyError';
import { EightBitNumber, isEightBitNumber } from '@/script/data/EightBitNumber';
import {
  FiveBitNumber,
  isFiveBitNumber,
} from '@/script/data/game-literal/FiveBitNumber';

/**
 * A set of methods for converting between five-bit Super Famicom red/green/blue color component values and eight-bit web color component values.
 */
export interface ColorComponentScaler {
  /**
   * Convert a five-bit Super Famicom red/green/blue color component value to an eight-bit web color component value.
   * @param fiveBitNumber - A number representing a five-bit Super Famicom red/green/blue color component value.
   * @returns A number representing fiveBitNumber as an eight-bit web color component value.
   */
  convertFiveBitToEightBit(fiveBitNumber: FiveBitNumber): EightBitNumber;

  /**
   * Convert an eight-bit red/green/blue web color component value to a five-bit Super Famicom color component value.
   * @param eightBitNumber - A number representing an eight-bit red/green/blue web color component value.
   * @returns A number representing eightBitNumber as a five-bit Super Famicom color component value.
   */
  convertEightBitToFiveBit(eightBitNumber: EightBitNumber): FiveBitNumber;
}

/**
 * A set of methods for converting between five-bit Super Famicom red/green/blue color component values and eight-bit web color component values
 * by multiplying or dividing by eight. The maximum eight-bit value is 248 out of 255. This is the method used by JHack/EB Project Editor.
 */
export const factorOfEightScaler: ColorComponentScaler = {
  convertFiveBitToEightBit(fiveBitNumber: FiveBitNumber): EightBitNumber {
    const num = fiveBitNumber * 8;

    if (isEightBitNumber(num)) {
      return num;
    }

    throw new CaveBoyError(
      `FiveBitNumber '${fiveBitNumber}' could not be converted to an EightBitNumber.`
    );
  },
  convertEightBitToFiveBit(eightBitNumber: EightBitNumber): FiveBitNumber {
    const num = Math.floor(eightBitNumber / 8);

    if (isFiveBitNumber(num)) {
      return num;
    }

    throw new CaveBoyError(
      `EightBitNumber '${eightBitNumber}' could not be converted to a FiveBitNumber.`
    );
  },
} as const;

const kindredGammaRamp: EightBitNumber[] = [
  0x00,
  0x01,
  0x03,
  0x06,
  0x0a,
  0x0f,
  0x15,
  0x1c,
  0x24,
  0x2d,
  0x37,
  0x42,
  0x4e,
  0x5b,
  0x69,
  0x78,
  0x88,
  0x90,
  0x98,
  0xa0,
  0xa8,
  0xb0,
  0xb8,
  0xc0,
  0xc8,
  0xd0,
  0xd8,
  0xe0,
  0xe8,
  0xf0,
  0xf8,
  0xff,
];

/**
 * A set of methods for converting between five-bit Super Famicom red/green/blue color component values and eight-bit web color component values
 * by applying the CRT gamma ramp invented by Overload for the emulator Kindred. Lower (darker) values are compressed, so eight-bit values from
 * 0 to 255 can be represented.
 */
export const kindredGammaRampScaler: ColorComponentScaler = {
  convertFiveBitToEightBit(fiveBitNumber: FiveBitNumber): EightBitNumber {
    const num = kindredGammaRamp[fiveBitNumber];

    if (isEightBitNumber(num)) {
      return num;
    }

    throw new CaveBoyError(
      `FiveBitNumber '${fiveBitNumber}' could not be converted to an EightBitNumber.`
    );
  },
  convertEightBitToFiveBit(eightBitNumber: EightBitNumber): FiveBitNumber {
    const num = kindredGammaRamp.findIndex((ebn) => ebn >= eightBitNumber);

    if (num !== undefined && isFiveBitNumber(num)) {
      return num;
    }

    throw new CaveBoyError(
      `EightBitNumber '${eightBitNumber}' could not be converted to a FiveBitNumber.`
    );
  },
} as const;

/**
 * A list of all CaveBoy ColorComponentScaler names.
 */
export enum ColorComponentScalerNames {
  FactorOfEight = 'factorOfEight',
  KindredGammaRamp = 'kindredGammaRamp',
}

/**
 * A list of all CaveBoy ColorComponentScalers by name.
 */
export const colorComponentScalers: {
  [name in ColorComponentScalerNames]: ColorComponentScaler;
} = {
  factorOfEight: factorOfEightScaler,
  kindredGammaRamp: kindredGammaRampScaler,
};

/**
 * Return the currently configured ColorComponentScaler.
 * @returns The currently configured ColorComponentScaler.
 */
export function getConfiguredColorComponentScaler(): ColorComponentScaler {
  const configuredScalerName: ColorComponentScalerNames = ((window as any)
    .caveBoyConfiguration as CaveBoyConfiguration).colorComponentScalerName;

  return colorComponentScalers[configuredScalerName];
}
