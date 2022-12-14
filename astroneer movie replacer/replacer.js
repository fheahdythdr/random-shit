const fs = require("node:fs");
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})
const ffmpegstatic = require('ffmpeg-static')
const ffmpeg = require("fluent-ffmpeg")
ffmpeg.setFfmpegPath(ffmpegstatic)

async function input() {
    rl.question("Where is Astroneer located? (ex. F:\\SteamLibrary\\steamapps\\common\\ASTRONEER)\n\n", async (path) => {
        if (fs.existsSync(path)) {
            if (path.includes("WindowsApps")) {
                console.log("Xbox installations are not supported at this time.");
                return setTimeout(() => {
                    process.exit(0)
                }, 2500)
                
            }
            fs.writeFileSync(__dirname + "/astropath.txt", path)
            await replace();
        }
        else {
            console.log("Invalid path.\n")
            await input();
        }
    })
}

async function cv(file, noext) {
    const cmd = ffmpeg({source: __dirname + "/conv/" + file})
    cmd.output(__dirname + "/files/" + noext + '.mp4')
    cmd.on('progress', (progress) => {
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
        process.stdout.write(`Conversion progress: ${progress.percent.toString().substring(0, 6)}%`)
    })
    cmd.run();
    return new Promise((resolve, reject) => {
        cmd.on('end', () => {
            process.stdout.clearLine(0);
            process.stdout.cursorTo(0);
            process.stdout.write('Done converting.\n')
            resolve(noext + '.mp4')
            fs.rmSync(__dirname + '/files/' + file)
            fs.rmSync(__dirname + "/conv/" + file)
            fs.rmdirSync(__dirname + "/conv/")
        });
        cmd.on('error', reject);
    })
}

async function replace() {
    const path = fs.readFileSync(__dirname + "/astropath.txt", "utf8") + "/Astro/Content/"
    const filestring = "Anomaly Movie, loading_screen, ComputerScreen, GateUnlock, Legal, LoadingLoop, SESLogo (not case sensitive)"
    const validthings = {
        "anomaly movie": "AnomolyMovie.mp4",
        "loading_screen": "astroneer_loadingscreen.mp4",
        "computerscreen": "ComputerScreenMovie.mp4",
        "gateunlock": "GateUnlockMovie.mp4",
        "legal": [
            "Legal4K.mp4",
            "Legal1080p.mp4",
            "Legal1088.mp4"
        ],
        "loadingloop": [
            "LoadingLoop4k.mp4",
            "LoadingLoop1080P.mp4",
            "LoadingLoop1088.mp4"
        ],
        "seslogo": [
            "ses_logo.mp4",
            "SESLogo4K.mp4",
            "SESLogo1080p.mp4",
            "SESLogo1088.mp4"
        ]
    }
    rl.question(`Which file would you like to replace?\nFiles are: ${filestring}\n\n`, (awnser) => {
        if (validthings[awnser.toLowerCase()] != undefined) {
            const toReplace = validthings[awnser.toLowerCase()];
            let files;
            const fileArray = [];
            for (const file in fs.readdirSync(__dirname + "/files/")) {
                const fileNum = parseInt(file) + 1
                const file2 = fs.readdirSync(__dirname + "/files/")[file]
                files += file2 + ' ' + fileNum + "\n"
                fileArray.push(file2);
            }
            if (!fs.existsSync(path + "MoviesBackup")) {
                fs.mkdirSync(path + "MoviesBackup");
                for (const toBackup of fs.readdirSync(path + "Movies")) {
                    fs.copyFileSync(path + "Movies/" + toBackup, path + "MoviesBackup" + toBackup)
                }
            }
            if (files === undefined) {
                console.log("No files found in " + __dirname + "\\files\\")
                process.exit(1)
            }
            rl.question(`What file do you want to use? Files are: \n\n${files.replace("undefined", "")}\n\n`, async (awnser) => {
                if (parseInt(awnser) != (undefined || null)) {
                    awnser = fileArray[parseInt(awnser) - 1]
                    //console.log(awnser)
                }
                const extension = '.' + awnser.split(".")[awnser.split(".").length - 1]
                if (extension != ".mp4") {
                    process.stdout.clearLine(0);
                    process.stdout.cursorTo(0);
                    console.log("Converting to mp4.")
                    fs.mkdirSync(__dirname + "/conv/");
                    fs.copyFileSync(__dirname + "/files/" + awnser, __dirname + "/conv/" + awnser);
                    awnser = await cv(awnser, awnser.replace(extension, ''));
                }
                console.log(awnser)
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

(async () => {
    if (!fs.existsSync(__dirname + "/astropath.txt")) {
        console.log("No astropath.txt, input astroneer path.\n")
        await input();
    }
    else {
        await replace();
    }
})()
