using System.Collections.Generic;

namespace CaveBoy.GameObjects.Base.Grid
{
    public interface IGrid<TCell>
    {
        IList<TCell> Cells { get; }
        IList<IList<TCell>> Rows { get; }
        IList<IList<TCell>> Columns { get; }
    }
}