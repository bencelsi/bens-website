import shutil
import os
from os import listdir, walk
from os.path import isfile, join

# TODO: copy short songs, covers, mashups
# TODO: Rename songs (Lonely -> Joanie)
# TODO: Option to show greatest of each major versions
# TODO: create backup of src dir before any action, for safety?
# TODO: Sort Logic files into folders

srcDir = "/Users/bencelsi/LocalDrive/MUSIC•••••••••••••••••••••••••/Audio/Bounces/Songs"
websiteDir = "/Users/bencelsi/LocalDrive/CODE•••••••••••••••••••••••••/github/bencelsi.github.io/music/songs"
googleDriveDir = "/Users/bencelsi/Google Drive/Music/Bounces (Google Drive)"
itunesDir = "/Users/bencelsi/Music/iTunes/Automatically\ Add\ to\ Music"
# map of SongName to list of bounce files

def menu():
    while True:
        print("hi")
        val = input("Enter your value: ")
        print(val)


# list of - can be major (1) or minor (1.1)
hardCodedVersions = {
    "Beetle": "7",
    "Woke Up": "4.2"
}

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

# Takes a song numer 1.4-2 into (1, 4, 2)
def parseSongNumber(songNumber):
    if (songNumber == -1):
        return (-1, -1, -1)
    tokens = songNumber.split(".")
    number1 = tokens[0]
    if (len(tokens) == 1):
        return (number1, -1, -1)
    tokens = tokens[1].split("-")
    number2 = tokens[0]
    if (len(tokens) == 1):
        return (number1, number2, -1)
    number3 = tokens[1]
    return (number1, number2, number3)

def copyNewestSongsToDir(srcDir, destDir, songMap, listName = None):
    # Open listFile
    f = None
    if (listName != None):
        listFile = listName + ".js"
        if os.path.exists(listFile):
            os.remove(listFile)
        f = open(listFile, "a")
        f.write("let " + listName + " = [\n")
        
    # Clear dest dirs
    if os.path.exists(destDir):
        shutil.rmtree(destDir)
    os.makedirs(destDir)

    # Write to list file and dest dirs
    for songName in songMap:
        maxBounce = None
        parsedHardCodedVersion = None
        if songName in hardCodedVersions.keys():
            print(songName)
            parsedHardCodedVersion = parseSongNumber(hardCodedVersions[songName])
            print(parsedHardCodedVersion)

        for bounce in songMap[songName]:
            if isGreaterThan(bounce, maxBounce, parsedHardCodedVersion):
                if songName == "Woke Up":
                    print(bounce)
                    print(maxBounce)
                    print(parsedHardCodedVersion)
                    print("--------------")
                maxBounce = bounce
            
        #print(maxBounce)
        shutil.copyfile(srcDir + "/" + maxBounce + ".mp3", destDir + "/" + songName + ".mp3")
        if f != None:
            f.write("\"" + songName + "\",\n")
    if f != None:
        f.write("]")
        f.close()


# returns true if a > b (and a matches aMustMatch)
def isGreaterThan(a, b, aMustMatch = None):
    if (a == None):
        return False
    aParsed = parseSongNumber(getNumberFromSong(a))
    if aMustMatch != None:
        for i in range(0, 3):
            if int(aMustMatch[i]) != -1 & int(aParsed[i]) != int(aMustMatch[i]):
                return False

    if (b == None):
        return True
    
    (a1, a2, a3) = aParsed
    (b1, b2, b3) = parseSongNumber(getNumberFromSong(b))
    if a1 == b1 :
        if a2 == b2: 
            if a3 == b3:
                return True
            else:
                return int(a3) > int(b3)
        else:
            return int(a2) > int(b2)
    else:
        return int(a1) > int(b1)

def getNumberFromSong(song):
    splitSong = song.split(" ")
    for i in range(0, len(splitSong)):
        if (splitSong[i][0].isnumeric()):
            return splitSong[i]
    return -1


songMap = generateSongMap(srcDir)
#copyNewestSongsToDir(srcDir, googleDriveDir, songMap)
copyNewestSongsToDir(srcDir, websiteDir, songMap, "allSongs")

#def renameSong():
    # ask for current title
    # ask for new title
    # rename logic files, files in bounces folder - keep metadata?
    # rename website files? 