using CaveBoy.Base;
using System;

namespace CaveBoy.Wpf
{
	class Program : BaseProgram<Program>
	{
		public override string Platform => Eto.Platforms.Wpf;

		[STAThread]
		public static void Main(string[] args) => Run(args);
	}
}
