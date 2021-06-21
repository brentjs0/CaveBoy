import {
  CSMapSectorSetting,
  CSMapSectorTeleport,
  CSMapSectorTownMap,
  CSMapSectorTownMapArrow,
  CSMapSectorTownMapImage,
} from '@/script/base/enum-types';
import { Uint3, Uint5 } from '@/script/base/primitive-types';
import {
  createCSMapSector,
  CSMapSector,
} from '@/script/data/yaml-object/CSMapSector';

export default class Sector {
  private csMapSector: CSMapSector;

  /**
   * The number of an item (an item_configuration_table.yml entry) to
   * allow for out-of-battle use in this Sector. This should either
   * be the number of an item with a CoilSnake Type value of 58 (e.g.
   * Bicycle, Hawk eye, Zombie paper) or the number 0 to indicate that
   * no item is usable.
   *
   * After Giygas is defeated, the Bicycle becomes usable in Sectors
   * with a value of 0.
   * 
   * This corresponds to the Item field in map_sectors.yml.
   */
  public allowedType58ItemNumber: number;

  /**
   * The number of the entry in map_music.yml that should control the
   * music tracks that play in this sector.
   * 
   * This corresponds to the Music field in map_sectors.yml.
   */
  public mapMusicEntryNumber: number;

  /**
   * A number indicating which of the Palettes in the GraphicSet
   * assigned to this Sector should provide colors when drawing the
   * arrangements in this Sector. Can be any integer from 0 to 7,
   * but not all GraphicSets have eight Palettes.
   *
   * This indicated Palette can be superseded by the Colors of an
   * Event Palette if the appropriate flag is set.
   * 
   * This corresponds to the Palette field in map_sectors.yml.
   */
  public paletteNumber: Uint3;

  /**
   * A miscellaneous additional attribute that can be assigned
   * to a given Sector. Controls things such as the player character
   * sprites used, the appearance of magic butterflies, and whether
   * the Sector is treated as indoors.
   * 
   * This corresponds to the Setting field in map_sectors.yml.
   */
  public otherAttribute: CSMapSectorSetting;

  /**
   * Whether to disallow the player from using PSI Teleport in 
   * this Sector.
   * 
   * This corresponds to the Teleport field in map_sectors.yml.
   */
  public disablePSITeleport: boolean;

  /**
   * A number from 0 to 31 indicating which of the GraphicSets
   * should be used when drawing this Sector. The indicated
   * GraphicSet determines which Tileset (i.e which set of
   * Minitiles and Arrangements) is used, as well as which
   * set of Palettes is available to choose from for providing
   * color data for the tiles.
   * 
   * This corresponds to the Tileset field in map_sectors.yml.
   */
  public graphicSetNumber: Uint5;

  /**
   * Seems to associate the Sector with a Town Map, even when
   * the town map is not usable in this Sector. More research
   * is necessary.
   * 
   * This corresponds to the Town Map field in map_sectors.yml.
   */
  public townMap: CSMapSectorTownMap;

  /**
   * The town map to display when the 'Town map' item is used in this
   * Sector, if any.
   * 
   * This corresponds to the Town Map Image field in map_sectors.yml.
   */
  public townMapImage: CSMapSectorTownMapImage;

  /**
   * The arrow icon that should be shown next to the icon representing
   * the player's current location on the town map when the player is
   * in this Sector, if any.
   * 
   * This corresponds to the Town Map Arrow field in map_sectors.yml.
   */
  public townMapPlayerIconArrow: CSMapSectorTownMapArrow;

  /**
   * The horizontal position at which to display the icon
   * representing the player's current location on the town map
   * when the player is in this Sector.
   * 
   * This corresponds to the Town Map X field in map_sectors.yml.
   */
  public townMapPlayerIconXPosition: number;

  /**
   * The vertical position at which to display the icon
   * representing the player's current location on the town map
   * when the player is in this Sector.
   * 
   * This corresponds to the Town Map Y field in map_sectors.yml.
   */
  public townMapPlayerIconYPosition: number;

  /**
   * Instantiate a Sector, optionally with its field values initialized
   * from the provided CSMapSector.
   * @param csMapSector - A CSMapSector object parsed from a node in the
   * map_sectors.yml file of a CoilSnake project. If provided, it will be
   * used to initialize the Sector's field values and be stored privately
   * to retain any unknown fields. Otherwise, default values will be
   * used.
   */
  public constructor(csMapSector?: CSMapSector) {
    this.csMapSector =
      csMapSector === undefined ? createCSMapSector() : csMapSector;

    this.allowedType58ItemNumber = this.csMapSector['Item'];
    this.mapMusicEntryNumber = this.csMapSector['Music'];
    this.paletteNumber = this.csMapSector['Palette'];
    this.otherAttribute = this.csMapSector['Setting'];
    this.disablePSITeleport =
      this.csMapSector['Teleport'] === CSMapSectorTeleport.Disabled;
    this.graphicSetNumber = this.csMapSector['Tileset'];
    this.townMap = this.csMapSector['Town Map'];
    this.townMapImage = this.csMapSector['Town Map Image'];
    this.townMapPlayerIconArrow = this.csMapSector['Town Map Arrow'];
    this.townMapPlayerIconXPosition = this.csMapSector['Town Map X'];
    this.townMapPlayerIconYPosition = this.csMapSector['Town Map Y'];
  }

  /**
   * Return a CSMapSector object containing all of the field values
   * for this Sector ready to be serialized as CoilSnake-compliant
   * YAML.
   * @returns A CSMapSector object containing all of the field values
   * for this Sector ready to be serialized as CoilSnake-compliant
   * YAML.
   */
  public getCSMapSector(): CSMapSector {
    this.csMapSector['Item'] = this.allowedType58ItemNumber;
    this.csMapSector['Music'] = this.mapMusicEntryNumber;
    this.csMapSector['Palette'] = this.paletteNumber;
    this.csMapSector['Setting'] = this.otherAttribute;
    this.csMapSector['Teleport'] = this.disablePSITeleport
      ? CSMapSectorTeleport.Disabled
      : CSMapSectorTeleport.Enabled;
    this.csMapSector['Tileset'] = this.graphicSetNumber;
    this.csMapSector['Town Map'] = this.townMap;
    this.csMapSector['Town Map Image'] = this.townMapImage;
    this.csMapSector['Town Map Arrow'] = this.townMapPlayerIconArrow;
    this.csMapSector['Town Map X'] = this.townMapPlayerIconXPosition;
    this.csMapSector['Town Map Y'] = this.townMapPlayerIconYPosition;

    return this.csMapSector;
  }
}
