import CaveBoyError from '@/script/base/error/CaveBoyError';
import {
  CoilSnakeGraphicSetString,
  isType,
} from '@/script/base/primitive-types';
import GraphicSet from '@/script/data/game-object/GraphicSet';
import Tileset from '@/script/data/game-object/Tileset';

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

  for (let coilSnakeGraphicSetString of splitCoilSnakeGraphicSetStrings(
    ftsFileRegions[1]
  )) {
    let graphicSet = new GraphicSet(coilSnakeGraphicSetString, tilesetNumber);
    graphicSets[graphicSet.idNumber] = graphicSet;
  }

  return [tileset, graphicSets];
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
    .map((mt) => mt.toCoilSnakeMinitileString())
    .join('\n\n');

  const graphicSetRegion = graphicSets
    .filter((sgs) => sgs.tilesetNumber == tilesetNumber)
    .map((sgs) => sgs.toCoilSnakeGraphicSetString())
    .join('\n');

  const arrangementRegion = tileset.arrangements
    .map((a) => a.toCoilSnakeArrangementString())
    .join('\n');

  // prettier-ignore
  return `${minitileRegion}\n\n\n${graphicSetRegion}\n\n\n${arrangementRegion}\n`;
}

function* splitCoilSnakeGraphicSetStrings(
  graphicSetStringRegion: string
): Generator<CoilSnakeGraphicSetString> {
  graphicSetStringRegion = graphicSetStringRegion.trim();

  if (graphicSetStringRegion.length < 290) {
    throw new CaveBoyError(
      'The data passed to splitCoilSnakeGraphicSetStrings() was too short.'
    );
  }

  let currentGraphicSetSetStartIndex = 0;
  let currentGraphicSetId = graphicSetStringRegion[0];
  let coilSnakeGraphicSetString;

  for (let h = -1, i = 0; i < graphicSetStringRegion.length; ++h, ++i) {
    let previousChar = getCharacterIfExists(graphicSetStringRegion, h);
    let char = graphicSetStringRegion[i];

    if (
      isEndOfLineCharacter(previousChar) &&
      !isEndOfLineCharacter(char) &&
      char !== currentGraphicSetId
    ) {
      coilSnakeGraphicSetString = graphicSetStringRegion
        .substring(currentGraphicSetSetStartIndex, i)
        .trim();

      if (!isType(coilSnakeGraphicSetString, 'CoilSnakeGraphicSetString')) {
        throw new CaveBoyError(
          `splitCoilSnakeGraphicSetStrings() encountered a value that is not a CoilSnakeGraphicSetString:\n${coilSnakeGraphicSetString}`
        );
      }

      yield coilSnakeGraphicSetString;

      currentGraphicSetSetStartIndex = i;
      currentGraphicSetId = char;
    }
  }

  coilSnakeGraphicSetString = graphicSetStringRegion
    .substring(currentGraphicSetSetStartIndex)
    .trim();

  if (!isType(coilSnakeGraphicSetString, 'CoilSnakeGraphicSetString')) {
    throw new CaveBoyError(
      `splitCoilSnakeGraphicSetStrings() encountered a value that is not a CoilSnakeGraphicSetString:\n${coilSnakeGraphicSetString}`
    );
  }

  yield coilSnakeGraphicSetString;
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
