import CaveBoyImageData from '@/script/base/CaveBoyImageData';
import { ColorComponentScalerName } from '@/script/base/ColorComponentScaler';
import CaveBoyError from '@/script/base/error/CaveBoyError';
import { segmentString } from '@/script/base/helpers';
import { CSSubpaletteString, isType } from '@/script/base/primitive-types';
import Color from '@/script/data/game-object/Color';

/**
 * A list of sixteen Colors that be used to map MinitileLayer indexes to
 * the colors they will represent on-screen. This class roughly correlates
 * to a single array element in the 'subpalettes' array of an EbMapPalette
 * object in the CoilSnake source.
 */
export default class Subpalette {
  /**
   * A sixteen-element array of the Colors included in the palette, in order.
   */
  public colors: Color[];

  /**
   * Instantiate a Subpalette, optionally with its Color values initialized
   * by parsing the provided CSSubpaletteString.
   * @param csSubpaletteString - A CSSubpaletteString
   * expression of the colors in the palette, in order. Optional. Default Colors
   * are created if no value is provided.
   */
  public constructor(csSubpaletteString?: CSSubpaletteString) {
    this.colors = [];

    if (isType(csSubpaletteString, 'CSSubpaletteString')) {
      for (let csColorString of segmentString(csSubpaletteString, 3)) {
        this.colors.push(new Color(csColorString));
      }
    } else if (csSubpaletteString === undefined) {
      // This mimics the in-game pattern of "empty" palettes being all black
      // except for the last color, which is 6-4-4.
      for (let i = 0; i < 15; ++i) {
        this.colors.push(new Color());
      }
      this.colors.push(new Color(6, 4, 4));
    } else {
      throw new CaveBoyError(
        `An invalid combination of arguments was provided to the Subpalette constructor: ${arguments}.`
      );
    }
  }

  /**
   * Return an 8 x 2 CaveBoyImageData object with a single pixel representing
   * each Color in this Subpalette. Colors are placed from left to right
   * and wrap from top to bottom.
   * @param colorComponentScalerName - The name of the ColorComponentScaler to
   * use when converting from the five-bit component values of the Colors to the
   * eight-bit color component values of the pixel data. Optional. Defaults to
   * the user-configured scaler.
   * @returns An 8 x 2 CaveBoyImageData object with a single pixel representing
   * each Color in this Subpalette.
   */
  public getPreviewImageData(
    colorComponentScalerName?: ColorComponentScalerName
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
   * Return an expression of the Subpalette as a 48-digit base-32
   * CSSubpaletteString.
   * @returns An expression of the Subpalette as a 48-digit base-32
   * CSSubpaletteString.
   */
  public toCSSubpaletteString(): CSSubpaletteString {
    // Concatenate all of the Color.toCSColorString() values, in order.
    return this.colors.reduce<CSSubpaletteString>(
      (mtps, color) => (mtps += color.toCSColorString()),
      ''
    );
  }
}
