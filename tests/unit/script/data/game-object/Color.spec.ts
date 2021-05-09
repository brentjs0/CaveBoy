import { ColorComponentScalerNames } from '@/script/base/ColorComponentScaler';
import Color from '@/script/data/game-object/Color';
import { expect } from 'chai';

describe('Color', () => {
  it('Decodes CoilSnakeColorStrings', () => {
    const color: Color = new Color('7vd');
    expect(color.redComponent).to.equal(7);
    expect(color.greenComponent).to.equal(31);
    expect(color.blueComponent).to.equal(13);
  });

  it('Encodes CoilSnakeColorStrings', () => {
    const color = new Color(31, 15, 0);
    expect(color.toCoilSnakeColorString()).to.equal('vf0');
  });

  it('Decodes six-digit HexadecimalColorStrings using FactorOfEight scaler', () => {
    const color = new Color('#eE70f1', ColorComponentScalerNames.FactorOfEight);
    expect(color.redComponent).to.equal(29);
    expect(color.greenComponent).to.equal(14);
    expect(color.blueComponent).to.equal(30);
  });

  it('Decodes three-digit HexadecimalColorStrings using FactorOfEight scaler', () => {
    const color = new Color('#70d', ColorComponentScalerNames.FactorOfEight);
    expect(color.redComponent).to.equal(14);
    expect(color.greenComponent).to.equal(0);
    expect(color.blueComponent).to.equal(27);
  });

  it('Encodes HexadecimalColorStrings using FactorOfEight scaler', () => {
    const color = new Color(31, 31, 31);
    expect(
      color.toHexadecimalColorString(ColorComponentScalerNames.FactorOfEight)
    ).to.equal('#f8f8f8');
  });

  it('Decodes six-digit HexadecimalColorStrings using KindredGammaRamp scaler', () => {
    const color = new Color(
      '#eE70f1',
      ColorComponentScalerNames.KindredGammaRamp
    );
    expect(color.redComponent).to.equal(29);
    expect(color.greenComponent).to.equal(15);
    expect(color.blueComponent).to.equal(30);
  });

  it('Decodes three-digit HexadecimalColorStrings using KindredGammaRamp scaler', () => {
    const color = new Color('#70d', ColorComponentScalerNames.KindredGammaRamp);
    expect(color.redComponent).to.equal(15);
    expect(color.greenComponent).to.equal(0);
    expect(color.blueComponent).to.equal(27);
  });

  it('Encodes HexadecimalColorStrings using KindredGammaRamp scaler', () => {
    const color = new Color(31, 31, 31);
    expect(
      color.toHexadecimalColorString(ColorComponentScalerNames.KindredGammaRamp)
    ).to.equal('#ffffff');
  });
});
