import CaveBoyImageData from '@/script/base/CaveBoyImageData';
import Color from '@/script/data/game-object/Color';
import { expect } from 'chai';

describe('CaveBoyImageData', function () {
  describe('constructor()', function () {
    it('Can initialize values from an existing ImageData object.', function () {
      const imageData = new ImageData(1600, 900);
      imageData.data[0] = 255;
      imageData.data[1] = 254;
      imageData.data[2] = 253;
      imageData.data[3] = 252;

      const cbImageData = new CaveBoyImageData(imageData);

      expect(cbImageData.width).to.equal(1600);
      expect(cbImageData.height).to.equal(900);
      expect(cbImageData.data[0]).to.equal(255);
      expect(cbImageData.data[1]).to.equal(254);
      expect(cbImageData.data[2]).to.equal(253);
      expect(cbImageData.data[3]).to.equal(252);
    });

    it('Can initialize values from data and width values.', function () {
      // prettier-ignore
      const data: Uint8ClampedArray = new Uint8ClampedArray([
        255,   0,   0, 255,   0, 255,   0, 255,
          0,   0, 255, 255, 255, 255,   0, 255,
      ]);

      const cbImageData = new CaveBoyImageData(data, 2);
      expect(cbImageData.data[12]).to.equal(255);
      expect(cbImageData.data[13]).to.equal(255);
      expect(cbImageData.data[14]).to.equal(0);
      expect(cbImageData.data[15]).to.equal(255);
    });

    it('Can create an empty instance just from width and height values.', function () {
      const cbImageData = new CaveBoyImageData(3, 2);

      expect(cbImageData.width).to.equal(3);
      expect(cbImageData.height).to.equal(2);

      expect(cbImageData.data).to.eql(
        // prettier-ignore
        new Uint8ClampedArray([
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ])
      );
    });
  });

  describe('setPixel()', function () {
    it('Sets only the values for a single pixel.', function () {
      const cbImageData = new CaveBoyImageData(3, 2);
      cbImageData.setPixel(1, 1, new Color(30, 29, 28));
      expect(cbImageData.data).to.eql(
        // prettier-ignore
        new Uint8ClampedArray([
          0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,
          0,   0,   0,   0, 248, 240, 232, 255,   0,   0,   0,   0,
        ])
      );
    });
    it("Sets values using the 'factorOfEight' scaler.", function () {
      const cbImageData = new CaveBoyImageData(3, 2);
      cbImageData.setPixel(0, 1, new Color(30, 29, 28), 255, 'factorOfEight');
      expect(cbImageData.data).to.eql(
        // prettier-ignore
        new Uint8ClampedArray([
            0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,
          240, 232, 224, 255,   0,   0,   0,   0,   0,   0,   0,   0,
        ])
      );
    });
  });

  describe('putImageData()', function () {
    it('Places data at in-bounds coordinates.', function () {
      const targetImageData = new CaveBoyImageData(4, 4);
      for (let i = 0; i < targetImageData.data.length; ++i) {
        targetImageData.data[i] = 255;
      }

      const sourceImageData = new ImageData(2, 2);
      for (let i = 3; i < targetImageData.data.length; i += 4) {
        sourceImageData.data[i] = 255;
      }

      targetImageData.putImageData(sourceImageData, 1, 1);

      const black = new Uint8ClampedArray([0, 0, 0, 255]);
      const white = new Uint8ClampedArray([255, 255, 255, 255]);

      // prettier-ignore
      const expectation = new Uint8ClampedArray([
        ...white, ...white, ...white, ...white,
        ...white, ...black, ...black, ...white,
        ...white, ...black, ...black, ...white,
        ...white, ...white, ...white, ...white,
      ]);

      expect(targetImageData.data).to.eql(expectation);
    });

    it('Places data at out-of-bounds coordinates.', function () {
      const targetImageData = new CaveBoyImageData(4, 4);
      for (let i = 0; i < targetImageData.data.length; ++i) {
        targetImageData.data[i] = 255;
      }
      const sourceImageData = new ImageData(2, 2);
      for (let i = 3; i < targetImageData.data.length; i += 4) {
        sourceImageData.data[i] = 255;
      }

      targetImageData.putImageData(sourceImageData, 3, 3);

      const black = new Uint8ClampedArray([0, 0, 0, 255]);
      const white = new Uint8ClampedArray([255, 255, 255, 255]);

      // prettier-ignore
      const expectation = new Uint8ClampedArray([
        ...white, ...white, ...white, ...white,
        ...white, ...white, ...white, ...white,
        ...white, ...white, ...white, ...white,
        ...white, ...white, ...white, ...black,
      ]);

      expect(targetImageData.data).to.eql(expectation);
    });

    it('Places data at negative coordinates.', function () {
      const targetImageData = new CaveBoyImageData(4, 4);
      for (let i = 0; i < targetImageData.data.length; ++i) {
        targetImageData.data[i] = 255;
      }
      const sourceImageData = new ImageData(2, 2);
      for (let i = 3; i < targetImageData.data.length; i += 4) {
        sourceImageData.data[i] = 255;
      }

      targetImageData.putImageData(sourceImageData, -1, -1);

      const black = new Uint8ClampedArray([0, 0, 0, 255]);
      const white = new Uint8ClampedArray([255, 255, 255, 255]);

      // prettier-ignore
      const expectation = new Uint8ClampedArray([
        ...black, ...white, ...white, ...white,
        ...white, ...white, ...white, ...white,
        ...white, ...white, ...white, ...white,
        ...white, ...white, ...white, ...white,
      ]);

      expect(targetImageData.data).to.eql(expectation);
    });
  });
});
