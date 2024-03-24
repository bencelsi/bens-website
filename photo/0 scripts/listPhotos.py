import os


for filename in os.listdir("/Users/bencelsi/LocalDrive/CODE•••••/github/bencelsi.github.io/photos"):
    
    capitalizedFilename = ' '.join([str.capitalize() for str in filename.split()])
    if filename == capitalizedFilename:
        continue
    print("\"" + filename + "\",")