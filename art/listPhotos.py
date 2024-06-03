import os

# List names of photos in /photos into photos.js

photos = []
for filename in os.listdir("/Users/bencelsi/LocalDrive/CODE•••••••••••••••••••••••••/github/bencelsi.github.io/art/photos"):
    if filename.endswith(".jpeg"):
        photos.append(filename)
photos.sort()

if os.path.exists("photos.js"):
    os.remove("photos.js")

f = open("photos.js", "a")
f.write("let photos = [\n")
for photo in photos[:-1]:
    f.write("\"" + photo + "\",\n")
f.write("\"" + photos[len(photos) - 1] + "\"]")
f.close()