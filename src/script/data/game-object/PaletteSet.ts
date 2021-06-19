import CaveBoyError from '@/script/base/error/CaveBoyError';
import { segmentString } from '@/script/base/helpers';
import {
  CoilSnakePaletteSetString,
  isType,
} from '@/script/base/primitive-types';
import Subpalette from '@/script/data/game-object/Subpalette';

/**
 * A set of sixteen Subpalettes that can be applied to Arrangements
 * to provide color mappings for their indexed Minitiles. This class roughly
 * correlates to the 'subpalettes' array of an EbMapPalette object in the
 * CoilSnake source.
 */
export default class PaletteSet {
  /**
   * A six-element array of the Subpalettes included in the set, in order.
   */
  public subpalettes: Subpalette[];

  /**
   * Instantiate a PaletteSet, optionally with its Subpalette values
   * initialized by parsing the provided CoilSnakePaletteSetString.
   * @param coilSnakePaletteSetString - A CoilSnakePaletteSetString
   * expression of the set of six palettes in the set, in order. Optional.
   * Default Subpalettes are created if no value is provided.
   */
  public constructor(coilSnakePaletteSetString?: CoilSnakePaletteSetString) {
    this.subpalettes = [];

    if (isType(coilSnakePaletteSetString, 'CoilSnakePaletteSetString')) {
      for (let coilSnakeSubpaletteString of segmentString(
        coilSnakePaletteSetString,
        48
      )) {
        this.subpalettes.push(new Subpalette(coilSnakeSubpaletteString));
      }
    } else if (coilSnakePaletteSetString === undefined) {
      for (let i = 0; i < 6; ++i) {
        this.subpalettes.push(new Subpalette());
      }
    } else {
      throw new CaveBoyError(
        `An invalid combination of arguments was provided to the PaletteSet constructor: ${arguments}.`
      );
    }
  }

  /**
   * Return an expression of the PaletteSet as a 288-digit base-32
   * CoilSnakePaletteSetString.
   * @returns An expression of the PaletteSet as a 288-digit base-32
   * CoilSnakePaletteSetString.
   */
  public toCoilSnakePaletteSetString(): CoilSnakePaletteSetString {
    return this.subpalettes.reduce<CoilSnakePaletteSetString>(
      (pss, sp) => (pss += sp.toCoilSnakeSubpaletteString()),
      ''
    );
  }
}
