using System;
using System.Collections.Generic;
using System.Text;

namespace btif_cli
{
	public struct Errors
	{
		public static readonly Error NoParamsError = new Error(1, "No Parameter Error", "No parameters given.");
		public static readonly Error BadParamsError = new Error(2, "Bad Parameter Error", "Bad parameters given.");
		public static readonly Error UnrecognizedProgramModeError = new Error(3, "Bad Program Mode Error", "The given program mode is unrecognized.");
		public static readonly Error SceneDirectoryNotFoundError = new Error(4, "Scene Directory Not Found Error", "The 'scenes' directory is not found.");
		public static readonly Error SceneExistsError = new Error(5, "Scene Exists Error", "A scene by this directory name already exists.");
		public static readonly Error NoScenesError = new Error(6, "No Scenes Exist Error", "There are no scenes in this project.");
	}
}
