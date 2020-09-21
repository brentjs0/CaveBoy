using System;
using System.Linq;
using System.Text;

namespace CaveBoy.Extensions
{
    public static class IntExtension
    {
        private static char[] _digitsByNumericValue = new[]
        {
            '0', '1', '2', '3', '4', '5', '6', '7',
            '8', '9', 'a', 'b', 'c', 'd', 'e', 'f',
            'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
            'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
            'w', 'x', 'y', 'z'
        };

        private static byte[] _systemConvertibleBases = new byte[] { 2, 8, 10, 16 };

        public static string ToString(this int number, byte outputBase, int minimumLength = 1)
        {
            if (outputBase < 2 || outputBase > 36)
            {
                throw new NotImplementedException($"Conversion to base {outputBase} has not been implemented.");
            }

            if (_systemConvertibleBases.Contains(outputBase))
            {
                return Convert.ToString(number, outputBase);
            }

            StringBuilder numberString = new StringBuilder();
            int placeValue = 1;

            for (int quotient = number; quotient > 0; quotient = number / placeValue)
            {
                int digitValue = quotient % outputBase;
                numberString.Insert(0, _digitsByNumericValue[digitValue]);
                placeValue *= outputBase;
            }

            int paddingLength = numberString.Length >= minimumLength
                ? 0
                : minimumLength - numberString.Length;

            return numberString.Insert(0, "0", paddingLength).ToString();
        }
    }
}
