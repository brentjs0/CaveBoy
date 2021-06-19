import { isEnumType } from '@/script/base/enum-types';
import { expect } from 'chai';

describe('enum-types', function () {
  describe("isEnumType<'CSMapSectorSetting'>()", function () {
    it('Returns true for enum members', function () {
      expect(isEnumType('none', 'CSMapSectorSetting')).to.be.true;
      expect(isEnumType('indoors', 'CSMapSectorSetting')).to.be.true;
      expect(isEnumType('lost underworld sprites', 'CSMapSectorSetting')).to.be
        .true;
    });
    it('Returns false for non-strings.', function () {
      expect(isEnumType(undefined, 'CSMapSectorSetting')).to.be.false;
      expect(isEnumType(null, 'CSMapSectorSetting')).to.be.false;
      expect(isEnumType(() => undefined, 'CSMapSectorSetting')).to.be.false;
      expect(isEnumType(9, 'CSMapSectorSetting')).to.be.false;
    });
    it('Returns false for case differences.', function () {
      expect(isEnumType('None', 'CSMapSectorSetting')).to.be.false;
      expect(isEnumType('Lost Underworld sprites', 'CSMapSectorSetting')).to.be
        .false;
    });
  });
});
