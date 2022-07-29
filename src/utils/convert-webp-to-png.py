from PIL import Image
from os import listdir
from os.path import isfile, join, splitext

DIRECTORY = r"D:\Dev\ReactJS\MLBB Overlay\mlbb-overlay\src\assets\main\icons"

#onlyfiles = [f for f in listdir(DIRECTORY) if isfile(join(DIRECTORY, f))]
#print(onlyfiles)

for file in listdir(DIRECTORY):
    heroName = splitext(file)[0]
    print(heroName)
    im = Image.open(DIRECTORY + '\\' + heroName + ".webp").convert("RGBA")
    im.save(heroName + ".png", "png")

