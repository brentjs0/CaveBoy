import {
  ColorComponentScaler,
  ColorComponentScalerNames,
  colorComponentScalers,
  getConfiguredColorComponentScaler,
} from '@/script/base/ColorComponentScaler';
import CaveBoyError from '@/script/base/error/CaveBoyError';
import {
  CoilSnakeColorString,
  isCoilSnakeColorString,
} from '@/script/data/coilsnake-literal/CoilSnakeColorString';
import { EightBitNumber, isEightBitNumber } from '@/script/data/EightBitNumber';
import {
  FiveBitNumber,
  isFiveBitNumber,
} from '@/script/data/game-literal/FiveBitNumber';
import {
  HexadecimalColorString,
  isHexadecimalColorString,
} from '@/script/data/HexadecimalColorString';

/**
 * A Super Famicom RGB color with 32 possible values for each of the red/green/blue components.
 */
export default class Color {
  /**
   * The red level of the Color, from 0 to 31.
   */
  public redComponent: FiveBitNumber = 0;

  /**
   * The green level of the Color, from 0 to 31.
   */
  public greenComponent: FiveBitNumber = 0;

  /**
   * The blue level of the Color, from 0 to 31.
   */
  public blueComponent: FiveBitNumber = 0;

  /**
   * Instantiates a Color with a value of 0 for the red, green, and blue components (pure black).
   */
  public constructor();

  /**
   * Instantiates a Color with provided red, green, and blue components.
   * @param redComponent - The red level of the Color.
   * @param greenComponent - The green level of the Color.
   * @param blueComponent - The blue level of the Color.
   */
  public constructor(
    redComponent: FiveBitNumber,
    greenComponent: FiveBitNumber,
    blueComponent: FiveBitNumber
  );

  /**
   * Instantiates a Color with its component values parsed from a HexadecimalColorString ('#xxxxxx'/'#xxx').
   * @param hexadecimalColorString - A HexadecimalColorString expression of the color to be parsed.
   * @param colorComponentScalerName - The name of the ColorComponentScaler to use when converting between the eight-bit color component values encoded in hexadecimalColorString and the five-bit values of the Color. Optional. Defaults to the user-configured scaler.
   */
  public constructor(
    hexadecimalColorString: HexadecimalColorString,
    colorComponentScalerName: ColorComponentScalerNames | undefined
  );

  /**
   * Instantiates a Color with its component values parsed from a three-digit base-32 CoilSnakeColorString ('xxx').
   * @param coilSnakeColorString A CoilSnakeColorString expression of the color to be parsed.
   */
  public constructor(coilSnakeColorString: CoilSnakeColorString);

  public constructor(
    param1:
      | FiveBitNumber
      | CoilSnakeColorString
      | HexadecimalColorString
      | undefined = undefined,
    param2: ColorComponentScalerNames | FiveBitNumber | undefined = undefined,
    param3: FiveBitNumber | undefined = undefined
  ) {
    if (
      isFiveBitNumber(param1) &&
      isFiveBitNumber(param2) &&
      isFiveBitNumber(param3)
    ) {
      this.constructFromComponentValues(param1, param2, param3);
    } else if (isHexadecimalColorString(param1) && !isFiveBitNumber(param2)) {
      this.constructFromHexadecimalColorString(param1, param2);
    } else if (isCoilSnakeColorString(param1) && param2 === undefined) {
      this.constructFromCoilSnakeColorString(param1);
    } else if (
      !(param1 === undefined && param2 === undefined && param3 === undefined)
    ) {
      throw new CaveBoyError('The arguments provided to Color() were invalid.');
    }
  }

  private constructFromComponentValues(
    redComponent: FiveBitNumber,
    greenComponent: FiveBitNumber,
    blueComponent: FiveBitNumber
  ): void {
    this.redComponent = redComponent;
    this.greenComponent = greenComponent;
    this.blueComponent = blueComponent;
  }

