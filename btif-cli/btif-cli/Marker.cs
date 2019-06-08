using System;
using System.Collections.Generic;
using System.Text;

namespace btif_cli
{
	public enum MarkerTypes
	{
		Start,
		End
	}

	public class Marker
	{
		public int Line { get; }
		public int Position { get; }
		public MarkerTypes MarkerType { get; }

		public Marker(int line, int position, MarkerTypes markerType)
		{
			Line = line;
			Position = position;
			MarkerType = markerType;
		}
	}
}
