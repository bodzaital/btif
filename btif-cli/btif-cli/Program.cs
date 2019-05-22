using System;
using System.IO;

namespace btif_cli
{
	class Program
	{
		static void Main(string[] args)
		{
			if (args.Length < 1)
			{
				Console.WriteLine("Error 1: No parameters given.\nHint: syntax is btif-cli [mode] [options]");
				return;
			}

			string[] create = new string[2] { "--create", "-c" };
			if (args.Is(create))
			{
				if (args.Length < 2)
				{
					Console.WriteLine("Error 3: No scene directory name given.\nHint: syntax is btif-cli --create directoryName displayName");
					return;
				}

				string directoryName = args[1];
				string displayName = directoryName;
				if (args.Length > 2)
				{
					displayName = args[2];
				}

				if (!Directory.Exists("scenes"))
				{
					Console.WriteLine("Error 4: Directory \"scenes\" does not exist.\nHint: is this a valid btif project folder?");
					return;
				}

				if (Directory.Exists($"scenes/${directoryName}"))
				{
					Console.WriteLine("Error 5: A directory by this name already exists.\nHint: choose another directory name.");
					return;
				}

				Directory.CreateDirectory($"scenes/{directoryName}");
				string[] fileTypes = new string[3] { "html", "css", "js" };
				string fileType;
				for (int i = 0; i < fileTypes.Length; i++)
				{
					fileType = fileTypes[i];
					Console.Write($"Writing {fileType}...  ");
					using (StreamWriter sw = new StreamWriter($"scenes/{directoryName}/{directoryName}.{fileType}"))
					{
						if (fileType == "html")
						{
							sw.WriteLine($"<!-- The scene's display file. -->");
							sw.WriteLine($"<meta id=\"sceneData\" data-title=\"{displayName}\">");
						}
						else if (fileType == "css")
						{
							sw.WriteLine($"// The scene's style file.");
						}
						else if (fileType == "js")
						{
							sw.WriteLine($"// The scene's script file.");
						}
					}
					Console.WriteLine("Done.");
				}
				Console.WriteLine($"Created scene \"{displayName}\" under \"{directoryName}\".");
			}
			else
			{
				Console.WriteLine("Error 2: Unrecognized program mode.\nHint: syntax is btif-cli [mode] [options]");
				return;
			}
		}
	}
}