  private constructFromHexadecimalColorString(
    hexadecimalColorString: HexadecimalColorString,
    colorComponentScalerName: ColorComponentScalerNames | undefined = undefined
  ): void {
    let redNumber: number;
    let greenNumber: number;
    let blueNumber: number;

    if (hexadecimalColorString.length === 7) {
      redNumber = parseInt(hexadecimalColorString.substring(1, 3), 16);
      greenNumber = parseInt(hexadecimalColorString.substring(3, 5), 16);
      blueNumber = parseInt(hexadecimalColorString.substring(5, 7), 16);
    } else {
      redNumber = parseInt(
        `${hexadecimalColorString[1]}${hexadecimalColorString[1]}`,
        16
      );
      greenNumber = parseInt(
        `${hexadecimalColorString[2]}${hexadecimalColorString[2]}`,
        16
      );
      blueNumber = parseInt(
        `${hexadecimalColorString[3]}${hexadecimalColorString[3]}`,
        16
      );
    }

    if (
      isEightBitNumber(redNumber) &&
      isEightBitNumber(greenNumber) &&
      isEightBitNumber(blueNumber)
    ) {
      const colorComponentScaler: ColorComponentScaler =
        colorComponentScalerName === undefined
          ? getConfiguredColorComponentScaler()
          : colorComponentScalers[colorComponentScalerName];

      const redComponent: FiveBitNumber = colorComponentScaler.convertEightBitToFiveBit(
        redNumber
      );
      const greenComponent: FiveBitNumber = colorComponentScaler.convertEightBitToFiveBit(
        greenNumber
      );
      const blueComponent: FiveBitNumber = colorComponentScaler.convertEightBitToFiveBit(
        blueNumber
      );

      this.constructFromComponentValues(
        redComponent,
        greenComponent,
        blueComponent
      );
    } else {
      throw new CaveBoyError(
        `The provided HexadecimalColorString '${hexadecimalColorString}' could not be parsed into a Color.`
      );
    }
  }

  private constructFromCoilSnakeColorString(
    coilSnakeColorString: CoilSnakeColorString
  ): void {
    const redComponent: number = parseInt(coilSnakeColorString[0], 32);
    const greenComponent: number = parseInt(coilSnakeColorString[1], 32);
    const blueComponent: number = parseInt(coilSnakeColorString[2], 32);

    if (
      isFiveBitNumber(redComponent) &&
      isFiveBitNumber(greenComponent) &&
      isFiveBitNumber(blueComponent)
    ) {
      this.constructFromComponentValues(
        redComponent,
        greenComponent,
        blueComponent
      );
    } else {
      throw new CaveBoyError(
        `The provided CoilSnakeColorString '${coilSnakeColorString}' could not be parsed into a Color.`
      );
    }
  }

  /**
   * Return a HexadecimalColorString expression of the Color in the format '#xxxxxx'.
   * @param colorComponentScalerName - The name of the ColorComponentScaler to use when converting between the five-bit component values of the Color and the eight-bit color component values encoded in the returned HexadecimalColorString. Optional. Defaults to the user-configured scaler.
   * @returns A HexadecimalColorString expression of the Color in the format '#xxxxxx'.
   */
  public toHexadecimalColorString(
    colorComponentScalerName: ColorComponentScalerNames | undefined = undefined
  ): HexadecimalColorString {
    const colorComponentScaler: ColorComponentScaler =
      colorComponentScalerName === undefined
        ? getConfiguredColorComponentScaler()
        : colorComponentScalers[colorComponentScalerName];

    const redNumber: EightBitNumber = colorComponentScaler.convertFiveBitToEightBit(
      this.redComponent
    );
    const greenNumber: EightBitNumber = colorComponentScaler.convertFiveBitToEightBit(
      this.greenComponent
    );
    const blueNumber: EightBitNumber = colorComponentScaler.convertFiveBitToEightBit(
      this.blueComponent
    );

    const colorString = `#${redNumber
      .toString(16)
      .padStart(2, '0')}${greenNumber
      .toString(16)
      .padStart(2, '0')}${blueNumber.toString(16).padStart(2, '0')}`;

    if (isHexadecimalColorString(colorString)) {
      return colorString;
    }

    throw new CaveBoyError(
      `Color expression '${colorString}' is not a HexadecimalColorString.`
    );
  }

  /**
   * Return an expression of the Color as a three-digit base-32 CoilSnakeColorString in the format 'xxx'.
   * @returns An expression of the Color as a three-digit base-32 CoilSnakeColorString in the format 'xxx'.
   */
  public toCoilSnakeColorString(): CoilSnakeColorString {
    const colorString = `${this.redComponent.toString(
      32
    )}${this.greenComponent.toString(32)}${this.blueComponent.toString(
      32
    )}`.toLowerCase();

    if (isCoilSnakeColorString(colorString)) {
      return colorString;
    }

    throw new CaveBoyError(
      `Color expression '${colorString}' is not a CoilSnakeColorString.`
    );
  }
}
