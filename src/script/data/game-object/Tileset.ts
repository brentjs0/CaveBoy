import CaveBoyError from '@/script/base/error/CaveBoyError';
import Arrangement from '@/script/data/game-object/Arrangement';
import Minitile from '@/script/data/game-object/Minitile';
import times from 'lodash/times';

/**
 * A set of Minitiles and their Arrangements that can be
 * associated to one or more SectorGraphicsSets by
 * tilesetNumber. Determines the actual Arrangements that
 * populate each MapCell in a Sector with a given
 * SectorGraphicsSet.
 *
 * This class roughly correlates to the minitiles,
 * arrangements, and collisions fields of an EbTileset
 * object in the CoilSnake source.
 */
export default class Tileset {
  /**
   * An array of 512 Minitiles that can be used in this
   * Tileset's Arrangements.
   */
  public minitiles: Minitile[];

  /**
   * An array of 1024 Arrangements that can be assigned to
   * MapCells by arrangementNumber.
   */
  public arrangements: Arrangement[];

  /**
   * Instantiate a Tileset, with the minitiles and arrangements
   * optionally initialized by parsing the provided minitile
   * and arrangement regions from an *.fts file.
   * @param ftsMinitileRegionString - The string contents of the
   * first region of an *.fts file.
   * @param ftsArrangementRegionString - The string contents of
   * the third region of an *.fts file.
   */
  public constructor(
    ftsMinitileRegionString?: string,
    ftsArrangementRegionString?: string
  ) {
    if (typeof ftsMinitileRegionString === 'string') {
      const coilSnakeMinitileStrings = ftsMinitileRegionString.split(
        /(?:\n\n|\r\n\r\n|\r\r)/
      );

      if (coilSnakeMinitileStrings.length !== 512) {
        throw new CaveBoyError(
          'Parameter ftsMinitileRegionString could not be divided into 512 CoilSnakeMinitileStrings.'
        );
      }

      this.minitiles = coilSnakeMinitileStrings.map(
        (csmts) => new Minitile(csmts)
      );
    } else if (ftsMinitileRegionString === undefined) {
      this.minitiles = times(512, () => new Minitile());
    } else {
      throw new CaveBoyError(
        'Parameter ftsMinitileRegionString was not of a valid type.'
      );
    }

    if (typeof ftsArrangementRegionString === 'string') {
      const coilSnakeArrangementStrings = ftsArrangementRegionString
        .split(/(?:\r\n|\n|\r)/)
        .filter((csas) => csas !== '');

      if (coilSnakeArrangementStrings.length !== 1024) {
        throw new CaveBoyError(
          'Parameter ftsArrangementRegionString could not be divided into 1024 CoilSnakeArrangementStrings.'
        );
      }

      this.arrangements = coilSnakeArrangementStrings.map(
        (csas) => new Arrangement(csas)
      );
    } else if (ftsArrangementRegionString === undefined) {
      this.arrangements = times(1024, () => new Arrangement());
    } else {
      throw new CaveBoyError(
        'Parameter ftsArrangementRegionString was not of a valid type.'
      );
    }
  }
}
