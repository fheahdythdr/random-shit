import os
dir = os.path.dirname(os.path.realpath(__file__))  

def getListOfFiles(dirName):
    # create a list of file and sub directories 
    # names in the given directory 
    listOfFile = os.listdir(dirName)
    allFiles = list()
    # Iterate over all the entries
    for entry in listOfFile:
        # Create full path
        fullPath = os.path.join(dirName, entry)
        os.path.isdir
        # If entry is a directory then get the list of files in this directory 
        if os.path.isdir(fullPath):
            allFiles = allFiles + getListOfFiles(fullPath)
        else:
            allFiles.append(fullPath)
    
    return allFiles
    
def get_files(type):
    if type == "cursor":
        files = list()
        for file in os.listdir("C:/Program Files (x86)/Roblox/Versions/"):
            if file.find("version-") != 1:
                cursorDest = "C:/Program Files (x86)/Roblox/Versions/" + file + "/content/textures/Cursors/KeyboardMouse"
                files.append(cursorDest + "/ArrowCursor.png")
                files.append(cursorDest + "/ArrowFarCursor.png")
        return files, cursorDest
    elif type == "sound":
        files = list()
        for file in os.listdir("C:/Program Files (x86)/Roblox/Versions/"):
            if file.find("version-") != -1:
                fileDest = "C:/Program Files (x86)/Roblox/Versions/" + file + "/content/sounds"
                files.append(fileDest + "/ouch.ogg")
        return files, fileDest
    else:
        print("Invalid type.")
                
