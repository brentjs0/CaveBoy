using System;

namespace CaveBoy.Extensions
{
    public static class CharExtension
    {
        private static byte?[] numericValuesByCharNumber = new byte?[]
        {
            // 0 - 47 (Control Characters and Characters !"#$%&'()*+,-./)
            null, null, null, null, null, null, null, null, null, null, null, null,
            null, null, null, null, null, null, null, null, null, null, null, null,
            null, null, null, null, null, null, null, null, null, null, null, null,
            null, null, null, null, null, null, null, null, null, null, null, null,

            // 48 - 57 (Characters 0123456789)
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9,

            // 58 - 64 (Characters :;<=>?@)
            null, null, null, null, null, null, null,

            // 65 - 90 (Characters ABCDEFGHIJKLMNOPQRSTUVWXYZ)
            10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,

            // 91 - 96 (Characters [\]^_`)
            null, null, null, null, null, null,

            // 97 - 122 (Characters abcdefghijklmnopqrstuvwxyz)
            10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35
        };

        public static byte ToByte(this char character, byte inputBase = 10)
        {
            byte? numericValue = null;
            bool baseIsImplemented = inputBase > 1 && inputBase < 37;
            bool characterIsOutOfRange = character >= numericValuesByCharNumber.Length;

            if (baseIsImplemented)
            {
                if (!characterIsOutOfRange)
                {
                    numericValue = numericValuesByCharNumber[character];
                }
            }
            else 
            {
                throw new NotImplementedException($"Conversion from base {inputBase} has not been implemented.");
            }

            if (characterIsOutOfRange || numericValue == null || numericValue >= inputBase)
            {
                throw new ArgumentException($"The character '{character}' is not a base-{inputBase} digit.");
            }

            return numericValue.Value;
        }
    }
}
