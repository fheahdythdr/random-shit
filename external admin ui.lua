-- // Yes, some of this code is skidded from IY.
print("Yes, some of this code is skidded from IY, I did not want to figure out how to do float.")
local ResponseTest1
local ResponseTest2
local Clip
local Noclipping
local FoundPlayer
local tempstr
local CharacterAddedConnection
local PlayerAddedConnection
local HttpService = game:GetService'HttpService'
local plr = game:GetService'Players'.LocalPlayer
local plrs = game:GetService'Players'
local plrw = plr.Character
local plrh = plrw:FindFirstChild('Humanoid')
local plrhrp = plrw:FindFirstChild('HumanoidRootPart')
local RunService = game:GetService('RunService')
local workspace = game:GetService('Workspace')
IYMouse = plr:GetMouse()
local gs = GetService
local notif = loadstring(game:HttpGet('https://raw.githubusercontent.com/fheahdythdr/ui-libs-ui-lib-backups/main/function%20things/notifs.lua'))() 
local SendNotif = notif:Init()
plr.CharacterAdded:Connect(function(nchar)
    plrh = nchar:WaitForChild('HumanoidRootPart')
    plrw = nchar
    plrh = plrw.Humanoid
end)
local ESPToggle = false
local chams = false
local ESP = loadstring(game:HttpGet("https://raw.githubusercontent.com/Kiriot22/ESP-Lib/main/ESP.lua"))()
local plrtable = {}

local function RefreshConsole(name, initialcolour, startingtext_or_nil)
    rconsoleclear()
    if name then
        rconsolename(name)
    else
        rconsolename(identifyexecutor().." Console")
    end
    if initialcolour then
        rconsoleprint(initialcolour)
    end
    if startingtext_or_nil then
        rconsoleprint(startingtext_or_nil)
    end
    rconsoleprint("@@WHITE@@")
end

local function clearconsole()
    RefreshConsole("RConsole Admin", "@@CYAN@@")
end
local function ListCommands()
    rconsoleprint("@@CYAN@@")
    rconsoleprint("Commands are:\nclr (Clears console)\nsetwalkspeed [speed]\nsetjumppower [jumppower]\nnoclip\nclip\ntp/to [player]\nfloat\nunfloat\nesp\nchams\n\n")
    rconsoleprint("@@MAGENTA@@")
    rconsoleprint("Enter a command:\n")
    rconsoleprint("@@WHITE@@")
end

local function AwaitConsoleInput()
    return rconsoleinput()
end
local function RefreshInput(input)
    input = AwaitConsoleInput()
end
local function NoclipLoop()
    if Clip == false    then
        for _, child in pairs(plrw:GetDescendants()) do
            if child:IsA("BasePart") and child.CanCollide == true then
                child.CanCollide = false
            end
        end
    end
end
local function FindName(name)
    for _, v in next, game.Players:GetPlayers() do
        local subbedname = string.sub(v.Name:lower(), 1, string.len(name))
        local subbeddisplayname = string.sub(v.DisplayName:lower(), 1, string.len(name))
        
        if (subbedname == name) then
            return tostring(v)
        elseif (subbeddisplayname == name) then
            return tostring(v)
        end
    end
end
function ApplyModel(model)
    if not model:FindFirstChild("Highlight") then
        local highlight = Instance.new("Highlight")
        highlight.Parent = model.Character
        highlight.DepthMode = Enum.HighlightDepthMode.AlwaysOnTop
    end
    end
function ApplyPlayer(model)
    if not model:FindFirstChild("Highlight") then
        local highlight = Instance.new("Highlight")
        highlight.Parent = model
        highlight.DepthMode = Enum.HighlightDepthMode.AlwaysOnTop
    end
end

task.spawn(function()
    while wait(1) do
        plrtable = {}
        for i,v in pairs(plrs:GetChildren()) do
            table.insert(plrtable, v)
        end
    end
end)

RefreshConsole("RConsole Admin", "@@CYAN@@")
ListCommands()

local cmdtable = {"clr", "setwalkspeed", "cmds", "setjumppower", "noclip", "clip", "tp/to", "float", "unfloat", "esp"}

