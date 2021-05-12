import CaveBoyImageData from '@/script/base/CaveBoyImageData';
import { ColorComponentScalerNames } from '@/script/base/ColorComponentScaler';
import CaveBoyError from '@/script/base/error/CaveBoyError';
import { segmentString } from '@/script/base/helpers';
import {
  CoilSnakeMinitilePaletteString,
  isCoilSnakeMinitilePaletteString,
} from '@/script/data/coilsnake-literal/CoilSnakeMinitilePaletteString';
import Color from '@/script/data/game-object/Color';

/**
 * A list of sixteen Colors that be used to map MinitileLayer indexes to
 * the colors they will represent on-screen. This class roughly correlates
 * to a single array element in the 'subpalettes' array of an EbPalette object
 * in the CoilSnake source.
 */
export default class MinitilePalette {
  /**
   * A sixteen-element array of the Colors included in the palette, in order.
   */
  public colors: Color[];

  /**
   * Instantiate a MinitilePalette, optionally with its Color values initialized
   * by parsing the provided CoilSnakeMinitilePaletteString.
   * @param coilSnakeMinitilePaletteString - A CoilSnakeMinitilePaletteString
   * expression of the colors in the palette, in order. Optional. All Colors
   * default to black if no value is provided.
   */
  public constructor(
    coilSnakeMinitilePaletteString:
      | CoilSnakeMinitilePaletteString
      | undefined = undefined
  ) {
    this.colors = [];

    if (isCoilSnakeMinitilePaletteString(coilSnakeMinitilePaletteString)) {
      for (let coilSnakeColorString of segmentString(
        coilSnakeMinitilePaletteString,
        3
      )) {
        this.colors.push(new Color(coilSnakeColorString));
      }
    } else if (coilSnakeMinitilePaletteString === undefined) {
      for (let i = 0; i < 16; ++i) {
        this.colors.push(new Color());
      }
    } else {
      throw new CaveBoyError(
        `An invalid combination of arguments was provided to the MinitilePalette constructor: ${arguments}.`
      );
    }
  }

  /**
   * Return an 8 x 2 CaveBoyImageData object with a single pixel representing
   * each Color in this MinitilePalette. Colors are placed from left to right
   * and wrap from top to bottom.
   * @param colorComponentScalerName - The name of the ColorComponentScaler to
   * use when converting from the five-bit component values of the Colors to the
   * eight-bit color component values of the pixel data. Optional. Defaults to
   * the user-configured scaler.
   * @returns An 8 x 2 CaveBoyImageData object with a single pixel representing
   * each Color in this MinitilePalette.
   */
  public getPreviewImageData(
    colorComponentScalerName?: ColorComponentScalerNames
  ): CaveBoyImageData {
    const cbImageData = new CaveBoyImageData(8, 2);

    for (let i = 0; i < this.colors.length; ++i) {
      let y = i >>> 3; // Equivalent to Math.floor(i / 8)
      let x = i % 8;

      cbImageData.setPixel(x, y, this.colors[i], 255, colorComponentScalerName);
    }

    return cbImageData;
  }

  /**
   * Return an expression of the MinitilePalette as a 48-digit base-32
   * CoilSnakeMinitilePaletteString.
   * @returns An expression of the MinitilePalette as a 48-digit base-32
   * CoilSnakeMinitilePaletteString.
   */
  public toCoilSnakeMinitilePaletteString(): CoilSnakeMinitilePaletteString {
    // Concatenate all of the Color.toCoilSnakeColorString() values, in order.
    return this.colors.reduce<CoilSnakeMinitilePaletteString>(
      (mtps, color) => (mtps += color.toCoilSnakeColorString()),
      ''
    );
  }
}
