import {
  ColorComponentScalerName,
  getColorComponentScaler,
} from '@/script/base/ColorComponentScaler';
import CaveBoyError from '@/script/base/error/CaveBoyError';
import { EightBitNumber } from '@/script/data/EightBitNumber';
import Color from '@/script/data/game-object/Color';

/**
 * A child of the native ImageData class with functions for manipulating data
 * using CaveBoy Color values.
 */
export default class CaveBoyImageData extends ImageData {
  /**
   * Construct a CaveBoyImageData instance from an existing ImageData object.
   * @param imageData - The ImageData object to clone.
   */
  public constructor(imageData: ImageData);

  /**
   * Construct a CaveBoyImageData instance with the provided width and height.
   * All pixel data values are set to 0, so the image will be a transparent
   * black rectangle.
   * @param width - An unsigned long representing the width of the image.
   * @param height - An unsigned long representing the height of the image.
   */
  public constructor(width: number, height: number);

  /**
   * Construct a CaveBoyImageData with the provided pixel data, width, and height.
   * @param data - A Uint8ClampedArray containing the underlying pixel
   * representation of the image.
   * @param width - An unsigned long representing the width of the image.
   * @param height - An unsigned long representing the height of the image.
   * This value is optional. When not provided, The height will be inferred
   * rom the data array's size and the given width.
   */
  public constructor(data: Uint8ClampedArray, width: number, height?: number);

  public constructor(
    param1: ImageData | Uint8ClampedArray | number,
    param2?: number,
    param3?: number
  ) {
    if (param1 instanceof ImageData) {
      super(param1.data, param1.width);
    } else if (param2 !== undefined) {
      if (param1 instanceof Uint8ClampedArray) {
        super(param1, param2, param3);
      } else {
        super(param1, param2);
      }
    } else {
      throw new CaveBoyError(
        'The arguments provided to CaveBoyImageData() were invalid.'
      );
    }

    // Set the prototype for environments where super() returns an object other
    // than 'this'.
    Object.setPrototypeOf(this, CaveBoyImageData.prototype);
  }

  /**
   * Set the pixel data values for the pixel at the specified coordinates so that
   * it is the specified Color.
   * @param x - The zero-based horizontal position of the pixel to set, counting
   * from the left.
   * @param y - The zero-based vertical position of the pixel to set, counting
   * from the top.
   * @param color - The 15-bit Color value to set on the pixel.
   * @param alpha - The opacity to set on the pixel. Optional. Defaults to 255
   * (fully opaque).
   * @param colorComponentScalerName - The name of the ColorComponentScaler to use
   * when converting from the five-bit component values of the Color to the
   * eight-bit color component values of the pixel data. Optional. Defaults to the
   * user-configured scaler.
   */
  public setPixel(
    x: number,
    y: number,
    color: Color,
    alpha: EightBitNumber = 255,
    colorComponentScalerName?: ColorComponentScalerName
  ): void {
    const colorComponentScaler = getColorComponentScaler(
      colorComponentScalerName
    );
    const rIndex = (y * this.width + x) * 4;

    this.data[rIndex] = colorComponentScaler.convertFiveBitToEightBit(
      color.redComponent
    );
    this.data[rIndex + 1] = colorComponentScaler.convertFiveBitToEightBit(
      color.greenComponent
    );
    this.data[rIndex + 2] = colorComponentScaler.convertFiveBitToEightBit(
      color.blueComponent
    );
    this.data[rIndex + 3] = alpha;
  }
}
