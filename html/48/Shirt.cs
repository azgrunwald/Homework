using System;
using System.Collections.Generic;
using System.Text;

namespace Homework48 {
    internal class Shirt {
        public string Color { get; set; }
        public string Pattern { get; set; }
        public Shirt(string color,string pattern) {
            Color = color;
            Pattern = pattern;
        }
        public override string ToString() {
            return $"{Color}:{Pattern}";
        }
    }
}
