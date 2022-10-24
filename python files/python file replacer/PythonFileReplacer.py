import os, ctypes, sys
from shutil import copyfile
import pylibs.directorycustom as libs
try:
    if sys.argv[1] == "--clog":
        print("Rewrote in Python.")
    if sys.argv[1] == "--help":
            print("usage:\n")
            print("py ReplaceFiles.py type mode")
            print("example:\n")
            print("py ReplaceFiles.py cursor -m\n")
            print("arguments: type, mode (if you want more than one cursor image, so one for arrowfar and one for arrowcursor)")
            print("commands: --help, --clog, -m (after cursor)")
            print("re-run this file with py ReplaceFiles.py <args>\n")
except:
    print("not enough args, arguments:\n")
    print("py ReplaceFiles.py type mode")
    print("example:\n")
    print("py ReplaceFiles.py cursor -m\n")
    print("arguments: type, mode (if you want more than one cursor image, so one for arrowfar and one for arrowcursor)")
    print("commands: --help, --clog, -m (after cursor)")
    print("re-run this file with py ReplaceFiles.py <args>\n")

def is_admin():
    try:
        return ctypes.windll.shell32.IsUserAnAdmin()
    except:
        return False

if is_admin():
    dir = os.path.dirname(os.path.realpath(__file__))  
    file_type = sys.argv[1]
    files, fileDest = libs.get_files(file_type)
    if file_type == "sound":
        print("select sound file:\n")
        count = os.listdir(dir + "/sound")
        totalcount = 0
        for file in libs.getListOfFiles(dir + "/sound"):
            print(file.split("/")[len(file.split("/")) - 1].split("\\")[1] + "  List Number: " + str((totalcount)+ 1))
            totalcount += 1
        soundfile = input()
        try:
            currentNum = int(soundfile) - 1
            newSound = count[currentNum]
        except:
            newSound = soundfile
        copyfile(dir + "/sound/" + newSound, fileDest + "/ouch.ogg")
    elif file_type == "cursor":
        count = os.listdir(dir + "/cursors")
        totalcount = 0
        if len(sys.argv) == 3:
            if sys.argv[2] == "-m":
                print("select cursor files, order: \nfirst file: arrowcursor,\nsecond file: arrowfarcursor\n")
        else:
            print("select cursor file\n")
        for file in libs.getListOfFiles(dir + "/cursors"):
            print(file.split("/")[len(file.split("/")) - 1].split("\\")[1] + "  List Number: " + str(totalcount + 1))
            totalcount += 1
        if len(sys.argv) == 3:
            if sys.argv[2] == "-m":
                option1 = input()
                option2 = input()
                try:
                    currentNum1 = int(option1) - 1
                    newOpt1 = count[currentNum1]
                    currentNum2 = int(option2) - 1
                    newOpt2 = count[currentNum2]
                except:
                    newOpt1 = option1
                    newOpt2 = option2
        else:
            option = input()
            try:
                currentNum = int(option) - 1
                newOpt = count[currentNum]
            except:
                newOpt = option
        if len(sys.argv) == 3:
            if sys.argv[2] == "-m":
                copyfile(dir + "/cursors/" + newOpt1, fileDest + "/ArrowCursor.png")
                copyfile(dir + "/cursors/" + newOpt2, fileDest + "/ArrowFarCursor.png")
        else:
            copyfile(dir + "/cursors/" + newOpt, fileDest + "/ArrowCursor.png")
            copyfile(dir + "/cursors/" + newOpt, fileDest + "/ArrowFarCursor.png")
else:
    ctypes.windll.shell32.ShellExecuteW(None, "runas", sys.executable, __file__, None, 1)

