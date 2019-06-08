using System;
using System.Collections.Generic;
using System.Text;

namespace btif_cli
{
	public struct Warnings
	{
		public static readonly Warning NoCompilableFileWarning = new Warning(1, "No File", "No compilable file exists in this scene folder.");
		public static readonly Warning MalformedQuicklinkWarning = new Warning(2, "Malformed quick links.", "Unclosed or unopened quick links found.");
		public static readonly Warning UnclosedBracketWarning = new Warning(3, "Unclosed bracket", "An unclosed bracket is found.");
		public static readonly Warning UnopenedBracketWarning = new Warning(4, "Unopened bracket", "A closing bracket without an open is found.");
	}
}
