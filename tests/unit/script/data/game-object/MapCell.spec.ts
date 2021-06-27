import MapCell from '@/script/data/game-object/MapCell';
import { expect } from 'chai';

describe('MapCell', function () {
  describe('constructor()', function () {
    it("Throws an exception when arrangementNumber isn't an integer from 0 to 1023.", function () {
      expect(() => new MapCell(0, NaN)).to.throw();
      expect(() => new MapCell(0, -5)).to.throw();
      expect(() => new MapCell(0, 100000)).to.throw();
      expect(() => new MapCell(0, '' as any)).to.throw();
      expect(() => new MapCell(0, (() => 0) as any)).to.throw();
    });
  });
});
