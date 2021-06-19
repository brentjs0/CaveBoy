import { isType } from '@/script/base/primitive-types';
import Color from '@/script/data/game-object/Color';
import Palette from '@/script/data/game-object/Palette';
import { expect } from 'chai';
import { createCanvas } from '../../../../test-methods';

describe('Palette', function () {
  const paletteColors = [
    [
      new Color(0, 0, 0),
      new Color(30, 30, 26),
      new Color(24, 26, 19),
      new Color(26, 15, 9),
      new Color(20, 24, 18),
      new Color(31, 31, 0),
      new Color(18, 14, 30),
      new Color(31, 1, 11),
      new Color(2, 31, 13),
      new Color(5, 23, 12),
      new Color(10, 15, 14),
      new Color(31, 31, 25),
      new Color(24, 24, 19),
      new Color(20, 20, 13),
      new Color(16, 17, 10),
      new Color(6, 6, 6),
    ],
    [
      new Color(0, 0, 0),
      new Color(30, 30, 26),
      new Color(24, 26, 19),
      new Color(14, 12, 21),
      new Color(19, 19, 24),
      new Color(14, 23, 31),
      new Color(17, 14, 31),
      new Color(31, 1, 11),
      new Color(2, 31, 13),
      new Color(5, 23, 12),
      new Color(10, 15, 14),
      new Color(31, 22, 13),
      new Color(26, 15, 14),
      new Color(19, 11, 13),
      new Color(19, 9, 9),
      new Color(6, 6, 6),
    ],
    [
      new Color(0, 0, 0),
      new Color(30, 30, 26),
      new Color(22, 31, 23),
      new Color(20, 20, 13),
      new Color(19, 15, 11),
      new Color(17, 25, 31),
      new Color(26, 11, 31),
      new Color(31, 6, 11),
      new Color(2, 31, 13),
      new Color(5, 23, 12),
      new Color(10, 15, 14),
      new Color(30, 31, 24),
      new Color(23, 26, 21),
      new Color(23, 21, 24),
      new Color(13, 14, 19),
      new Color(6, 6, 8),
    ],
    [
      new Color(0, 0, 0),
      new Color(30, 30, 26),
      new Color(24, 12, 13),
      new Color(20, 9, 11),
      new Color(16, 6, 12),
      new Color(0, 31, 0),
      new Color(6, 15, 14),
      new Color(31, 6, 11),
      new Color(2, 31, 13),
      new Color(5, 23, 12),
      new Color(10, 15, 14),
      new Color(22, 20, 28),
      new Color(18, 17, 23),
      new Color(14, 13, 17),
      new Color(10, 10, 12),
      new Color(6, 6, 6),
    ],
    [
      new Color(0, 0, 0),
      new Color(30, 30, 26),
      new Color(24, 26, 19),
      new Color(20, 20, 13),
      new Color(19, 19, 24),
      new Color(19, 23, 13),
      new Color(18, 8, 7),
      new Color(31, 6, 11),
      new Color(2, 31, 13),
      new Color(5, 23, 12),
      new Color(10, 15, 14),
      new Color(31, 31, 14),
      new Color(26, 23, 11),
      new Color(22, 15, 9),
      new Color(17, 12, 7),
      new Color(6, 6, 6),
    ],
    [
      new Color(0, 0, 0),
      new Color(30, 30, 26),
      new Color(24, 26, 19),
      new Color(0, 31, 0),
      new Color(20, 20, 13),
      new Color(0, 31, 0),
      new Color(31, 6, 11),
      new Color(0, 23, 15),
      new Color(2, 31, 13),
      new Color(5, 23, 12),
      new Color(10, 15, 14),
      new Color(31, 26, 7),
      new Color(31, 19, 8),
      new Color(31, 13, 10),
      new Color(28, 11, 13),
      new Color(6, 6, 6),
    ],
  ];

  describe('constructor()', function () {
    it('Initializes values from a CSPaletteString.', function () {
      const palette = new Palette(
        '000uuqoqjqf9koivv0ieuv1b2vd5ncafevvpoojkkdgha666000uuqoqjecljjoenvhevv1b2vd5ncafevmdqfejbdj99666000uuqmvnkkdjfbhpvqbvv6b2vd5ncafeuvonqlnlodej668000uuqocdk9bg6c0v06fev6b2vd5ncafemksihnedhaac666000uuqoqjkkdjjojndi87v6b2vd5ncafevveqnbmf9hc7666000uuqoqj0v0kkd0v0v6b0nf2vd5ncafevq7vj8vdasbd666'
      );

      for (let i = 0; i < 6; ++i) {
        expect(palette.subpalettes[i].colors).to.eql(paletteColors[i]);
      }
    });

    it('Creates an empty instance with default palettes.', function () {
      const palette = new Palette();

      const emptyPalette = [
        new Color(0, 0, 0),
        new Color(0, 0, 0),
        new Color(0, 0, 0),
        new Color(0, 0, 0),
        new Color(0, 0, 0),
        new Color(0, 0, 0),
        new Color(0, 0, 0),
        new Color(0, 0, 0),
        new Color(0, 0, 0),
        new Color(0, 0, 0),
        new Color(0, 0, 0),
        new Color(0, 0, 0),
        new Color(0, 0, 0),
        new Color(0, 0, 0),
        new Color(0, 0, 0),
        new Color(6, 4, 4),
      ];

      for (let i = 0; i < 6; ++i) {
        expect(palette.subpalettes[i].colors).to.eql(emptyPalette);
      }
    });
  });

  describe('toCSPaletteString()', function () {
    it('Generates a valid CSPaletteString.', function () {
      const palette = new Palette();
      palette.subpalettes[0].colors = paletteColors[0]; // 000uuqoqjqf9koivv0ieuv1b2vd5ncafevvpoojkkdgha666
      palette.subpalettes[1].colors = paletteColors[1]; // 000uuqoqjecljjoenvhevv1b2vd5ncafevmdqfejbdj99666
      palette.subpalettes[2].colors = paletteColors[2]; // 000uuqmvnkkdjfbhpvqbvv6b2vd5ncafeuvonqlnlodej668
      palette.subpalettes[3].colors = paletteColors[3]; // 000uuqocdk9bg6c0v06fev6b2vd5ncafemksihnedhaac666
      palette.subpalettes[4].colors = paletteColors[4]; // 000uuqoqjkkdjjojndi87v6b2vd5ncafevveqnbmf9hc7666
      palette.subpalettes[5].colors = paletteColors[5]; // 000uuqoqj0v0kkd0v0v6b0nf2vd5ncafevq7vj8vdasbd666

      const csPaletteString = palette.toCSPaletteString();

      expect(csPaletteString).to.equal(
        '000uuqoqjqf9koivv0ieuv1b2vd5ncafevvpoojkkdgha666000uuqoqjecljjoenvhevv1b2vd5ncafevmdqfejbdj99666000uuqmvnkkdjfbhpvqbvv6b2vd5ncafeuvonqlnlodej668000uuqocdk9bg6c0v06fev6b2vd5ncafemksihnedhaac666000uuqoqjkkdjjojndi87v6b2vd5ncafevveqnbmf9hc7666000uuqoqj0v0kkd0v0v6b0nf2vd5ncafevq7vj8vdasbd666'
      );

      expect(isType(csPaletteString, 'CSPaletteString')).to.be.true;
    });
  });
});
