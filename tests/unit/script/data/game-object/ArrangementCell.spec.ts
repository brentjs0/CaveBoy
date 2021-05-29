import { isType } from '@/script/base/primitive-types';
import ArrangementCell from '@/script/data/game-object/ArrangementCell';
import Color from '@/script/data/game-object/Color';
import Minitile from '@/script/data/game-object/Minitile';
import PaletteSet from '@/script/data/game-object/PaletteSet';
import { expect } from 'chai';
import times from 'lodash/times';

import { setUpCanvas } from '../../../../test-methods';

describe('ArrangementCell', function () {
  describe('constructor()', function () {
    it('Initializes values from a CoilSnakeArrangementCellString.', function () {
      const arrangementCell = new ArrangementCell(
        // VH?PPP?TTTTTTTTTFFFFFFFF
        (0b110111011111111111111111).toString(16)
      );

      expect(arrangementCell.flippedVertically).to.be.true;
      expect(arrangementCell.flippedHorizontally).to.be.true;
      expect(arrangementCell.minitilePaletteNumber).to.equal(5);
      expect(arrangementCell.minitileNumber).to.equal(511);
      expect(arrangementCell.isSolid).to.be.true;
      expect(arrangementCell.flag0x40).to.be.true;
      expect(arrangementCell.flag0x20).to.be.true;
      expect(arrangementCell.isInteractive).to.be.true;
      expect(arrangementCell.isWater).to.be.true;
      expect(arrangementCell.inflictsSunstroke).to.be.true;
      expect(arrangementCell.coversUpperBody).to.be.true;
      expect(arrangementCell.coversLowerBody).to.be.true;

      expect(arrangementCell.isDeepWater).to.be.true;
      expect(arrangementCell.extendsInteractionRange).to.be.true;
    });
  });
  describe('getImageData()', function () {
    it('Generates an 8 x 8 CaveBoyImageData object.', function () {
      const minitiles = times(512, () => new Minitile());

      const cbImageData = new ArrangementCell().getImageData(
        minitiles,
        new PaletteSet()
      );
      expect(cbImageData.height).to.equal(8);
      expect(cbImageData.width).to.equal(8);
    });

    it('???', function () {
      const paletteSet = new PaletteSet(
        '000000000000000000000000000000000000000000000644' +
          '000000000000000000000000000000000000000000000644' +
          '000000000000000000000000000000000000000000000644' +
          '000000000000000000000000000000000000000000000644' +
          '000000000000000000000000000000000000000000000644' +
          '000uuqoqjqf9koivv0ieuv1b2vd5ncafevvpoojkkdgha666'
      );

      const minitiles = times(512, () => new Minitile());

      minitiles[2] = new Minitile(
        '8888888888888888888888888888888888888888888888888888888888888888\r000fffff00f111110f277777f2777777f2717111f2171717f2177717f2717717'
      );

      const cbImageData = new ArrangementCell(
        // VH0PPP0TTTTTTTTTFFFFFFFF
        (0b110111000000001011111111).toString(16)
      ).getImageData(minitiles, paletteSet);

      const one = new Color(30, 30, 26).toUint8ClampedArray();
      const two = new Color(24, 26, 19).toUint8ClampedArray();
      const svn = new Color(31, 1, 11).toUint8ClampedArray();
      const egt = new Color(2, 31, 13).toUint8ClampedArray();
      const eff = new Color(6, 6, 6).toUint8ClampedArray();

      // prettier-ignore
      const expectedDataValue = new Uint8ClampedArray([
          ...egt, ...egt, ...egt, ...eff, ...eff, ...eff, ...eff, ...eff,
          ...egt, ...egt, ...eff, ...one, ...one, ...one, ...one, ...one,
          ...egt, ...eff, ...two, ...svn, ...svn, ...svn, ...svn, ...svn,
          ...eff, ...two, ...svn, ...svn, ...svn, ...svn, ...svn, ...svn,
          ...eff, ...two, ...svn, ...one, ...svn, ...one, ...one, ...one,
          ...eff, ...two, ...one, ...svn, ...one, ...svn, ...one, ...svn,
          ...eff, ...two, ...one, ...svn, ...svn, ...svn, ...one, ...svn,
          ...eff, ...two, ...svn, ...one, ...svn, ...svn, ...one, ...svn,
        ]);
      const [canvas, ctx] = setUpCanvas(10);
      createImageBitmap(cbImageData).then((imageBitmap) =>
        ctx.drawImage(imageBitmap, 1, 1)
      );
      expect(cbImageData.data).to.eql(expectedDataValue);
    });

    // it('Flips image data vertically.', function () {
    //   const cbImageData = new ArrangementCell(
    //     '8888888888888888888888888888888888888888888888888888888888888888\r000fffff00f111110f277777f2777777f2717111f2171717f2177717f2717717'
    //   ).getImageData(/**/);

    //   const one = new Color(30, 30, 26).toUint8ClampedArray();
    //   const two = new Color(24, 26, 19).toUint8ClampedArray();
    //   const svn = new Color(31, 1, 11).toUint8ClampedArray();
    //   const egt = new Color(2, 31, 13).toUint8ClampedArray();
    //   const eff = new Color(6, 6, 6).toUint8ClampedArray();

    //   // prettier-ignore
    //   const expectedDataValue = new Uint8ClampedArray([
    //       ...eff, ...two, ...svn, ...one, ...svn, ...svn, ...one, ...svn,
    //       ...eff, ...two, ...one, ...svn, ...svn, ...svn, ...one, ...svn,
    //       ...eff, ...two, ...one, ...svn, ...one, ...svn, ...one, ...svn,
    //       ...eff, ...two, ...svn, ...one, ...svn, ...one, ...one, ...one,
    //       ...eff, ...two, ...svn, ...svn, ...svn, ...svn, ...svn, ...svn,
    //       ...egt, ...eff, ...two, ...svn, ...svn, ...svn, ...svn, ...svn,
    //       ...egt, ...egt, ...eff, ...one, ...one, ...one, ...one, ...one,
    //       ...egt, ...egt, ...egt, ...eff, ...eff, ...eff, ...eff, ...eff,
    //     ]);
    //   const [canvas, ctx] = setUpCanvas(10);
    //   createImageBitmap(cbImageData).then((imageBitmap) =>
    //     ctx.drawImage(imageBitmap, 1, 9)
    //   );
    //   expect(cbImageData.data).to.eql(expectedDataValue);
    // });
  });
  describe('toCoilSnakeArrangementCellString()', function () {
    it('Generates a valid CoilSnakeArrangementCellString.', function () {
      const arrangementCell = new ArrangementCell();

      const coilSnakeArrangementCellString = arrangementCell.toCoilSnakeArrangementCellString();
      expect(coilSnakeArrangementCellString).to.equal('');
      expect(
        isType(coilSnakeArrangementCellString, 'CoilSnakeArrangementCellString')
      ).to.be.true;
    });
  });
});
