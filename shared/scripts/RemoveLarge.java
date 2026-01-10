import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

public class RemoveLarge {
	
	public static void main(String[] args) throws FileNotFoundException, IOException {
		removeLarge("art/groups/photography");
	}

	public static void removeLarge(String path) throws IOException {
		print("Removing Large for path: " + path);
		// 1. Scan directory
		for (File filename : new File(path).listFiles()) {
            if (filename.isDirectory() || filename.getName().startsWith(".")) {
				continue;
			}
			String[] split = filename.getName().split("\\.");
			//print(filename.getName());
			//print(split[0]);
			if (split[0].endsWith(" Large")) {
				String newFilename = 
					split[0].substring(0, split[0].length() - 6) + "." + split[1];

				print("old " + filename + " , new: " + newFilename);
				Files.move(Paths.get(filename.getAbsolutePath()), Paths.get(path + "/" + newFilename));
			}
        }
	}

	private static void print(String msg) {
		System.out.println(msg);
	}
}