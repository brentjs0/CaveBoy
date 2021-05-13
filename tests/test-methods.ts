import { isType, TypeName } from '@/script/base/primitive-types';
import { expect } from 'chai';

export function setUpCanvas(scale: number = 1): CanvasRenderingContext2D {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');

  const baseWidth = 400;
  const baseHeight = 256;

  // Set display size (css pixels).
  canvas.style.width = baseWidth + 'px';
  canvas.style.height = baseHeight + 'px';

  // Set actual size in memory (scaled to account for extra pixel density).
  var devicePixelRatio = window.devicePixelRatio || 1;
  canvas.width = Math.floor(baseWidth * devicePixelRatio);
  canvas.height = Math.floor(baseHeight * devicePixelRatio);

  if (ctx != null) {
    ctx.imageSmoothingEnabled = false;

    const checkerboardImage = document.getElementById(
      'checkerboard'
    ) as HTMLImageElement;
    const pattern = ctx.createPattern(checkerboardImage, 'repeat');
    if (pattern != null) {
      ctx.fillStyle = pattern;
    } else {
      ctx.fillStyle = '#fff';
    }
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Normalize coordinate system to use css pixels.
    ctx.scale(devicePixelRatio * scale, devicePixelRatio * scale);

    ctx.fillStyle = '#000';

    return ctx;
  }

  throw new Error('Canvas context could not be retreived.');
}

export function testIsTypeForIntType(
  type: TypeName,
  validRangeLow: number,
  validRangeHigh: number
) {
  describe(`isType<'${type}'>())`, function () {
    it('Returns true for valid values', function () {
      expect(isType(validRangeLow, type)).to.be.true;
      expect(isType(validRangeHigh, type)).to.be.true;
    });
    it('Returns false for non-number values.', function () {
      expect(isType(undefined, type)).to.be.false;
      expect(isType(null, type)).to.be.false;
      expect(isType(() => undefined, type)).to.be.false;
      expect(isType('str', type)).to.be.false;
    });
    it('Returns false for non-integers.', function () {
      expect(isType(validRangeLow + 0.5, type)).to.be.false;
      expect(isType(validRangeHigh - 0.999999, type)).to.be.false;
    });
    it('Returns false for out-of-range values.', function () {
      expect(isType(validRangeLow - 1, type)).to.be.false;
      expect(isType(validRangeHigh + 1, type)).to.be.false;
    });
  });
}

export function testIsTypeForStringType(
  type: TypeName,
  validValues: string[],
  invalidValues: string[],
  requiredCase: 'upper' | 'lower' | 'any' = 'any'
) {
  describe(`isType<'${type}'>())`, function () {
    it('Returns true for valid values', function () {
      for (let validValue of validValues) {
        expect(isType(validValue, type)).to.be.true;
      }
    });
    it('Returns false for non-string values.', function () {
      expect(isType(undefined, type)).to.be.false;
      expect(isType(6, type)).to.be.false;
      expect(isType(null, type)).to.be.false;
      expect(isType(() => undefined, type)).to.be.false;
    });
    if (requiredCase == 'upper') {
      it('Returns false when there are lower case characters.', function () {
        expect(isType(validValues[0].toLowerCase(), type)).to.be.false;
      });
    } else if (requiredCase == 'lower') {
      it('Returns false when there are upper case characters.', function () {
        expect(isType(validValues[0].toUpperCase(), type)).to.be.false;
      });
    }
    it('Returns false for other invalid values.', function () {
      for (let invalidValue of invalidValues) {
        expect(isType(invalidValue, type)).to.be.false;
      }
    });
  });
}
