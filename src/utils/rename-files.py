from os import listdir, rename
from os.path import isfile, join, splitext, split

DIRECTORY = r"D:\Dev\ReactJS\MLBB Overlay\mlbb-overlay\src\assets\main\centered_splash_arts"

#onlyfiles = [f for f in listdir(DIRECTORY) if isfile(join(DIRECTORY, f))]
#print(onlyfiles)

for file in listdir(DIRECTORY):
    file_name = splitext(file)[0]
    if (file_name.find('_') > 0):
        hero_name = file_name.split('_')[0]
        rename(DIRECTORY + '\\' + file, hero_name + ".png")
