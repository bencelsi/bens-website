import os
import sys
from re import sub
# List names of files in a dir into filenames.js
# todo: make this JS.
# todo - automatically do on all dirs

if len(sys.argv) == 1:
    dir = input("Enter a dir name continue...")
else:
    dir = sys.argv[1]
print("This will lists files in " + dir + "into a js array in files.js")

dirs = [
    "music/albums/griven/",
    "music/albums/jams/"
    "music/albums/old-piano/",
]


fileNames = []
for filename in os.listdir("/Users/bencelsi/LocalDrive/CODE•••••••••••••••••••••••••/github/bencelsi.github.io/" + dir):
    if filename != ".DS_Store" and filename != "0-list.js":
        fileNames.append(filename)

fileNames.sort()

if os.path.exists(dir + "/0-list.js"):
    os.remove(dir + "/0-list.js")

print(dir)
print(dir.rsplit('/', 1))
print(dir.rsplit('/', 1)[0])

def toCamelCase(s):
    # Use regular expression substitution to replace underscores and hyphens with spaces,
    # then title case the string (capitalize the first letter of each word), and remove spaces
    s = sub(r"(_|-)+", " ", s).title().replace(" ", "")
    # Join the string, ensuring the first letter is lowercase
    return ''.join([s[0].lower(), s[1:]])

f = open(dir + "/0-list.js", "a")
f.write("let " + toCamelCase(dir.rsplit('/', 1)[1]) + "List = [\n")
for fileName in fileNames[:-1]:
    f.write("\"" + fileName + "\",\n")
f.write("\"" + fileNames[len(fileNames) - 1] + "\"]")
f.close()
