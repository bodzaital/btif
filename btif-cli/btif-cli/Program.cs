using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text.Json;

namespace btif_cli
{
    class Program
    {
        static void Main(string[] args)
        {
            if (!File.Exists("configuration.js"))
            {
                Console.WriteLine("No configuration.js found. Is this directory a project?");
                return;
            }

            if (Directory.Exists(@$"scenes\{args[0]}"))
            {
                Console.WriteLine("Scene by this name already exists.");
                return;
            }

            ConfigurationJS configuration = ReadConfiguration();

            ReadEmbeddedStreams(out string css, out string html, out string js);

            html = ReplaceSceneName(args, html);

            Directory.CreateDirectory($@"scenes\{args[0]}");

            using (StreamWriter sw = new StreamWriter($@"scenes\{args[0]}\{args[0]}.html"))
            {
                sw.WriteLine(html);
            }
            
            using (StreamWriter sw = new StreamWriter($@"scenes\{args[0]}\{args[0]}.js"))
            {
                sw.WriteLine(js);
            }

            using (StreamWriter sw = new StreamWriter($@"scenes\{args[0]}\{args[0]}.css"))
            {
                sw.WriteLine(css);
            }

            Console.WriteLine(@$"New scene {args[0]} created @ scenes\{args[0]}");
        }

        private static string ReplaceSceneName(string[] args, string html)
        {
            string d;
            List<string> s = html.Split('%').ToList();
            s.Add(s.Last());
            s[1] = args[0];

            d = string.Join(string.Empty, s);
            return d;
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

        private static ConfigurationJS ReadConfiguration()
        {
            string confcon;
            using (StreamReader sr = new StreamReader("configuration.js"))
            {
                confcon = sr.ReadToEnd();
            }

            int i = 0;
            while (i < confcon.Length && confcon[i] != '{')
            {
                i++;
            }

            confcon = confcon.Substring(i);

            return JsonSerializer.Deserialize<ConfigurationJS>(confcon, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true,
            });
        }
    }

    class ConfigurationJS
    {
        public string EntryPoint { get; set; }
        public string Title { get; set; }
        public string Theme { get; set; }
    }
}
