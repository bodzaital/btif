using NUnit.Framework;
using System.IO;

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
        public void CorrectlyEmitsSceneFiles()
        {
            SceneCreator sc = new SceneCreator();
            sc.CreateNewScene(sceneName);

            Assert.That(File.Exists($"scenes/{sceneName}/{sceneName}.html"));
            Assert.That(File.Exists($"scenes/{sceneName}/{sceneName}.css"));
            Assert.That(File.Exists($"scenes/{sceneName}/{sceneName}.js"));
        }

        [Test]
        public void CorrectlyContainsTemplates()
        {
            SceneCreator sc = new SceneCreator();
            EmbeddedStreamReader.ReadAll(out string html, out string css, out string js);

            sc.CreateNewScene(sceneName);

            using StreamReader swhtml = new StreamReader($"scenes/{sceneName}/{sceneName}.html");
            using StreamReader swcss = new StreamReader($"scenes/{sceneName}/{sceneName}.css");
            using StreamReader swjs = new StreamReader($"scenes/{sceneName}/{sceneName}.js");

            if (html.Length > 0)
            {
                Assert.That(swhtml.ReadToEnd().Substring(0, 1), Is.EqualTo(html.Substring(0, 1)));
            }
            
            if (css.Length > 0)
            {
                Assert.That(swcss.ReadToEnd().Substring(0, 1), Is.EqualTo(css.Substring(0, 1)));
            }

            if (js.Length > 0)
            {
                Assert.That(swjs.ReadToEnd().Substring(0, 1), Is.EqualTo(js.Substring(0, 1)));
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
