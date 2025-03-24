import os
from re import sub
# List names of files in a dir into filenames.js
#
print("This will lists files in directoy X into a js array in X/0-list.js")
dir = input("Enter a dir name continue...")
#todo - automatically do on all dirs

def toCamelCase(s):
    # Use regular expression substitution to replace underscores and hyphens with spaces,
    # then title case the string (capitalize the first letter of each word), and remove spaces
    s = sub(r"(_|-)+", " ", s).title().replace(" ", "")
    # Join the string, ensuring the first letter is lowercase
    return ''.join([s[0].lower(), s[1:]])

photos = []
for filename in os.listdir("/Users/bencelsi/LocalDrive/CODE•••••••••••••••••••••••••/github/bencelsi.github.io/art/" + dir):
    if filename != ".DS_Store":
        photos.append(filename)

photos.sort()

if os.path.exists(dir + "/0-list.js"):
    os.remove(dir + "/0-list.js")

f = open(dir + "/0-list.js", "a")
f.write("let " + toCamelCase(dir) + "List = [\n")
for photo in photos[:-1]:
    f.write("\"" + photo + "\",\n")
f.write("\"" + photos[len(photos) - 1] + "\"]")
f.close()
