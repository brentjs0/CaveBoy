using Eto.Forms;

namespace CaveBoy.Base
{
	public abstract class BaseProgram<TProgram> : BaseProgram where TProgram : BaseProgram, new()
	{
		private static BaseProgram _program;

		public static void Run(string[] args)
		{
			_program = new TProgram();
			new Application(_program.Platform).Run(new MainForm());
		}
	}

	public abstract class BaseProgram
	{
		public abstract string Platform { get; }

		public BaseProgram() { }
	}
}
