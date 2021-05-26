import { isType } from '@/script/base/primitive-types';
import Color from '@/script/data/game-object/Color';
import MinitileLayer, {
  getMinitileLayerPixelCoordinates,
} from '@/script/data/game-object/MinitileLayer';
import MinitilePalette from '@/script/data/game-object/MinitilePalette';
import { expect } from 'chai';
import reverse from 'lodash/reverse';
import times from 'lodash/times';

import { setUpCanvas } from '../../../../test-methods';

describe('MinitileLayer', function () {
  describe('constructor()', function () {
    it('Initializes values from a CoilSnakeMinitileLayerString.', function () {
      const minitileLayer = new MinitileLayer(
        'fffff00011111f00777772f07777772f7177117f1717171f1717171f1717171f'
      );

      // prettier-ignore
      expect(minitileLayer.pixelValues).to.eql([
        15, 15, 15, 15, 15,  0,  0,  0,
         1,  1,  1,  1,  1, 15,  0,  0,
         7,  7,  7,  7,  7,  2, 15,  0,
         7,  7,  7,  7,  7,  7,  2, 15,
         7,  1,  7,  7,  1,  1,  7, 15,
         1,  7,  1,  7,  1,  7,  1, 15,
         1,  7,  1,  7,  1,  7,  1, 15,
         1,  7,  1,  7,  1,  7,  1, 15,
      ]);
    });

    it('Creates an empty instance with 0 for all index values.', function () {
      const minitileLayer = new MinitileLayer();
      expect(minitileLayer.pixelValues).to.eql(times(64, () => 0));
    });
  });

  describe('getImageData()', function () {
    it('Generates an 8 x 8 CaveBoyImageData object.', function () {
      const cbImageData = new MinitileLayer().getImageData(
        new MinitilePalette()
      );

      expect(cbImageData.height).to.equal(8);
      expect(cbImageData.width).to.equal(8);
    });

    it('Draws the pixels from left to right, wrapping from top to bottom.', function () {
      const minitilePalette = new MinitilePalette(
        '000uuqoqjqf9koivv0ieuv1b2vd5ncafevvpoojkkdgha666'
      );
      const cbImageData = new MinitileLayer(
        'fffff00011111f00777772f07777772f7177117f1717171f1717171f1717171f'
      ).getImageData(minitilePalette);

      const eff = new Color(6, 6, 6).toUint8ClampedArray();
      const zro = new Color(0, 0, 0).toUint8ClampedArray(0);
      const one = new Color(30, 30, 26).toUint8ClampedArray();
      const two = new Color(24, 26, 19).toUint8ClampedArray();
      const svn = new Color(31, 1, 11).toUint8ClampedArray();

      // prettier-ignore
      const expectedDataValue = new Uint8ClampedArray([
        ...eff, ...eff, ...eff, ...eff, ...eff, ...zro, ...zro, ...zro,
        ...one, ...one, ...one, ...one, ...one, ...eff, ...zro, ...zro,
        ...svn, ...svn, ...svn, ...svn, ...svn, ...two, ...eff, ...zro,
        ...svn, ...svn, ...svn, ...svn, ...svn, ...svn, ...two, ...eff,
        ...svn, ...one, ...svn, ...svn, ...one, ...one, ...svn, ...eff,
        ...one, ...svn, ...one, ...svn, ...one, ...svn, ...one, ...eff,
        ...one, ...svn, ...one, ...svn, ...one, ...svn, ...one, ...eff,
        ...one, ...svn, ...one, ...svn, ...one, ...svn, ...one, ...eff,
      ]);

      expect(cbImageData.data).to.eql(expectedDataValue);
    });

    it('Flips image data horizontally.', function () {
      const minitilePalette = new MinitilePalette(
        '000uuqoqjqf9koivv0ieuv1b2vd5ncafevvpoojkkdgha666'
      );
      const cbImageData = new MinitileLayer(
        'fffff00011111f00777772f07777772f7177117f1717171f1717171f1717171f'
      ).getImageData(minitilePalette, true);

      const eff = new Color(6, 6, 6).toUint8ClampedArray();
      const zro = new Color(0, 0, 0).toUint8ClampedArray(0);
      const one = new Color(30, 30, 26).toUint8ClampedArray();
      const two = new Color(24, 26, 19).toUint8ClampedArray();
      const svn = new Color(31, 1, 11).toUint8ClampedArray();

      // prettier-ignore
      const expectedDataValue = new Uint8ClampedArray([
        ...zro, ...zro, ...zro, ...eff, ...eff, ...eff, ...eff, ...eff,
        ...zro, ...zro, ...eff, ...one, ...one, ...one, ...one, ...one,
        ...zro, ...eff, ...two, ...svn, ...svn, ...svn, ...svn, ...svn,
        ...eff, ...two, ...svn, ...svn, ...svn, ...svn, ...svn, ...svn,
        ...eff, ...svn, ...one, ...one, ...svn, ...svn, ...one, ...svn,
        ...eff, ...one, ...svn, ...one, ...svn, ...one, ...svn, ...one,
        ...eff, ...one, ...svn, ...one, ...svn, ...one, ...svn, ...one,
        ...eff, ...one, ...svn, ...one, ...svn, ...one, ...svn, ...one,
      ]);

      expect(cbImageData.data).to.eql(expectedDataValue);
    });

    it('Flips image data vertically.', function () {
      const minitilePalette = new MinitilePalette(
        '000uuqoqjqf9koivv0ieuv1b2vd5ncafevvpoojkkdgha666'
      );
      const cbImageData = new MinitileLayer(
        'fffff00011111f00777772f07777772f7177117f1717171f1717171f1717171f'
      ).getImageData(minitilePalette, false, true);

      const eff = new Color(6, 6, 6).toUint8ClampedArray();
      const zro = new Color(0, 0, 0).toUint8ClampedArray(0);
      const one = new Color(30, 30, 26).toUint8ClampedArray();
      const two = new Color(24, 26, 19).toUint8ClampedArray();
      const svn = new Color(31, 1, 11).toUint8ClampedArray();

      // prettier-ignore
      const expectedDataValue = new Uint8ClampedArray([
        ...one, ...svn, ...one, ...svn, ...one, ...svn, ...one, ...eff,
        ...one, ...svn, ...one, ...svn, ...one, ...svn, ...one, ...eff,
        ...one, ...svn, ...one, ...svn, ...one, ...svn, ...one, ...eff,
        ...svn, ...one, ...svn, ...svn, ...one, ...one, ...svn, ...eff,
        ...svn, ...svn, ...svn, ...svn, ...svn, ...svn, ...two, ...eff,
        ...svn, ...svn, ...svn, ...svn, ...svn, ...two, ...eff, ...zro,
        ...one, ...one, ...one, ...one, ...one, ...eff, ...zro, ...zro,
        ...eff, ...eff, ...eff, ...eff, ...eff, ...zro, ...zro, ...zro,
      ]);

      expect(cbImageData.data).to.eql(expectedDataValue);
    });

    it("Draws the colors correctly using the 'factorOfEight' scaler.", function () {
      const minitilePalette = new MinitilePalette(
        '000111222333444555666777888999aaabbbcccdddeeefff'
      );
      const cbImageData = new MinitileLayer(
        '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef'
      ).getImageData(minitilePalette, false, false, true, 'factorOfEight');

      // prettier-ignore
      const expectedDataValue = new Uint8ClampedArray([
         0,   0,   0,   0,   8,   8,   8, 255,  16,  16,  16, 255,  24,  24,  24, 255,  32,  32,  32, 255,  40,  40,  40, 255,  48,  48,  48, 255,  56,  56,  56, 255,
        64,  64,  64, 255,  72,  72,  72, 255,  80,  80,  80, 255,  88,  88,  88, 255,  96,  96,  96, 255, 104, 104, 104, 255, 112, 112, 112, 255, 120, 120, 120, 255,
         0,   0,   0,   0,   8,   8,   8, 255,  16,  16,  16, 255,  24,  24,  24, 255,  32,  32,  32, 255,  40,  40,  40, 255,  48,  48,  48, 255,  56,  56,  56, 255,
        64,  64,  64, 255,  72,  72,  72, 255,  80,  80,  80, 255,  88,  88,  88, 255,  96,  96,  96, 255, 104, 104, 104, 255, 112, 112, 112, 255, 120, 120, 120, 255,
         0,   0,   0,   0,   8,   8,   8, 255,  16,  16,  16, 255,  24,  24,  24, 255,  32,  32,  32, 255,  40,  40,  40, 255,  48,  48,  48, 255,  56,  56,  56, 255,
        64,  64,  64, 255,  72,  72,  72, 255,  80,  80,  80, 255,  88,  88,  88, 255,  96,  96,  96, 255, 104, 104, 104, 255, 112, 112, 112, 255, 120, 120, 120, 255,
         0,   0,   0,   0,   8,   8,   8, 255,  16,  16,  16, 255,  24,  24,  24, 255,  32,  32,  32, 255,  40,  40,  40, 255,  48,  48,  48, 255,  56,  56,  56, 255,
        64,  64,  64, 255,  72,  72,  72, 255,  80,  80,  80, 255,  88,  88,  88, 255,  96,  96,  96, 255, 104, 104, 104, 255, 112, 112, 112, 255, 120, 120, 120, 255,
      ]);

      expect(cbImageData.data).to.eql(expectedDataValue);
    });

    it('Draws index 0 with an alpha of 255 when index0IsTransparent === false.', function () {
      const minitilePalette = new MinitilePalette(
        '000111222333444555666777888999aaabbbcccdddeeefff'
      );
      const cbImageData = new MinitileLayer(
        '0000000000000000000000000000000000000000000000000000000000000000'
      ).getImageData(minitilePalette, false, false, false);

      expect(cbImageData.data).to.satisfy(function alphasEqual255(
        data: Uint8ClampedArray
      ) {
        for (let i = 3; i < data.length; i += 4) {
          if (data[i] != 255) {
            return false;
          }
        }
        return true;
      });
    });
  });

  describe('toCoilSnakeMinitileLayerString()', function () {
    it('Generates a valid CoilSnakeMinitileLayerString.', function () {
      const minitileLayer = new MinitileLayer();
      for (let i = 0; i < minitileLayer.pixelValues.length; ++i) {
        let newIndex = i % 16;
        if (isType(newIndex, 'Uint4')) {
          minitileLayer.pixelValues[i] = newIndex;
        }
      }

      const coilSnakeMinitileLayerString = minitileLayer.toCoilSnakeMinitileLayerString();

      expect(coilSnakeMinitileLayerString).to.equal(
        '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef'
      );

      expect(
        isType(coilSnakeMinitileLayerString, 'CoilSnakeMinitileLayerString')
      ).to.be.true;
    });
  });

  describe('getMinitileLayerPixelCoordinates()', function () {
    // prettier-ignore
    const allCoordinatesInOrder = [
      [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0],
      [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1],
      [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2],
      [0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3],
      [0, 4], [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4],
      [0, 5], [1, 5], [2, 5], [3, 5], [4, 5], [5, 5], [6, 5], [7, 5],
      [0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [7, 6],
      [0, 7], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7],
    ];

    it('Returns correct unflipped coordinates.', function () {
      for (let i = 0; i < 64; ++i) {
        expect(getMinitileLayerPixelCoordinates(i)).to.eql(
          allCoordinatesInOrder[i]
        );
      }
    });

    it('Returns correct horizontally flipped coordinates.', function () {
      // prettier-ignore
      const allHorizontallyFlippedCoordinatesInOrder = [
        [7, 0], [6, 0], [5, 0], [4, 0], [3, 0], [2, 0], [1, 0], [0, 0],
        [7, 1], [6, 1], [5, 1], [4, 1], [3, 1], [2, 1], [1, 1], [0, 1],
        [7, 2], [6, 2], [5, 2], [4, 2], [3, 2], [2, 2], [1, 2], [0, 2],
        [7, 3], [6, 3], [5, 3], [4, 3], [3, 3], [2, 3], [1, 3], [0, 3],
        [7, 4], [6, 4], [5, 4], [4, 4], [3, 4], [2, 4], [1, 4], [0, 4],
        [7, 5], [6, 5], [5, 5], [4, 5], [3, 5], [2, 5], [1, 5], [0, 5],
        [7, 6], [6, 6], [5, 6], [4, 6], [3, 6], [2, 6], [1, 6], [0, 6],
        [7, 7], [6, 7], [5, 7], [4, 7], [3, 7], [2, 7], [1, 7], [0, 7],
      ];

      for (let i = 0; i < 64; ++i) {
        expect(getMinitileLayerPixelCoordinates(i, true)).to.eql(
          allHorizontallyFlippedCoordinatesInOrder[i]
        );
      }
    });

    it('Returns correct vertically flipped coordinates.', function () {
      // prettier-ignore
      const allVerticallyFlippedCoordinatesInOrder = [
        [0, 7], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7],
        [0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [7, 6],
        [0, 5], [1, 5], [2, 5], [3, 5], [4, 5], [5, 5], [6, 5], [7, 5],
        [0, 4], [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4],
        [0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3],
        [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2],
        [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1],
        [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0],
      ];

      for (let i = 0; i < 64; ++i) {
        expect(getMinitileLayerPixelCoordinates(i, false, true)).to.eql(
          allVerticallyFlippedCoordinatesInOrder[i]
        );
      }
    });

    it('Returns correct vertically and horizontally flipped coordinates.', function () {
      const allHorizontallyAndVerticallyFlippedCoordinatesInOrder = reverse(
        allCoordinatesInOrder
      );

      for (let i = 0; i < 64; ++i) {
        expect(getMinitileLayerPixelCoordinates(i, true, true)).to.eql(
          allHorizontallyAndVerticallyFlippedCoordinatesInOrder[i]
        );
      }
    });
  });
});
