using CaveBoy.Extensions;
using System.Collections.Generic;

namespace CaveBoy.GameObjects.Base.Grid
{
    public class Grid<TCell>
    {
        public int Width { get; } = 0;
        public int Height { get; } = 0;
        public IEnumerable<TCell> Cells { get; }
        public IEnumerable<IEnumerable<TCell>> Rows { get; }

        public Grid(int width, int height, params TCell[] cells)
        {
            Width = width;
            Height = height;
            Cells = new List<TCell>(cells);
            Rows = Cells.InSlicesOf(Width);
        }
    }
}