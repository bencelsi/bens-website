import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Scanner;
import java.util.ArrayList;

public class ListFiles {
	
	private static final String[][] FILEPATHS = {
		// directory to scan			//CSV to add to			//Group name
		{"art/groups/photography", 		"art/artTable.csv",		"photography"	}
		//{"music/groups/topBounces",	"music/songTable.csv",  "topBounces"	}
	};

	

	public static void main(String[] args) throws FileNotFoundException, IOException {
		listFiles("art/groups/photography",
				"art/artTable.csv",
				"photography");
	}

	public static void listFiles(String path, String csvFile, String groupName) throws IOException {
		print("Running listFiles for path: " + path + ", csvFile: " + csvFile + ", group: " + groupName);

		// 1. Scan directory
		File dir = new File(path);
        List<String> filenames = new ArrayList<String>(); // Song name -> list of bounces
        for (File filename : dir.listFiles()) {
            if (filename.isDirectory()) continue;
			filenames.add(filename.getName());
        }

		// 2. Scan csvFile, keep track of existing files
		Scanner scanner = new Scanner(new File(csvFile));
		StringBuilder result = new StringBuilder();
		List<String> existingFilenames = new ArrayList<>();
		while (scanner.hasNextLine()) {
			String line = scanner.nextLine();
			String[] split = line.split(",");
			existingFilenames.add(split[0]);
			result.append(line + "\n");
		}
		scanner.close();

		//3. Add filenames to csv file, skipping existing
		for (String filename : filenames) {
			result.append(filename + "," + groupName + "\n");
		}

		//4. Write to test file
		Path output = Paths.get(csvFile);
		Files.writeString(output, result.toString(), StandardCharsets.UTF_8);
	}

	private static void print(String msg) {
		System.out.println(msg);
	}
}