import {
  parseAllFTSFileContents,
  parseMapSectorsFileContents,
  parseMapTilesFileContents,
} from '@/script/base/data-marshaling';
import { Project } from '@/script/data/Project';
import mapSectorsFileContents from '../../../assets/project/map_sectors.yml';
import mapTilesFileContents from '../../../assets/project/map_tiles.map';
import ftsFile00Contents from '../../../assets/project/Tilesets/00.fts';
import ftsFile01Contents from '../../../assets/project/Tilesets/01.fts';
import ftsFile02Contents from '../../../assets/project/Tilesets/02.fts';
import ftsFile03Contents from '../../../assets/project/Tilesets/03.fts';
import ftsFile04Contents from '../../../assets/project/Tilesets/04.fts';
import ftsFile05Contents from '../../../assets/project/Tilesets/05.fts';
import ftsFile06Contents from '../../../assets/project/Tilesets/06.fts';
import ftsFile07Contents from '../../../assets/project/Tilesets/07.fts';
import ftsFile08Contents from '../../../assets/project/Tilesets/08.fts';
import ftsFile09Contents from '../../../assets/project/Tilesets/09.fts';
import ftsFile10Contents from '../../../assets/project/Tilesets/10.fts';
import ftsFile11Contents from '../../../assets/project/Tilesets/11.fts';
import ftsFile12Contents from '../../../assets/project/Tilesets/12.fts';
import ftsFile13Contents from '../../../assets/project/Tilesets/13.fts';
import ftsFile14Contents from '../../../assets/project/Tilesets/14.fts';
import ftsFile15Contents from '../../../assets/project/Tilesets/15.fts';
import ftsFile16Contents from '../../../assets/project/Tilesets/16.fts';
import ftsFile17Contents from '../../../assets/project/Tilesets/17.fts';
import ftsFile18Contents from '../../../assets/project/Tilesets/18.fts';
import ftsFile19Contents from '../../../assets/project/Tilesets/19.fts';
import { createCanvas } from '../../../test-methods';

function createProject(): Project {
  const ftsFileContentsByTilesetNumber: string[] = [
    ftsFile00Contents,
    ftsFile01Contents,
    ftsFile02Contents,
    ftsFile03Contents,
    ftsFile04Contents,
    ftsFile05Contents,
    ftsFile06Contents,
    ftsFile07Contents,
    ftsFile08Contents,
    ftsFile09Contents,
    ftsFile10Contents,
    ftsFile11Contents,
    ftsFile12Contents,
    ftsFile13Contents,
    ftsFile14Contents,
    ftsFile15Contents,
    ftsFile16Contents,
    ftsFile17Contents,
    ftsFile18Contents,
    ftsFile19Contents,
  ];

  const [graphicSets, tilesets] = parseAllFTSFileContents(
    ftsFileContentsByTilesetNumber
  );

  return {
    graphicSets: graphicSets,
    tilesets: tilesets,
    sectors: parseMapSectorsFileContents(mapSectorsFileContents),
    mapCells: parseMapTilesFileContents(mapTilesFileContents),
  };
}

const mapWidthInCells = 256;
const mapHeightInCells = 320;

const sectorWidthInCells = 8;
const sectorHeightInCells = 4;

const arrangementWidthInPixels = 32;
const arrangementHeightInPixels = 32;

const project = createProject();

let startTime = new Date();
const [canvas, context] = createCanvas(
  1,
  mapWidthInCells * arrangementWidthInPixels, //3 * 32 * 8,
  mapHeightInCells * arrangementHeightInPixels //4 * 32 * 4
);

for (let mapCell of project.mapCells) {
  const sectorNumber = mapCell.getZoneIndex(
    mapWidthInCells,
    sectorWidthInCells,
    sectorHeightInCells
  );

  // if (![0, 1, 2, 32, 33, 34, 64, 65, 66, 96, 97, 98].includes(sectorNumber)) {
  //   continue;
  // }

  const cellXInPixels =
    mapCell.getXCoordinate(mapWidthInCells) * arrangementWidthInPixels;
  const cellYInPixels =
    mapCell.getYCoordinate(mapWidthInCells) * arrangementHeightInPixels;

  const sector = project.sectors[sectorNumber];
  const graphicSet = project.graphicSets[sector.graphicSetNumber];
  const tileset = project.tilesets[graphicSet.tilesetNumber];
  const palette = graphicSet.palettes[sector.paletteNumber];

  tileset.arrangements[mapCell.arrangementNumber]
    .getImageBitmap(tileset.minitiles, palette)
    .then((imageBitmap) => {
      context.drawImage(imageBitmap, cellXInPixels, cellYInPixels);
    });
}

let endTime = new Date();
let seconds = (endTime.getTime() - startTime.getTime()) / 1000;
console.log(seconds);
