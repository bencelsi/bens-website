import java.io.File;
import java.util.*;

public class Toolkit { 
    /* 
        Command Ideas:
        refreshSongs
        listFiles
        rename
    */
    public static String userDir =        "/Users/bencelsi/";
    public static String rootDir =        userDir + "LocalDrive/";
    public static String bouncesDir =     rootDir + "MUSIC•••••••••••••••••••••••••/Audio/Bounces/Songs";
    public static String websiteDir =     rootDir + "CODE•••••••••••••••••••••••••/github/bencelsi.github.io/music/songs";
    public static String homepageDir =    rootDir + "CODE•••••••••••••••••••••••••/github/bens-homepage/songs/song-files";
    public static String googleDriveDir = userDir + "Google Drive/Music/Bounces (Google Drive)";
    public static String itunesDir =      userDir + "Music/iTunes/Automatically\\ Add\\ to\\ Music";

    public static void main(String[] args) {
        print("----------------");
        print("--- TOOLKIT! ---");
        print("----------------");

        Scanner input = new Scanner(System.in);
        while (true) {
            print("Hi there! What would you like to do?");
            String response = input.nextLine();
            print("You said: " + response);
            refreshSongs();
            print("------------------------");
        }
    }
    
    /* Pluck most recent demo of each song, and put it into songs dir */
    public static void refreshSongs() {
        generateSongMap(bouncesDir);
    }
    
    public static void generateSongMap(String dir) {
        File[] files = new File(bouncesDir).listFiles();

        Map<String, List<String>> songMap = new HashMap<>();

        for (File file : files) {
            String filename = file.getName();
            print(file.getName());
            String songName;
            String songNumber;
            char[] tokens = filename.toCharArray();
            
        }
    }

    /*
    def generateSongMap(dir):
    songMap = {}
    for filename in listdir(dir):
        if not filename.endswith(".mp3"):
            continue
        filename = filename[:-4]
        tokens = filename.split()
        # print(filename)
        songName = ""
        songNumber = ""
        for token in tokens:
            if (token[0].isdigit() or token[0] == "("):
                if (token[0].isdigit()):
                    songNumber = token
                break
            else:
                songName += token + " "
        songName = songName[:-1]

        if songName not in songMap:
            songMap[songName] = []
        
        songMap[songName].append(filename)
    return songMap

    */



    /*Helpers*/
    public static void print(String msg) {
        System.out.println(msg);
    }
}