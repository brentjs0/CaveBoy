import CaveBoyImageData from '@/script/base/CaveBoyImageData';
import { ColorComponentScalerName } from '@/script/base/ColorComponentScaler';
import CaveBoyError from '@/script/base/error/CaveBoyError';
import {
  CoilSnakeMinitileLayerString,
  isType,
  Uint4,
} from '@/script/base/primitive-types';
import MinitilePalette from '@/script/data/game-object/MinitilePalette';
import times from 'lodash/times';

/**
 * A list of 64 color indexes representing an 8 x 8 grid. Indexes are integers
 * between 0 and 15. The actual color represented each index is dependent on
 * the provided MinitilePalette. This class roughly correlates to a single
 * array element in the 'tiles' array of an EbGraphicTileset object in the
 * CoilSnake source.
 */
export default class MinitileLayer {
  /**
   * A list of 4-bit numbers (0-15) representing color values in a palette.
   */
  public colorIndexes: Uint4[];

  /**
   * Instantiate a MinitileLayer, optionally with its color indexes initialized
   * by parsing the provided CoilSnakeMinitileLayerString.
   * @param coilSnakeMinitileLayerString - A CoilSnakeMinitileLayerString
   * expression of the color indexes in the layer. Optional. All indexes default
   * to 0 if no value is provided.
   */
  public constructor(
    coilSnakeMinitileLayerString?: CoilSnakeMinitileLayerString
  ) {
    if (coilSnakeMinitileLayerString === undefined) {
      this.colorIndexes = times(64, () => 0);
    } else {
      this.colorIndexes = [];
      for (let i = 0; i < coilSnakeMinitileLayerString.length; ++i) {
        let character = coilSnakeMinitileLayerString.charAt(i);
        let digitValue = parseInt(character, 16);
        if (isType(digitValue, 'Uint4')) {
          this.colorIndexes.push(digitValue);
        } else {
          throw new CaveBoyError(
            `Character '${character}' is not a hexadecimal digit.`
          );
        }
      }
    }
  }

  /**
   * Return an expression of the MinitileLayer as a 64-digit hexadecimal
   * CoilSnakeMinitilePaletteString.
   * @returns An expression of the MinitileLayer as a 64-digit hexadecimal
   * CoilSnakeMinitilePaletteString.
   */
  public toCoilSnakeMinitileLayerString(): CoilSnakeMinitileLayerString {
    return this.colorIndexes.reduce<CoilSnakeMinitileLayerString>(
      (mtls, colorIndex) => (mtls += colorIndex.toString(16)),
      ''
    );
  }

  /**
   * Return an 8 x 8 CaveBoyImageData object with each index from this
   * MinitileLayer as a single pixel. The colors represented by each index are
   * based on the provided MinitilePalette. Pixels are placed from left to right
   * and wrap from top to bottom.
   * @param minitilePalette - The MinitilePalette to reference for mapping color
   * indexs to colors.
   * @param index0IsTransparent - Whether an index of 0 indicates an alpha value
   * of 0 (fully transparent). Optional. Defaults to true.
   * @param colorComponentScalerName - The name of the ColorComponentScaler to
   * use when converting from the five-bit component values of the Colors to the
   * eight-bit color component values of the pixel data. Optional. Defaults to
   * the user-configured scaler.
   * @returns An 8 x 8 CaveBoyImageData object with each index from this
   * MinitileLayer as a single pixel.
   */
  public getImageData(
    minitilePalette: MinitilePalette,
    index0IsTransparent = true,
    colorComponentScalerName?: ColorComponentScalerName
  ): CaveBoyImageData {
    const cbImageData = new CaveBoyImageData(8, 8);

    for (let i = 0; i < this.colorIndexes.length; ++i) {
      let colorIndex = this.colorIndexes[i];
      if (index0IsTransparent && colorIndex === 0) {
        continue;
      }

      let color = minitilePalette.colors[colorIndex];
      let x = i % 8;
      let y = i >>> 3; // This is the same as Math.floor(i / 8).
      cbImageData.setPixel(x, y, color, 255, colorComponentScalerName);
    }

    return cbImageData;
  }
}
