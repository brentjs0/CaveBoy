import CaveBoyImageData from '@/script/base/CaveBoyImageData';
import { ColorComponentScalerName } from '@/script/base/ColorComponentScaler';
import CaveBoyError from '@/script/base/error/CaveBoyError';
import { segmentString } from '@/script/base/helpers';
import {
  CoilSnakeArrangementString,
  isType,
} from '@/script/base/primitive-types';
import ArrangementCell from '@/script/data/game-object/ArrangementCell';
import Minitile from '@/script/data/game-object/Minitile';
import PaletteSet from '@/script/data/game-object/PaletteSet';
import times from 'lodash/times';

/**
 * A list of 16 ArrangementCells representing a 4 x 4 grid of arranged Minitiles
 * along with their palette information and suface flags. This class roughly
 * correlates to a two-dimensional array element in the arrangements array of
 * an EbTileset object in the CoilSnake source.
 */
export default class Arrangement {
  /**
   * The cells of the arrangment in order from left to right, top to bottom.
   */
  public cells: ArrangementCell[];

  /**
   * Instantiate an Arrangement, optionally with its cells initialized by parsing
   * the provided CoilSnakeArrangementString.
   * @param coilSnakeArrangementString - A CoilSnakeArrangementString expression
   * of the sixteen cells contained in the arrangement. Optional. Default cells
   * are created if no value is provided.
   */
  public constructor(coilSnakeArrangementString?: CoilSnakeArrangementString) {
    if (isType(coilSnakeArrangementString, 'CoilSnakeArrangementString')) {
      this.cells = [];
      for (let coilSnakeArrangementCellString of segmentString(
        coilSnakeArrangementString,
        6
      )) {
        this.cells.push(new ArrangementCell(coilSnakeArrangementCellString));
      }
    } else if (coilSnakeArrangementString === undefined) {
      this.cells = times(16, () => new ArrangementCell());
    } else {
      throw new CaveBoyError(
        `An invalid combination of arguments was provided to the CoilSnakeArrangement constructor: ${arguments}.`
      );
    }
  }

  /**
   * Return a 32 x 32 CaveBoyImageData object displaying the cells of the
   * arrangement as they would appear in-game with the provided Minitiles and
   * PaletteSet.
   * @param minitiles - The array of Minitiles from which to retrieve the
   * displayed Minitile for each cell.
   * @param paletteSet - The PaletteSet from which to retrieve the applied
   * MinitilePalette for each cell.
   * @param colorComponentScalerName - The name of the ColorComponentScaler to
   * use when converting from the five-bit component values of the Colors to the
   * eight-bit color component values of the image data. Optional. Defaults to
   * the user-configured scaler.
   * @returns A 32 x 32 CaveBoyImageData object displaying the cells of the
   * arrangement as they would appear in-game with the provided Minitiles and
   * PaletteSet.
   */
  public getImageData(
    minitiles: Minitile[],
    paletteSet: PaletteSet,
    colorComponentScalerName?: ColorComponentScalerName
  ): CaveBoyImageData {
    const cbImageData = new CaveBoyImageData(32, 32);

    for (let cellNumber = 0; cellNumber < this.cells.length; ++cellNumber) {
      let targetXOrigin = (cellNumber % 4) * 8;
      let targetYOrigin = (cellNumber >>> 2) * 8;
      cbImageData.putImageData(
        this.cells[cellNumber].getImageData(
          minitiles,
          paletteSet,
          colorComponentScalerName
        ),
        targetXOrigin,
        targetYOrigin
      );
    }

    return cbImageData;
  }

  /**
   * Return an expression of this ArrangementCell as a 96-digit hexadecimal
   * CoilSnakeArrangementString.
   * @returns An expression of this ArrangementCell as a 96-digit hexadecimal
   * CoilSnakeArrangementString.
   */
  public toCoilSnakeArrangementString(): CoilSnakeArrangementString {
    return this.cells.reduce<CoilSnakeArrangementString>(
      (as, ac) => (as += ac.toCoilSnakeArrangementCellString()),
      ''
    );
  }
}
