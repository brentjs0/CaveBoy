import CaveBoyError from '@/script/base/error/CaveBoyError';
import { isValidNumber } from '@/script/base/primitive-types';

/**
 * A cell in the 256 x 320 game map. Its value is an index that refers
 * to an Arrangement in a Tilset.
 *
 * This class roughly correlates with a single element in the tiles
 * array of a MapModule object in the CoilSnake source.
 */
export default class MapCell {
  /**
   * The number (0 through 81919) that uniquely identifies this MapCell
   * within a project. This is also its index in the project's array
   * of 81920 MapCells.
   */
  public idNumber: number;

  /**
   * The index of the Arrangment that is displayed in this MapCell.
   * The Arrangements array to which it refers is provided by whatever
   * Tileset is used by the GraphicSet assigned to the Sector in which
   * this MapCell is contained.
   */
  public arrangementNumber: number;

  /**
   * Instantiate a MapCell with the provided idNumber and value
   * (arrangementNumber).
   * @param idNumber - The index of this MapCell in the project's
   * array of MapCells.
   * @param arrangementNumber - The index of the Arrangement
   * that should be displayed in this MapCell.
   */
  public constructor(idNumber: number, arrangementNumber: number) {
    if (!isValidNumber(arrangementNumber, 0, 1023)) {
      throw new CaveBoyError(
        `The arrangementNumber value of MapCell ${idNumber} was '${arrangementNumber}'. Expected an integer from 0 to 1023.`
      );
    }

    this.idNumber = idNumber;
    this.arrangementNumber = arrangementNumber;
  }

  public getXCoordinate(mapWidthInCells: number): number {
    return this.idNumber % mapWidthInCells;
  }

  public getYCoordinate(mapWidthInCells: number): number {
    return Math.floor(this.idNumber / mapWidthInCells);
  }

  public getZoneXCoordinate(mapWidthInCells: number, zoneWidthInCells: number) {
    return Math.floor(this.getXCoordinate(mapWidthInCells) / zoneWidthInCells);
  }

  public getZoneYCoordinate(
    mapWidthInCells: number,
    zoneHeightInCells: number
  ) {
    return Math.floor(this.getYCoordinate(mapWidthInCells) / zoneHeightInCells);
  }

  public getZoneIndex(
    mapWidthInCells: number,
    zoneWidthInCells: number,
    zoneHeightInCells: number
  ) {
    const mapWidthInZones = mapWidthInCells / zoneWidthInCells;
    return (
      mapWidthInZones *
        this.getZoneYCoordinate(mapWidthInCells, zoneHeightInCells) +
      this.getZoneXCoordinate(mapWidthInCells, zoneWidthInCells)
    );
  }
}
