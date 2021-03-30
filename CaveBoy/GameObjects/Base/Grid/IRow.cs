using System;
using System.Collections.Generic;
using System.Text;

namespace CaveBoy.GameObjects.Base.Grid
{
    public interface IRow<TCell>
    {
        TCell this[int i] { get; set; }
    }
}
