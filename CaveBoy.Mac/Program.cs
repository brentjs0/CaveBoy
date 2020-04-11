using CaveBoy.Base;
using System;

namespace CaveBoy.Mac
{
	class Program : BaseProgram<Program>
	{
		public override string Platform => Eto.Platforms.Mac64;

		[STAThread]
		public static void Main(string[] args) => Run(args);
	}
}
