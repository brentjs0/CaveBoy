namespace CaveBoy.Utility
{
    public static class MathUtility
    {
        public static int Power(int baseOperand, int exponent)
        {
            int product = 1;
            for (int i = 0; i < exponent; ++i)
            {
                product *= baseOperand;
            }

            return product;
        }
    }
}
