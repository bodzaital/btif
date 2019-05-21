using System;
using System.IO;

namespace btif_cli
{
	class Program
	{
		/// <summary>
		/// A list of modes the program may run in.
		/// </summary>
		enum OperationMode
		{
			/// <summary>
			/// Initializes a new project directory.
			/// </summary>
			Init,

			/// <summary>
			/// Creates a new scene.
			/// </summary>
			Create,

			/// <summary>
			/// Deletes a scene.
			/// </summary>
			Delete,

			/// <summary>
			/// Starts the web server.
			/// </summary>
			Start,

			/// <summary>
			/// Stops the web server.
			/// </summary>
			Stop,

			/// <summary>
			/// Checks the integrity of the directory structure.
			/// </summary>
			Check
		}

		static void Main(string[] args)
		{
			Console.WriteLine("btif-cli v1.0");

			if (args.Length == 0)
			{
				Console.WriteLine("Error: No startup parameters set.");
				return;
			}

			if (!Enum.TryParse(args[0], out OperationMode mode))
			{
				Console.WriteLine("Error: Invalid parameter set.");
				return;
			}

			switch (mode)
			{
				case OperationMode.Create:
					CreateMode(args);
					break;
				case OperationMode.Delete:
					DeleteMode();
					break;
				case OperationMode.Start:
					StartMode();
					break;
				case OperationMode.Stop:
					StopMode();
					break;
				case OperationMode.Check:
					CheckMode();
					break;
				case OperationMode.Init:
				default:
					InitMode();
					break;
			}
		}

		private static void InitMode()
		{
			throw new NotImplementedException();
		}

		private static void CheckMode()
		{
			throw new NotImplementedException();
		}

		private static void StopMode()
		{
			throw new NotImplementedException();
		}

		private static void StartMode()
		{
			throw new NotImplementedException();
		}

		private static void DeleteMode()
		{
			throw new NotImplementedException();
		}

		private static void CreateMode(string[] args)
		{
			if (!Directory.Exists("scenes"))
			{
				Console.WriteLine("Error: Invalid directory structure. Missing \"scenes\" directory.");
				return;
			}

			if (args.Length < 3)
			{
				Console.WriteLine("Error: Not enough parameters given.");
				return;
			}

			string directory = args[1];

			if (Directory.Exists($"scenes/{directory}"))
			{
				Console.WriteLine("Error: A scene by this directory name already exists.");
				return;
			}

			string scene = args[2];

			Directory.CreateDirectory($"scenes/{directory}");
			File.Create($"scenes/{directory}/{directory}.html");
			File.Create($"scenes/{directory}/{directory}.js");
			File.Create($"scenes/{directory}/{directory}.css");
		}
	}
}
