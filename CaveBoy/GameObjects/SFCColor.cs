using CaveBoy.Extensions;
using CaveBoy.GameObjects.Base;
using Eto.Drawing;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CaveBoy.GameObjects
{
    class SFCColor : GameObject<SFCColor>
    {
        private const byte maxComponentValue = 31;

        private byte _red;
        private byte _green;
        private byte _blue;
        public Color EtoColor { get; private set; }

        public SFCColor(byte red, byte green, byte blue)
        {
            CheckComponentValue("red", red);
            CheckComponentValue("green", green);
            CheckComponentValue("blue", blue);

            _red = red;
            _green = green;
            _blue = blue;
            EtoColor = new Color(_red / (float)maxComponentValue, _green / (float)maxComponentValue, _blue / (float)maxComponentValue);
        }

        public SFCColor(IEnumerable<char> colorString) :
            this(colorString.ElementAt(0).ToByte(32), colorString.ElementAt(1).ToByte(32), colorString.ElementAt(2).ToByte(32)) { }

        public override string PerformToString() => $"{_red.ToString(32)}{_green.ToString(32)}{_blue.ToString(32)}";

        private static void CheckComponentValue(string componentName, byte componentValue)
        {
            if (componentValue > maxComponentValue)
            {
                throw new ArgumentOutOfRangeException($"A color's {componentName} value cannot exceed {maxComponentValue}.");
            }
        }
    }

}
