import { isType } from '@/script/base/primitive-types';
import Color from '@/script/data/game-object/Color';
import MinitileLayer from '@/script/data/game-object/MinitileLayer';
import MinitilePalette from '@/script/data/game-object/MinitilePalette';
import { expect } from 'chai';
import times from 'lodash/times';
import { setUpCanvas } from '../../../../test-methods';

describe('MinitileLayer', function () {
  describe('constructor()', function () {
    it('Initializes values from a CoilSnakeMinitilePaletteString.', function () {
      const minitileLayer = new MinitileLayer(
        'fffff00011111f00777772f07777772f7177117f1717171f1717171f1717171f'
      );

      // prettier-ignore
      expect(minitileLayer.colorIndexes).to.eql([
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
      expect(minitileLayer.colorIndexes).to.eql(times(64, () => 0));
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

      const ctx = setUpCanvas(10);
      createImageBitmap(cbImageData).then((imageBitmap) =>
        ctx.drawImage(imageBitmap, 1, 1)
      );

      expect(cbImageData.data).to.eql(expectedDataValue);
    });

    it("Draws the colors correctly using the 'factorOfEight' scaler.", function () {
      const minitilePalette = new MinitilePalette(
        '000111222333444555666777888999aaabbbcccdddeeefff'
      );
      const cbImageData = new MinitileLayer(
        '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef'
      ).getImageData(minitilePalette, true, 'factorOfEight');

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
      ).getImageData(minitilePalette, false);

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
      const miniTileLayer = new MinitileLayer();
      for (let i = 0; i < miniTileLayer.colorIndexes.length; ++i) {
        let newIndex = i % 16;
        if (isType(newIndex, 'Uint4')) {
          miniTileLayer.colorIndexes[i] = newIndex;
        }
      }

      const coilSnakeMinitileLayerString = miniTileLayer.toCoilSnakeMinitileLayerString();

      expect(coilSnakeMinitileLayerString).to.equal(
        '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef'
      );

      expect(
        isType(coilSnakeMinitileLayerString, 'CoilSnakeMinitileLayerString')
      ).to.be.true;
    });
  });
});
