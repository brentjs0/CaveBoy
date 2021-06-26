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
    this.idNumber = idNumber;
    this.arrangementNumber = arrangementNumber;
  }
}
