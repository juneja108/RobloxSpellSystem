import { Service, OnStart } from "@flamework/core";
import React from "@rbxts/react";
import { StrictMode } from "@rbxts/react";
import { createPortal, createRoot } from "@rbxts/react-roblox";
import { Players } from "@rbxts/services";
import { Event } from "shared/eventLifecycle";
import { ValueBar } from "shared/ui/valuebar";
import { createBillBoardGUI } from "shared/ui/valuebar/createBillBoardGUI";

@Service({})
export class HealthBar{
    @Event(Players.PlayerAdded)
    createHealthBar(player: Player) {
        player.CharacterAdded.Connect((character) => {
            const head = character.WaitForChild("Head");
            const humanoid = character.WaitForChild("Humanoid") as Humanoid
            
            const billboardGui = createBillBoardGUI(new Vector3(0, 2, 0))
            billboardGui.Name = "HealthBar";
            billboardGui.Parent = head;

            const root = createRoot(new Instance("Folder"));
            root.render(createPortal(
                <ValueBar 
                    text = {"HEALTH"}
                    colour = {Color3.fromRGB(255, 0, 0)}
                    value = {humanoid.Health}
                    maximum = {humanoid.MaxHealth}
                />,
                billboardGui
            ))
            
        })
    }
}