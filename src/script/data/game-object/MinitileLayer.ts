import CaveBoyImageData from '@/script/base/CaveBoyImageData';
import { ColorComponentScalerName } from '@/script/base/ColorComponentScaler';
import CaveBoyError from '@/script/base/error/CaveBoyError';
import {
  CSMinitileLayerString,
  isType,
  Uint4,
} from '@/script/base/primitive-types';
import Subpalette from '@/script/data/game-object/Subpalette';
import times from 'lodash/times';

/**
 * A list of 64 color numbers representing an 8 x 8 image. Values are integers
 * between 0 and 15 that each represent the index of a color in a
 * Subpalette. This class roughly correlates to a single array element
 * in the 'tiles' array of an EbGraphicTileset object in the CoilSnake source.
 */
export default class MinitileLayer {
  /**
   * A list of 64 4-bit numbers (0-15) representing the indexes of colors in a
   * Subpalette.
   */
  public colorNumbers: Uint4[];

  /**
   * Instantiate a MinitileLayer, optionally with its color numbers initialized
   * by parsing the provided CSMinitileLayerString.
   * @param csMinitileLayerString - A CSMinitileLayerString
   * expression of the color numbers in the layer. Optional. All values default
   * to 0 if no argument is provided.
   */
  public constructor(csMinitileLayerString?: CSMinitileLayerString) {
    if (csMinitileLayerString === undefined) {
      this.colorNumbers = times(64, () => 0);
    } else if (isType(csMinitileLayerString, 'CSMinitileLayerString')) {
      this.colorNumbers = [];
      for (let i = 0; i < csMinitileLayerString.length; ++i) {
        let character = csMinitileLayerString.charAt(i);
        let digitValue = parseInt(character, 16);
        if (isType(digitValue, 'Uint4')) {
          this.colorNumbers.push(digitValue);
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
   * CSSubpaletteString.
   * @returns An expression of the MinitileLayer as a 64-digit hexadecimal
   * CSSubpaletteString.
   */
  public toCSMinitileLayerString(): CSMinitileLayerString {
    return this.colorNumbers.reduce<CSMinitileLayerString>(
      (mtls, colorIndex) => (mtls += colorIndex.toString(16)),
      ''
    );
  }

  /**
   * Return an 8 x 8 CaveBoyImageData object with each color number from this
   * MinitileLayer translated to a color using the provided Subpalette.
   * @param subpalette - The Subpalette to reference for mapping color
   * numbers to Colors.
   * @param flipHorizontally - Whether to return the image with the positions of
   * its pixels flipped horizontally. Optional. Defaults to false.
   * @param flipVertically - Whether to return the image with the positions of
   * its pixels flipped vertically. Optional. Defaults to false.
   * @param index0IsTransparent - Whether an color number of 0 indicates an alpha
   * value of 0 (fully transparent). Optional. Defaults to true.
   * @param colorComponentScalerName - The name of the ColorComponentScaler to
   * use when converting from the five-bit component values of the Colors to the
   * eight-bit color component values of the image data. Optional. Defaults to
   * the user-configured scaler.
   * @returns An 8 x 8 CaveBoyImageData object with each color number from this
   * MinitileLayer translated to a color using the provided Subpalette.
   */
  public getImageData(
    subpalette: Subpalette,
    flipHorizontally: boolean = false,
    flipVertically: boolean = false,
    index0IsTransparent = true,
    colorComponentScalerName?: ColorComponentScalerName
  ): CaveBoyImageData {
    const cbImageData = new CaveBoyImageData(8, 8);

    for (let i = 0; i < this.colorNumbers.length; ++i) {
      let colorIndex = this.colorNumbers[i];
      if (index0IsTransparent && colorIndex === 0) {
        continue;
      }

      let [x, y] = getMinitileLayerPixelCoordinates(
        i,
        flipHorizontally,
        flipVertically
      );
      let color = subpalette.colors[colorIndex];

      cbImageData.setPixel(x, y, color, 255, colorComponentScalerName);
    }

    return cbImageData;
  }
}

/**
 * Return the zero-based x and y coordinates of the MinitileLayer pixel represented
 * by the provided index in the colorNumbers array.
 * @param colorNumberIndex - The index of the color number for which to determine
 * coordinates.
 * @param flipHorizontally - Whether to return the coordinates mirrored
 * horizontally.
 * @param flipVertically - Whether to return the coordinates mirrored
 * vertically.
 * @returns The zero-based x and y coordinates of the MinitileLayer pixel given
 * the provided flip state.
 */
export function getMinitileLayerPixelCoordinates(
  colorNumberIndex: number,
  flipHorizontally: boolean = false,
  flipVertically: boolean = false
): [number, number] {
  let sourceX = colorNumberIndex % 8;
  let sourceY = colorNumberIndex >>> 3; // This is the same as Math.floor(i / 8).
  let targetX = flipHorizontally ? 8 - sourceX - 1 : sourceX;
  let targetY = flipVertically ? 8 - sourceY - 1 : sourceY;

  return [targetX, targetY];
}
