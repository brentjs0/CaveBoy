import CaveBoyError from '@/script/base/error/CaveBoyError';
import {
  CSGraphicSetString,
  isType,
  isValidNumber,
} from '@/script/base/primitive-types';
import GraphicSet from '@/script/data/game-object/GraphicSet';
import Tileset from '@/script/data/game-object/Tileset';
import jsYaml from 'js-yaml';
import MapCell from '@/script/data/game-object/MapCell';
import Sector from '@/script/data/game-object/Sector';
import { validateCSMapSector } from '@/script/data/yaml-object/CSMapSector';

/**
 * Return the Tileset and GraphicSets encoded in the provided *.fts
 * file contents.
 * @param tilesetNumber - The number of the tileset being parsed. The
 * filename usually contains this number.
 * @param ftsFileContents - The string contents of an *.fts file.
 * @returns The Tileset and GraphicSets encoded in the provided *.fts
 * file contents.
 */
export function parseFTSFileContents(
  tilesetNumber: number,
  ftsFileContents: string
): [Tileset, GraphicSet[]] {
  const ftsFileRegions: string[] = ftsFileContents.split(
    /(?:\n\n\n|\r\n\r\n\r\n|\r\r\r)/
  );

  if (ftsFileRegions.length != 3) {
    throw new CaveBoyError('An *.fts file did not contain three regions.');
  }

  const tileset = new Tileset(ftsFileRegions[0], ftsFileRegions[2]);
  const graphicSets = [];

  for (let csGraphicSetString of splitCSGraphicSetStrings(ftsFileRegions[1])) {
    let graphicSet = new GraphicSet(csGraphicSetString, tilesetNumber);
    graphicSets[graphicSet.idNumber] = graphicSet;
  }

  return [tileset, graphicSets];
}

/**
 * Return all the Tilesets and GraphicSets encoded in the provided
 * array of *.fts file contents.
 * @param ftsFileContentsByTilesetNumber - An array holding the
 * contents of every *.fts file in a project. The indexes of the
 * array must match the file numbers.
 * @returns All the Tilesets and GraphicSets encoded in the
 * provided array of *.fts file contents.
 */
export function parseAllFTSFileContents(
  ftsFileContentsByTilesetNumber: string[]
): [GraphicSet[], Tileset[]] {
  const graphicSets: GraphicSet[] = [];
  const tilesets: Tileset[] = [];

  for (
    let tilesetNumber = 0;
    tilesetNumber < ftsFileContentsByTilesetNumber.length;
    ++tilesetNumber
  ) {
    let [tileset, graphicSetsInFile] = parseFTSFileContents(
      tilesetNumber,
      ftsFileContentsByTilesetNumber[tilesetNumber]
    );

    tilesets[tilesetNumber] = tileset;

    // Array.prototype.forEach() skips undefined array elements.
    graphicSetsInFile.forEach((gs) => (graphicSets[gs.idNumber] = gs));
  }

  return [graphicSets, tilesets];
}

/**
 * Return the provided Tileset and its related GraphicSets
 * from the provided array serialized in the format of an *.fts file.
 * @param tilesetNumber - The number of the tileset being parsed. This
 * will most likely correspond with the filename.
 * @param tileset - The Tileset containing the Minitiles and Arrangements
 * to be serialized.
 * @param graphicSets - An array containing all of the
 * GraphicSets related to the provide Tileset.
 * @returns The provided Tileset and its related GraphicSets
 * from the provided array serialized in the format of an *.fts file.
 */
export function buildFTSFileContents(
  tilesetNumber: number,
  tileset: Tileset,
  graphicSets: GraphicSet[]
): string {
  const minitileRegion = tileset.minitiles
    .map((mt) => mt.toCSMinitileString())
    .join('\n\n');

  const graphicSetRegion = graphicSets
    .filter((sgs) => sgs.tilesetNumber == tilesetNumber)
    .map((sgs) => sgs.toCSGraphicSetString())
    .join('\n');

  const arrangementRegion = tileset.arrangements
    .map((a) => a.toCSArrangementString())
    .join('\n');

  // prettier-ignore
  return `${minitileRegion}\n\n\n${graphicSetRegion}\n\n\n${arrangementRegion}\n`;
}

/**
 * Return a generator of CSGraphicSetString substrings of
 * the provided graphic set string region (which is second of the three
 * regions in an *.fts file).
 * @param graphicSetStringRegion - The string contents of the second of
 * the three regions in an *.fts file.
 * @returns A generator of CSGraphicSetString substrings of the
 * provided graphic set string region
 */
function* splitCSGraphicSetStrings(
  graphicSetStringRegion: string
): Generator<CSGraphicSetString> {
  graphicSetStringRegion = graphicSetStringRegion.trim();

  if (graphicSetStringRegion.length < 290) {
    throw new CaveBoyError(
      'The data passed to splitCSGraphicSetStrings() was too short.'
    );
  }

  let currentGraphicSetSetStartIndex = 0;
  let currentGraphicSetId = graphicSetStringRegion[0];
  let csGraphicSetString;

  for (let h = -1, i = 0; i < graphicSetStringRegion.length; ++h, ++i) {
    let previousChar = getCharacterIfExists(graphicSetStringRegion, h);
    let char = graphicSetStringRegion[i];

    if (
      isEndOfLineCharacter(previousChar) &&
      !isEndOfLineCharacter(char) &&
      char !== currentGraphicSetId
    ) {
      csGraphicSetString = graphicSetStringRegion
        .substring(currentGraphicSetSetStartIndex, i)
        .trim();

      if (!isType(csGraphicSetString, 'CSGraphicSetString')) {
        throw new CaveBoyError(
          `splitCSGraphicSetStrings() encountered a value that is not a CSGraphicSetString:\n${csGraphicSetString}`
        );
      }

      yield csGraphicSetString;

      currentGraphicSetSetStartIndex = i;
      currentGraphicSetId = char;
    }
  }

  csGraphicSetString = graphicSetStringRegion
    .substring(currentGraphicSetSetStartIndex)
    .trim();

  if (!isType(csGraphicSetString, 'CSGraphicSetString')) {
    throw new CaveBoyError(
      `splitCSGraphicSetStrings() encountered a value that is not a CSGraphicSetString:\n${csGraphicSetString}`
    );
  }

  yield csGraphicSetString;
}

