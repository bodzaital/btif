namespace btif_cli
{
	static class Extensions
	{
		public static bool Is(this string[] args, params string[] list)
		{
			foreach (string item in list)
			{
				if (args[0] == item)
				{
					return true;
				}
			}

			return false;
		}
	}
}
