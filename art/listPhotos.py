import os

# List names of photos in /photos in photos.js (or designated directory)

name = "photos"

photos = []
for filename in os.listdir("/Users/bencelsi/LocalDrive/CODE•••••••••••••••••••••••••/github/bencelsi.github.io/art/" + name):
    if filename.endswith(".jpeg"):
        photos.append(filename)
photos.sort()

if os.path.exists(name + ".js"):
    os.remove(name + ".js")

f = open(name + ".js", "a")
f.write("let photos = [\n")
for photo in photos[:-1]:
    f.write("\"" + photo + "\",\n")
f.write("\"" + photos[len(photos) - 1] + "\"]")
f.close()