while true do
    rconsoleprint(">")
    local str = AwaitConsoleInput()
    if str:lower() == "clr" then
        clearconsole()
        ListCommands()
    elseif string.sub(str:lower(), 1, string.len("setwalkspeed")) == "setwalkspeed" then
        str = string.split(str, " ")
        str = str[2]
        rconsoleprint("setting walkspeed to "..str.."\n")
        game:GetService("Players").LocalPlayer.Character.Humanoid.WalkSpeed = tonumber(str)
        wait(.25)
        rconsoleprint("walkspeed has been set to "..str.."\n")
    elseif str:lower() == "cmds" then
        rconsoleinfo("Commands are:\nclr (Clears console)\nsetwalkspeed [speed]\nsetjumppower [jumppower]\nnoclip\nclip\ntp/to [player]\nfloat\nunfloat\nesp\nchams\n\nEnter a command:\n")
    elseif str:lower() == "break" then
        rconsoleclear()
        rconsoleprint("broken while true do chain")
        wait(1)
        rconsoleclear()
        rconsolename(identifyexecutor().. " Console")
        break
    elseif string.sub(str:lower(), 1, string.len("setjumppower")) == "setjumppower" then
        str = string.split(str, " ")
        str = str[2]
        rconsoleprint("setting jump power to "..str.."\n")
        game:GetService("Players").LocalPlayer.Character.Humanoid.JumpPower = tonumber(str)
        wait(.25)
        rconsoleprint("jump power has been set to "..str.."\n")
    elseif str:lower() == "noclip" then
        Clip = false
        Noclipping = game:GetService('RunService').Stepped:Connect(NoclipLoop)
        rconsoleprint("@@CYAN@@")
        rconsoleprint("<INFO> Noclip enabled.\n")
        rconsoleprint("@@WHITE@@")
    elseif str:lower() == "clip" then
        Clip = true
        Noclipping:Disconnect()
        rconsoleprint("@@CYAN@@")
        rconsoleprint("<INFO> Noclip disabled.\n")
        rconsoleprint("@@WHITE@@")
    elseif string.sub(str:lower(), 1, string.len("tp")) == "tp" then
        str1 = string.split(str, " ")
        str = str1[2]
        --[[for i,v in pairs(plrs:GetChildren()) do
            local subbedname = string.sub(v.Name:lower(), 1, string.len(str))
            local subbeddisplayname = string.sub(v.DisplayName:lower(), 1, string.len(str))
            
            if (subbedname == name) then
                FoundPlayer = tostring(v)
            elseif (subbeddisplayname == name) then
                FoundPlayer = tostring(v)
            end
        end]]
        FoundPlayer = FindName(str)
        if FoundPlayer then
            rconsoleprint("teleporting to "..FoundPlayer.."\n")
            plrhrp.CFrame = workspace:FindFirstChild(FoundPlayer):FindFirstChild("HumanoidRootPart").CFrame
            rconsoleprint("teleported to "..FoundPlayer.."\n")
        else
            rconsoleprint("@@RED@@")
            rconsoleprint("<ERROR> Couldn't find a player whose name started with "..str.."\n")
            rconsoleprint("@@WHITE@@")
        end
    elseif string.sub(str:lower(), 1, string.len("to")) == "to" then
        str1 = string.split(str, " ")
        str = str1[2]
        --[[for i,v in pairs(plrs:GetChildren()) do
            local subbedname = string.sub(v.Name:lower(), 1, string.len(str))
            local subbeddisplayname = string.sub(v.DisplayName:lower(), 1, string.len(str))
            
            if (subbedname == name) then
                FoundPlayer = tostring(v)
            elseif (subbeddisplayname == name) then
                FoundPlayer = tostring(v)
            end
        end]]
        FoundPlayer = FindName(str)
        if FoundPlayer then
            rconsoleprint("teleporting to "..FoundPlayer.."\n")
            plrhrp.CFrame = workspace:FindFirstChild(FoundPlayer):FindFirstChild("HumanoidRootPart").CFrame
            rconsoleprint("teleported to "..FoundPlayer.."\n")
        else
            rconsoleprint("@@RED@@")
            rconsoleprint("<ERROR> Couldn't find a player whose name started with "..str.."\n")
            rconsoleprint("@@WHITE@@")
        end
    elseif str:lower() == "float" then
        if not plrw:FindFirstChild("oogeABAOGAGOBAOGOAG") then
            task.spawn(function()
                local Float = Instance.new('Part')
                Float.Name = "oogeABAOGAGOBAOGOAG"
                Float.Parent = plrw
                Float.Transparency = 1
                Float.Size = Vector3.new(2,0.2,1.5)
                Float.Anchored = true
                local FloatValue = -3.1
                Float.CFrame = plrhrp.CFrame * CFrame.new(0,FloatValue,0)
                qUp = IYMouse.KeyUp:Connect(function(KEY)
                    if KEY == 'q' then
                        FloatValue = FloatValue + 0.5
                    end
                end)
                eUp = IYMouse.KeyUp:Connect(function(KEY)
                    if KEY == 'e' then
                        FloatValue = FloatValue - 0.5
                    end
                end)
                qDown = IYMouse.KeyDown:Connect(function(KEY)
                    if KEY == 'q' then
                        FloatValue = FloatValue - 0.5
                    end
                end)
                eDown = IYMouse.KeyDown:Connect(function(KEY)
                    if KEY == 'e' then
                        FloatValue = FloatValue + 0.5
                    end
                end)
                floatDied = plrw:FindFirstChildOfClass('Humanoid').Died:Connect(function()
                    FloatingFunc:Disconnect()
                    Float:Destroy()
                    qUp:Disconnect()
                    eUp:Disconnect()
                    qDown:Disconnect()
                    eDown:Disconnect()
                    floatDied:Disconnect()
                end)
                local function FloatPadLoop()
                    if plrw:FindFirstChild("oogeABAOGAGOBAOGOAG") and plrhrp then
                        Float.CFrame = plrhrp.CFrame * CFrame.new(0,FloatValue,0)
                    else
                        FloatingFunc:Disconnect()
                        Float:Destroy()
                        qUp:Disconnect()
                        eUp:Disconnect()
                        qDown:Disconnect()
                        eDown:Disconnect()
                        floatDied:Disconnect()
                    end
                end			
                FloatingFunc = game:GetService('RunService').Heartbeat:Connect(FloatPadLoop)
            end)
        end
        rconsoleprint("@@CYAN@@")
        rconsoleprint("Float has been enabled, Q and E to go up and down.\n")
        rconsoleprint("@@WHITE@@")
    elseif str:lower() == "unfloat" then
        if plrw:FindFirstChild("oogeABAOGAGOBAOGOAG") then
            plrw:FindFirstChild("oogeABAOGAGOBAOGOAG"):Destroy()
        end
        if floatDied then
            FloatingFunc:Disconnect()
            qUp:Disconnect()
            eUp:Disconnect()
            qDown:Disconnect()
            eDown:Disconnect()
            floatDied:Disconnect()
        end 
        rconsoleprint("@@CYAN@@")
        rconsoleprint("Float has been disabled.\n")
        rconsoleprint("@@WHITE@@")
    elseif str:lower() == "esp" then
        ESPToggle = not ESPToggle
        ESP:Toggle(ESPToggle)
        rconsoleprint("@@CYAN@@")
        rconsoleprint("ESP has been set to "..tostring(ESPToggle).."\n")
        rconsoleprint("@@WHITE@@")
    elseif str:lower() == "chams" then
        chams = not chams
        if chams then
            for _, Player in next, game:GetService("Players"):GetChildren() do
                ApplyModel(Player) wait()
            end
            for i,v in pairs(game:GetService("Players"):GetChildren()) do
                CharacterAddedConnection = v.CharacterAdded:Connect(function(character)
                    ApplyPlayer(character)
                end)
            end
            rconsoleprint("@@CYAN@@")
            rconsoleprint("Chams has been enabled.\n")
            rconsoleprint("@@WHITE@@")
        else
            for _, Player in next, plrs:GetChildren() do
                if Player.Character:FindFirstChild("Highlight") then
                    Player.Character:FindFirstChild("Highlight"):Destroy()
                end
            end
            for i,v in pairs(workspace:GetDescendants()) do
                if table.find(plrtable, v.Name) then
                    if v:FindFirstChild("Highlight") then v:FindFirstChild("Highlight"):Destroy() end
                end
            end
            CharacterAddedConnection:Disconnect()
            rconsoleprint("@@CYAN@@")
            rconsoleprint("Chams has been disabled.\n")
            rconsoleprint("@@WHITE@@")
        end
    else
        rconsoleprint("@@RED@@")
        rconsoleprint("<ERROR> Couldn't find command "..str..", are you sure you typed the command correctly?\n")
        rconsoleprint("@@WHITE@@")
    end
end
