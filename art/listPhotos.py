import os

# List names of photos in /photos into photos.js (or designated directory)

print("This script lists files in directoy * into a js array in file *")
input("Enter to continue...")


name = "photos"

photos = []
for filename in os.listdir("/Users/bencelsi/LocalDrive/CODE•••••••••••••••••••••••••/github/bencelsi.github.io/art/" + name):
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