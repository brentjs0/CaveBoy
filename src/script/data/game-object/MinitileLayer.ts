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
 * A list of 64 pixel values representing an 8 x 8 grid. Values are integers
 * between 0 and 15 that each represent the index of a color in a
 * MinitilePalette. This class roughly correlates to a single  array element
 * in the 'tiles' array of an EbGraphicTileset object in the CoilSnake source.
 */
export default class MinitileLayer {
  /**
   * A list of 64 4-bit numbers (0-15) representing the indexes of colors in a
   * palette.
   */
  public pixelValues: Uint4[];

  /**
   * Instantiate a MinitileLayer, optionally with its pixel values initialized
   * by parsing the provided CoilSnakeMinitileLayerString.
   * @param coilSnakeMinitileLayerString - A CoilSnakeMinitileLayerString
   * expression of the pixel values in the layer. Optional. All values default
   * to 0 if no argument is provided.
   */
  public constructor(
    coilSnakeMinitileLayerString?: CoilSnakeMinitileLayerString
  ) {
    if (coilSnakeMinitileLayerString === undefined) {
      this.pixelValues = times(64, () => 0);
    } else if (
      isType(coilSnakeMinitileLayerString, 'CoilSnakeMinitileLayerString')
    ) {
      this.pixelValues = [];
      for (let i = 0; i < coilSnakeMinitileLayerString.length; ++i) {
        let character = coilSnakeMinitileLayerString.charAt(i);
        let digitValue = parseInt(character, 16);
        if (isType(digitValue, 'Uint4')) {
          this.pixelValues.push(digitValue);
        } else {
          throw new CaveBoyError(
            `Character '${character}' is not a hexadecimal digit.`
          );
        }
      }
    } else {
      throw new CaveBoyError(
        'The arguments provided to MinitileLayer() were invalid.'
      );
    }
  }

  /**
   * Return an expression of the MinitileLayer as a 64-digit hexadecimal
   * CoilSnakeMinitilePaletteString.
   * @returns An expression of the MinitileLayer as a 64-digit hexadecimal
   * CoilSnakeMinitilePaletteString.
   */
  public toCoilSnakeMinitileLayerString(): CoilSnakeMinitileLayerString {
    return this.pixelValues.reduce<CoilSnakeMinitileLayerString>(
      (mtls, colorIndex) => (mtls += colorIndex.toString(16)),
      ''
    );
  }

  /**
   * Return an 8 x 8 CaveBoyImageData object with each pixel value from this
   * MinitileLayer translated to a color using the provided MinitilePalette.
   * @param minitilePalette - The MinitilePalette to reference for mapping color
   * values to Colors.
   * @param flipHorizontally - Whether to return the image with the positions of
   * its pixels flipped horizontally. Optional. Defaults to false.
   * @param flipVertically - Whether to return the image with the positions of
   * its pixels flipped vertically. Optional. Defaults to false.
   * @param index0IsTransparent - Whether an color value of 0 indicates an alpha
   * value of 0 (fully transparent). Optional. Defaults to true.
   * @param colorComponentScalerName - The name of the ColorComponentScaler to
   * use when converting from the five-bit component values of the Colors to the
   * eight-bit color component values of the image data. Optional. Defaults to
   * the user-configured scaler.
   * @returns An 8 x 8 CaveBoyImageData object with each pixel value from this
   * MinitileLayer translated to a color using the provided MinitilePalette.
   */
  public getImageData(
    minitilePalette: MinitilePalette,
    flipHorizontally: boolean = false,
    flipVertically: boolean = false,
    index0IsTransparent = true,
    colorComponentScalerName?: ColorComponentScalerName
  ): CaveBoyImageData {
    const cbImageData = new CaveBoyImageData(8, 8);

    for (let i = 0; i < this.pixelValues.length; ++i) {
      let colorIndex = this.pixelValues[i];
      if (index0IsTransparent && colorIndex === 0) {
        continue;
      }

      let [x, y] = getMinitileLayerPixelCoordinates(
        i,
        flipHorizontally,
        flipVertically
      );
      let color = minitilePalette.colors[colorIndex];

      cbImageData.setPixel(x, y, color, 255, colorComponentScalerName);
    }

    return cbImageData;
  }
}

/**
 * Return the zero-based x and y coordinates of a MinitileLayer pixel based on
 * its index in the list of color values.
 * @param colorValueIndex - The color value position for which to determine
 * coordinates.
 * @param flipHorizontally - Whether to return the coordinates mirrored
 * horizontally.
 * @param flipVertically - Whether to return the coordinates mirrored
 * vertically.
 * @returns The zero-based x and y coordinates of a MinitileLayer pixel based on
 * its index in the list of color values.
 */
export function getMinitileLayerPixelCoordinates(
  colorValueIndex: number,
  flipHorizontally: boolean = false,
  flipVertically: boolean = false
): [number, number] {
  let sourceX = colorValueIndex % 8;
  let sourceY = colorValueIndex >>> 3; // This is the same as Math.floor(i / 8).
  let targetX = flipHorizontally ? 8 - sourceX - 1 : sourceX;
  let targetY = flipVertically ? 8 - sourceY - 1 : sourceY;

  return [targetX, targetY];
}
