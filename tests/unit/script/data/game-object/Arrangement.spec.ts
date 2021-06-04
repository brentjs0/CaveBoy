import { isType } from '@/script/base/primitive-types';
import Arrangement from '@/script/data/game-object/Arrangement';
import ArrangementCell from '@/script/data/game-object/ArrangementCell';
import Color from '@/script/data/game-object/Color';
import Minitile from '@/script/data/game-object/Minitile';
import PaletteSet from '@/script/data/game-object/PaletteSet';
import { expect } from 'chai';
import times from 'lodash/times';
import { createCanvas } from '../../../../test-methods';

describe('Arrangement', function () {
  describe('constructor()', function () {
    it('Initializes cells from a CoilSnakeArrangementString.', function () {
      let coilSnakeArrangementString = (0b110111011111111111111111)
        .toString(16)
        .repeat(16);

      const arrangement = new Arrangement(coilSnakeArrangementString);

      const arrangementCell = new ArrangementCell();
      arrangementCell.flippedVertically = true;
      arrangementCell.flippedHorizontally = true;
      arrangementCell.minitilePaletteNumber = 5;
      arrangementCell.minitileNumber = 511;
      arrangementCell.isSolid = true;
      arrangementCell.flag0x40 = true;
      arrangementCell.flag0x20 = true;
      arrangementCell.isInteractive = true;
      arrangementCell.isWater = true;
      arrangementCell.inflictsSunstroke = true;
      arrangementCell.coversUpperBody = true;
      arrangementCell.coversLowerBody = true;

      expect(arrangement.cells).to.eql(times(16, () => arrangementCell));
    });

    it('Constructs an Arrangement with default cell values.', function () {
      const arrangement = new Arrangement();
      expect(arrangement.cells).to.eql(times(16, () => new ArrangementCell()));
    });
  });

  describe('getImageData()', function () {
    it('Draws the correct Minitiles with the correct MinitilePalette given the provided values.', function () {
      const paletteSet = new PaletteSet(
        '000uuqoqjqf9koivv0ieuv1b2vd5ncafevvpoojkkdgha666' +
          '000uuqoqjecljjoenvhevv1b2vd5ncafevmdqfejbdj99666' +
          '000uuqmvnkkdjfbhpvqbvv6b2vd5ncafeuvonqlnlodej668' +
          '000uuqocdk9bg6c0v06fev6b2vd5ncafemksihnedhaac666' +
          '000uuqoqjkkdjjojndi87v6b2vd5ncafevveqnbmf9hc7666' +
          '000uuqoqj0v0kkd0v0v6b0nf2vd5ncafevq7vj8vdasbd666'
      );

      const minitiles = times(512, () => new Minitile());
      minitiles[117] = new Minitile(
        '6666661161111611661666111616666116111161661666616111116166666661\n6666661161111611661666111616666116111161661666616111116166666661'
      );
      minitiles[150] = new Minitile(
        '7771111171777771711111717177117171111771717711777177711777717777\n7771111171777771711111717177117171111771717711777177711777717777'
      );
      minitiles[295] = new Minitile(
        '7771111171717771717171717177117171111771717711777177711777717777\n0000000000000000000000000000000000000000000000000000000000000000'
      );
      minitiles[332] = new Minitile(
        '1666666116166161161111611661166111661611111616111116161111166611\n0000000000000000000000000000000000000000000000000000000000000000'
      );
      minitiles[381] = new Minitile(
        'ffffffff99999991999999119999911199991111999111119911111191111111\n0000000000000000000000000000000000000000000000000000000000000000'
      );
      minitiles[382] = new Minitile(
        'ffffffff11111119111111991111199911119999111999991199999919999999\n0000000000000000000000000000000000000000000000000000000000000000'
      );
      minitiles[383] = new Minitile(
        'ffffffff9999999f999999ff99999fef9999feef999feedf99feeddf9ffedddf\n0000000000000000000000000000000000000000000000000000000000000000'
      );
      minitiles[404] = new Minitile(
        'f1111111f1111111f1111111f1111111df11111fcdfffffdbcddddddbbcdddcc\n0000000000000000000000000000000000000000000000000000000000000000'
      );
      minitiles[405] = new Minitile(
        '99999999999999999999999999999999f999999ffffffffdfcddddddfbcddddc\n0000000000000000000000000000000000000000000000000000000000000000'
      );
      minitiles[406] = new Minitile(
        'ffdfdddffefdfdcffedf2fcffeddf2ffeddccf2fddccbbffdcccccbfccccccbf\n0000000000000000000000000000000000000000000000000000000000000000'
      );
      minitiles[419] = new Minitile(
        'fffffffffeeeeeeefeeeeeeefeeeeeeefeedddeefddeeeddfeedddeefddeeedd\n0000000000000000000000000000000000000000000000000000000000000000'
      );

      const wht = new Color(30, 30, 26).toUint8ClampedArray();
      const gry = new Color(24, 26, 19).toUint8ClampedArray();
      const ppl = new Color(17, 14, 31).toUint8ClampedArray();
      const red = new Color(31, 1, 11).toUint8ClampedArray();
      const grn = new Color(5, 23, 12).toUint8ClampedArray();
      const tan = new Color(31, 22, 13).toUint8ClampedArray();
      const lbn = new Color(26, 15, 14).toUint8ClampedArray();
      const mbn = new Color(19, 11, 13).toUint8ClampedArray();
      const dbn = new Color(19, 9, 9).toUint8ClampedArray();
      const blk = new Color(6, 6, 6).toUint8ClampedArray();

      // prettier-ignore
      const expectedDataValue = new Uint8ClampedArray([
        ...red, ...red, ...red, ...wht, ...wht, ...wht, ...wht, ...wht,    ...ppl, ...ppl, ...ppl, ...ppl, ...ppl, ...ppl, ...wht, ...wht,    ...red, ...red, ...red, ...wht, ...wht, ...wht, ...wht, ...wht,    ...wht, ...ppl, ...ppl, ...ppl, ...ppl, ...ppl, ...ppl, ...wht,

        ...red, ...wht, ...red, ...wht, ...red, ...red, ...red, ...wht,    ...ppl, ...wht, ...wht, ...wht, ...wht, ...ppl, ...wht, ...wht,    ...red, ...wht, ...red, ...red, ...red, ...red, ...red, ...wht,    ...wht, ...ppl, ...wht, ...ppl, ...ppl, ...wht, ...ppl, ...wht,

        ...red, ...wht, ...red, ...wht, ...red, ...wht, ...red, ...wht,    ...ppl, ...ppl, ...wht, ...ppl, ...ppl, ...ppl, ...wht, ...wht,    ...red, ...wht, ...wht, ...wht, ...wht, ...wht, ...red, ...wht,    ...wht, ...ppl, ...wht, ...wht, ...wht, ...wht, ...ppl, ...wht,

        ...red, ...wht, ...red, ...red, ...wht, ...wht, ...red, ...wht,    ...wht, ...ppl, ...wht, ...ppl, ...ppl, ...ppl, ...ppl, ...wht,    ...red, ...wht, ...red, ...red, ...wht, ...wht, ...red, ...wht,    ...wht, ...ppl, ...ppl, ...wht, ...wht, ...ppl, ...ppl, ...wht,

        ...red, ...wht, ...wht, ...wht, ...wht, ...red, ...red, ...wht,    ...wht, ...ppl, ...wht, ...wht, ...wht, ...wht, ...ppl, ...wht,    ...red, ...wht, ...wht, ...wht, ...wht, ...red, ...red, ...wht,    ...wht, ...wht, ...ppl, ...ppl, ...wht, ...ppl, ...wht, ...wht,

        ...red, ...wht, ...red, ...red, ...wht, ...wht, ...red, ...red,    ...ppl, ...ppl, ...wht, ...ppl, ...ppl, ...ppl, ...ppl, ...wht,    ...red, ...wht, ...red, ...red, ...wht, ...wht, ...red, ...red,    ...wht, ...wht, ...wht, ...ppl, ...wht, ...ppl, ...wht, ...wht,

        ...red, ...wht, ...red, ...red, ...red, ...wht, ...wht, ...red,    ...ppl, ...wht, ...wht, ...wht, ...wht, ...wht, ...ppl, ...wht,    ...red, ...wht, ...red, ...red, ...red, ...wht, ...wht, ...red,    ...wht, ...wht, ...wht, ...ppl, ...wht, ...ppl, ...wht, ...wht,

        ...red, ...red, ...red, ...wht, ...red, ...red, ...red, ...red,    ...ppl, ...ppl, ...ppl, ...ppl, ...ppl, ...ppl, ...ppl, ...wht,    ...red, ...red, ...red, ...wht, ...red, ...red, ...red, ...red,    ...wht, ...wht, ...wht, ...ppl, ...ppl, ...ppl, ...wht, ...wht,


        ...blk, ...blk, ...blk, ...blk, ...blk, ...blk, ...blk, ...blk,    ...blk, ...blk, ...blk, ...blk, ...blk, ...blk, ...blk, ...blk,    ...blk, ...blk, ...blk, ...blk, ...blk, ...blk, ...blk, ...blk,    ...blk, ...blk, ...blk, ...blk, ...blk, ...blk, ...blk, ...blk,

        ...wht, ...wht, ...wht, ...wht, ...wht, ...wht, ...wht, ...grn,    ...grn, ...grn, ...grn, ...grn, ...grn, ...grn, ...grn, ...wht,    ...wht, ...wht, ...wht, ...wht, ...wht, ...wht, ...wht, ...grn,    ...grn, ...grn, ...grn, ...grn, ...grn, ...grn, ...grn, ...blk,

        ...wht, ...wht, ...wht, ...wht, ...wht, ...wht, ...grn, ...grn,    ...grn, ...grn, ...grn, ...grn, ...grn, ...grn, ...wht, ...wht,    ...wht, ...wht, ...wht, ...wht, ...wht, ...wht, ...grn, ...grn,    ...grn, ...grn, ...grn, ...grn, ...grn, ...grn, ...blk, ...blk,
        
        ...wht, ...wht, ...wht, ...wht, ...wht, ...grn, ...grn, ...grn,    ...grn, ...grn, ...grn, ...grn, ...grn, ...wht, ...wht, ...wht,    ...wht, ...wht, ...wht, ...wht, ...wht, ...grn, ...grn, ...grn,    ...grn, ...grn, ...grn, ...grn, ...grn, ...blk, ...dbn, ...blk,

        ...wht, ...wht, ...wht, ...wht, ...grn, ...grn, ...grn, ...grn,    ...grn, ...grn, ...grn, ...grn, ...wht, ...wht, ...wht, ...wht,    ...wht, ...wht, ...wht, ...wht, ...grn, ...grn, ...grn, ...grn,    ...grn, ...grn, ...grn, ...grn, ...blk, ...dbn, ...dbn, ...blk,

        ...wht, ...wht, ...wht, ...grn, ...grn, ...grn, ...grn, ...grn,    ...grn, ...grn, ...grn, ...wht, ...wht, ...wht, ...wht, ...wht,    ...wht, ...wht, ...wht, ...grn, ...grn, ...grn, ...grn, ...grn,    ...grn, ...grn, ...grn, ...blk, ...dbn, ...dbn, ...mbn, ...blk,

        ...wht, ...wht, ...grn, ...grn, ...grn, ...grn, ...grn, ...grn,    ...grn, ...grn, ...wht, ...wht, ...wht, ...wht, ...wht, ...wht,    ...wht, ...wht, ...grn, ...grn, ...grn, ...grn, ...grn, ...grn,    ...grn, ...grn, ...blk, ...dbn, ...dbn, ...mbn, ...mbn, ...blk,

        ...wht, ...grn, ...grn, ...grn, ...grn, ...grn, ...grn, ...grn,    ...grn, ...wht, ...wht, ...wht, ...wht, ...wht, ...wht, ...wht,    ...wht, ...grn, ...grn, ...grn, ...grn, ...grn, ...grn, ...grn,    ...grn, ...blk, ...blk, ...dbn, ...mbn, ...mbn, ...mbn, ...blk,


        ...blk, ...wht, ...wht, ...wht, ...wht, ...wht, ...wht, ...wht,    ...grn, ...grn, ...grn, ...grn, ...grn, ...grn, ...grn, ...grn,    ...blk, ...wht, ...wht, ...wht, ...wht, ...wht, ...wht, ...wht,    ...blk, ...blk, ...mbn, ...blk, ...mbn, ...mbn, ...mbn, ...blk,

        ...blk, ...wht, ...wht, ...wht, ...wht, ...wht, ...wht, ...wht,    ...grn, ...grn, ...grn, ...grn, ...grn, ...grn, ...grn, ...grn,    ...blk, ...wht, ...wht, ...wht, ...wht, ...wht, ...wht, ...wht,    ...blk, ...dbn, ...blk, ...mbn, ...blk, ...mbn, ...lbn, ...blk,

        ...blk, ...wht, ...wht, ...wht, ...wht, ...wht, ...wht, ...wht,    ...grn, ...grn, ...grn, ...grn, ...grn, ...grn, ...grn, ...grn,    ...blk, ...wht, ...wht, ...wht, ...wht, ...wht, ...wht, ...wht,    ...blk, ...dbn, ...mbn, ...blk, ...gry, ...blk, ...lbn, ...blk,

        ...blk, ...wht, ...wht, ...wht, ...wht, ...wht, ...wht, ...wht,    ...grn, ...grn, ...grn, ...grn, ...grn, ...grn, ...grn, ...grn,    ...blk, ...wht, ...wht, ...wht, ...wht, ...wht, ...wht, ...wht,    ...blk, ...dbn, ...mbn, ...mbn, ...blk, ...gry, ...blk, ...blk,

        ...mbn, ...blk, ...wht, ...wht, ...wht, ...wht, ...wht, ...blk,    ...blk, ...grn, ...grn, ...grn, ...grn, ...grn, ...grn, ...blk,    ...mbn, ...blk, ...wht, ...wht, ...wht, ...wht, ...wht, ...blk,    ...dbn, ...mbn, ...mbn, ...lbn, ...lbn, ...blk, ...gry, ...blk,

        ...lbn, ...mbn, ...blk, ...blk, ...blk, ...blk, ...blk, ...mbn,    ...blk, ...blk, ...blk, ...blk, ...blk, ...blk, ...blk, ...mbn,    ...lbn, ...mbn, ...blk, ...blk, ...blk, ...blk, ...blk, ...mbn,    ...mbn, ...mbn, ...lbn, ...lbn, ...tan, ...tan, ...blk, ...blk,

        ...tan, ...lbn, ...mbn, ...mbn, ...mbn, ...mbn, ...mbn, ...mbn,    ...blk, ...lbn, ...mbn, ...mbn, ...mbn, ...mbn, ...mbn, ...mbn,    ...tan, ...lbn, ...mbn, ...mbn, ...mbn, ...mbn, ...mbn, ...mbn,    ...mbn, ...lbn, ...lbn, ...lbn, ...lbn, ...lbn, ...tan, ...blk,

        ...tan, ...tan, ...lbn, ...mbn, ...mbn, ...mbn, ...lbn, ...lbn,    ...blk, ...tan, ...lbn, ...mbn, ...mbn, ...mbn, ...mbn, ...lbn,    ...tan, ...tan, ...lbn, ...mbn, ...mbn, ...mbn, ...lbn, ...lbn,    ...lbn, ...lbn, ...lbn, ...lbn, ...lbn, ...lbn, ...tan, ...blk,


        ...blk, ...blk, ...blk, ...blk, ...blk, ...blk, ...blk, ...blk,    ...blk, ...blk, ...blk, ...blk, ...blk, ...blk, ...blk, ...blk,    ...blk, ...blk, ...blk, ...blk, ...blk, ...blk, ...blk, ...blk,    ...blk, ...blk, ...blk, ...blk, ...blk, ...blk, ...blk, ...blk,

        ...blk, ...dbn, ...dbn, ...dbn, ...dbn, ...dbn, ...dbn, ...dbn,    ...blk, ...dbn, ...dbn, ...dbn, ...dbn, ...dbn, ...dbn, ...dbn,    ...blk, ...dbn, ...dbn, ...dbn, ...dbn, ...dbn, ...dbn, ...dbn,    ...dbn, ...dbn, ...dbn, ...dbn, ...dbn, ...dbn, ...dbn, ...blk,

        ...blk, ...dbn, ...dbn, ...dbn, ...dbn, ...dbn, ...dbn, ...dbn,    ...blk, ...dbn, ...dbn, ...dbn, ...dbn, ...dbn, ...dbn, ...dbn,    ...blk, ...dbn, ...dbn, ...dbn, ...dbn, ...dbn, ...dbn, ...dbn,    ...dbn, ...dbn, ...dbn, ...dbn, ...dbn, ...dbn, ...dbn, ...blk,

        ...blk, ...dbn, ...dbn, ...dbn, ...dbn, ...dbn, ...dbn, ...dbn,    ...blk, ...dbn, ...dbn, ...dbn, ...dbn, ...dbn, ...dbn, ...dbn,    ...blk, ...dbn, ...dbn, ...dbn, ...dbn, ...dbn, ...dbn, ...dbn,    ...dbn, ...dbn, ...dbn, ...dbn, ...dbn, ...dbn, ...dbn, ...blk,

        ...blk, ...dbn, ...dbn, ...mbn, ...mbn, ...mbn, ...dbn, ...dbn,    ...blk, ...dbn, ...dbn, ...mbn, ...mbn, ...mbn, ...dbn, ...dbn,    ...blk, ...dbn, ...dbn, ...mbn, ...mbn, ...mbn, ...dbn, ...dbn,    ...dbn, ...dbn, ...mbn, ...mbn, ...mbn, ...dbn, ...dbn, ...blk,

        ...blk, ...mbn, ...mbn, ...dbn, ...dbn, ...dbn, ...mbn, ...mbn,    ...blk, ...mbn, ...mbn, ...dbn, ...dbn, ...dbn, ...mbn, ...mbn,    ...blk, ...mbn, ...mbn, ...dbn, ...dbn, ...dbn, ...mbn, ...mbn,    ...mbn, ...mbn, ...dbn, ...dbn, ...dbn, ...mbn, ...mbn, ...blk,

        ...blk, ...dbn, ...dbn, ...mbn, ...mbn, ...mbn, ...dbn, ...dbn,    ...blk, ...dbn, ...dbn, ...mbn, ...mbn, ...mbn, ...dbn, ...dbn,    ...blk, ...dbn, ...dbn, ...mbn, ...mbn, ...mbn, ...dbn, ...dbn,    ...dbn, ...dbn, ...mbn, ...mbn, ...mbn, ...dbn, ...dbn, ...blk,
 
        ...blk, ...mbn, ...mbn, ...dbn, ...dbn, ...dbn, ...mbn, ...mbn,    ...blk, ...mbn, ...mbn, ...dbn, ...dbn, ...dbn, ...mbn, ...mbn,    ...blk, ...mbn, ...mbn, ...dbn, ...dbn, ...dbn, ...mbn, ...mbn,    ...mbn, ...mbn, ...dbn, ...dbn, ...dbn, ...mbn, ...mbn, ...blk,
      ]);

      const arrangmentImageData = new Arrangement(
        '0d27800c75800c96800d4c800d7e800d7d800d7e800d7f800d94800d95800d94800d96800da3800da3800da3804da320'
      ).getImageData(minitiles, paletteSet);

      const [canvas, context] = createCanvas(4, 32, 32);
      context.putImageData(arrangmentImageData, 0, 0);
      // prettier-ignore
      document.styleSheets[1].insertRule(`
        .arrangement {
          background-image: url(${canvas.toDataURL('image/png')});
          width: ${32 / window.devicePixelRatio}px;
          height: ${32 / window.devicePixelRatio}px;
        }
      `);

      expect(arrangmentImageData.data).to.eql(expectedDataValue);
    });
  });

  describe('toCoilSnakeArrangementString()', function () {
    it('Generates a valid CoilSnakeArrangementString.', function () {
      let expectedCoilSnakeArrangementString = (0b110111011111111111111111)
        .toString(16)
        .repeat(16);

      let actualCoilSnakeArrangementString = new Arrangement(
        expectedCoilSnakeArrangementString
      ).toCoilSnakeArrangementString();

      expect(actualCoilSnakeArrangementString).to.equal(
        expectedCoilSnakeArrangementString
      );
      expect(
        isType(actualCoilSnakeArrangementString, 'CoilSnakeArrangementString')
      ).to.be.true;
    });
  });
});
