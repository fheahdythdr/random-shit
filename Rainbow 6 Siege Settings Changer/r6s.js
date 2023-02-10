(async () => {
    const fs = await import('fs').then(m => m.default);
    const inquirer = await import('inquirer').then(m => m.default);
    const interrupt = await import('inquirer-interrupted-prompt').then(m => m.default)
    interrupt.fromAll(inquirer)

    const r6files = fs.readdirSync(`${process.env.USERPROFILE}\\OneDrive\\Documents\\My Games\\Rainbow Six - Siege`)

    const fileContent = fs.readFileSync(`${process.env.USERPROFILE}\\OneDrive\\Documents\\My Games\\Rainbow Six - Siege\\${r6files[0]}\\GameSettings.ini`, 'utf8')
    const lines = fileContent.split('\n')
    let currentServer = lines[183].split('=')[1]
    let inputOpts = {}
    for (let i = 77; i <= 138; i++) {
        const line = lines[i]
        const keyValue = line.split('=')
        if (keyValue != undefined && keyValue[0] != undefined && keyValue[1] != undefined) {
            const key = keyValue[0]
            const value = keyValue[1]
            inputOpts[key] = value
        }
    }

    let mode;

    const servers = {
        "default": "default (ping based)",
        "playfab/australiaeast": "eastern australia",
        "playfab/brazilsouth": "southern brazil",
        "playfab/centralus": "central us",
        "playfab/eastasia": "east asia",
        "playfab/eastus": "eastern us",
        "playfab/japaneast": "east japan",
        "playfab/northeurope": "north europe",
        "playfab/southafricanorth": "northern south africa",
        "playfab/southcentralus": "southern central us",
        "playfab/southeastasia": "southeast asia",
        "playfab/uaenorth": "uae north",
        "playfab/westeurope": "west europe",
        "playfab/westus": "west us"
    }

    const serverValues = Object.keys(servers).map((key) => ({
        name: servers[key],
        value: key
    }))

    let inputValues = Object.keys(inputOpts).map((key) => ({
        name: key + " = " + inputOpts[key],
        value: key
    }))

    const setServer = async (server) => {
        lines[183] = `DataCenterHint=${server}`
        currentServer = server
        console.log(currentServer)
        fs.writeFileSync(`${process.env.USERPROFILE}\\OneDrive\\Documents\\My Games\\Rainbow Six - Siege\\${r6files[0]}\\GameSettings.ini`, lines.join('\n'))
        askMode()
    }

    const askServer = async () => {
        process.title = `MODE: ONLINE`
        inquirer.prompt({type: 'list', name: 'server', message: `Current server: ${currentServer}`, choices: serverValues, interruptedKeyName: 'b', loop: false}).then(async (awnser) => await setServer(awnser.server)).catch((error) => {
            if (error === interrupt.EVENT_INTERRUPTED) {
                console.log('\n')
                askMode()
            }
        })
    }

    const setInputSetting = async (setting, value) => {
        const index = lines.findIndex(line => line.startsWith(setting))
        const res = setting + '=' + value
        lines[index] = res
        for (let i = 77; i <= 138; i++) {
            const line = lines[i]
            const keyValue = line.split('=')
            if (keyValue != undefined && keyValue[0] != undefined && keyValue[1] != undefined) {
                const key = keyValue[0]
                const value = keyValue[1]
                inputOpts[key] = value
            }
        }
        inputValues = Object.keys(inputOpts).map((key) => ({
            name: key + " = " + inputOpts[key],
            value: key
        }))
        fs.writeFileSync(`${process.env.USERPROFILE}\\OneDrive\\Documents\\My Games\\Rainbow Six - Siege\\${r6files[0]}\\GameSettings.ini`, lines.join('\n'))
        askInputSetting()
    }

    const askInputValue = async (setting) => {
        inquirer.prompt({type: 'input', name: 'value', message: `What would you like to set ${setting} to?`, interruptedKeyName: 'b'}).then(async (awnser) => await setInputSetting(setting, awnser.value)).catch((error) => {
            if (error === interrupt.EVENT_INTERRUPTED) {
                console.log('\n')
                askInputSetting()
            }
        })
    }

    const askInputSetting = async () => {
        process.title = `MODE: INPUT`
        inquirer.prompt({type: 'list', name: 'setting', message: 'Select a setting to change.', choices: inputValues, interruptedKeyName: 'b', loop: false}).then(async (awnser) => await askInputValue(awnser.setting)).catch((error) => {
            if (error === interrupt.EVENT_INTERRUPTED) {
                console.log('\n')
                askMode()
            }
        })
    }

    const modes = {
        'inputs': {
            execute: askInputSetting
        },
        'servers': {
            execute: askServer
        }
    }

    const askMode = async () => {
        process.title = `MODE: SELECTING`
        const vals = Object.keys(modes)
        bottombar.updateBottomBar('Press B to go back one page.\n')
        inquirer.prompt({type: 'list', name: 'mode', message: 'Select a mode.', choices: vals, loop: false}).then(async (awnser) =>{
            await modes[awnser.mode].execute()
        })
    }

    const bottombar = new inquirer.ui.BottomBar
    bottombar.updateBottomBar('Press B to go back one page.\n')

    askMode()
})()
