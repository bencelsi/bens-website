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
		"art/artTable"
	};

	public static void main(String[] args) throws FileNotFoundException, IOException {
		for (String filepath : FILEPATHS) convertCsvToJs(filepath);
	}

	// For each group, Reads files, adds them to given CSV file (1st col = filename, 2nd col = group, subsequent columns blank)
	// Use opencsv?
	private static void addFilesToCsv() {

	}


	// Converts given CSV file (x.csv) to a JS list (with varname 'x') and writes that file (x.js)
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