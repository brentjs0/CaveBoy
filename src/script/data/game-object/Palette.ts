import CaveBoyError from '@/script/base/error/CaveBoyError';
import { segmentString } from '@/script/base/helpers';
import { CSPaletteString, isType } from '@/script/base/primitive-types';
import Subpalette from '@/script/data/game-object/Subpalette';

/**
 * A set of sixteen Subpalettes that can be applied to Arrangements
 * to provide color mappings for their indexed Minitiles. This class roughly
 * correlates to the 'subpalettes' array of an EbMapPalette object in the
 * CoilSnake source.
 */
export default class Palette {
  /**
   * A six-element array of the Subpalettes included in the set, in order.
   */
  public subpalettes: Subpalette[];

  /**
   * Instantiate a Palette, optionally with its Subpalette values
   * initialized by parsing the provided CSPaletteString.
   * @param csPaletteString - A CSPaletteString
   * expression of the set of six palettes in the set, in order. Optional.
   * Default Subpalettes are created if no value is provided.
   */
  public constructor(csPaletteString?: CSPaletteString) {
    this.subpalettes = [];

    if (isType(csPaletteString, 'CSPaletteString')) {
      for (let csSubpaletteString of segmentString(csPaletteString, 48)) {
        this.subpalettes.push(new Subpalette(csSubpaletteString));
      }
    } else if (csPaletteString === undefined) {
      for (let i = 0; i < 6; ++i) {
        this.subpalettes.push(new Subpalette());
      }
    } else {
      throw new CaveBoyError(
        `An invalid combination of arguments was provided to the Palette constructor: ${arguments}.`
      );
    }
  }

  /**
   * Return an expression of the Palette as a 288-digit base-32
   * CSPaletteString.
   * @returns An expression of the Palette as a 288-digit base-32
   * CSPaletteString.
   */
  public toCSPaletteString(): CSPaletteString {
    return this.subpalettes.reduce<CSPaletteString>(
      (pss, sp) => (pss += sp.toCSSubpaletteString()),
      ''
    );
  }
}
