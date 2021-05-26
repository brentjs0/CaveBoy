import CaveBoyError from '@/script/base/error/CaveBoyError';
import { segmentString } from '@/script/base/helpers';
import {
  CoilSnakePaletteSetString,
  isType,
} from '@/script/base/primitive-types';
import MinitilePalette from '@/script/data/game-object/MinitilePalette';

/**
 * A set of sixteen MinitilePalettes that can be applied to Arrangements
 * to provide color mappings for their indexed Minitiles. This class roughly
 * correlates to the 'subpalettes' array of an EbMapPalette object in the
 * CoilSnake source.
 */
export default class PaletteSet {
  /**
   * A six-element array of the MinitilePalettes included in the set, in order.
   */
  public minitilePalettes: MinitilePalette[];

  /**
   * Instantiate a PaletteSet, optionally with its MinitilePalette values
   * initialized by parsing the provided CoilSnakePaletteSetString.
   * @param coilSnakePaletteSetString - A CoilSnakePaletteSetString
   * expression of the set of six palettes in the set, in order. Optional.
   * Default MinitilePalettes are created if no value is provided.
   */
  public constructor(coilSnakePaletteSetString?: CoilSnakePaletteSetString) {
    this.minitilePalettes = [];

    if (isType(coilSnakePaletteSetString, 'CoilSnakePaletteSetString')) {
      for (let coilSnakeMinitilePaletteString of segmentString(
        coilSnakePaletteSetString,
        48
      )) {
        this.minitilePalettes.push(
          new MinitilePalette(coilSnakeMinitilePaletteString)
        );
      }
    } else if (coilSnakePaletteSetString === undefined) {
      for (let i = 0; i < 6; ++i) {
        this.minitilePalettes.push(new MinitilePalette());
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
    return this.minitilePalettes.reduce<CoilSnakePaletteSetString>(
      (pss, mtps) => (pss += mtps.toCoilSnakeMinitilePaletteString()),
      ''
    );
  }
}
