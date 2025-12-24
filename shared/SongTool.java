import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.attribute.FileTime;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Scanner;
import java.util.Collections;

public class SongTool {
    public static final String BANNER = "" +
        "   ┏┓      ┏┳┓    ┓ ┃ \n" +
        "   ┗┓┏┓┏┓┏┓ ┃ ┏┓┏┓┃ ┃ \n" +
        "   ┗┛┗┛┛┗┗┫ ┻ ┗┛┗┛┗ • \n" +
        "          ┛             ";
    public static final String LOCALDRIVE_DIR =         "/Users/bencelsi/LocalDrive/";
    public static final String MUSIC_DIR =              LOCALDRIVE_DIR + "MUSIC/";
    public static final String TOP_BOUNCES_DIR =        MUSIC_DIR + "Bounces/Top Bounces/";
    public static final String ALL_BOUNCES_DIR =        MUSIC_DIR + "Bounces/All Bounces/";
    public static final String SONGS_DIR =              LOCALDRIVE_DIR + "MUSIC/Logic/Songs/";
    public static final String SCRIPTS_DIR =            LOCALDRIVE_DIR + "CODE/github/bens-homepage/music/scripts";
    public static final String BENS_WEBSITE_DIR =       LOCALDRIVE_DIR + "CODE/github/bens-website/";
    public static final String BENS_WEBSITE_SONGS_DIR = BENS_WEBSITE_DIR + "music/groups/topBounces/";
    public static final String BENS_HOMEPAGE_DIR =      LOCALDRIVE_DIR + "CODE/github/bens-homepage/music/archive/";
    public static final String EXTENSION =              ".mp3";

    /*
    TODOs:

    Copy Top Bounces to: this repo (for private storage), iTunes, google drive?
    
    Option for - song per major version (1, 2, 8-bit etc)
    Option for - Random bounce for given song 
    
    Options for short songs, looplikes, 8-bit
    Name standardization for logic and demo files, Capitalization 
    Parse other fieldsAdditions (vs for varispeed)
    */
    public enum Actions {
        COPY_ALL_BOUNCES, // Creates an alias of ALL bounce files in AllBounces/
        COPY_TOP_BOUNCES // Creates an alias of newest bounce files in MUSIC/Top Bounces and bens-website
    }

    public void test() {

    }

    public static void main(String[] args) throws IOException {
        Scanner scanner = new Scanner(System.in);
        print("\n" + BANNER);
        print("••••••••••••🎵•••••••••••••");
        print("Hi! What would you like to do?\n");
        
        print(
            "1. Copy ALL bounces to 'All Bounces'\n" +
            "2. Copy TOP bounces to 'Top Bounces'\n" +
            ""
        );
        String input = scanner.nextLine();
        print("You said " + input);
        
        // Root songs Dir
        File allSongsDir = new File(SONGS_DIR);
        
        // Scan through each song to construct songMap
        Map<String, List<File>> songMap = new HashMap<>(); // Song name -> list of bounces
        for (File songDir : allSongsDir.listFiles()) {
            print(songDir.getName());
            if (songDir.isDirectory()) {
                String songName = songDir.getName();
                songMap.put(songName, findAllBounces(songDir));
            }
        }
        
        switch (input) {
            case "1": // Copy all bounces to /AllBounces
                for (List<File> bounces : songMap.values()) { // for each song
                    for (File bounce : bounces) {
                        copyWithDate(bounce.toPath(), Paths.get(ALL_BOUNCES_DIR + bounce.getName()));
                    }
                }
                break;
            case "2": // Copy newest bounce to LocalDrive & bens-website
                for (Entry<String, List<File>> kv : songMap.entrySet()) { // For each song

                    String songName = kv.getKey();
                    List<File> bounces = kv.getValue();

                    Collections.sort(bounces, (a, b) -> { return
                        -getCreatedTime((File) a).compareTo(getCreatedTime((File) b));
                    });
                    
                    if (bounces.isEmpty()) continue;
                    File newestBounce = bounces.get(0);
                    print(newestBounce.getName());

                    // Copy newest bounce to LocalDrive & bens-website
                    copyWithDate(newestBounce.toPath(),
                        Paths.get(TOP_BOUNCES_DIR + songName + EXTENSION));
                    copyWithDate(newestBounce.toPath(),
                        Paths.get(BENS_WEBSITE_SONGS_DIR + songName + EXTENSION));
                }
                makeListFile(new File(BENS_WEBSITE_SONGS_DIR));
                // write 0-list file
                break;
            default: 
                print("NOOOOO");
        }

        print("\nDone!\n");
        print("•••••••••••••••••");
        scanner.close();
        //makeListFile();
    }


    /**
     * Recursively finds all bounces
     */ 
    public static List<File> findAllBounces(File dir) {
        List<File> result = new ArrayList<>();
        
        if (!dir.isDirectory() || dir.getName().endsWith("logicx")) return result;

        File[] files = dir.listFiles();
        print("findAllBounces " + dir);
        for (File file : files) {
            if (file.isDirectory()) {
                if (file.getName().equalsIgnoreCase("Bounces")) {
                    // We've a bounces folder, list all files in it
                    result.addAll(Arrays.asList(
                        file.listFiles(pathname -> 
                            pathname.isFile() 
                                && !pathname.getName().startsWith(".")
                                && !pathname.getName().contains("8-bit")
                        )));
                } else {
                    //We've some other folder, look inside for potential bounces
                    result.addAll(findAllBounces(file)); // Recurse into other subdirectories
                }
            }
        }
        return result;
    }

    private static void makeListFile(File dir) throws FileNotFoundException {
        // Create a file 0-list.js with all song names
        StringBuilder songsString = new StringBuilder();
        songsString.append("let topBouncesList = [\n");
        File[] files = dir.listFiles();
        Arrays.sort(files);
        for (File file : files) {
            songsString.append("\"" + file.getName() + "\",\n");
        }
        
        songsString.append("]");
        
        PrintWriter printWriter = new PrintWriter(dir.getAbsolutePath().toString() + "/0-list.js");
        printWriter.println(songsString.toString());
        printWriter.close();
    }


    // HELPERS
    private static void print(String msg) {
        System.out.println(msg);
    }

    private static FileTime getCreatedTime(File file) {
        try {
            return (FileTime) Files.getAttribute(file.toPath(), "creationTime");
        } catch (IOException e) {
            return FileTime.fromMillis(0);
        }
    }

    // Copies a file , keeping the last modified metadata 
    private static void copyWithDate(Path src, Path dst) throws IOException {
        print("Copying " + src + " to " + dst);
        Files.copy(src, dst, StandardCopyOption.REPLACE_EXISTING);
        long srcTime = getCreatedTime(src.toFile()).toMillis();
        dst.toFile().setLastModified(srcTime);
    }


    // OLD
    private static String parseSongName(String name) {
        // Parse Song - all tokens til number, parenthesis or .mp3
        String[] tokens = name.split(" ");
        StringBuilder songName = new StringBuilder();
        for (String token : tokens) {
            if (token.startsWith("(") || Character.isDigit(token.charAt(0))) break;
            if (token.contains(".")) {
                token = token.split("\\.")[0]; //remove .mp3
            }
            songName.append((songName.isEmpty() ? "" : " ") + token);
        }
        return songName.toString();
    }
}

// 
// ACTUALLY: Script to generate Google Sheets -> CSV -> JSON -> Javascript -> HTML
// Todo: make this script
//
