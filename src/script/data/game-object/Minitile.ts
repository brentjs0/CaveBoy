import CaveBoyImageData from '@/script/base/CaveBoyImageData';
import { ColorComponentScalerName } from '@/script/base/ColorComponentScaler';
import CaveBoyError from '@/script/base/error/CaveBoyError';
import { CoilSnakeMinitileString, isType } from '@/script/base/primitive-types';
import MinitileLayer, {
  getMinitileLayerPixelCoordinates,
} from '@/script/data/game-object/MinitileLayer';
import MinitilePalette from '@/script/data/game-object/MinitilePalette';

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
   * parsing the provided CoilSnakeMinitileString.
   * @param coilSnakeMinitileString - A CoilSnakeMinitileString expression of
   * the pixel values in both layers. Optional. All values default to 0 if
   * no argument is provided.
   */
  public constructor(coilSnakeMinitileString?: CoilSnakeMinitileString) {
    if (coilSnakeMinitileString === undefined) {
      this.backgroundLayer = new MinitileLayer();
      this.foregroundLayer = new MinitileLayer();
    } else if (isType(coilSnakeMinitileString, 'CoilSnakeMinitileString')) {
      const minitileLayerStrings = coilSnakeMinitileString.split(
        /(?:\n|\r\n|\r)/
      );
      this.backgroundLayer = new MinitileLayer(minitileLayerStrings[0]);
      this.foregroundLayer = new MinitileLayer(minitileLayerStrings[1]);
    } else {
      throw new CaveBoyError(
        'The arguments provided to Minitile() were invalid.'
      );
    }
  }

  /**
   * Return an expression of the MinitileLayer as a CoilSnakeMinitileString.
   * @returns An expression of the MinitileLayer as a CoilSnakeMinitileString.
   */
  public toCoilSnakeMinitileString(): CoilSnakeMinitileString {
    return `${this.backgroundLayer.toCoilSnakeMinitileLayerString()}\n${this.foregroundLayer.toCoilSnakeMinitileLayerString()}`;
  }

  /**
   * Return an 8 x 8 CaveBoyImageData displaying the foregroundLayer for this
   * Minitile laid over the backgroundLayer.
   * @param minitilePalette - The MinitilePalette to reference for mapping color
   * values to Colors.
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
    minitilePalette: MinitilePalette,
    flipHorizontally: boolean = false,
    flipVertically: boolean = false,
    colorComponentScalerName?: ColorComponentScalerName
  ): CaveBoyImageData {
    // Get the image data for the foreground layer.
    const cbImageData = this.foregroundLayer.getImageData(
      minitilePalette,
      flipHorizontally,
      flipVertically
    );

    // Draw the background on any spots not covered by foreground pixels.
    for (let i = 0; i < this.backgroundLayer.pixelValues.length; ++i) {
      if (this.foregroundLayer.pixelValues[i] !== 0) {
        continue;
      }

      let [x, y] = getMinitileLayerPixelCoordinates(
        i,
        flipHorizontally,
        flipVertically
      );

      let backgroundPixelValue = this.backgroundLayer.pixelValues[i];
      let backgroundColor = minitilePalette.colors[backgroundPixelValue];

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
