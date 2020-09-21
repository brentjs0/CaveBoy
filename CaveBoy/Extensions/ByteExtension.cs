namespace CaveBoy.Extensions
{
    public static class ByteExtension
    {
        public static string ToString(this byte number, byte outputBase, int minimumLength = 1) => ((int)number).ToString(outputBase, minimumLength);
    }
}
