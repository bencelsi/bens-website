import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.FileAlreadyExistsException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Scanner;

public class CsvToJs {
	
	private static final String[] FILES_TO_CONVERT = {
		//"../music/song-metadata.csv",
		"../video/videoMetadata.csv"
	};

	public static void main(String[] args) throws FileNotFoundException, IOException {
		for (String filename : FILES_TO_CONVERT) {
			
			convertCsvToJs(filename);
		}
	}

	private static void convertCsvToJs(String filename) throws FileNotFoundException, IOException {

		String[] split = filename.split("/");
		String name = split[split.length - 1].split("\\.")[0];
		System.out.println(filename);

		StringBuilder result = new StringBuilder();
		result.append("let " + name + "List = [\n");

		Scanner scanner = new Scanner(new File(filename));
		while (scanner.hasNextLine()) {
			String line = scanner.nextLine();
			String[] cells = line.split("\\	");

			result.append("[");

			for (String cell : cells) {
				System.out.println(cell);
				result.append("\"" + cell + "\",	");
			}

			result.append("],\n");
		}

		// Write to file
		Path file = Paths.get("test.js");
		Files.writeString(file, result.toString(), StandardCharsets.UTF_8);
	}

}
