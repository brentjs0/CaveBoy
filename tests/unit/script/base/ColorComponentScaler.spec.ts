import {
  factorOfEightScaler,
  kindredGammaRampScaler,
} from '@/script/base/ColorComponentScaler';
import { expect } from 'chai';

describe('ColorComponentScaler', function () {
  describe('factorOfEightScaler', function () {
    it('convertFiveBitToEightBit() multiplies by 8.', function () {
      expect(factorOfEightScaler.convertFiveBitToEightBit(31)).to.equal(248);
      expect(factorOfEightScaler.convertFiveBitToEightBit(0)).to.equal(0);
      expect(factorOfEightScaler.convertFiveBitToEightBit(15)).to.equal(120);
    });

    it('convertEightBitToFiveBit() divides by 8 and drops the remainder.', function () {
      expect(factorOfEightScaler.convertEightBitToFiveBit(248)).to.equal(31);
      expect(factorOfEightScaler.convertEightBitToFiveBit(0)).to.equal(0);
      expect(factorOfEightScaler.convertEightBitToFiveBit(120)).to.equal(15);
      expect(factorOfEightScaler.convertEightBitToFiveBit(7)).to.equal(0);
      expect(factorOfEightScaler.convertEightBitToFiveBit(8)).to.equal(1);
    });

    it('normalizeEightBit() sets the three lowest bits to 0.', function () {
      expect(factorOfEightScaler.normalizeEightBit(253)).to.equal(248);
      expect(factorOfEightScaler.normalizeEightBit(0)).to.equal(0);
      expect(factorOfEightScaler.normalizeEightBit(120)).to.equal(120);
      expect(factorOfEightScaler.normalizeEightBit(89)).to.equal(88);
      expect(factorOfEightScaler.normalizeEightBit(6)).to.equal(0);
    });
  });

  describe('kindredGammaRampScaler', function () {
    it('convertFiveBitToEightBit() looks up the value using the 5-bit number as an index.', function () {
      expect(kindredGammaRampScaler.convertFiveBitToEightBit(31)).to.equal(255);
      expect(kindredGammaRampScaler.convertFiveBitToEightBit(0)).to.equal(0);
      expect(kindredGammaRampScaler.convertFiveBitToEightBit(15)).to.equal(120);
    });

    it('convertEightBitToFiveBit() finds the nearest match numerically.', function () {
      expect(kindredGammaRampScaler.convertEightBitToFiveBit(255)).to.equal(31);
      expect(kindredGammaRampScaler.convertEightBitToFiveBit(248)).to.equal(30);
      expect(kindredGammaRampScaler.convertEightBitToFiveBit(0)).to.equal(0);
      expect(kindredGammaRampScaler.convertEightBitToFiveBit(120)).to.equal(15);
      expect(kindredGammaRampScaler.convertEightBitToFiveBit(2)).to.equal(1);
    });

    it('normalizeEightBit() converts 8-bit numbers to their nearest match.', function () {
      expect(kindredGammaRampScaler.normalizeEightBit(253)).to.equal(255);
      expect(kindredGammaRampScaler.normalizeEightBit(0)).to.equal(0);
      expect(kindredGammaRampScaler.normalizeEightBit(99)).to.equal(105);
      expect(kindredGammaRampScaler.normalizeEightBit(89)).to.equal(91);
      expect(kindredGammaRampScaler.normalizeEightBit(6)).to.equal(6);
    });
  });
});
