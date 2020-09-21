using System.Collections.Generic;
using System.Linq;

namespace CaveBoy.Extensions
{
    public static class EnumerableExtension
    {
        public static IEnumerable<IEnumerable<TElement>> InSlicesOf<TElement>(this IEnumerable<TElement> enumerable, int elementsPerSlice)
        {
            IEnumerable<TElement> remainingItems = enumerable.Skip(0);

            while (remainingItems.Any())
            {
                yield return remainingItems.Take(elementsPerSlice);
                remainingItems = remainingItems.Skip(elementsPerSlice);
            }
        }
    }
}
