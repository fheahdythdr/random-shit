from genericpath import isfile
import os
dir_path = os.path.dirname(os.path.realpath(__file__))

def getListOfFiles(dirName):
    # create a list of file and sub directories 
    # names in the given directory 
    listOfFile = os.listdir(dirName)
    allFiles = list()
    # Iterate over all the entries
    for entry in listOfFile:
        # Create full path
        fullPath = os.path.join(dirName, entry)
        # If entry is a directory then get the list of files in this directory 
        if os.path.isdir(fullPath):
            allFiles = allFiles + getListOfFiles(fullPath)
        else:
            allFiles.append(fullPath)
    
    return allFiles

if not os.path.exists(dir_path + "/IN"):
    os.mkdir(dir_path + "/IN")

if not os.path.exists(dir_path + "/OUT"):
    os.mkdir(dir_path + "/OUT")

print("Input file extension.")

fileExtension = input()

for file in getListOfFiles(dir_path + "/IN/"):
    tmp = file.split("/")
    tmp2 = tmp[2].split(".")[0]
    name = tmp2 + fileExtension
    in_buf = open(file, "rb").read()
    if not isfile(dir_path + "/OUT/" + name):
        out_buf = open(dir_path + "/OUT/" + name, "xb")
    else:
        out_buf = open(dir_path + "/OUT/" + name, "wb")
    out_buf.write(in_buf)
    out_buf.close()