/**
 * Return an array of all the Sector objects in the
 * provided string contents of a map_sectors.yml file.
 * @param mapSectorsFileContents - The contents of a
 * map_sectors.yml file as a string.
 * @returns An array of all the Sector objects in
 * the provided string.
 */
export function parseMapSectorsFileContents(
  mapSectorsFileContents: string
): Sector[] {
  const parsedYaml = jsYaml.load(mapSectorsFileContents);
  if (
    typeof parsedYaml !== 'object' ||
    parsedYaml === null ||
    Array.isArray(parsedYaml)
  ) {
    throw new CaveBoyError(
      'map_sectors.yml could not be parsed as a YAML object.'
    );
  }

  const sectors: Sector[] = [];
  let yamlEntries: [string, any][] = Object.entries(parsedYaml);
  for (let [propertyName, csMapSector] of yamlEntries) {
    let idNumber = parseInt(propertyName, 10);
    if (!isValidNumber(idNumber, 0)) {
      throw new CaveBoyError(
        `map_sectors.yml entry number '${propertyName}' was not a valid number.`
      );
    }
    let elementValidationMessages = [...validateCSMapSector(csMapSector)];
    if (elementValidationMessages.length > 0) {
      let errorMessage =
        `map_sectors.yml entry ${idNumber} was invalid:\n * ` +
        elementValidationMessages.join('\n * ');

      throw new CaveBoyError(errorMessage);
    }

    sectors[idNumber] = new Sector(idNumber, csMapSector);
  }

  // This accounts for undefined elements, unlike Array.prototype.length().
  let elementCount = sectors.reduce((total, _) => ++total, 0);
  if (elementCount !== 2560) {
    throw new CaveBoyError(
      `map_sectors.yml did not contain 2560 unique entry numbers. Are there missing or duplicated numbers?`
    );
  }

  return sectors;
}

/**
 * Return an array of all the MapCells in the provided
 * string contents of a map_tiles.map file.
 * @param mapSectorsFileContents - The contents of a
 * map_tiles.map file as a string.
 * @returns An array of all the MapCells in the provided
 * string contents of a map_tiles.map file.
 */
export function parseMapTilesFileContents(
  mapTilesFileContents: string
): MapCell[] {
  const mapCells: MapCell[] = [];

  const rowStrings = mapTilesFileContents.trim().split(/(?:\n|\r\n|\r)/);

  if (rowStrings.length !== 320) {
    throw new CaveBoyError(
      'map_tiles.map contained an invalid number of rows.'
    );
  }

  let idNumber = 0;
  for (let rowNumber = 0; rowNumber < 320; ++rowNumber) {
    let cellStrings = rowStrings[rowNumber].split(' ');

    if (cellStrings.length !== 256) {
      throw new CaveBoyError(
        `map_tiles.map row ${rowNumber} contained an invalid number of values.`
      );
    }

    for (let columnNumber = 0; columnNumber < 256; ++columnNumber) {
      let value = parseInt(cellStrings[columnNumber], 16);
      mapCells.push(new MapCell(idNumber, value));
      ++idNumber;
    }
  }

  return mapCells;
}

/**
 * Return the Arrangement numbers from the provided array of
 * 81,920 MapCells encoded as a string in the format of a
 * CoilSnake project's map_tiles.map file.
 * @param mapCells - An array of MapCell objects containing
 * the Arrangment numbers to be encoded.
 * @returns The provided array of MapCells encoded in the
 * format of a map_tiles.map file.
 */
export function buildMapTilesFileContents(mapCells: MapCell[]): string {
  let mapTilesFileContents = '';
  for (let i = 0; i < mapCells.length; ++i) {
    mapTilesFileContents += mapCells[i].arrangementNumber
      .toString(16)
      .padStart(3, '0');
    if ((i + 1) % 256 === 0) {
      mapTilesFileContents += '\n';
    } else {
      mapTilesFileContents += ' ';
    }
  }

  return mapTilesFileContents;
}

/**
 * Return an array of objects as YAML with unquoted numeric keys
 * at the top level for each index.
 * @param objects - An array of objects to serialize as YAML.
 * @returns An array of objects as YAML with unquoted numeric keys.
 */
export function dumpArrayAsYAMLWithNumericKeys(objects: object[]): string {
  let nodes = [];
  for (let i = 0; i < objects.length; ++i) {
    let node = `${i}:\n  `;
    node += jsYaml.dump(objects[i]).trim().split('\n').join('\n  ');
    nodes.push(node);
  }
  return `${nodes.join('\n')}\n`;
}

function getCharacterIfExists(str: string, characterIndex: number): string {
  if (characterIndex > 0 && characterIndex < str.length) {
    return str[characterIndex];
  }

  return '';
}

function isEndOfLineCharacter(character: string): boolean {
  return character === '\n' || character === '\r';
}
