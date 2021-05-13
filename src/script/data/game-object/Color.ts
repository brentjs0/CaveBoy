import {
  ColorComponentScalerName,
  getColorComponentScaler,
} from '@/script/base/ColorComponentScaler';
import CaveBoyError from '@/script/base/error/CaveBoyError';
import {
  CoilSnakeColorString,
  HexadecimalColorString,
  isType,
  Uint5,
  Uint8,
} from '@/script/base/primitive-types';

/**
 * A Super Famicom RGB color with 32 possible values for each
 * of the red/green/blue components. This class roughly correlates
 * to the EbColor type in the CoilSnake source, except that its red,
 * green, and blue components are stored as five-bit numbers rather
 * than as eight-bit numbers.
 */
export default class Color {
  /**
   * The red level of the Color, from 0 to 31.
   */
  public redComponent: Uint5 = 0;

  /**
   * The green level of the Color, from 0 to 31.
   */
  public greenComponent: Uint5 = 0;

  /**
   * The blue level of the Color, from 0 to 31.
   */
  public blueComponent: Uint5 = 0;

  /**
   * Instantiate a Color with a value of 0 for the red, green,
   * and blue components (pure black).
   */
  public constructor();

  /**
   * Instantiate a Color with provided red, green, and blue
   * components.
   * @param redComponent - The red level of the Color.
   * @param greenComponent - The green level of the Color.
   * @param blueComponent - The blue level of the Color.
   */
  public constructor(
    redComponent: Uint5,
    greenComponent: Uint5,
    blueComponent: Uint5
  );

  /**
   * Instantiate a Color with its component values parsed from a
   * HexadecimalColorString ('#xxxxxx'/'#xxx').
   * @param hexadecimalColorString - A HexadecimalColorString expression
   * of the color to be parsed.
   * @param colorComponentScalerName - The name of the
   * ColorComponentScaler to use when converting between the eight-bit
   * color component values encoded in hexadecimalColorString and the
   * five-bit values of the Color. Optional. Defaults to the
   * user-configured scaler.
   */
  public constructor(
    hexadecimalColorString: HexadecimalColorString,
    colorComponentScalerName: ColorComponentScalerName | undefined
  );

  /**
   * Instantiate a Color with its component values parsed from a
   * three-digit base-32 CoilSnakeColorString ('xxx').
   * @param coilSnakeColorString A CoilSnakeColorString expression
   * of the color to be parsed.
   */
  public constructor(coilSnakeColorString: CoilSnakeColorString);

  public constructor(
    param1:
      | Uint5
      | CoilSnakeColorString
      | HexadecimalColorString
      | undefined = undefined,
    param2: ColorComponentScalerName | Uint5 | undefined = undefined,
    param3: Uint5 | undefined = undefined
  ) {
    if (
      isType(param1, 'Uint5') &&
      isType(param2, 'Uint5') &&
      isType(param3, 'Uint5')
    ) {
      this.constructFromComponentValues(param1, param2, param3);
    } else if (
      isType(param1, 'HexadecimalColorString') &&
      !isType(param2, 'Uint5')
    ) {
      this.constructFromHexadecimalColorString(param1, param2);
    } else if (isType(param1, 'CoilSnakeColorString') && param2 === undefined) {
      this.constructFromCoilSnakeColorString(param1);
    } else if (
      !(param1 === undefined && param2 === undefined && param3 === undefined)
    ) {
      throw new CaveBoyError('The arguments provided to Color() were invalid.');
    }
  }

  private constructFromComponentValues(
    redComponent: Uint5,
    greenComponent: Uint5,
    blueComponent: Uint5
  ): void {
    this.redComponent = redComponent;
    this.greenComponent = greenComponent;
    this.blueComponent = blueComponent;
  }

