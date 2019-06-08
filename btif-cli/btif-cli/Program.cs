using System;
using System.IO;
using System.Collections.Generic;
using System.Text;

namespace btif_cli
{
	class Program
	{
		static void Main(string[] args)
		{
			args = new string[1] { "compile" };

			if (args.Length < 1)
			{
				Errors.NoParamsError.Return();
			}

			string[] audit = new string[1] { "audit" };
			string[] start = new string[1] { "start" };
			string[] stop = new string[1] { "stop" };
			string[] create = new string[2] { "create", "new" };
			string[] init = new string[2] { "initialize", "init" };
			string[] delete = new string[1] { "delete" };
			string[] compile = new string[2] { "compile", "make" };
			string[] test = new string[1] { "test" };

			if (args.Is(create))
			{
				CreateMode(args);
			}
			else if (args.Is(compile))
			{
				CompileMode();
			}
			else if (args.Is(test))
			{
				Directory.CreateDirectory("scenes");
				CreateMode(new string[] { "create", "scene-0", "Test Scene" });
			}
			else
			{
				Errors.UnrecognizedProgramModeError.Return();
			}
		}

		private static void CompileMode()
		{
			foreach (string scene in Directory.GetDirectories("scenes"))
			{
				Console.WriteLine($"Compiling {scene}");
				string path = $"scenes/{scene.Substring(7)}/{scene.Substring(7)}.html";
				if (!File.Exists(path))
				{
					Warnings.NoCompilableFileWarning.Return(file: path);
					continue;
				}

				string f = "";
				using (StreamReader reader = new StreamReader(path))
				{
					f = reader.ReadToEnd();
				}

				LinkedList<Marker> markers = new LinkedList<Marker>();

				int lineCount = 1;

				for (int i = 0; i < f.Length - 1; i++)
				{
					if (f[i] == '\n')
					{
						lineCount++;
					}

					if (f[i] == '[' && f[i + 1] == '[')
					{
						markers.AddLast(new Marker(lineCount, i + 2, MarkerTypes.Start));
					}

					if (f[i] == ']' && f[i + 1] == ']')
					{
						markers.AddLast(new Marker(lineCount, i, MarkerTypes.End));
					}
				}

				LinkedListNode<Marker> m = markers.First;
				while (m != null && m.Next != null)
				{
					Console.WriteLine($"{m.Value.Line}:{m.Value.MarkerType} -> {m.Next.Value.MarkerType}");
					if (m.Value.MarkerType == MarkerTypes.Start && m.Next.Value.MarkerType == MarkerTypes.End)
					{
						m = m.Next.Next;
					}
					else
					{
						Console.WriteLine("I'm a bad boi");
						if (m.Value.MarkerType == MarkerTypes.Start && m.Next.Value.MarkerType != MarkerTypes.End)
						{
							Warnings.UnclosedBracketWarning.Return(m.Value.Line, path);
						}
						if (m.Value.MarkerType != MarkerTypes.Start && m.Next.Value.MarkerType == MarkerTypes.Start)
						{
							Warnings.UnopenedBracketWarning.Return(m.Value.Line, path);
						}
						m = m.Next;
					}
				}
			}
		}

		private static void CreateMode(string[] args)
		{
			if (args.Length < 2)
			{
				Errors.BadParamsError.Return();
			}

			string directoryName = args[1];
			string displayName = directoryName;
			if (args.Length > 2)
			{
				displayName = args[2];
			}

			if (!Directory.Exists("scenes"))
			{
				Errors.SceneDirectoryNotFoundError.Return();
			}

			if (Directory.Exists($"scenes/${directoryName}"))
			{
				Errors.SceneExistsError.Return();
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
	}
}
