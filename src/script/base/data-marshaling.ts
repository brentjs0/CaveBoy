import CaveBoyError from '@/script/base/error/CaveBoyError';
import {
  CoilSnakeSectorGraphicsSetString,
  isType,
} from '@/script/base/primitive-types';
import SectorGraphicsSet from '@/script/data/game-object/SectorGraphicsSet';
import Tileset from '@/script/data/game-object/Tileset';

/**
 * Return the Tileset and SectorGraphicsSets encoded in the provided *.fts
 * file contents.
 * @param tilesetNumber - The number of the tileset being parsed. The
 * filename usually contains this number.
 * @param ftsFileContents - The string contents of an *.fts file.
 * @returns The Tileset and SectorGraphicsSets encoded in the provided *.fts
 * file contents.
 */
export function parseFTSFileContents(
  tilesetNumber: number,
  ftsFileContents: string
): [Tileset, SectorGraphicsSet[]] {
  const ftsFileRegions: string[] = ftsFileContents.split(
    /(?:\n\n\n|\r\n\r\n\r\n|\r\r\r)/
  );

  if (ftsFileRegions.length != 3) {
    throw new CaveBoyError('An *.fts file did not contain three regions.');
  }

  const tileset = new Tileset(ftsFileRegions[0], ftsFileRegions[2]);
  const sectorGraphicsSets = [];

  for (let coilSnakeSectorGraphicsSetString of splitCoilSnakeSectorGraphicsSetStrings(
    ftsFileRegions[1]
  )) {
    let sectorGraphicsSet = new SectorGraphicsSet(
      coilSnakeSectorGraphicsSetString,
      tilesetNumber
    );
    sectorGraphicsSets[sectorGraphicsSet.idNumber] = sectorGraphicsSet;
  }

  return [tileset, sectorGraphicsSets];
}

/**
 * Return the provided Tileset and its related SectorGraphicsSets
 * from the provided array serialized in the format of an *.fts file.
 * @param tilesetNumber - The number of the tileset being parsed. This
 * will most likely correspond with the filename.
 * @param tileset - The Tileset containing the Minitiles and Arrangements
 * to be serialized.
 * @param sectorGraphicsSets - An array containing all of the
 * SectorGraphicsSets related to the provide Tileset.
 * @returns The provided Tileset and its related SectorGraphicsSets
 * from the provided array serialized in the format of an *.fts file.
 */
export function buildFTSFileContents(
  tilesetNumber: number,
  tileset: Tileset,
  sectorGraphicsSets: SectorGraphicsSet[]
): string {
  const minitileRegion = tileset.minitiles
    .map((mt) => mt.toCoilSnakeMinitileString())
    .join('\n\n');

  const sectorGraphicsSetRegion = sectorGraphicsSets
    .filter((sgs) => sgs.tilesetNumber == tilesetNumber)
    .map((sgs) => sgs.toCoilSnakeSectorGraphicsSetString())
    .join('\n');

  const arrangementRegion = tileset.arrangements
    .map((a) => a.toCoilSnakeArrangementString())
    .join('\n');

  // prettier-ignore
  return `${minitileRegion}\n\n\n${sectorGraphicsSetRegion}\n\n\n${arrangementRegion}\n`;
}

function* splitCoilSnakeSectorGraphicsSetStrings(
  sectorGraphicsSetStringRegion: string
): Generator<CoilSnakeSectorGraphicsSetString> {
  sectorGraphicsSetStringRegion = sectorGraphicsSetStringRegion.trim();

  if (sectorGraphicsSetStringRegion.length < 290) {
    throw new CaveBoyError(
      'The data passed to splitCoilSnakeSectorGraphicsSetStrings() was too short.'
    );
  }

  let currentSectorGraphicsSetSetStartIndex = 0;
  let currentSectorGraphicsSetId = sectorGraphicsSetStringRegion[0];
  let coilSnakeSectorGraphicsSetString;

  for (let h = -1, i = 0; i < sectorGraphicsSetStringRegion.length; ++h, ++i) {
    let previousChar = getCharacterIfExists(sectorGraphicsSetStringRegion, h);
    let char = sectorGraphicsSetStringRegion[i];

    if (
      isEndOfLineCharacter(previousChar) &&
      !isEndOfLineCharacter(char) &&
      char !== currentSectorGraphicsSetId
    ) {
      coilSnakeSectorGraphicsSetString = sectorGraphicsSetStringRegion
        .substring(currentSectorGraphicsSetSetStartIndex, i)
        .trim();

      if (
        !isType(
          coilSnakeSectorGraphicsSetString,
          'CoilSnakeSectorGraphicsSetString'
        )
      ) {
        throw new CaveBoyError(
          `splitCoilSnakeSectorGraphicsSetStrings() encountered a value that is not a CoilSnakeSectorGraphicsSetString:\n${coilSnakeSectorGraphicsSetString}`
        );
      }

      yield coilSnakeSectorGraphicsSetString;

      currentSectorGraphicsSetSetStartIndex = i;
      currentSectorGraphicsSetId = char;
    }
  }

  coilSnakeSectorGraphicsSetString = sectorGraphicsSetStringRegion
    .substring(currentSectorGraphicsSetSetStartIndex)
    .trim();

  if (
    !isType(
      coilSnakeSectorGraphicsSetString,
      'CoilSnakeSectorGraphicsSetString'
    )
  ) {
    throw new CaveBoyError(
      `splitCoilSnakeSectorGraphicsSetStrings() encountered a value that is not a CoilSnakeSectorGraphicsSetString:\n${coilSnakeSectorGraphicsSetString}`
    );
  }

  yield coilSnakeSectorGraphicsSetString;
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
