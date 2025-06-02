import os

"""

Ideas:
sort into folders by name
Use 'letters' for Version? ie, Cats D.1-3? YES!!! eventually...
standardized format
automatically update logic names based on metadata?
move demos from google drive after a time

"""
#playsound('/Users/bencelsi/LocalDrive/Music/Audio/Demos/Breckenridge.mp3')

"""
Standardizer: Versions


The tricky part is whether 2 logic files differ by version or subversion

Idea
Use Logic files date createds to automatically assign versions


1. Group demos in folders by song name
2. Group logics in folders by song name
3. For each demo file, try to match it to its logic file
4. Each logic file of the same name has its own 'mysteryversion - sorted by date created - could differ by version or subversion.'


Mystery version must be done manually... by sorting into folders!!!

sortLogicFiles():
	Read in all LogicFiles
	read in all DemoFiles

	Goal: every demo file has a: 
	Version (logic new starts), 
	Subversion (logic revision), 
	Bounce (new Bounce of a given Subversion) , 

	Options (misc stuff) ... eventually, forks?

class DemoFile
	Version
	Languages 
	Logic File(s)
	Bounce File(s)
	Memo File(s)

class Song
	LogicFile[] logicFiles
	AudioFile[] bounceFiles[]
	

"""

class Song:
	songName = ''
	altNames = ''
 
class SongFile:
	songName = ''
	version = ''
	typ = ''

#class LogicFile(SongFile):

class DemoFile(SongFile):
	bounce = ''
	varispeed = ''
	customOptions = ''



local_drive = "/Users/bencelsi/LocalDrive/"
demo_songs_dir = "/Users/bencelsi/LocalDrive/Music/Audio/Demos/Songs"
logic_songs_dir = local_drive + "Music/Logic/Songs"



print("Hello Mr. Celsi, what can i do for you today?")

options = ["session", "capitalize", "folderize", "list songs", "rename songs", "search sound effect", "tour song database", "shuffle"]
while(True):
	i = 1
	for option in options:
		print(str(i) + ": " + option)
		i = i + 1
	response = input("What would you like to do? ")
	try:
		option = options[int(response) - 1]
		print("You selected: " + option)
		if option == "capitalize":
			capitalize(demo_songs_dir)
		if 

	except Exception as e:
		print("not supported, " + e)




def main():
	parseFiles()

def parseFiles():
	for filename in os.listdir(dir):
		parseDemoFilename(filename)



def parseDemoFilename(filename):
	words = filename.split(" ")
	# remove filetype
	lastWord = words[len(words) - 1]
	print(lastWord)
	extensionSplit = lastWord.rindex('.')
	newlastWord = lastWord[:extensionSplit]
	extension = lastWord[extensionSplit:]

	print(newlastWord)
	print(extension)
	songName = ""
	options = ""
	remainder = ""
	for i in range(0, len(words)):
		word = words[i]
		if word.isalpha():
			songName += word + " "
		else:
			remainder = words[i : len(words)]

	print("songName: " + songName)
	print("remainder: " + ''.join(remainder))

	# Parse text until number... that is its name
	# should create a DemoFilename with:

# def logicFilenameParser(filename):
	# Parse text until number... that is its name
	# should create a DemoFilename with:



"""
STANDARDIZER

Cats 2.3-4 (1.4vs) (amped)
Cats     3       .2        -2         (1.5vs)     (amped up)
Name     Version Revision  Bounce    Varispeed   Options

Better Alternative: Cats A.1-3

Other Metadata:
Type (Song / Short Song / Loop / Jam / Cover)

Options
	varispeed	vs
	(custom)
"""

def capitalize(dir):
	response = input("Capitalize files in " + dir + " ?")
	if response != 'y':
		return
	for filename in os.listdir(dir):

		capitalizedFilename = ' '.join([str.capitalize() for str in filename.split()])
		if filename == capitalizedFilename:
			continue
		print("Renaming" + filename + " to " + capitalizedFilename)
		os.rename(dir + filename, dir + capitalizedFilename)



if __name__ == "__main__":
	main()
