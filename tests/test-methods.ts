import { isType, TypeName } from '@/script/base/primitive-types';
import { expect } from 'chai';

export function createCanvas(
  scale: number = 1,
  width: number = 256,
  height: number = 128
): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const canvas = document.createElement('CANVAS') as HTMLCanvasElement;
  canvas.classList.add('test-canvas');
  canvas.width = width;
  canvas.height = height;

  const devicePixelRatio = window.devicePixelRatio || 1;
  canvas.style.width = `${(width / devicePixelRatio) * scale}px`;
  canvas.style.height = `${(height / devicePixelRatio) * scale}px`;

  const context = canvas.getContext('2d');
  if (context !== null) {
    context.imageSmoothingEnabled = false;
    paintCheckerboard(context, width, height);

    const canvasesDiv = document.getElementById('canvases');
    if (canvasesDiv == null) {
      throw new Error('Canvas container could not be retrieved.');
    }
    canvasesDiv.insertAdjacentElement('beforeend', canvas);

    return [canvas, context];
  }

  throw new Error('Canvas context could not be retrieved.');
}

function paintCheckerboard(
  context: CanvasRenderingContext2D,
  physicalWidth: number,
  physicalHeight: number
) {
  const initialFillStyle = context.fillStyle;

  context.fillStyle = '#999';
  context.fillRect(0, 0, physicalWidth, physicalHeight);
  context.fillStyle = '#666';

  const squareSize = 1;

  const horizontalSquareCount = Math.ceil(physicalWidth / squareSize);
  const verticalSquareCount = Math.ceil(physicalHeight / squareSize);

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

  context.fillStyle = initialFillStyle;
}

export function testIsTypeForIntType(
  type: TypeName,
  validRangeLow: number,
  validRangeHigh: number,
  skipNonIntegerCheck: boolean = false
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
    if (!skipNonIntegerCheck) {
      it('Returns false for non-integers.', function () {
        expect(isType(validRangeLow + 0.5, type)).to.be.false;
        expect(isType(validRangeHigh - 0.999999, type)).to.be.false;
      });
    }
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
