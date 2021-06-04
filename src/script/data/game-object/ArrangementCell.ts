import CaveBoyImageData from '@/script/base/CaveBoyImageData';
import { ColorComponentScalerName } from '@/script/base/ColorComponentScaler';
import CaveBoyError from '@/script/base/error/CaveBoyError';
import { getBitValue } from '@/script/base/helpers';
import {
  CoilSnakeArrangementCellString,
  isType,
  Uint3,
  Uint9,
} from '@/script/base/primitive-types';
import Minitile from '@/script/data/game-object/Minitile';
import PaletteSet from '@/script/data/game-object/PaletteSet';

/**
 * A cell in 4 x 4 Arrangement. Encodes the Minitile number, MinitilePalette
 * number, flip state, and surface flags for an 8 x 8 pixel map area. This
 * class roughly correlates to a single element in one of the the
 * two-dimensional array elements of the arrangements array of an EbTileset
 * object in the CoilSnake source.
 */
export default class ArrangementCell {
  /**
   * The index of the Minitile (0 through 511) that this cell displays.
   * This index refers to an element in the array of Minitiles in the Tileset
   * to which the parent Arrangement belongs.
   */
  public minitileNumber: Uint9;

  /**
   * The index of the MinitilePalette (0 through 5) that will provide color
   * values for the Minitile displayed by this cell when it is rendered in
   * the map Sector.
   *
   * The PaletteSet it refers to is determined by the graphicSetNumber and
   * paletteSetNumber assigned to the Sector.
   */
  public minitilePaletteNumber: Uint3;

  /**
   * Whether the Minitile in this cell is displayed flipped horizontally.
   */
  public flippedHorizontally: boolean;

  /**
   * Whether the Minitile in this cell is displayed flipped vertically.
   */
  public flippedVertically: boolean;

  /**
   * Whether this cell obscures the lower body of sprites it intersects.
   */
  public coversLowerBody: boolean;

  /**
   * Whether this cell obscures the upper body of sprites it intersects.
   */
  public coversUpperBody: boolean;

  /**
   * Whether the player can be inflicted with sunstroke by walking on this
   * cell.
   */
  public inflictsSunstroke: boolean;

  /**
   * Whether the player sinks into this cell like shallow water.
   */
  public isWater: boolean;

  /**
   * Whether this cell is interactive.
   */
  public isInteractive: boolean;

  /**
   * Whether the surface flag at bit position 2^5 (0x20) is set for this
   * cell.
   */
  public flag0x20: boolean;

  /**
   * Whether the surface flag at bit position 2^6 (0x40) is set for this
   * cell.
   */
  public flag0x40: boolean;

  /**
   * Whether this cell can be walked on by the player.
   */
  public isSolid: boolean;

  /**
   * Whether the player sinks into this cell like deep water.
   */
  public get isDeepWater(): boolean {
    return this.inflictsSunstroke && this.isWater;
  }

  /**
   * Whether this cell extends the interaction range for any
   * interactive elements behind it.
   */
  public get extendsInteractionRange() {
    return this.coversUpperBody && this.isSolid;
  }

  /**
   * Instantiate an ArrangementCell, optionally with its field values initialized
   * by parsing the provided CoilSnakeArrangementCellString.
   * @param coilSnakeArrangementCellString - A CoilSnakeArrangementCellString
   * expression of the Minitile number, Minitile Palette number, flip state,
   * and surface flags for this ArrangementCell. Optional. Default property
   * values are used if no value is provided.
   */
  public constructor(
    coilSnakeArrangementCellString?: CoilSnakeArrangementCellString
  ) {
    if (
      isType(coilSnakeArrangementCellString, 'CoilSnakeArrangementCellString')
    ) {
      let arrangementCellData = parseInt(coilSnakeArrangementCellString, 16);

      // Bits 23 through 22 ([00]00 0000 0000 0000 0000 0000).
      this.flippedVertically = getBitValue(arrangementCellData, 23);
      this.flippedHorizontally = getBitValue(arrangementCellData, 22);

      // Bit 21 is unused.

      // Bits 20 through 18 (000[0 00]00 0000 0000 0000 0000).
      const minitilePaletteNumber = ((arrangementCellData >>> 18) & 0b111) - 2;
      if (
        !isType(minitilePaletteNumber, 'Uint3') ||
        minitilePaletteNumber < 0
      ) {
        throw new CaveBoyError(
          `Parsed minitilePaletteNumber value '${minitilePaletteNumber}' is invalid.`
        );
      }
      this.minitilePaletteNumber = minitilePaletteNumber;

      // Bits 17 through 8 (0000 00[00 0000 0000] 0000 0000).
      const minitileNumber = (arrangementCellData >>> 8) & 0b1111111111;
      if (!isType(minitileNumber, 'Uint9')) {
        throw new CaveBoyError(
          `Parsed minitileNumber value '${minitileNumber}' is invalid.`
        );
      }
      this.minitileNumber = minitileNumber;

      // Bits 7 through 0 (0000 0000 0000 0000 [0000 0000]).
      this.isSolid = getBitValue(arrangementCellData, 7);
      this.flag0x40 = getBitValue(arrangementCellData, 6);
      this.flag0x20 = getBitValue(arrangementCellData, 5);
      this.isInteractive = getBitValue(arrangementCellData, 4);
      this.isWater = getBitValue(arrangementCellData, 3);
      this.inflictsSunstroke = getBitValue(arrangementCellData, 2);
      this.coversUpperBody = getBitValue(arrangementCellData, 1);
      this.coversLowerBody = getBitValue(arrangementCellData, 0);
    } else if (coilSnakeArrangementCellString === undefined) {
      this.flippedVertically = false;
      this.flippedHorizontally = false;
      this.minitilePaletteNumber = 0;
      this.minitileNumber = 0;
      this.isSolid = false;
      this.flag0x40 = false;
      this.flag0x20 = false;
      this.isInteractive = false;
      this.isWater = false;
      this.inflictsSunstroke = false;
      this.coversUpperBody = false;
      this.coversLowerBody = false;
    } else {
      throw new CaveBoyError(
        `An invalid combination of arguments was provided to the CoilSnakeArrangementCell constructor: ${arguments}.`
      );
    }
  }

