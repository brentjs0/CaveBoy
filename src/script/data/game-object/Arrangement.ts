import CaveBoyImageData from '@/script/base/CaveBoyImageData';
import { ColorComponentScalerName } from '@/script/base/ColorComponentScaler';
import CaveBoyError from '@/script/base/error/CaveBoyError';
import { segmentString } from '@/script/base/helpers';
import { CSArrangementString, isType } from '@/script/base/primitive-types';
import ArrangementCell from '@/script/data/game-object/ArrangementCell';
import Minitile from '@/script/data/game-object/Minitile';
import Palette from '@/script/data/game-object/Palette';
import times from 'lodash/times';

/**
 * A list of 16 ArrangementCells representing a 4 x 4 grid of arranged Minitiles
 * along with their palette information and suface flags. This class roughly
 * correlates to a two-dimensional array element in the arrangements array of
 * an EbTileset object in the CoilSnake source.
 */
export default class Arrangement {
  /**
   * The cells of the arrangement in order from left to right, top to bottom.
   */
  public cells: ArrangementCell[];

  /**
   * A list of CaveBoyImageData representations of this Arrangement with various
   * Palettes applied. The keys of the list are each Palette's CSPaletteString.
   */
  private cachedImageDataByCSPaletteString: { [key: string]: CaveBoyImageData };

  /**
   * A list of HTMLCanvasElement representations of this Arrangement with various
   * Palettes applied. The keys of the list are each Palette's CSPaletteString.
   */
  private cachedCanvasesByCSPaletteString: { [key: string]: HTMLCanvasElement };

  /**
   * Instantiate an Arrangement, optionally with its cells initialized by parsing
   * the provided CSArrangementString.
   * @param csArrangementString - A CSArrangementString expression
   * of the sixteen cells contained in the arrangement. Optional. Default cells
   * are created if no value is provided.
   */
  public constructor(csArrangementString?: CSArrangementString) {
    if (isType(csArrangementString, 'CSArrangementString')) {
      this.cells = [];
      for (let csArrangementCellString of segmentString(
        csArrangementString,
        6
      )) {
        this.cells.push(new ArrangementCell(csArrangementCellString));
      }
    } else if (csArrangementString === undefined) {
      this.cells = times(16, () => new ArrangementCell());
    } else {
      throw new CaveBoyError(
        `An invalid combination of arguments was provided to the CSArrangement constructor: ${arguments}.`
      );
    }

    this.cachedImageDataByCSPaletteString = {};
    this.cachedCanvasesByCSPaletteString = {};
  }

  /**
   * Create or retrieve a cached 32 x 32 CaveBoyImageData object displaying the
   * cells of the Arrangement as they would appear in-game with the provided
   * Minitiles and Palette.
   * @param minitiles - The array of Minitiles from which to retrieve the
   * displayed Minitile for each cell.
   * @param palette - The Palette from which to retrieve the applied
   * Subpalette for each cell.
   * @param colorComponentScalerName - The name of the ColorComponentScaler to
   * use when converting from the five-bit component values of the Colors to the
   * eight-bit color component values of the image data. Optional. Defaults to
   * the user-configured scaler.
   * @returns A 32 x 32 CaveBoyImageData object displaying the cells of the
   * arrangement as they would appear in-game with the provided Minitiles and
   * Palette.
   */
  public getImageData(
    minitiles: Minitile[],
    palette: Palette,
    colorComponentScalerName?: ColorComponentScalerName
  ): CaveBoyImageData {
    const cacheKey = palette.toCSPaletteString();

    if (this.cachedImageDataByCSPaletteString[cacheKey] === undefined) {
      const cbImageData = new CaveBoyImageData(32, 32);

      for (let cellNumber = 0; cellNumber < this.cells.length; ++cellNumber) {
        let targetXOrigin = (cellNumber % 4) * 8;
        let targetYOrigin = (cellNumber >>> 2) * 8;
        cbImageData.putImageData(
          this.cells[cellNumber].getImageData(
            minitiles,
            palette,
            colorComponentScalerName
          ),
          targetXOrigin,
          targetYOrigin
        );
      }

      this.cachedImageDataByCSPaletteString[cacheKey] = cbImageData;
    }

    return this.cachedImageDataByCSPaletteString[cacheKey];
  }

  /**
   * Create or retrieve a cached a 32 x 32 HTMLCanvasElement object displaying
   * the cells of the Arrangement as they would appear in-game with the
   * provided Minitiles and Palette.
   * @param minitiles - The array of Minitiles from which to retrieve the
   * displayed Minitile for each cell.
   * @param palette - The Palette from which to retrieve the applied
   * Subpalette for each cell.
   * @param colorComponentScalerName - The name of the ColorComponentScaler to
   * use when converting from the five-bit component values of the Colors to the
   * eight-bit color component values of the image data. Optional. Defaults to
   * the user-configured scaler.
   * @returns A 32 x 32 HTMLCanvasElement object displaying the cells of the
   * Arrangement as they would appear in-game with the provided Minitiles and
   * Palette.
   */
  public getCanvas(
    minitiles: Minitile[],
    palette: Palette,
    colorComponentScalerName?: ColorComponentScalerName
  ): HTMLCanvasElement {
    const cacheKey = palette.toCSPaletteString();

    if (this.cachedCanvasesByCSPaletteString[cacheKey] === undefined) {
      const arrangementCanvas = document.createElement(
        'CANVAS'
      ) as HTMLCanvasElement;
      arrangementCanvas.width = 32;
      arrangementCanvas.height = 32;

      const arrangementContext = arrangementCanvas.getContext('2d', {
        alpha: false,
      });

      if (arrangementContext === null) {
        throw new CaveBoyError(
          'Could not retrieve canvas context while drawing Arrangement.'
        );
      }

      for (let i = 0; i < this.cells.length; ++i) {
        const cellCanvas = this.cells[i].getCanvas(
          minitiles,
          palette,
          colorComponentScalerName
        );

        const targetXOrigin = (i % 4) * 8;
        const targetYOrigin = (i >>> 2) * 8;
        arrangementContext.drawImage(cellCanvas, targetXOrigin, targetYOrigin);
      }

      this.cachedCanvasesByCSPaletteString[cacheKey] = arrangementCanvas;
    }

    return this.cachedCanvasesByCSPaletteString[cacheKey];
  }

  /**
   * Return an expression of this ArrangementCell as a 96-digit hexadecimal
   * CSArrangementString.
   * @returns An expression of this ArrangementCell as a 96-digit hexadecimal
   * CSArrangementString.
   */
  public toCSArrangementString(): CSArrangementString {
    return this.cells.reduce<CSArrangementString>(
      (as, ac) => (as += ac.toCSArrangementCellString()),
      ''
    );
  }
}
