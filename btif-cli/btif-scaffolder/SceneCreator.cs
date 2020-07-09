using System;
using System.IO;

namespace btif_scaffolder
{
    public class SceneCreator
    {
        string sceneName;

        public void CreateNewScene(string sceneName)
        {
            this.sceneName = sceneName;

            EmbeddedStreamReader.ReadAll(out string html, out string css, out string js);
            html = html.Replace("%", sceneName);

            Directory.CreateDirectory($"scenes/{sceneName}");

            ExportTemplates(html, css, js);
        }

        private void ExportTemplates(string html, string css, string js)
        {
            ExportTemplate("html", html);
            ExportTemplate("css", css);
            ExportTemplate("js", js);
        }

        private void ExportTemplate(string ext, string contents)
        {
            using StreamWriter sw = new StreamWriter($"scenes/{sceneName}/{sceneName}.{ext}");
            sw.WriteLine(contents);
        }
    }
}
