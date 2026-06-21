namespace Homework48 {
    internal class Program {
        static void Main(string[] args) {
            string[] colors = ["red", "green", "blue"];
            string[] patterns = ["striped", "checked", "plain"];
            for (int i = 0; i < colors.Length; i++) {
                for (int j = 0; j < patterns.Length; j++) {
                    Console.WriteLine(new Shirt(colors[i], patterns[j]));
                }
            }
        }
    }
}
