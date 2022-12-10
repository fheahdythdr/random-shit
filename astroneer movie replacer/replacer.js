const fs = require("node:fs");
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

function input() {
    rl.question("Where is Astroneer located? (ex. F:\\SteamLibrary\\steamapps\\common\\ASTRONEER)\n\n", (path) => {
        if (fs.existsSync(path)) fs.writeFileSync(__dirname + "/astropath.txt", path)
        else {
            console.log("Invalid path.\n")
            input();
        }
    })
}

if (!fs.existsSync(__dirname + "/astropath.txt")) {
    console.log("No astropath.txt, input astroneer path.\n")
    input();
}
else {
    const path = fs.readFileSync(__dirname + "/astropath.txt", "utf8") + "/Astro/Content/"
    const filestring = "Anomaly Movie, loading_screen, ComputerScreen, GateUnlock, Legal, LoadingLoop, SESLogo"
    const validthings = {
        "Anomaly Movie": "AnomolyMovie.mp4",
        "loading_screen": "astroneer_loadingscreen.mp4",
        "ComputerScreen": "ComputerScreenMovie.mp4",
        "GateUnlock": "GateUnlockMovie.mp4",
        "Legal": [
            "Legal4K.mp4",
            "Legal1080p.mp4",
            "Legal1088.mp4"
        ],
        "LoadingLoop": [
            "LoadingLoop4k.mp4",
            "LoadingLoop1080P.mp4",
            "LoadingLoop1088.mp4"
        ],
        "SESLogo": [
            "ses_logo.mp4",
            "SESLogo4K.mp4",
            "SESLogo1080p.mp4",
            "SESLogo1088.mp4"
        ]
    }
    rl.question(`Which file would you like to replace?\nFiles are: ${filestring}\n\n`, (awnser) => {
        if (validthings[awnser] != undefined) {
            const toReplace = validthings[awnser];
            let files;
            const fileArray = [];
            for (const file in fs.readdirSync(__dirname + "/files/")) {
                const fileNum = parseInt(file) + 1
                const file2 = fs.readdirSync(__dirname + "/files/")[file]
                files += file2 + ' ' + fileNum + "\n"
                console.log(file2)
                fileArray.push(file2);
            }
            if (!fs.existsSync(path + "MoviesBackup")) {
                fs.mkdirSync(path + "MoviesBackup");
                fs.cpSync(path + "Movies", path + "MoviesBackup");
            }
            rl.question(`What file do you want to use? Files are: \n\n${files.replace("undefined", "")}\n\n`, (awnser) => {
                if (parseInt(awnser) != (undefined || null)) {
                    awnser = fileArray[parseInt(awnser) - 1]
                    console.log(awnser)
                }
                if (fs.existsSync(__dirname + "/files/" + awnser)) {
                    if (typeof toReplace == 'object') {
                        for (const replace of toReplace) {
                            fs.copyFileSync(__dirname + "/files/" + awnser, path + "Movies/" + replace)
                        }
                        process.exit(0)
                    }
                    else {
                        fs.copyFileSync(__dirname + "/files/" + awnser, path + "Movies/" + toReplace)
                        process.exit(0)
                    }
                }
            })
        }
        else {
            console.log("Invalid file.")
            return process.exit(1);
        }
    })
}
