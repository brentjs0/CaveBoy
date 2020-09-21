using Eto.Drawing;

namespace CaveBoy.Widgets
{
    public class RelativeGraphics
    {
        private Graphics _graphics;
        private float _scalingXOffset = 0;
        private float _scalingYOffset = 0;
        private float _staticXOffset = 0;
        private float _staticYOffset = 0;
        private float _scale = 1;

        public RelativeGraphics(Graphics graphics)
        {
            _graphics = graphics;
        }

        public RelativeGraphics(Graphics graphics, float scale)
        {
            _graphics = graphics;
            _scale = scale;
        }

        public RelativeGraphics(Graphics graphics, float scalingXOffset, float scalingYOffset, float staticXOffset = 0, float staticYOffset = 0, float scale = 1)
        {
            _graphics = graphics;
            _scalingXOffset = scalingXOffset;
            _scalingYOffset = scalingYOffset;
            _staticXOffset = staticXOffset;
            _staticYOffset = staticYOffset;
            _scale = scale;
        }

        public RelativeGraphics(RelativeGraphics relativeGraphics, float scalingXOffset, float scalingYOffset, float staticXOffset = 0, float staticYOffset = 0)
        {
            _graphics = relativeGraphics._graphics;
            _scale = relativeGraphics._scale;
            _scalingXOffset += relativeGraphics._scalingXOffset + scalingXOffset;
            _scalingYOffset += relativeGraphics._scalingYOffset + scalingYOffset;
            _staticXOffset += relativeGraphics._staticXOffset + staticXOffset;
            _staticYOffset += relativeGraphics._staticYOffset + staticYOffset;
        }

        public void FillRectangle(Color color, float x, float y, float width, float height)
        {
            float relativeX = ((x + _scalingXOffset) * _scale) + _staticXOffset;
            float relativeY = ((y + _scalingYOffset) * _scale) + _staticYOffset;
            float relativeWidth = width * _scale;
            float relativeHeight = height * _scale;

            _graphics.FillRectangle(color, relativeX, relativeY, relativeWidth, relativeHeight);
        }

        public void FillRectangle(Color color, RectangleF rectangle)
        {
            FillRectangle(color, rectangle.X, rectangle.Y, rectangle.Width, rectangle.Height);
        }

        public void DrawPoint(Color color, float x, float y)
        {
            FillRectangle(color, x, y, 1, 1);
        }

        public void DrawPoint(Color color, PointF point)
        {
            FillRectangle(color, point.X, point.Y, 1, 1);
        }
    }
}
