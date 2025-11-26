import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Scanner;

public class CsvToJs {
	
	private static final String[] FILEPATHS = {
		"music/songTable",
		"video/videoTable",
		"music/groupTable"
	};

	public static void main(String[] args) throws FileNotFoundException, IOException {
		for (String filepath : FILEPATHS) convertCsvToJs(filepath);
	}

	private static void convertCsvToJs(String filepath) throws FileNotFoundException, IOException {
		
		String[] filepathSplit = filepath.split("/");
		String filename = filepathSplit[filepathSplit.length - 1];
		
		String csvFilepath = filepath + ".csv";
		String jsFilepath = filepath + ".js";
		
		// Read from CSV file
		Scanner scanner = new Scanner(new File(csvFilepath));

		StringBuilder result = new StringBuilder();
		result.append("let " + filename + " = [\n");

		while (scanner.hasNextLine()) {
			String line = scanner.nextLine();
			String[] cells = line.split(",");
			result.append("[");
			for (String cell : cells) result.append("\"" + cell + "\", ");
			result.append("],\n");
		}

		scanner.close();
		result.append("]");

		// Write to JS file
		Path file = Paths.get(jsFilepath);
		Files.writeString(file, result.toString(), StandardCharsets.UTF_8);
	}
}