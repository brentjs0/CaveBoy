import { isType } from '@/script/base/primitive-types';
import Color from '@/script/data/game-object/Color';
import Minitile from '@/script/data/game-object/Minitile';
import Subpalette from '@/script/data/game-object/Subpalette';
import { expect } from 'chai';
import times from 'lodash/times';

describe('Minitile', function () {
  describe('constructor()', function () {
    it('Initializes values from a CoilSnakeMinitileString.', function () {
      const minitile = new Minitile(
        '1111111111111111111111111111111111111111111111111111111111111111\r\n2222222222222222222222222222222222222222222222222222222222222222'
      );

      expect(minitile.backgroundLayer.colorNumbers).to.eql(times(64, () => 1));
      expect(minitile.foregroundLayer.colorNumbers).to.eql(times(64, () => 2));
    });
    it("Creates an empty instance with '0' for all color index values.", function () {
      const minitile = new Minitile();

      expect(minitile.backgroundLayer.colorNumbers).to.eql(times(64, () => 0));
      expect(minitile.foregroundLayer.colorNumbers).to.eql(times(64, () => 0));
    });
  });
  describe('getImageData()', function () {
    it('Generates an 8 x 8 CaveBoyImageData object.', function () {
      const cbImageData = new Minitile().getImageData(new Subpalette());
      expect(cbImageData.height).to.equal(8);
      expect(cbImageData.width).to.equal(8);
    });

    it('Draws overlapping layers with transparency.', function () {
      const subpalette = new Subpalette(
        '000uuqoqjqf9koivv0ieuv1b2vd5ncafevvpoojkkdgha666'
      );
      const cbImageData = new Minitile(
        '8888888888888888888888888888888888888888888888888888888888888888\r000fffff00f111110f277777f2777777f2717111f2171717f2177717f2717717'
      ).getImageData(subpalette);

      const one = new Color(30, 30, 26).toUint8ClampedArray();
      const two = new Color(24, 26, 19).toUint8ClampedArray();
      const svn = new Color(31, 1, 11).toUint8ClampedArray();
      const egt = new Color(2, 31, 13).toUint8ClampedArray();
      const eff = new Color(6, 6, 6).toUint8ClampedArray();

      // prettier-ignore
      const expectedDataValue = new Uint8ClampedArray([
          ...egt, ...egt, ...egt, ...eff, ...eff, ...eff, ...eff, ...eff,
          ...egt, ...egt, ...eff, ...one, ...one, ...one, ...one, ...one,
          ...egt, ...eff, ...two, ...svn, ...svn, ...svn, ...svn, ...svn,
          ...eff, ...two, ...svn, ...svn, ...svn, ...svn, ...svn, ...svn,
          ...eff, ...two, ...svn, ...one, ...svn, ...one, ...one, ...one,
          ...eff, ...two, ...one, ...svn, ...one, ...svn, ...one, ...svn,
          ...eff, ...two, ...one, ...svn, ...svn, ...svn, ...one, ...svn,
          ...eff, ...two, ...svn, ...one, ...svn, ...svn, ...one, ...svn,
        ]);

      expect(cbImageData.data).to.eql(expectedDataValue);
    });

    it('Flips image data vertically.', function () {
      const subpalette = new Subpalette(
        '000uuqoqjqf9koivv0ieuv1b2vd5ncafevvpoojkkdgha666'
      );
      const cbImageData = new Minitile(
        '8888888888888888888888888888888888888888888888888888888888888888\r000fffff00f111110f277777f2777777f2717111f2171717f2177717f2717717'
      ).getImageData(subpalette, false, true);

      const one = new Color(30, 30, 26).toUint8ClampedArray();
      const two = new Color(24, 26, 19).toUint8ClampedArray();
      const svn = new Color(31, 1, 11).toUint8ClampedArray();
      const egt = new Color(2, 31, 13).toUint8ClampedArray();
      const eff = new Color(6, 6, 6).toUint8ClampedArray();

      // prettier-ignore
      const expectedDataValue = new Uint8ClampedArray([
          ...eff, ...two, ...svn, ...one, ...svn, ...svn, ...one, ...svn,
          ...eff, ...two, ...one, ...svn, ...svn, ...svn, ...one, ...svn,
          ...eff, ...two, ...one, ...svn, ...one, ...svn, ...one, ...svn,
          ...eff, ...two, ...svn, ...one, ...svn, ...one, ...one, ...one,
          ...eff, ...two, ...svn, ...svn, ...svn, ...svn, ...svn, ...svn,
          ...egt, ...eff, ...two, ...svn, ...svn, ...svn, ...svn, ...svn,
          ...egt, ...egt, ...eff, ...one, ...one, ...one, ...one, ...one,
          ...egt, ...egt, ...egt, ...eff, ...eff, ...eff, ...eff, ...eff,
        ]);
      expect(cbImageData.data).to.eql(expectedDataValue);
    });
  });
  describe('toCoilSnakeMinitileString()', function () {
    it('Generates a valid CoilSnakeMinitileString.', function () {
      const minitile = new Minitile();

      for (let i = 0; i < minitile.backgroundLayer.colorNumbers.length; ++i) {
        let newIndex = i % 16;
        if (isType(newIndex, 'Uint4')) {
          minitile.backgroundLayer.colorNumbers[i] = newIndex;
        }
      }

      for (let i = 0; i < minitile.foregroundLayer.colorNumbers.length; ++i) {
        let newIndex = 15 - (i % 16);
        if (isType(newIndex, 'Uint4')) {
          minitile.foregroundLayer.colorNumbers[i] = newIndex;
        }
      }

      const coilSnakeMinitileString = minitile.toCoilSnakeMinitileString();
      expect(coilSnakeMinitileString).to.equal(
        '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef\nfedcba9876543210fedcba9876543210fedcba9876543210fedcba9876543210'
      );
      expect(isType(coilSnakeMinitileString, 'CoilSnakeMinitileString')).to.be
        .true;
    });
  });
});
