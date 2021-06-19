import { isType } from '@/script/base/primitive-types';
import Color from '@/script/data/game-object/Color';
import PaletteSet from '@/script/data/game-object/PaletteSet';
import { expect } from 'chai';
import { createCanvas } from '../../../../test-methods';

describe('PaletteSet', function () {
  const paletteSetColors = [
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
    it('Initializes values from a CoilSnakePaletteSetString.', function () {
      const paletteSet = new PaletteSet(
        '000uuqoqjqf9koivv0ieuv1b2vd5ncafevvpoojkkdgha666000uuqoqjecljjoenvhevv1b2vd5ncafevmdqfejbdj99666000uuqmvnkkdjfbhpvqbvv6b2vd5ncafeuvonqlnlodej668000uuqocdk9bg6c0v06fev6b2vd5ncafemksihnedhaac666000uuqoqjkkdjjojndi87v6b2vd5ncafevveqnbmf9hc7666000uuqoqj0v0kkd0v0v6b0nf2vd5ncafevq7vj8vdasbd666'
      );

      for (let i = 0; i < 6; ++i) {
        expect(paletteSet.minitilePalettes[i].colors).to.eql(
          paletteSetColors[i]
        );
      }
    });

    it('Creates an empty instance with default palettes.', function () {
      const paletteSet = new PaletteSet();

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
        expect(paletteSet.minitilePalettes[i].colors).to.eql(emptyPalette);
      }
    });
  });

  describe('toCoilSnakePaletteSetString()', function () {
    it('Generates a valid CoilSnakePaletteSetString.', function () {
      const paletteSet = new PaletteSet();
      paletteSet.minitilePalettes[0].colors = paletteSetColors[0]; // 000uuqoqjqf9koivv0ieuv1b2vd5ncafevvpoojkkdgha666
      paletteSet.minitilePalettes[1].colors = paletteSetColors[1]; // 000uuqoqjecljjoenvhevv1b2vd5ncafevmdqfejbdj99666
      paletteSet.minitilePalettes[2].colors = paletteSetColors[2]; // 000uuqmvnkkdjfbhpvqbvv6b2vd5ncafeuvonqlnlodej668
      paletteSet.minitilePalettes[3].colors = paletteSetColors[3]; // 000uuqocdk9bg6c0v06fev6b2vd5ncafemksihnedhaac666
      paletteSet.minitilePalettes[4].colors = paletteSetColors[4]; // 000uuqoqjkkdjjojndi87v6b2vd5ncafevveqnbmf9hc7666
      paletteSet.minitilePalettes[5].colors = paletteSetColors[5]; // 000uuqoqj0v0kkd0v0v6b0nf2vd5ncafevq7vj8vdasbd666

      const coilSnakePaletteSetString = paletteSet.toCoilSnakePaletteSetString();

      expect(coilSnakePaletteSetString).to.equal(
        '000uuqoqjqf9koivv0ieuv1b2vd5ncafevvpoojkkdgha666000uuqoqjecljjoenvhevv1b2vd5ncafevmdqfejbdj99666000uuqmvnkkdjfbhpvqbvv6b2vd5ncafeuvonqlnlodej668000uuqocdk9bg6c0v06fev6b2vd5ncafemksihnedhaac666000uuqoqjkkdjjojndi87v6b2vd5ncafevveqnbmf9hc7666000uuqoqj0v0kkd0v0v6b0nf2vd5ncafevq7vj8vdasbd666'
      );

      expect(isType(coilSnakePaletteSetString, 'CoilSnakePaletteSetString')).to
        .be.true;
    });
  });
});
