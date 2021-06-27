import { CaveBoyConfiguration } from '@/script/base/CaveBoyConfiguration';

(window as any).caveBoyConfiguration = new CaveBoyConfiguration();

import '../unit/script/data/Project.spec';
import '../unit/script/base/CaveBoyImageData.spec';
import '../unit/script/data/yaml-object/CSMapSector.spec';

import '../unit/script/data/game-object/Arrangement.spec';
import '../unit/script/data/game-object/ArrangementCell.spec';
import '../unit/script/data/game-object/Color.spec';
import '../unit/script/data/game-object/GraphicSet.spec';
import '../unit/script/data/game-object/MapCell.spec';
import '../unit/script/data/game-object/Minitile.spec';
import '../unit/script/data/game-object/MinitileLayer.spec';
import '../unit/script/data/game-object/Palette.spec';
import '../unit/script/data/game-object/Sector.spec';
import '../unit/script/data/game-object/Subpalette.spec';
import '../unit/script/data/game-object/Tileset.spec';
import '../unit/script/base/data-marshaling.spec';
import '../unit/script/base/enum-types.spec';
import '../unit/script/base/helpers.spec';
import '../unit/script/base/primitive-types.spec';
