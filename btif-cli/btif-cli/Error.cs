using System;
using System.Collections.Generic;
using System.Text;

namespace btif_cli
{
	public class Error
	{
		public int Number { get; }
		public string Name { get; }
		public string Description { get; }
		public int Line { get; set; }
		public string File { get; set; }

		public Error(int number, string name, string description)
		{
			Number = number;
			Name = name;
			Description = description;
			Line = -1;
			File = null;
		}

		public override string ToString()
		{
			if (Line == -1 || File == null)
			{
				return $"Error {Number}: {Name}\n{Description}";
			}
			else
			{
				return $"Error {Number}: {Name}\n{Description}\n    at: {File}:{Line}";
			}
		}

		public virtual void Return(int line = -1, string file = null)
		{
			Line = line;
			File = file;

			ConsoleColor fg = Console.ForegroundColor;
			ConsoleColor bg = Console.BackgroundColor;

			Console.ForegroundColor = ConsoleColor.Red;
			Console.BackgroundColor = ConsoleColor.Black;

			Console.WriteLine(this);

			Console.ForegroundColor = fg;
			Console.BackgroundColor = bg;

			Environment.Exit(1);
		}
	}
}
