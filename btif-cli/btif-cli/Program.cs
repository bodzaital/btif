using System;
using System.IO;
using btif_scaffolder;

namespace btif_cli
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("btif cli");

            if (args.Length == 0)
            {
                HelpScreen();
                return;
            }

            switch (args[0])
            {
                case "-n":
                case "--new":
                    NewScene(args[1]);
                    break;

                case "--help":
                default:
                    HelpScreen();
                    break;
            }
        }

        private static void NewScene(string scene_name)
        {
            if (!ValidProjectCheck())
            {
                ColorWriteLine("Missing configuration.js, maybe this isn't a project folder?", ConsoleColor.Red);
                return;
            }

            if (Directory.Exists(@$"scenes\{scene_name}"))
            {
                ColorWriteLine("Scene by this name already exists.", ConsoleColor.Red);
                return;
            }

            SceneCreator sc = new SceneCreator();
            
            sc.CreateNewScene(scene_name);
            ColorWriteLine("Done.", ConsoleColor.Green);
        }

        private static void ColorWriteLine(string m, ConsoleColor c)
        {
            ConsoleColor fg = Console.ForegroundColor;
            Console.ForegroundColor = c;
            Console.WriteLine(m);
            Console.ForegroundColor = fg;
        }

        private static void HelpScreen()
        {
            Console.WriteLine("\n-n scene_name\n--new scene_name");
            Console.WriteLine("\tCreates a new scene under scenes/scene_name with all associated files.");
            Console.WriteLine("\n--help");
            Console.WriteLine("\tThis text.");
        }

        private static bool ValidProjectCheck()
        {
            if (!File.Exists("configuration.js"))
            {
                ColorWriteLine("No configuration.js found. Is this directory a project?", ConsoleColor.Red);
                return false;
            }

            return true;
        }
    }
}
