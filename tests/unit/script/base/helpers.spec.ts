import {
  getBitValue,
  segmentString,
  splitStringWhere,
} from '@/script/base/helpers';
import { expect } from 'chai';

describe('helpers', function () {
  describe('segmentString()', function () {
    it('Returns single-segment results.', function () {
      expect([...segmentString('a', 1)].length).to.equal(1);
      expect([...segmentString('aa', 2)].length).to.equal(1);
      expect([...segmentString('a', 100)].length).to.equal(1);
    });

    it("Doesn't return extra strings when str.length % segmentLength === 0.", function () {
      expect([...segmentString('aaabbbcccddd', 3)].length).to.equal(4);
      expect([...segmentString('aaaabbbb', 4)].length).to.equal(2);
    });

    it('Returns extra trailing segments.', function () {
      expect([...segmentString('aabbc', 2)].length).to.equal(3);
      expect([...segmentString('aaaabbbbccccdd', 4)].length).to.equal(4);
    });

    it('Throws an Error when segmentLength < 1.', function () {
      expect(() => [...segmentString('aabbcc', 0)]).to.throw(
        'Parameter segmentLength must be greater than 0.'
      );
      expect(() => [...segmentString('aabbcc', -3)]).to.throw(
        'Parameter segmentLength must be greater than 0.'
      );
    });
  });

  describe('splitStringWhere()', function () {
    it('Splits on a character index that meets the provided condition.', function () {
      expect([
        ...splitStringWhere(
          't000000t0000t00',
          (charIndex, str) => str[charIndex] === 't'
        ),
      ]).to.eql(['', 't000000', 't0000', 't00']);
      expect([
        ...splitStringWhere(
          '000000-000/0000x0j',
          (charIndex, str) => str[charIndex] !== '0'
        ),
      ]).to.eql(['000000', '-000', '/0000', 'x0', 'j']);
    });

    it('Returns the whole string when no character indexes meet the condition.', function () {
      expect([...splitStringWhere('t000000t0000t00', () => false)]).to.eql([
        't000000t0000t00',
      ]);
    });
  });
  describe('getBitValue()', function () {
    it('Returns true for 1s up to position 30.', function () {
      for (let place = 0; place < 31; ++place) {
        expect(getBitValue(0b01111111111111111111111111111111, place)).to.be
          .true;
      }
    });
    it('Returns false for 0s up to position 30.', function () {
      for (let place = 0; place < 31; ++place) {
        expect(getBitValue(0b00000000000000000000000000000000, place)).to.be
          .false;
      }
    });
    it('Throws an Error when number is not an integer.', function () {
      expect(() => getBitValue(0.5, 1)).to.throw;
    });
    it('Throws an Error when place is not an integer.', function () {
      expect(() => getBitValue(0, 0.5)).to.throw;
    });
    it('Throws an Error when place is 31 or greater.', function () {
      expect(() => getBitValue(0, 31)).to.throw;
    });
    it('Throws an Error when place is negative.', function () {
      expect(() => getBitValue(0, -1)).to.throw;
    });
  });
});
