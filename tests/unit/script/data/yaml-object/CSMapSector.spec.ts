import {
  CSMapSectorSetting,
  CSMapSectorTeleport,
} from '@/script/base/enum-types';
import {
  createCSMapSector,
  validateCSMapSector,
} from '@/script/data/yaml-object/CSMapSector';
import { expect } from 'chai';

describe('CSMapSector', function () {
  function getDefaultCSMapSectorObject(): any {
    return {
      'Item': 0,
      'Music': 0,
      'Palette': 0,
      'Setting': 'none',
      'Teleport': 'enabled',
      'Tileset': 0,
      'Town Map': 'none',
      'Town Map Arrow': 'none',
      'Town Map Image': 'none',
      'Town Map X': 0,
      'Town Map Y': 0,
    };
  }

  describe('createCSMapSector()', function () {
    it('Returns a valid CSMapSector.', function () {
      const csMapSector = createCSMapSector();
      expect([...validateCSMapSector(csMapSector)].length).to.equal(0);
    });
  });

  describe('validateCSMapSector()', function () {
    it('Returns nothing for a valid CSMapSector.', function () {
      const obj1 = getDefaultCSMapSectorObject();
      expect([...validateCSMapSector(obj1)].length).to.equal(0);

      const obj2 = getDefaultCSMapSectorObject();
      obj2.Palette = 7;
      obj2.Setting = CSMapSectorSetting.IndoorsAndButterflies;
      expect([...validateCSMapSector(obj2)].length).to.equal(0);

      const obj3 = getDefaultCSMapSectorObject();
      obj3.Teleport = CSMapSectorTeleport.Disabled;
      obj3.Music = 100;
      obj3['Town Map X'] = 1;
      obj3['Town Map Y'] = 2;
      expect([...validateCSMapSector(obj3)].length).to.equal(0);
    });

    it('Returns an error message for every invalid property.', function () {
      const obj1 = getDefaultCSMapSectorObject();
      obj1['Town Map X'] = 'a string';
      obj1.Item = -1;
      expect([...validateCSMapSector(obj1)].length).to.equal(2);

      const obj2 = {
        'Item': 255,
        'Music': -10,
        'Palette': 9,
        'Setting': () => undefined,
        'Teleport': 'enable',
        //'Tileset': 0,
        'Town Map': '0',
        'Town Map Arrow': 'yes',
        'Town Map Image': 'large',
        'Town Map X': true,
        'Town Map Y': {},
      };
      expect([...validateCSMapSector(obj2)].length).to.equal(11);
    });

    it('Returns one error message when value is not an object instance.', function () {
      expect([...validateCSMapSector(18.9)].length).to.equal(1);
      expect([...validateCSMapSector(null)].length).to.equal(1);
    });
  });
});
