import { ColorComponentScalerNames } from '@/script/base/ColorComponentScaler';
import Color from '@/script/data/game-object/Color';
import { expect } from 'chai';

describe('Color', function () {
  describe('constructor()', function () {
    it('Initializes values from a CoilSnakeColorString.', function () {
      const color: Color = new Color('7vd');
      expect(color.redComponent).to.equal(7);
      expect(color.greenComponent).to.equal(31);
      expect(color.blueComponent).to.equal(13);
    });

    it('Initializes values from a six-digit HexadecimalColorString using the FactorOfEight scaler.', function () {
      const color = new Color(
        '#eE70f1',
        ColorComponentScalerNames.FactorOfEight
      );
      expect(color.redComponent).to.equal(29);
      expect(color.greenComponent).to.equal(14);
      expect(color.blueComponent).to.equal(30);
    });

    it('Initializes values from a three-digit HexadecimalColorString using the FactorOfEight scaler.', function () {
      const color = new Color('#70d', ColorComponentScalerNames.FactorOfEight);
      expect(color.redComponent).to.equal(14);
      expect(color.greenComponent).to.equal(0);
      expect(color.blueComponent).to.equal(27);
    });

    it('Initializes values from a six-digit HexadecimalColorString using the KindredGammaRamp scaler.', function () {
      const color = new Color(
        '#eE70f1',
        ColorComponentScalerNames.KindredGammaRamp
      );
      expect(color.redComponent).to.equal(29);
      expect(color.greenComponent).to.equal(14);
      expect(color.blueComponent).to.equal(29);
    });

    it('Initializes values from a three-digit HexadecimalColorString using the KindredGammaRamp scaler.', function () {
      const color = new Color(
        '#70d',
        ColorComponentScalerNames.KindredGammaRamp
      );
      expect(color.redComponent).to.equal(15);
      expect(color.greenComponent).to.equal(0);
      expect(color.blueComponent).to.equal(27);
    });

    it('Creates an empty instance with 0 for all component values.', function () {
      const color = new Color();
      expect(color.redComponent).to.equal(0);
      expect(color.greenComponent).to.equal(0);
      expect(color.blueComponent).to.equal(0);
    });
  });

  describe('toCoilSnakeColorString()', function () {
    it('Generates CoilSnakeColorStrings.', function () {
      const color = new Color(31, 15, 0);
      expect(color.toCoilSnakeColorString()).to.equal('vf0');
    });
  });

  describe('toHexadecimalColorString()', function () {
    it('Generates HexadecimalColorStrings using the FactorOfEight scaler.', function () {
      const color = new Color(31, 31, 31);
      expect(
        color.toHexadecimalColorString(ColorComponentScalerNames.FactorOfEight)
      ).to.equal('#f8f8f8');
    });

    it('Generates HexadecimalColorStrings using KindredGammaRamp scaler.', function () {
      const color = new Color(31, 31, 31);
      expect(
        color.toHexadecimalColorString(
          ColorComponentScalerNames.KindredGammaRamp
        )
      ).to.equal('#ffffff');
    });
  });

  describe('toUint8ClampedArray()', function () {
    it("Generates a four-element Uint8ClampedArray containing the color's 8-bit R/G/B/A values.", function () {
      const color = new Color(30, 29, 28);
      expect(color.toUint8ClampedArray()).to.eql(
        new Uint8ClampedArray([248, 240, 232, 255])
      );
    });
  });
});
