import GraphicSet from '@/script/data/game-object/GraphicSet';
import MapCell from '@/script/data/game-object/MapCell';
import Sector from '@/script/data/game-object/Sector';
import Tileset from '@/script/data/game-object/Tileset';

export type Project = {
  graphicSets: GraphicSet[];
  tilesets: Tileset[];
  sectors: Sector[];
  mapCells: MapCell[];
};
