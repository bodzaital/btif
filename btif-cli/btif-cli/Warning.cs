using System;
using System.Collections.Generic;
using System.Text;

namespace btif_cli
{
	public class Warning : Error
	{
		public Warning(int number, string name, string description) : base(number, name, description)
		{

		}

		public override string ToString()
		{
			return $"Warning {Number}: {Name}\n{Description}\n  at: {(File != null ? File : "")}{(Line != -1 ? ":" + Line : "")}";
			//if (Line == -1 || File == null)
			//{
			//	return $"Warning {Number}: {Name}\n{Description}";
			//}
			//else
			//{
			//	return $"Warning {Number}: {Name}\n{Description}\n    at: {File}:{Line}";
			//}
		}

		public override void Return(int line = -1, string file = null)
		{
			Line = line;
			File = file;

			ConsoleColor fg = Console.ForegroundColor;
			ConsoleColor bg = Console.BackgroundColor;

			Console.ForegroundColor = ConsoleColor.Yellow;
			Console.BackgroundColor = ConsoleColor.Black;

			Console.WriteLine(this);

			Console.ForegroundColor = fg;
			Console.BackgroundColor = bg;
		}
	}
}
