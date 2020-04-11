using CaveBoy.Base;
using System;

namespace CaveBoy.Gtk
{
	class Program : BaseProgram<Program>
	{
		public override string Platform => Eto.Platforms.Gtk;

		[STAThread]
		public static void Main(string[] args) => Run(args);
	}
}
