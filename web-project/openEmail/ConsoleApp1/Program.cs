using System;
using System.Diagnostics;
using System.IO;

class Program
{
    static void Main(string[] args)
    {
        if (args.Length == 0)
        {
            Console.WriteLine("לא הוזן נתיב לתיקייה.");
            return;
        }

        string folderPath = Uri.UnescapeDataString(args[0].Replace("myapp://open?path=", ""));

        if (!Directory.Exists(folderPath))
        {
            Console.WriteLine("התיקייה לא קיימת: " + folderPath);
            return;
        }

        string[] emlFiles = Directory.GetFiles(folderPath, "*.eml");

        foreach (string file in emlFiles)
        {
            Console.WriteLine("פותח: " + file);
            Process.Start(new ProcessStartInfo
            {
                FileName = file,
                UseShellExecute = true
            });
        }

        Console.WriteLine("בוצע.");
    }
}
