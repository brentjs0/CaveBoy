import CaveBoyImageData from '@/script/base/CaveBoyImageData';
import { ColorComponentScalerName } from '@/script/base/ColorComponentScaler';
import CaveBoyError from '@/script/base/error/CaveBoyError';
import { getBitValue } from '@/script/base/helpers';
import {
  CSArrangementCellString,
  isType,
  Uint3,
  Uint9,
} from '@/script/base/primitive-types';
import Minitile from '@/script/data/game-object/Minitile';
import Palette from '@/script/data/game-object/Palette';

/**
 * A cell in 4 x 4 Arrangement. Encodes the Minitile number, Subpalette
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
   * The value of subpaletteNumber, plus two.
   *
   * When Arrangements are initially decompiled by CoilSnake, the
   * Subpalette numbers are encoded with three bits, representing a
   * value from 0 to 5 with 2 added. The actual Subpalette number is
   * found by subtracting 2 from the encoded number.
   *
   * However, there is an apparent defect in the decompilation process that
   * causes some Subpalette number values of 0 to be represented as 0
   * (0b000) rather than as 2 (0b010). In order to prevent encoded
   * Arrangement values from being altered when no intentional change has
   * been made, the original encoded value is stored here and the actual
   * subpaletteNumber is calculated based on this number. The original
   * encoded value is lost when a new subpaletteNumber value is assigned,
   * but this happens when editing Arrangements in EB Project Editor as well.
   */
  private encodedSubpaletteNumber: Uint3;

  /**
   * The index of the Subpalette (0 through 5) that will provide color
   * values for the Minitile displayed by this cell when it is rendered in
   * the map Sector.
   *
   * The Palette it refers to is determined by the graphicSetNumber and
   * paletteNumber assigned to the Sector.
   */
  public get subpaletteNumber(): Uint3 {
    const subpaletteNumber =
      this.encodedSubpaletteNumber === 0 ? 0 : this.encodedSubpaletteNumber - 2;

    if (!isType(subpaletteNumber, 'Uint3')) {
      throw new CaveBoyError(
        `Subpalette number ${subpaletteNumber} is not a Uint3.`
      );
    }

    return subpaletteNumber;
  }

  public set subpaletteNumber(value: Uint3) {
    const encodedSubpaletteNumber = value + 2;

    if (!isType(encodedSubpaletteNumber, 'Uint3')) {
      throw new CaveBoyError(
        `Subpalette number ${encodedSubpaletteNumber} is not a Uint3.`
      );
    }

    this.encodedSubpaletteNumber = encodedSubpaletteNumber;
  }

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
   * by parsing the provided CSArrangementCellString.
   * @param csArrangementCellString - A CSArrangementCellString
   * expression of the Minitile number, Subpalette number, flip state,
   * and surface flags for this ArrangementCell. Optional. Default property
   * values are used if no value is provided.
   */
  public constructor(csArrangementCellString?: CSArrangementCellString) {
    if (isType(csArrangementCellString, 'CSArrangementCellString')) {
      let arrangementCellData = parseInt(csArrangementCellString, 16);

      // Bits 23 through 22 ([00]00 0000 0000 0000 0000 0000).
      this.flippedVertically = getBitValue(arrangementCellData, 23);
      this.flippedHorizontally = getBitValue(arrangementCellData, 22);

      // Bit 21 is unused.

      // Bits 20 through 18 (000[0 00]00 0000 0000 0000 0000).
      const encodedSubpaletteNumber = (arrangementCellData >>> 18) & 0b111;
      if (!isType(encodedSubpaletteNumber, 'Uint3')) {
        throw new CaveBoyError(
          `Parsed subpaletteNumber value '${encodedSubpaletteNumber}' is invalid.`
        );
      }
      this.encodedSubpaletteNumber = encodedSubpaletteNumber;

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
    } else if (csArrangementCellString === undefined) {
      this.flippedVertically = false;
      this.flippedHorizontally = false;
      this.encodedSubpaletteNumber = 0;
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
        `An invalid combination of arguments was provided to the CSArrangementCell constructor: ${arguments}.`
      );
    }
  }

  /**
   * Return an 8 x 8 CaveBoyImageData object displaying the Minitile
   * referenced by this ArrangementCell rendered with the Subpalette
   * referenced by this ArrangementCell, given the provided Minitile array
   * and Palette. The flip state of the image is determined by
   * ArrangementCell's flippedHorizontally and flippedVertically values.
   * @param minitiles - The array of Minitiles from which to retrieve the
   * displayed Minitile using this ArrangementCell's minitileNumber.
   * @param palette - The Palette from which to retrieve the applied
   * Subpalette using this ArrangementCell's subpaletteNumber.
   * @param colorComponentScalerName - The name of the ColorComponentScaler to
   * use when converting from the five-bit component values of the Colors to the
   * eight-bit color component values of the image data. Optional. Defaults to
   * the user-configured scaler.
   * @returns An 8 x 8 CaveBoyImageData object displaying the Minitile
   * referenced by this ArrangementCell rendered with the Subpalette
   * referenced by this ArrangementCell, with the configured flip state.
   */
  public getImageData(
    minitiles: Minitile[],
    palette: Palette,
    colorComponentScalerName?: ColorComponentScalerName
  ): CaveBoyImageData {
    return minitiles[this.minitileNumber].getImageData(
      palette.subpalettes[this.subpaletteNumber],
      this.flippedHorizontally,
      this.flippedVertically,
      colorComponentScalerName
    );
  }

  /**
   * Return an 8 x 8 HTMLCanvasElement object displaying the Minitile
   * referenced by this ArrangementCell rendered with the Subpalette
   * referenced by this ArrangementCell, given the provided Minitile array
   * and Palette. The flip state of the image is determined by
   * ArrangementCell's flippedHorizontally and flippedVertically values.
   * @param minitiles - The array of Minitiles from which to retrieve the
   * displayed Minitile using this ArrangementCell's minitileNumber.
   * @param palette - The Palette from which to retrieve the applied
   * Subpalette using this ArrangementCell's subpaletteNumber.
   * @param colorComponentScalerName - The name of the ColorComponentScaler to
   * use when converting from the five-bit component values of the Colors to the
   * eight-bit color component values of the image data. Optional. Defaults to
   * the user-configured scaler.
   * @returns An 8 x 8 HTMLCanvasElement object displaying the Minitile
   * referenced by this ArrangementCell rendered with the Subpalette
   * referenced by this ArrangementCell, with the configured flip state.
   */
  public getCanvas(
    minitiles: Minitile[],
    palette: Palette,
    colorComponentScalerName?: ColorComponentScalerName
  ): HTMLCanvasElement {
    return minitiles[this.minitileNumber].getCanvas(
      palette.subpalettes[this.subpaletteNumber],
      this.flippedHorizontally,
      this.flippedVertically,
      colorComponentScalerName
    );
  }

  /**
   * Return an expression of this ArrangementCell as a six-digit hexadecimal
   * CSArrangementCellString.
   * @returns An expression of this ArrangementCell as a six-digit hexadecimal
   * CSArrangementCellString.
   */
  public toCSArrangementCellString(): CSArrangementCellString {
    let arrangementCellData = 0b000000000000000000000000;

    if (this.flippedVertically) {
      arrangementCellData |= 0b100000000000000000000000;
    }
    if (this.flippedHorizontally) {
      arrangementCellData |= 0b010000000000000000000000;
    }

    arrangementCellData |= this.encodedSubpaletteNumber << 18;
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

    return arrangementCellData.toString(16).padStart(6, '0');
  }
}
