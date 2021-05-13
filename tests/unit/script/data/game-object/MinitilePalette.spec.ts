import Color from '@/script/data/game-object/Color';
import MinitilePalette from '@/script/data/game-object/MinitilePalette';
import { expect } from 'chai';
import times from 'lodash/times';

describe('MinitilePalette', function () {
  describe('constructor()', function () {
    it('Initializes values from a CoilSnakeMinitilePaletteString.', function () {
      const minitilePalette = new MinitilePalette(
        '000jj6kk8gg6cc4883bbchodagcqpknmflkcjh9hg7443000'
      );

      expect(minitilePalette.colors).to.eql([
        new Color(0, 0, 0), // 000
        new Color(19, 19, 6), // jj6
        new Color(20, 20, 8), // kk8
        new Color(16, 16, 6), // gg6
        new Color(12, 12, 4), // cc4
        new Color(8, 8, 3), // 883
        new Color(11, 11, 12), // bbc
        new Color(17, 24, 13), // hod
        new Color(10, 16, 12), // agc
        new Color(26, 25, 20), // qpk
        new Color(23, 22, 15), // nmf
        new Color(21, 20, 12), // lkc
        new Color(19, 17, 9), // jh9
        new Color(17, 16, 7), // hg7
        new Color(4, 4, 3), // 443
        new Color(0, 0, 0), // 000
      ]);
    });

    it('Creates an empty instance with black for all color values.', function () {
      const minitilePalette = new MinitilePalette();
      expect(minitilePalette.colors).to.eql(
        times(16, () => new Color(0, 0, 0))
      );
    });
  });

  describe('getPreviewImageData()', function () {
    it('Generates an 8 x 2 CaveBoyImageData object.', function () {
      const cbImageData = new MinitilePalette(
        '000jj6kk8gg6cc4883bbchodagcqpknmflkcjh9hg7443000'
      ).getPreviewImageData();

      expect(cbImageData.height).to.equal(2);
      expect(cbImageData.width).to.equal(8);
    });
    it('Draws the colors from left to right, wrapping from top to bottom.', function () {
      const cbImageData = new MinitilePalette(
        '000jj6kk8gg6cc4883bbchodagcqpknmflkcjh9hg7443000'
      ).getPreviewImageData();

      const expectedDataValue = new Uint8ClampedArray([
        ...new Color(0, 0, 0).toUint8ClampedArray(), // 000
        ...new Color(19, 19, 6).toUint8ClampedArray(), // jj6
        ...new Color(20, 20, 8).toUint8ClampedArray(), // kk8
        ...new Color(16, 16, 6).toUint8ClampedArray(), // gg6
        ...new Color(12, 12, 4).toUint8ClampedArray(), // cc4
        ...new Color(8, 8, 3).toUint8ClampedArray(), // 883
        ...new Color(11, 11, 12).toUint8ClampedArray(), // bbc
        ...new Color(17, 24, 13).toUint8ClampedArray(), // hod
        ...new Color(10, 16, 12).toUint8ClampedArray(), // agc
        ...new Color(26, 25, 20).toUint8ClampedArray(), // qpk
        ...new Color(23, 22, 15).toUint8ClampedArray(), // nmf
        ...new Color(21, 20, 12).toUint8ClampedArray(), // lkc
        ...new Color(19, 17, 9).toUint8ClampedArray(), // jh9
        ...new Color(17, 16, 7).toUint8ClampedArray(), // hg7
        ...new Color(4, 4, 3).toUint8ClampedArray(), // 443
        ...new Color(0, 0, 0).toUint8ClampedArray(), // 000
      ]);

      expect(cbImageData.data).to.eql(expectedDataValue);
    });

    it("Draws the colors correctly using the 'factorOfEight' scaler.", function () {
      const cbImageData = new MinitilePalette(
        '000jj6kk8gg6cc4883bbchodagcqpknmflkcjh9hg7443000'
      ).getPreviewImageData('factorOfEight');

      const expectedDataValue = new Uint8ClampedArray([
        ...new Color(0, 0, 0).toUint8ClampedArray(255, 'factorOfEight'), // 000
        ...new Color(19, 19, 6).toUint8ClampedArray(255, 'factorOfEight'), // jj6
        ...new Color(20, 20, 8).toUint8ClampedArray(255, 'factorOfEight'), // kk8
        ...new Color(16, 16, 6).toUint8ClampedArray(255, 'factorOfEight'), // gg6
        ...new Color(12, 12, 4).toUint8ClampedArray(255, 'factorOfEight'), // cc4
        ...new Color(8, 8, 3).toUint8ClampedArray(255, 'factorOfEight'), // 883
        ...new Color(11, 11, 12).toUint8ClampedArray(255, 'factorOfEight'), // bbc
        ...new Color(17, 24, 13).toUint8ClampedArray(255, 'factorOfEight'), // hod
        ...new Color(10, 16, 12).toUint8ClampedArray(255, 'factorOfEight'), // agc
        ...new Color(26, 25, 20).toUint8ClampedArray(255, 'factorOfEight'), // qpk
        ...new Color(23, 22, 15).toUint8ClampedArray(255, 'factorOfEight'), // nmf
        ...new Color(21, 20, 12).toUint8ClampedArray(255, 'factorOfEight'), // lkc
        ...new Color(19, 17, 9).toUint8ClampedArray(255, 'factorOfEight'), // jh9
        ...new Color(17, 16, 7).toUint8ClampedArray(255, 'factorOfEight'), // hg7
        ...new Color(4, 4, 3).toUint8ClampedArray(255, 'factorOfEight'), // 443
        ...new Color(0, 0, 0).toUint8ClampedArray(255, 'factorOfEight'), // 000
      ]);

      expect(cbImageData.data).to.eql(expectedDataValue);
    });
  });

  describe('toCoilSnakeMinitilePaletteString()', function () {
    it('Generates a valid CoilSnakeMinitilePaletteString.', function () {
      const cbImageData = new MinitilePalette();
      cbImageData.colors[0] = new Color(0, 0, 0); // 000
      cbImageData.colors[1] = new Color(19, 19, 6); // jj6
      cbImageData.colors[2] = new Color(20, 20, 8); // kk8
      cbImageData.colors[3] = new Color(16, 16, 6); // gg6
      cbImageData.colors[4] = new Color(12, 12, 4); // cc4
      cbImageData.colors[5] = new Color(8, 8, 3); // 883
      cbImageData.colors[6] = new Color(11, 11, 12); // bbc
      cbImageData.colors[7] = new Color(17, 24, 13); // hod
      cbImageData.colors[8] = new Color(10, 16, 12); // agc
      cbImageData.colors[9] = new Color(26, 25, 20); // qpk
      cbImageData.colors[10] = new Color(23, 22, 15); // nmf
      cbImageData.colors[11] = new Color(21, 20, 12); // lkc
      cbImageData.colors[12] = new Color(19, 17, 9); // jh9
      cbImageData.colors[13] = new Color(17, 16, 7); // hg7
      cbImageData.colors[14] = new Color(4, 4, 3); // 443
      cbImageData.colors[15] = new Color(0, 0, 0); // 000

      expect(cbImageData.toCoilSnakeMinitilePaletteString()).to.equal(
        '000jj6kk8gg6cc4883bbchodagcqpknmflkcjh9hg7443000'
      );
    });
  });
});