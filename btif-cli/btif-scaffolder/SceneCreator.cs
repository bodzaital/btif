using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace btif_scaffolder
{
    public enum ExportFileType
    {
        SceneTemplate,
    }

    public class SceneCreator
    {
        string sceneName;

        public void CreateNewScene(string sceneName)
        {
            this.sceneName = sceneName;

            List<EmbeddedFile> files = EmbeddedStreamReader.ReadAll();
            files.Single(x => x.Name == "templates.scene-template.html").Contents.Replace("%", sceneName);

            Directory.CreateDirectory($"scenes/{sceneName}");

            ExportFiles(files);
        }

        private void ExportFiles(List<EmbeddedFile> files)
        {
            files.ForEach(x => ExportFile(x, ExportFileType.SceneTemplate));
        }

        private void ExportFile(EmbeddedFile file, ExportFileType type)
        {
            string export_uri = type switch
            {
                _ => $"scenes/{sceneName}/{sceneName}.{file.Name.Substring(file.Name.LastIndexOf('.') + 1)}",
            };

            using StreamWriter sw = new StreamWriter(export_uri);
            sw.WriteLine(file.Contents);
        }
    }
}
