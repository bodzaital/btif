using NUnit.Framework;
using NUnit.Framework.Internal;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace btif_scaffolder.tests
{
    [TestFixture]
    public class SceneCreatorTests
    {
        private string sceneName;

        [SetUp]
        public void Init()
        {
            if (!Directory.Exists("scenes"))
            {
                Directory.CreateDirectory("scenes");
            }

            sceneName = "test-scene";
        }

        [Test]
        public void ExportedTemplates()
        {
            SceneCreator sc = new SceneCreator();
            sc.CreateNewScene(sceneName);

            List<EmbeddedFile> files = EmbeddedStreamReader.ReadAll();
            string html = files.Single(x => x.Name == "templates.scene-template.html").Contents;
            string css = files.Single(x => x.Name == "templates.scene-template.css").Contents;
            string js = files.Single(x => x.Name == "templates.scene-template.js").Contents;

            using StreamReader sr_html = new StreamReader($@"scenes\{sceneName}\{sceneName}.html");
            string read_html = sr_html.ReadToEnd();
            
            using StreamReader sr_css = new StreamReader($@"scenes\{sceneName}\{sceneName}.css");
            string read_css = sr_css.ReadToEnd();

            using StreamReader sr_js = new StreamReader($@"scenes\{sceneName}\{sceneName}.js");
            string read_js = sr_js.ReadToEnd();

            if (html.Length > 1)
            {
                Assert.That(html.Substring(0, 1), Is.EqualTo(read_html.Substring(0, 1)));
            }
            
            if (css.Length > 1)
            {
                Assert.That(css.Substring(0, 1), Is.EqualTo(read_css.Substring(0, 1)));
            }

            if (js.Length > 1)
            {
                Assert.That(js.Substring(0, 1), Is.EqualTo(read_js.Substring(0, 1)));
            }
        }

        [TearDown]
        public void TearDown()
        {
            if (Directory.Exists("scenes"))
            {
                Directory.Delete("scenes", true);
            }
        }
    }
}
