using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using System.Text;

namespace btif_scaffolder
{
    public static class EmbeddedStreamReader
    {
        public static List<EmbeddedFile> ReadAll()
        {
            return new List<EmbeddedFile>()
            {
                ReadOne("templates.scene-template.css"),
                ReadOne("templates.scene-template.html"),
                ReadOne("templates.scene-template.js"),
            };
        }

        public static EmbeddedFile ReadOne(string uri)
        {
            using StreamReader sr = new StreamReader(Assembly.GetExecutingAssembly().GetManifestResourceStream($"btif_scaffolder.{uri}"));
            return new EmbeddedFile(sr.ReadToEnd(), uri);
        }
    }
}
