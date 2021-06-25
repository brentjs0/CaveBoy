import Palette from '@/script/data/game-object/Palette';
import {
  CSGraphicSetString,
  isType,
  Uint5,
} from '@/script/base/primitive-types';
import CaveBoyError from '@/script/base/error/CaveBoyError';

/**
 * A set of graphics values that can be assigned to a sector. For
 * Sectors to which it is assigned, the GraphicSet determines what
 * Tileset is referenced by the Arrangement number in each map cell,
 * as well as which Palettes can can be applied to the Sector.
 *
 * This class roughly correlates to the EbMapPalette type in the
 * CoilSnake source.
 */
export default class GraphicSet {
  /**
   * The five-bit number (0 through 31) that uniquely identifies
   * this GraphicSet within a project. This is also its index in
   * the project's array of 32 GraphicSets.
   */
  public idNumber: Uint5;

  /**
   * The number of the Tileset from which to retrieve Arrangements
   * for Sectors that use this GraphicSet.
   */
  public tilesetNumber: number;

  /**
   * An array of 1 to 8 Palettes that can be assigned to Sectors
   * that use this GraphicSet.
   */
  public palettes: Palette[];

  /**
   * Instantiate a GraphicSet with the provided ID number value
   * and (optionally) the provided tileset number. A single default
   * Palette will be added.
   * @param idNumber - The 0 - 31 number that identifies this
   * GraphicSet.
   * @param tilesetNumber - The number of the Tileset that this
   * GraphicSet uses. Optional. Defaults to 0.
   */
  public constructor(idNumber: Uint5, tilesetNumber?: number);

  /**
   * Instantiate a GraphicSet with its idNumber and Palette values
   * initialized by parsing the provided CSGraphicSetString.
   * @param csGraphicSetString - A CSGraphicSetString
   * encoding the idNumber for this GraphicSet and between 1 and 8
   * Palettes.
   * @param tilesetNumber - The number of the Tileset that this
   * GraphicSet uses. Optional. Defaults to 0.
   */
  public constructor(
    csGraphicSetString: CSGraphicSetString,
    tilesetNumber?: number
  );

  public constructor(
    param1: CSGraphicSetString | Uint5,
    tilesetNumber: number = 0
  ) {
    this.tilesetNumber = tilesetNumber;
    this.palettes = [];

    if (isType(param1, 'Uint5')) {
      this.idNumber = param1;
      this.palettes[0] = new Palette();
    } else if (isType(param1, 'CSGraphicSetString')) {
      // Each line starts with the ID number for the GraphicSet,
      // but we'll grab it from the first line.
      let idNumber = parseInt(param1[0], 32);
      if (isType(idNumber, 'Uint5')) {
        this.idNumber = idNumber;
      } else {
        throw new CaveBoyError(
          'A CSGraphicSetString with an invalid ID number was passed to the GraphicSet constructor.'
        );
      }
      const lines = param1.split(/(?:\n|\r\n|\r)/);
      for (let i = 0; i < lines.length; ++i) {
        // Each line has a Palette number after the ID number, and
        // they should never be out of order.
        if (lines[i].length > 1) {
          let paletteNumber = parseInt(lines[i][1]);
          if (paletteNumber !== i) {
            throw new CaveBoyError(
              'A misnumbered CSPaletteString was encountered in the GraphicSet constructor.'
            );
          }
        }

        this.palettes.push(new Palette(lines[i].substring(2)));
      }
    } else {
      throw new CaveBoyError(
        `An invalid combination of arguments was provided to the GraphicSet constructor: ${arguments}.`
      );
    }
  }

  /**
   * Return an expression of the GraphicSet as a
   * CSGraphicSetString in the format used by CoilSnake
   * *.fts files.
   * @returns An expression of the GraphicSet as a
   * CSGraphicSetString in the format used by CoilSnake
   * *.fts files.
   */
  public toCSGraphicSetString(): CSGraphicSetString {
    const idNumberString = this.idNumber.toString(32);

    // prettier-ignore
    let csGraphicSetString = `${idNumberString}0${this.palettes[0].toCSPaletteString()}`;
    for (let i = 1; i < this.palettes.length; ++i) {
      // prettier-ignore
      csGraphicSetString += `\n${idNumberString}${i}${this.palettes[i].toCSPaletteString()}`;
    }

    return csGraphicSetString;
  }
}
