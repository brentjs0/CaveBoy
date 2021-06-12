import PaletteSet from '@/script/data/game-object/PaletteSet';
import {
  CoilSnakeGraphicSetString,
  isType,
  Uint5,
} from '@/script/base/primitive-types';
import CaveBoyError from '@/script/base/error/CaveBoyError';

/**
 * A set of graphics values that can be assigned to a sector. For Sectors to which
 * it is assigned, the GraphicSet determines what Tileset is referenced by
 * the Arrangement number in each map cell, as well as which PaletteSets can
 * can be applied to the Sector.
 *
 * This class roughly correlates to the EbMapPalette type in the CoilSnake source.
 */
export default class GraphicSet {
  /**
   * The five-bit number (0 through 31) that uniquely identifies this
   * GraphicSet.
   */
  public idNumber: Uint5;

  /**
   * The number of the Tileset from which to retrieve Arrangements
   * for Sectors that use this GraphicSet.
   */
  public tilesetNumber: number;

  /**
   * An array of 1 to 8 PaletteSets that can be assigned to Sectors
   * that use this GraphicSet.
   */
  public paletteSets: PaletteSet[];

  /**
   * Instantiate a GraphicSet with the provided ID number value
   * and (optionally) the provided tileset number. A single default
   * PaletteSet will be added.
   * @param idNumber - The 0 - 31 number that identifies this
   * GraphicSet.
   * @param tilesetNumber - The number of the Tileset that this
   * GraphicSet uses. Optional. Defaults to 0.
   */
  public constructor(idNumber: Uint5, tilesetNumber?: number);

  /**
   * Instantiate a GraphicSet with its idNumber and PaletteSet values
   * initialized by parsing the provided CoilSnakeGraphicSetString.
   * @param coilSnakeGraphicSetString - A CoilSnakeGraphicSetString
   * encoding the idNumber for this GraphicSet and between 1 and 8
   * PaletteSets.
   * @param tilesetNumber - The number of the Tileset that this
   * GraphicSet uses. Optional. Defaults to 0.
   */
  public constructor(
    coilSnakeGraphicSetString: CoilSnakeGraphicSetString,
    tilesetNumber?: number
  );

  public constructor(
    param1: CoilSnakeGraphicSetString | Uint5,
    tilesetNumber: number = 0
  ) {
    this.tilesetNumber = tilesetNumber;
    this.paletteSets = [];

    if (isType(param1, 'Uint5')) {
      this.idNumber = param1;
      this.paletteSets[0] = new PaletteSet();
    } else if (isType(param1, 'CoilSnakeGraphicSetString')) {
      // Each line starts with the ID number for the GraphicSet,
      // but we'll grab it from the first line.
      let idNumber = parseInt(param1[0], 32);
      if (isType(idNumber, 'Uint5')) {
        this.idNumber = idNumber;
      } else {
        throw new CaveBoyError(
          'A CoilSnakeGraphicSetString with an invalid ID number was passed to the GraphicSet constructor.'
        );
      }
      const lines = param1.split(/(?:\n|\r\n|\r)/);
      for (let i = 0; i < lines.length; ++i) {
        // Each line has a PaletteSet number after the ID number, and
        // they should never be out of order.
        if (lines[i].length > 1) {
          let paletteSetNumber = parseInt(lines[i][1]);
          if (paletteSetNumber !== i) {
            throw new CaveBoyError(
              'A misnumbered CoilSnakePaletteSetString was encountered in the GraphicSet constructor.'
            );
          }
        }

        this.paletteSets.push(new PaletteSet(lines[i].substring(2)));
      }
    } else {
      throw new CaveBoyError(
        `An invalid combination of arguments was provided to the GraphicSet constructor: ${arguments}.`
      );
    }
  }

  /**
   * Return an expression of the GraphicSet as a
   * CoilSnakeGraphicSetString in the format used by CoilSnake
   * *.fts files.
   * @returns An expression of the GraphicSet as a
   * CoilSnakeGraphicSetString in the format used by CoilSnake
   * *.fts files.
   */
  public toCoilSnakeGraphicSetString(): CoilSnakeGraphicSetString {
    const idNumberString = this.idNumber.toString(32);

    // prettier-ignore
    let coilSnakeGraphicSetString = `${idNumberString}0${this.paletteSets[0].toCoilSnakePaletteSetString()}`;
    for (let i = 1; i < this.paletteSets.length; ++i) {
      // prettier-ignore
      coilSnakeGraphicSetString += `\n${idNumberString}${i}${this.paletteSets[i].toCoilSnakePaletteSetString()}`;
    }

    return coilSnakeGraphicSetString;
  }
}
