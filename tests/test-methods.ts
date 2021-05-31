import { isType, TypeName } from '@/script/base/primitive-types';
import { expect } from 'chai';

export function setUpCanvas(
  scale: number = 2,
  width: number = 200,
  height: number = 128
): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');

  const transformScale = Math.floor(scale / 2);

  // Set display size (css pixels).
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';
  canvas.style.transform = `scale(${transformScale}, ${transformScale})`;

  // Set actual size in memory (scaled to account for extra pixel density).
  var devicePixelRatio = window.devicePixelRatio || 1;
  canvas.width = Math.floor(width * devicePixelRatio);
  canvas.height = Math.floor(height * devicePixelRatio);

  if (ctx != null) {
    ctx.imageSmoothingEnabled = false;

    ctx.fillStyle = '#999';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.scale(devicePixelRatio * 2, devicePixelRatio * 2);
    paintCheckerboard(canvas, ctx);

    ctx.fillStyle = '#666';
    paintCheckerboard(canvas, ctx);

    return [canvas, ctx];
  }

  throw new Error('Canvas context could not be retreived.');
}

function paintCheckerboard(
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D
) {
  const canvasCSSWidth = parseInt(
    canvas.style.width.substr(0, canvas.style.width.length - 2)
  );
  const canvasCSSHeight = parseInt(
    canvas.style.height.substr(0, canvas.style.height.length - 2)
  );

  const squareSize = 4;

  const horizontalSquareCount = Math.ceil(canvasCSSWidth / squareSize);
  const verticalSquareCount = Math.ceil(canvasCSSHeight / squareSize);

  for (let column = 0; column <= horizontalSquareCount; ++column) {
    for (let row = 0; row <= verticalSquareCount; ++row) {
      let rowOddity = row % 2;
      if ((column + rowOddity) % 2 === 0) {
        context.fillRect(
          column * squareSize,
          row * squareSize,
          squareSize,
          squareSize
        );
      }
    }
  }
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
