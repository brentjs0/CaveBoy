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
      ctx.scale(8, 8);
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