  /**
   * Return an 8 x 8 CaveBoyImageData object displaying the Minitile
   * referenced by this ArrangementCell rendered with the MinitilePalette
   * referenced by this ArrangementCell, given the provided Minitile array
   * and PaletteSet. The flip state of the image is determined by
   * ArrangmentCell's flippedHorizontally and flippedVertically values.
   * @param minitiles - The array of Minitiles from which to retrieve the
   * displayed Minitile using this ArrangmentCell's minitileNumber.
   * @param paletteSet - The PaletteSet from which to retrieve the applied
   * MinitilePalette using this ArrangmentCell's minitilePaletteNumber.
   * @param colorComponentScalerName - The name of the ColorComponentScaler to
   * use when converting from the five-bit component values of the Colors to the
   * eight-bit color component values of the image data. Optional. Defaults to
   * the user-configured scaler.
   * @returns An 8 x 8 CaveBoyImageData object displaying the Minitile
   * referenced by this ArrangementCell rendered with the MinitilePalette
   * referenced by this ArrangementCell, with the configured flip state.
   */
  public getImageData(
    minitiles: Minitile[],
    paletteSet: PaletteSet,
    colorComponentScalerName?: ColorComponentScalerName
  ): CaveBoyImageData {
    return minitiles[this.minitileNumber].getImageData(
      paletteSet.minitilePalettes[this.minitilePaletteNumber],
      this.flippedHorizontally,
      this.flippedVertically,
      colorComponentScalerName
    );
  }

  /**
   * Return an expression of this ArrangementCell as a six-digit hexadecimal
   * CoilSnakeArrangementCellString.
   * @returns An expression of this ArrangementCell as a six-digit hexadecimal
   * CoilSnakeArrangementCellString.
   */
  public toCoilSnakeArrangementCellString(): CoilSnakeArrangementCellString {
    let arrangementCellData = 0b000000000000000000000000;

    if (this.flippedVertically) {
      arrangementCellData |= 0b100000000000000000000000;
    }
    if (this.flippedHorizontally) {
      arrangementCellData |= 0b010000000000000000000000;
    }

    arrangementCellData |= (this.minitilePaletteNumber + 2) << 18;
    arrangementCellData |= this.minitileNumber << 8;

    if (this.isSolid) {
      arrangementCellData |= 0b000000000000000010000000;
    }
    if (this.flag0x40) {
      arrangementCellData |= 0b000000000000000001000000;
    }

    if (this.flag0x20) {
      arrangementCellData |= 0b000000000000000000100000;
    }
    if (this.isInteractive) {
      arrangementCellData |= 0b000000000000000000010000;
    }

    if (this.isWater) {
      arrangementCellData |= 0b000000000000000000001000;
    }
    if (this.inflictsSunstroke) {
      arrangementCellData |= 0b000000000000000000000100;
    }
    if (this.coversUpperBody) {
      arrangementCellData |= 0b000000000000000000000010;
    }
    if (this.coversLowerBody) {
      arrangementCellData |= 0b000000000000000000000001;
    }

    return arrangementCellData.toString(16);
  }
}
