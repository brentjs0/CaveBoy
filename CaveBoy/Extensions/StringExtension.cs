using CaveBoy.Utility;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;

namespace CaveBoy.Extensions
{
    public static class StringExtension
    {
        public static int ToIntFromBase(this string numericString, byte inputBase = 10)
        {
            if (numericString.Length == 0)
            {
                throw new ArgumentException($"An empty string cannot be converted to a number.");
            }

            if (numericString.Length > 256)
            {
                throw new ArgumentException($"Numeric strings longer than 256 characters cannot be converted.");
            }

            int number = 0;
            for (int i = 0; i < numericString.Length; ++i)
            {
                char digit = numericString[numericString.Length - i - 1];
                number += digit.ToByte(inputBase) * MathUtility.Power(inputBase, i);
            }

            return number;
        }

        public static IEnumerable<string> InSlicesOf(this string inputString, int charactersPerSlice)
        {
            int remainingLength = inputString.Length;
            int startIndex = 0;

            while (remainingLength > charactersPerSlice)
            {
                yield return inputString.Substring(startIndex, charactersPerSlice);
                startIndex += charactersPerSlice;
                remainingLength -= charactersPerSlice;
            }

            yield return inputString.Substring(startIndex, remainingLength);
        }
    }
}
