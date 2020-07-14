using System;
using System.Collections.Generic;
using System.Text;

namespace btif_scaffolder
{
    public class EmbeddedFile
    {
        public string Contents { get; set; }
        public string Name { get; set; }

        public EmbeddedFile(string contents, string name)
        {
            Contents = contents;
            Name = name;
        }
    }
}
