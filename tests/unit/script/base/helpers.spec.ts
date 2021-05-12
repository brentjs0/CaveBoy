import { segmentString } from '@/script/base/helpers';
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
});
