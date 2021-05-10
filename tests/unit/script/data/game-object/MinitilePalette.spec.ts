import { expect } from 'chai';
import MinitilePalette from '@/script/data/game-object/MinitilePalette';
import { ColorComponentScalerNames } from '@/script/base/ColorComponentScaler';
import { HexadecimalColorString } from '@/script/data/HexadecimalColorString';

describe('MinitilePalette', () => {
  it('Decodes CoilSnakeMinitilePaletteStrings', () => {
    const minitilePalette: MinitilePalette = new MinitilePalette(
      '000jj6kk8gg6cc4883bbchodagcqpknmflkcjh9hg7443000'
    );

    const hexadecimalConversions = [
      '#000000', // 000
      '#989830', // jj6
      '#a0a040', // kk8
      '#808030', // gg6
      '#606020', // cc4
      '#404018', // 883
      '#585860', // bbc
      '#88c068', // hod
      '#508060', // agc
      '#d0c8a0', // qpk
      '#b8b078', // nmf
      '#a8a060', // lkc
      '#988848', // jh9
      '#888038', // hg7
      '#202018', // 443
      '#000000', // 000
    ];

    for (let i = 0; i < 16; ++i) {
      const color = minitilePalette.colors[i];
      let hexadecimalColorString: HexadecimalColorString = '#fff';
      if (color) {
        hexadecimalColorString = color.toHexadecimalColorString(
          ColorComponentScalerNames.FactorOfEight
        );
      }

      expect(hexadecimalColorString).to.equal(hexadecimalConversions[i]);
    }
  });
});
