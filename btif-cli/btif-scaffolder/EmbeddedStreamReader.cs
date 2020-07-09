using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using System.Text;

namespace btif_scaffolder
{
    public enum EmbeddedFile
    {
        css,
        html,
        js,
    }

    public static class EmbeddedStreamReader
    {
        public static void ReadAll(out string html, out string css, out string js)
        {
            html = Read(EmbeddedFile.html);
            css = Read(EmbeddedFile.css);
            js = Read(EmbeddedFile.js);
        }

        private static string Read(EmbeddedFile fswitch)
        {
            string fname = fswitch switch
            {
                EmbeddedFile.css => "scene-template.css",
                EmbeddedFile.html => "scene-template.html",
                _ => "scene-template.js",
            };

            Stream s = Assembly.GetExecutingAssembly().GetManifestResourceStream($"btif_scaffolder.templates.{fname}");

            using (StreamReader sr = new StreamReader(s))
            {
                return sr.ReadToEnd();
            }
        }
    }
}
