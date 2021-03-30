using CaveBoy.Extensions;
using CaveBoy.GameObjects.Base;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CaveBoy.GameObjects
{
    class MinitilePalette : GameObject<MinitilePalette>
    {
        public SFCColor[] Colors { get; private set; }

        public MinitilePalette(params SFCColor[] colors)
        {
            if (colors.Length != 16)
            {
                throw new ArgumentException("A minitile palette must have 16 colors.");
            }

            Colors = colors;
        }

        public MinitilePalette(IEnumerable<SFCColor> colors) : this(colors.ToArray()) { }

        public MinitilePalette(IEnumerable<char> paletteString) : this(paletteString.InSlicesOf(3).Select(colorString => new SFCColor(colorString))) { }

        public override string PerformToString() => string.Join(string.Empty, (object[])Colors);
    }
}
