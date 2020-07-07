using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;

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
                return;
            }

            if (Directory.Exists(@$"scenes\{scene_name}"))
            {
                ColorWriteLine("Scene by this name already exists.", ConsoleColor.Red);
                return;
            }

            ReadEmbeddedStreams(out string css, out string html, out string js);

            html = html.Replace("%", scene_name);

            Directory.CreateDirectory($@"scenes\{scene_name}");

            using (StreamWriter sw = new StreamWriter($@"scenes\{scene_name}\{scene_name}.html"))
            {
                sw.WriteLine(html);
            }

            using (StreamWriter sw = new StreamWriter($@"scenes\{scene_name}\{scene_name}.js"))
            {
                sw.WriteLine(js);
            }

            using (StreamWriter sw = new StreamWriter($@"scenes\{scene_name}\{scene_name}.css"))
            {
                sw.WriteLine(css);
            }

            ColorWriteLine(@$"New scene {scene_name} created @ scenes\{scene_name}", ConsoleColor.Green);
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

        private static void ReadEmbeddedStreams(out string css, out string html, out string js)
        {
            Stream css_res = Assembly.GetExecutingAssembly().GetManifestResourceStream("btif_cli.scene-template.css");
            Stream html_res = Assembly.GetExecutingAssembly().GetManifestResourceStream("btif_cli.scene-template.html");
            Stream js_res = Assembly.GetExecutingAssembly().GetManifestResourceStream("btif_cli.scene-template.js");

            using (StreamReader sr = new StreamReader(css_res))
            {
                css = sr.ReadToEnd();
            }

            using (StreamReader sr = new StreamReader(html_res))
            {
                html = sr.ReadToEnd();
            }

            using (StreamReader sr = new StreamReader(js_res))
            {
                js = sr.ReadToEnd();
            }
        }
    }
}
