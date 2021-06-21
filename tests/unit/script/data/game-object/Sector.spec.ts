import {
  CSMapSectorSetting,
  CSMapSectorTeleport,
  CSMapSectorTownMap,
  CSMapSectorTownMapArrow,
  CSMapSectorTownMapImage,
} from '@/script/base/enum-types';
import Sector from '@/script/data/game-object/Sector';
import { createCSMapSector } from '@/script/data/yaml-object/CSMapSector';
import { expect } from 'chai';

describe('Sector', function () {
  describe('constructor()', function () {
    it('Initializes properties from CSMapSector.', function () {
      const csMapSector = createCSMapSector();
      csMapSector['Item'] = 2;
      csMapSector['Music'] = 2;
      csMapSector['Palette'] = 2;
      csMapSector['Setting'] = CSMapSectorSetting.ExitMouseUsable;
      csMapSector['Teleport'] = CSMapSectorTeleport.Disabled;
      csMapSector['Tileset'] = 2;
      csMapSector['Town Map'] = CSMapSectorTownMap.Twoson;
      csMapSector['Town Map Image'] = CSMapSectorTownMapImage.Twoson;
      csMapSector['Town Map Arrow'] = CSMapSectorTownMapArrow.Right;
      csMapSector['Town Map X'] = 2;
      csMapSector['Town Map Y'] = 2;

      const sector = new Sector(csMapSector);

      expect(sector.allowedType58ItemNumber).to.equal(2);
      expect(sector.mapMusicEntryNumber).to.equal(2);
      expect(sector.paletteNumber).to.equal(2);
      expect(sector.otherAttribute).to.equal(
        CSMapSectorSetting.ExitMouseUsable
      );
      expect(sector.disablePSITeleport).to.be.true;
      expect(sector.graphicSetNumber).to.equal(2);
      expect(sector.townMap).to.equal(CSMapSectorTownMap.Twoson);
      expect(sector.townMapImage).to.equal(CSMapSectorTownMapImage.Twoson);
      expect(sector.townMapPlayerIconArrow).to.equal(
        CSMapSectorTownMapArrow.Right
      );
      expect(sector.townMapPlayerIconXPosition).to.equal(2);
      expect(sector.townMapPlayerIconYPosition).to.equal(2);
    });

    it('Creates an empty instance with default field values.', function () {
      expect(new Sector()).to.eql(new Sector(createCSMapSector()));
    });
  });
  
  describe('getCSMapSector()', function () {
    it('Returns a CSMapSector with all field changes applied.', function () {
      const sector = new Sector();
      sector.allowedType58ItemNumber = 2;
      sector.mapMusicEntryNumber = 2;
      sector.paletteNumber = 2;
      sector.otherAttribute = CSMapSectorSetting.ExitMouseUsable;
      sector.disablePSITeleport = false;
      sector.graphicSetNumber = 2;
      sector.townMap = CSMapSectorTownMap.Twoson
      sector.townMapImage = CSMapSectorTownMapImage.Twoson
      sector.townMapPlayerIconArrow = CSMapSectorTownMapArrow.Right;
      sector.townMapPlayerIconXPosition = 2
      sector.townMapPlayerIconYPosition = 2

      const csMapSector = createCSMapSector();
      csMapSector['Item'] = 2;
      csMapSector['Music'] = 2;
      csMapSector['Palette'] = 2;
      csMapSector['Setting'] = CSMapSectorSetting.ExitMouseUsable;
      csMapSector['Teleport'] = CSMapSectorTeleport.Enabled;
      csMapSector['Tileset'] = 2;
      csMapSector['Town Map'] = CSMapSectorTownMap.Twoson;
      csMapSector['Town Map Image'] = CSMapSectorTownMapImage.Twoson;
      csMapSector['Town Map Arrow'] = CSMapSectorTownMapArrow.Right;
      csMapSector['Town Map X'] = 2;
      csMapSector['Town Map Y'] = 2;
      
      expect(sector.getCSMapSector()).to.eql(csMapSector);
    });

    it('Preserves properties when initialized with a CSMapSector object.', function () {
      const csMapSector1 = createCSMapSector();
      (csMapSector1 as any).unknownField1 = 'value 1';
      (csMapSector1 as any).unknownField2 = 'value 2';

      const sector = new Sector(csMapSector1);
      const csMapSector2 = sector.getCSMapSector();

      expect((csMapSector2 as any).unknownField1).to.equal('value 1');
      expect((csMapSector2 as any).unknownField2).to.equal('value 2');
    });
  });
});
