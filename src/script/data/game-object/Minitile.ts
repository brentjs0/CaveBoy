import CaveBoyImageData from '@/script/base/CaveBoyImageData';
import { ColorComponentScalerName } from '@/script/base/ColorComponentScaler';
import CaveBoyError from '@/script/base/error/CaveBoyError';
import { CSMinitileString, isType } from '@/script/base/primitive-types';
import MinitileLayer, {
  getMinitileLayerPixelCoordinates,
} from '@/script/data/game-object/MinitileLayer';
import Subpalette from '@/script/data/game-object/Subpalette';

/**
 * Two sets of 64 color numbers representing an 8 x 8 grid, with one serving as
 * a background layer and another serving as a foreground layer. This class roughly
 * correlates to a set of two of the array elements in the 'tiles' array of an
 * EbGraphicTileset object in the CoilSnake source, with the background having an
 * index of n and the foreground having an index of n + 512.
 */
export default class Minitile {
  /**
   * The background MinitileLayer for the Minitile.
   */
  public backgroundLayer: MinitileLayer;

  /**
   * The foreground MinitileLayer for the Minitile.
   */
  public foregroundLayer: MinitileLayer;

  /**
   * Instantiate a Minitile, optionally with its layers initialized by
   * parsing the provided CSMinitileString.
   * @param csMinitileString - A CSMinitileString expression of
   * the color numbers in both layers. Optional. All values default to 0 if
   * no argument is provided.
   */
  public constructor(csMinitileString?: CSMinitileString) {
    if (csMinitileString === undefined) {
      this.backgroundLayer = new MinitileLayer();
      this.foregroundLayer = new MinitileLayer();
    } else if (isType(csMinitileString, 'CSMinitileString')) {
      const minitileLayerStrings = csMinitileString.split(/(?:\n|\r\n|\r)/);
      this.backgroundLayer = new MinitileLayer(minitileLayerStrings[0]);
      this.foregroundLayer = new MinitileLayer(minitileLayerStrings[1]);
    } else {
      throw new CaveBoyError(
        'The arguments provided to Minitile() were invalid.'
      );
    }
  }

  /**
   * Return an expression of the MinitileLayer as a CSMinitileString.
   * @returns An expression of the MinitileLayer as a CSMinitileString.
   */
  public toCSMinitileString(): CSMinitileString {
    return `${this.backgroundLayer.toCSMinitileLayerString()}\n${this.foregroundLayer.toCSMinitileLayerString()}`;
  }

  /**
   * Return an 8 x 8 CaveBoyImageData object displaying the foregroundLayer for
   * this Minitile laid over the backgroundLayer.
   * @param subpalette - The Subpalette to reference for mapping color
   * numbers to Colors.
   * @param flipHorizontally - Whether to return the image with the positions of
   * its pixels flipped horizontally. Optional. Defaults to false.
   * @param flipVertically - Whether to return the image with the positions of
   * its pixels flipped vertically. Optional. Defaults to false.
   * @param colorComponentScalerName - The name of the ColorComponentScaler to
   * use when converting from the five-bit component values of the Colors to the
   * eight-bit color component values of the image data. Optional. Defaults to
   * the user-configured scaler.
   * @returns An 8 x 8 CaveBoyImageData displaying the foregroundLayer for this
   * Minitile laid over the backgroundLayer.
   */
  public getImageData(
    subpalette: Subpalette,
    flipHorizontally: boolean = false,
    flipVertically: boolean = false,
    colorComponentScalerName?: ColorComponentScalerName
  ): CaveBoyImageData {
    // Get the image data for the foreground layer.
    const cbImageData = this.foregroundLayer.getImageData(
      subpalette,
      flipHorizontally,
      flipVertically
    );

    // Draw the background on any spots not covered by foreground pixels.
    for (let i = 0; i < this.backgroundLayer.colorNumbers.length; ++i) {
      if (this.foregroundLayer.colorNumbers[i] !== 0) {
        continue;
      }

      let [x, y] = getMinitileLayerPixelCoordinates(
        i,
        flipHorizontally,
        flipVertically
      );

      let backgroundPixelValue = this.backgroundLayer.colorNumbers[i];
      let backgroundColor = subpalette.colors[backgroundPixelValue];

      cbImageData.setPixel(
        x,
        y,
        backgroundColor,
        255,
        colorComponentScalerName
      );
    }

    return cbImageData;
  }
}
