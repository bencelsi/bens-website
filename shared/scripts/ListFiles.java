import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Scanner;
import java.util.ArrayList;
import java.util.Set;
import java.util.HashSet;

public class ListFiles {
	private enum Category {
		ART,
		MUSIC
	}
	private static final String[][] FILEPATHS = {
		// directory to scan			//CSV to add to			//Group name	//category
		{"art/groups/photography", 		"art/artTable.csv",		"photography",	"ART"}
		//{"music/groups/topBounces",	"music/songTable.csv",  "topBounces"	"MUSIC"}
	};

	public static void main(String[] args) throws FileNotFoundException, IOException {
		// listFiles("art/groups/photography", "art/artTable.csv",
		// 	"photography", Category.ART);

		listFiles("music/groups/topBounces", "music/songTable.csv",
			"topBounces", Category.MUSIC);
	}

	public static void listFiles(String path, String csvFile, String groupName, Category category) throws IOException {
		print("Running listFiles for path: " + path + ", csvFile: " + csvFile + ", group: " + groupName);

		// 1. Scan directory
		File dir = new File(path);
        List<String> filenamesInDir = new ArrayList<String>(); // Song name -> list of bounces
        for (File filename : dir.listFiles()) {
            if (filename.isDirectory() || filename.getName().startsWith(".")) {
				continue;
			}
			filenamesInDir.add(filename.getName());
        }

		// 2. Scan csvFile, keep track of existing files
		Scanner scanner = new Scanner(new File(csvFile));
		StringBuilder result = new StringBuilder();
		Set<String> filenamesInCSV = new HashSet<>();
		while (scanner.hasNextLine()) {
			String line = scanner.nextLine();
			String[] split = line.split(",");
			//if file doesnt exist, remove it
			switch (category) {
				case ART:
					if (!filenamesInCSV.contains(split[0]) && split[1].equals(groupName)) continue;
					break;
				case MUSIC:
					if (!filenamesInCSV.contains(split[0] + "." + split[1]) && split[2].equals(groupName)) continue;
					break;
			}
			filenamesInCSV.add(split[0]);
			result.append(line + "\n");
		}
		scanner.close();

		//3. Add filenames to csv file, skipping existing
		for (String filename : filenamesInDir) {
			if (filenamesInCSV.contains(filename.split("\\.")[0])) continue;
			result.append(toCsvLine(filename, groupName, category));
		}

		//4. Write to test file
		Files.writeString(Paths.get(csvFile), result.toString(), StandardCharsets.UTF_8);
	}

	private static String toCsvLine(String filename, String groupName, Category category) {
		switch (category) {
			case ART:
				return filename + "," + groupName + "\n";
			case MUSIC:
				String[] split = filename.split("\\.");
				String ext = split[1];
				String name = split[0];
				return name + "," + ext + "," + groupName + "\n";
			default:
				return "";
		}
	}


	
	private static void print(String msg) {
		System.out.println(msg);
	}
}