  private constructFromHexadecimalColorString(
    hexadecimalColorString: HexadecimalColorString,
    colorComponentScalerName: ColorComponentScalerName | undefined = undefined
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
      isType(redNumber, 'Uint8') &&
      isType(greenNumber, 'Uint8') &&
      isType(blueNumber, 'Uint8')
    ) {
      const colorComponentScaler = getColorComponentScaler(
        colorComponentScalerName
      );
      const redComponent: Uint5 = colorComponentScaler.convertEightBitToFiveBit(
        redNumber
      );
      const greenComponent: Uint5 = colorComponentScaler.convertEightBitToFiveBit(
        greenNumber
      );
      const blueComponent: Uint5 = colorComponentScaler.convertEightBitToFiveBit(
        blueNumber
      );

      this.constructFromComponentValues(
        redComponent,
        greenComponent,
        blueComponent
      );
    } else {
      throw new CaveBoyError(
        `An invalid combination of arguments was provided to the Color constructor: ${arguments}.`
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
      isType(redComponent, 'Uint5') &&
      isType(greenComponent, 'Uint5') &&
      isType(blueComponent, 'Uint5')
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
   * Return a HexadecimalColorString expression of the Color in
   * the format '#xxxxxx'.
   * @param colorComponentScalerName - The name of the ColorComponentScaler
   * to use when converting
   * between the five-bit component values of the Color and the eight-bit
   * color component values encoded in the returned HexadecimalColorString.
   * Optional. Defaults to the user-configured scaler.
   * @returns A HexadecimalColorString expression of the Color in the format
   * '#xxxxxx'.
   */
  public toHexadecimalColorString(
    colorComponentScalerName: ColorComponentScalerName | undefined = undefined
  ): HexadecimalColorString {
    const colorComponentScaler = getColorComponentScaler(
      colorComponentScalerName
    );

    const redNumber: Uint8 = colorComponentScaler.convertFiveBitToEightBit(
      this.redComponent
    );
    const greenNumber: Uint8 = colorComponentScaler.convertFiveBitToEightBit(
      this.greenComponent
    );
    const blueNumber: Uint8 = colorComponentScaler.convertFiveBitToEightBit(
      this.blueComponent
    );

    const colorString = `#${redNumber
      .toString(16)
      .padStart(2, '0')}${greenNumber
      .toString(16)
      .padStart(2, '0')}${blueNumber.toString(16).padStart(2, '0')}`;

    if (isType(colorString, 'HexadecimalColorString')) {
      return colorString;
    }

    throw new CaveBoyError(
      `Color expression '${colorString}' is not a HexadecimalColorString.`
    );
  }

  /**
   * Return an expression of the Color as a three-digit base-32
   * CoilSnakeColorString in the format 'xxx'.
   * @returns An expression of the Color as a three-digit base-32
   * CoilSnakeColorString in the format 'xxx'.
   */
  public toCoilSnakeColorString(): CoilSnakeColorString {
    const colorString = `${this.redComponent.toString(
      32
    )}${this.greenComponent.toString(32)}${this.blueComponent.toString(
      32
    )}`.toLowerCase();

    if (isType(colorString, 'CoilSnakeColorString')) {
      return colorString;
    }

    throw new CaveBoyError(
      `Color expression '${colorString}' is not a CoilSnakeColorString.`
    );
  }

  /**
   * Return a four-element Uint8ClampedArray containing the
   * color's 8-bit R/G/B/A values.
   * @param alpha - The value to use for the alpha. Optional.
   * Defaults to 255.
   * @param colorComponentScalerName - The name of the
   * ColorComponentScaler to use when converting between the
   * five-bit component values of the Color and the eight-bit
   * color component values in the array. Optional. Defaults
   * to the user-configured scaler.
   * @returns A four-element Uint8ClampedArray containing the
   * color's 8-bit R/G/B/A values.
   */
  public toUint8ClampedArray(
    alpha: Uint8 = 255,
    colorComponentScalerName?: ColorComponentScalerName
  ): Uint8ClampedArray {
    if (!isType(alpha, 'Uint8')) {
      throw new CaveBoyError(`The value of alpha (${alpha}) is not an Uint8.`);
    }

    const colorComponentScaler = getColorComponentScaler(
      colorComponentScalerName
    );

    return new Uint8ClampedArray([
      colorComponentScaler.convertFiveBitToEightBit(this.redComponent),
      colorComponentScaler.convertFiveBitToEightBit(this.greenComponent),
      colorComponentScaler.convertFiveBitToEightBit(this.blueComponent),
      alpha,
    ]);
  }
}
